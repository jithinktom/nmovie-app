import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    getMoviesList,
    getActorsList,
    getShowsList,
    searchRecommendations,
    multiSearch
} from '../../app/reducer';

import { SearchItem } from "../SearchItem/SearchItem"
import { Typography } from 'antd';
import "./SearchResults.scss"

const { Title } = Typography;

export function SearchResults() {

    const dispatch = useDispatch();

    const moviesList = useSelector(getMoviesList);
    const actorsList = useSelector(getActorsList);
    const showsList = useSelector(getShowsList);
    const location = useLocation();
    const [isSearch, setIsSearch] = useState(location.pathname !== "/")
    useEffect(() => {
        const isSearchPage = location.pathname !== "/"
        setIsSearch(isSearchPage);
        if (!isSearchPage) {
            dispatch(searchRecommendations())
        }
        else {
            const keyword = location.search.split("&")[0].split("=")[1]
            const searchOption = location.search.split("options=")[1]
            dispatch(multiSearch(keyword, searchOption, false))
        }
    }, [location, dispatch])

    const renderMoviesList = () => {
        if (moviesList && moviesList.length) {
            return <Fragment>
                <Title level={5}>Movies</Title>
                <div className="results-row">
                    {moviesList.map((result => {
                        return <SearchItem key={result.id} type="movie" data={result} />
                    }))}
                </div>
            </Fragment>
        }
        return "";
    }

    const renderActorsList = () => {
        if (actorsList && actorsList.length) {
            return <Fragment>
                <Title level={5}>Actors</Title>
                <div className="results-row">
                    {actorsList.map((result => {
                        return <SearchItem key={result.id} type="person" data={result} />
                    }))}
                </div>
            </Fragment>
        }
        return ""
    }

    const renderShowsList = () => {
        if (showsList && showsList.length) {
            return <Fragment>
                <Title level={5}>Shows</Title>
                <div className="results-row">
                    {showsList.map((result => {
                        return <SearchItem key={result.id} type="tv" data={result} />
                    }))}
                </div>
            </Fragment>
        }
        return ""
    }

    const renderNoResults = () => {
        if(isSearch && !((showsList && showsList.length > 0) || (moviesList && moviesList.length > 0) || (actorsList && actorsList.length > 0))){
            return <Title level={4}>Oops! Try searching for other keywords.</Title>
        }
    }

    return (
        <div className="search-results-wrapper">
            <Title level={4}>{isSearch ? "Search Results" : "Recommended Movies"}</Title>
            {renderMoviesList()}
            {renderActorsList()}
            {renderShowsList()}
            {renderNoResults()}
        </div>
    );
}
