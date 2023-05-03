import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { ANDROID_CLIENT_ID, IOS_CLIENT_ID } = process.env;

WebBrowser.maybeCompleteAuthSession();

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const userStorageKey = "@gofinances:user";

  const [_, response, googleSignIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  async function signInWithGoogle() {
    setIsAuthenticating(true);

    googleSignIn().then((response) => {
      if (response.type !== "success") {
        setIsAuthenticating(false);
      }
    });
  }

  // useEffect(() => {
  //   async function loadGoogle() {
  //     if (response?.type === "success") {
  //       if (response.authentication?.idToken) {
  //         const resultGoogle = await fetch(
  //           `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication.idToken}`
  //         );

  //         const userInfo = await resultGoogle.json();

  //         const userInfoFormatted = {
  //           id: userInfo.id,
  //           email: userInfo.email,
  //           name: userInfo.name,
  //           photo: userInfo.photo,
  //         };

  //         setUser(userInfoFormatted);

  //         await AsyncStorage.setItem(
  //           userStorageKey,
  //           JSON.stringify(userInfoFormatted)
  //         );
  //       } else {
  //         Alert.alert(
  //           "Entrar",
  //           "Não foi possivel conectar-se a sua conta goolge."
  //         );
  //         setIsAuthenticating(false);
  //       }
  //     }
  //   }

  //   loadGoogle();
  // }, [response]);

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }

      setUserStorageLoading(false);
    }

    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
