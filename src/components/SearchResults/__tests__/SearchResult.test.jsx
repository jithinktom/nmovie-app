import React from "react";
import { useSelector, useDispatch } from "react-redux";
import renderer from "react-test-renderer";
import { useLocation } from "react-router-dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { SearchResults } from "../SearchResults";
import { searchData, locationData } from "./mockData";

test("SearchResults component rendered", () => {
  const history = createMemoryHistory();
  useSelector.mockImplementation(() => {
    return searchData;
  });

  useLocation.mockImplementation(() => {
    return locationData;
  });

  useDispatch.mockImplementation(() => {
    return () => {};
  });

  const component = renderer.create(
    <Router history={history}>
      <SearchResults />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
