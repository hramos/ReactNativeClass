import React from "react";
import MainNavigator from "./App";

import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const rendered = renderer.create(<MainNavigator />).toJSON();
  expect(rendered).toBeTruthy();
});

it("renders correctly", () => {
  const tree = renderer.create(<MainNavigator />).toJSON();
  expect(tree).toMatchSnapshot();
});
