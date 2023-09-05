import "jest-fetch-mock";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import { renderHook, act } from "@testing-library/react-hooks";
import { mocked } from "jest-mock";
import { AuthProvider, useAuth } from "./bkp---auth";
import { startAsync } from "expo-auth-session";
import fetchMock from "jest-fetch-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("expo-auth-session");

fetchMock.enableMocks();

it("should be able to sign in with Google account existing", async () => {
  const googleMocked = mocked(startAsync as any);
  googleMocked.mockReturnValueOnce({
    type: "success",
    params: {
      access_token: "any_token",
    },
  });

  fetchMock.mockResponseOnce(
    JSON.stringify({
      id: "any_id",
      email: "borges10002@gmail.com",
      name: "borges",
      photo: "any_photo.png",
    })
  );

  const { result } = renderHook(() => useAuth(), {
    wrapper: AuthProvider,
  });

  await act(async () => await result.current.signInWithGoogle());

  expect(result.current.user.email).toBe("borges10002@gmail.com");
});
