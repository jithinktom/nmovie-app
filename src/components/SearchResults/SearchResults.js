import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getMoviesList,
} from '../../app/reducer';

import { SearchItem } from "../SearchItem/SearchItem"
import { Typography } from 'antd';
import "./SearchResults.scss"

const { Title } = Typography;

export function SearchResults() {

    const moviesList = useSelector(getMoviesList);
    console.log({moviesList})

    return (
        <div className="search-results-wrapper">
            <Title level={4}>Search Results</Title>
            {/* <Title level={5}>Movies</Title> */}
            <div className="results-row">
                {moviesList.map((movie=> {
                    return <SearchItem type="movie" data={movie} />
                }))}
            </div>
        </div>
    );
}
