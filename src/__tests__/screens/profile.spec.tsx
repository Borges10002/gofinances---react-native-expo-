import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../Profile";

test("check if show correctly user input name placeholder", () => {
  const { debug } = render(<Profile />);

  debug();
});
