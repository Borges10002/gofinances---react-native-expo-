import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { ANDROID_CLIENT_ID } from "@env";
// const { REDIRECT_URI } = process.env;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

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

WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = "@gofinances:user";

  const [_, response, googleSigIn] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  async function signInWithGoogle() {
    setIsAuthenticating(true);

    try {
      googleSigIn().then((response) => {
        if (response.type !== "success") {
          setIsAuthenticating(false);
        }
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      // const credential = await AppleAuthentication.signInAsync({
      //   requestedScopes: [
      //     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      //     AppleAuthentication.AppleAuthenticationScope.EMAIL,
      //   ],
      // });
      // if (credential) {
      //   const name = credential.fullName!.givenName!;
      //   const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;
      //   const userLogged = {
      //     id: String(credential.user),
      //     email: credential.email!,
      //     name,
      //     photo,
      //   };
      //   setUser(userLogged);
      // await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      //}
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function getDate() {
      if (response?.type === "success") {
        if (response.authentication?.idToken) {
          const result = await fetch(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.authentication?.idToken}`
          );

          const userInfo = await result.json();

          const userLogged = {
            id: userInfo.email,
            email: userInfo.email,
            name: userInfo.given_name,
            photo: userInfo.picture,
          };

          console.log(userLogged);

          setUser(userLogged);

          await AsyncStorage.setItem(
            userStorageKey,
            JSON.stringify(userLogged)
          );
        } else {
          Alert.alert(
            "Entrar",
            "Não foi possível conectar-se a sua conta Google."
          );
          setIsAuthenticating(false);
        }
      }
    }

    getDate();
  }, [response]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
