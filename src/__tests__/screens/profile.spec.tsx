import { render } from "@testing-library/react-native";
import React from "react";

import { Profile } from "../../Profile";

describe("Profile Screen", () => {
  it("should have placeholder correctly in user name input", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName).toBeTruthy();
  });

  it("should be loaded user data", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputSurname = getByTestId("input-surname");

    expect(inputName.props.value).toEqual("diego");
    expect(inputSurname.props.value).toEqual("borges");
  });

  it("should exist title correctly", () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId("text-title");

    expect(textTitle.props.children).toContain("Perfil");
  });
});
