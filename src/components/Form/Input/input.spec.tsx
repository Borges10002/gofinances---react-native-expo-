import React from "react";
import { render } from "@testing-library/react-native";
import { Input } from ".";

import { ThemeProvider } from "styled-components/native";
import theme from "../../../global/styles/theme";

const Providers: React.FC = ({ children }: any) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input component", () => {
  it("must have specific border color when active", () => {
    const { getByTestId, debug } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        keyboardType="email-address"
        autoCorrect={false}
        active={true}
      />,
      {
        wrapper: Providers,
      }
    );

    // debug();

    const inputComponent = getByTestId("input-email");
    expect(inputComponent.props.style[0].borderColor).toEqual(
      theme.colors.attention
    );

    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
