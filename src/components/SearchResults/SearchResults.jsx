import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Typography } from "antd";
import {
  getSearchResults,
  searchRecommendations,
  multiSearch,
} from "../../app/reducer";

import { Card } from "../Card/Card";
import "./SearchResults.scss";

const { Title } = Typography;

export function SearchResults() {
  const dispatch = useDispatch();

  const { movies, shows, actors } = useSelector(getSearchResults);

  const location = useLocation();
  const [isSearch, setIsSearch] = useState(location.pathname !== "/");

  useEffect(() => {
    const isSearchPage = location.pathname !== "/";
    setIsSearch(isSearchPage);
    if (!isSearchPage) {
      dispatch(searchRecommendations());
    } else {
      const keyword = location.search.split("&")[0].split("=")[1];
      const searchOption = location.search.split("options=")[1];
      dispatch(multiSearch(keyword, searchOption, false));
    }
  }, [location, dispatch]);

  const renderList = (title, type, arr) => {
    if (arr && arr.length) {
      return (
        <>
          <Title level={5}>{title}</Title>
          <div className="results-row">
            {arr.map((result) => (
              <Card key={result.id} type={type} data={result} />
            ))}
          </div>
        </>
      );
    }
    return "";
  };

  const renderNoResults = () => {
    if (
      isSearch &&
      !(
        (shows && shows.length > 0) ||
        (movies && movies.length > 0) ||
        (actors && actors.length > 0)
      )
    ) {
      return <Title level={4}>Oops! Try searching for other keywords.</Title>;
    }
    return <></>;
  };

  return (
    <div className="search-results-wrapper">
      <Title level={4}>
        {isSearch ? "Search Results" : "Recommended Movies"}
      </Title>
      {renderList("Movies", "movie", movies)}
      {renderList("Actors", "person", actors)}
      {renderList("Shows", "tv", shows)}
      {renderNoResults()}
    </div>
  );
}
