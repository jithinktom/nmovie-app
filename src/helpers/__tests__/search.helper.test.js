import { filterSearchResults, filterResourceDetails } from "../search.helper";
import {
  searchResults,
  searchFiltered,
  resouceDetails,
  resoucrDetailsFiltered,
} from "./mockData";

test("should filter search result", () => {
  expect(filterSearchResults(searchResults, undefined)).toMatchObject(
    searchFiltered
  );
});

test("should filter resource details", () => {
  expect(filterResourceDetails("credits", resouceDetails)).toMatchObject(
    resoucrDetailsFiltered
  );
});
