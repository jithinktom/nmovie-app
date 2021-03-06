import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import {
    getMoviesList,
    searchRecommendations,
    search
} from '../../app/reducer';

import { SearchItem } from "../SearchItem/SearchItem"
import { Typography } from 'antd';
import "./SearchResults.scss"

const { Title } = Typography;

export function SearchResults() {

    const dispatch = useDispatch();

    const moviesList = useSelector(getMoviesList);
    const location = useLocation();
    console.log({location})
    const [isSearch, setIsSearch] = useState(location.pathname !== "/")
    useEffect(() => {
        const isSearchPage = location.pathname !== "/"
        setIsSearch(isSearchPage);
        if (!isSearchPage) {
            dispatch(searchRecommendations())
        }
        else {
            const keyword = location.search.split("&")[0].split("=")[1]
            dispatch(search(keyword))
        }
    }, [location])

    return (
        <div className="search-results-wrapper">
            <Title level={4}>{isSearch ? "Search Results" : "Recommended Movies"}</Title>
            {/* <Title level={5}>Movies</Title> */}
            <div className="results-row">
                {moviesList.map((movie => {
                    return <SearchItem key={movie.id} type="movie" data={movie} />
                }))}
            </div>
        </div>
    );
}
