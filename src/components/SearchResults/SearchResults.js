import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    getMoviesList,
    getActorsList,
    getShowsList,
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
            dispatch(search(keyword))
        }
    }, [location, dispatch])

    const renderMoviesList = () => {
        if (moviesList && moviesList.length) {
            return <Fragment>
                <Title level={5}>Movies</Title>
                <div className="results-row">
                    {moviesList.map((result => {
                        return <SearchItem key={result.id} type={result.media_type} data={result} />
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
                        return <SearchItem key={result.id} type={result.media_type} data={result} />
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
                        return <SearchItem key={result.id} type={result.media_type} data={result} />
                    }))}
                </div>
            </Fragment>
        }
        return ""
    }

    return (
        <div className="search-results-wrapper">
            <Title level={4}>{isSearch ? "Search Results" : "Recommended Movies"}</Title>
            {renderMoviesList()}
            {renderActorsList()}
            {renderShowsList()}
        </div>
    );
}
