import React from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import renderer from "react-test-renderer";
import { Detail } from "../Detail";
import { detailData } from "./mockData";

test("Detail component rendered", () => {
  useLocation.mockImplementation(() => {
    return { pathName: "/movie/299537" };
  });
  useParams.mockImplementation(() => {
    return { id: "299537" };
  });

  useSelector.mockImplementation(() => {
    return detailData;
  });

  const component = renderer.create(<Detail resource="movie" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
