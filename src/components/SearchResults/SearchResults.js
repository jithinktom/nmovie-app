import React, { useState } from 'react';
import { SearchItem } from "../SearchItem/SearchItem"
import { Typography } from 'antd';
import "./SearchResults.scss"

const { Title } = Typography;

export function SearchResults() {

    return (
        <div className="search-results-wrapper">
            <Title level={4}>Search Results</Title>
            <Title level={5}>Movies</Title>
            <div className="results-row">
                <SearchItem type="movie" />
                <SearchItem type="movie" />
                <SearchItem type="movie" />
                <SearchItem type="movie" />
            </div>
            <Title level={5}>Actors</Title>
            <div className="results-row">
                <SearchItem type="actor" />
                <SearchItem type="actor" />
                <SearchItem type="actor" />
                <SearchItem type="actor" />
            </div>
        </div>
    );
}
