import AsyncStorage from "@react-native-async-storage/async-storage";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { act, renderHook } from "@testing-library/react-hooks";
import { startAsync } from "expo-auth-session";
import "jest-fetch-mock";
import fetchMock from "jest-fetch-mock";
import { mocked } from "jest-mock";
import { AuthProvider, useAuth } from "./auth";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("expo-auth-session");
jest.mock("expo-google-app-auth");

fetchMock.enableMocks();

fetchMock.enableMocks();

describe("Auth Hook", () => {
  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it("should be able to sign in with an existing Google account", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      params: {
        access_token: "any_token",
      },
    });

    const userTest = {
      id: "any_id",
      email: "diego@email.com",
      name: "Diego",
      photo: "any_photo.png",
    };

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toBe(userTest.email);
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });

  it("should be error with incorrectly Google parameters", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    }
  });
});
