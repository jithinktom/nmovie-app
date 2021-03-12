import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { useLocation } from "react-router-dom";
import { Search } from "../SearchBar";

test("SearchBar component rendered", () => {
  useLocation.mockImplementation(() => {
    return {
      pathname: "/movie/299537",
    };
  });

  const renderer = new ShallowRenderer();

  renderer.render(<Search />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
