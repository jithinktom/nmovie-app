import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import renderer from "react-test-renderer";
import { Card } from "../Card";
import { cardData } from "./mockData";

test("Card component rendered", () => {
  const history = createMemoryHistory();

  const component = renderer.create(
    <Router history={history}>
      <Card {...cardData} />,
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
