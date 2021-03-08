import React, { useState, useRef, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';
import {
    search
} from '../../app/reducer';
import constants from "../../helpers/constants";
import { Suggestions } from "../Suggestions/Suggestions"

import './Search.scss';

export function Search() {
    const appHistory = useHistory();
    const location = useLocation();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const isHomepage = location.pathname === "/";
    const [searchTerm, setSearchTerm] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)

    const handleSearch = (keyword) => {
        setSearchTerm(keyword);
        console.log(keyword.length)
        if (keyword.length > constants.MIN_SEARCH_LENGTH) {
            dispatch(search(keyword, true));
            setShowSuggestions(true)
        }
        else {
            setShowSuggestions(false)
        }
    }

    const initiateSearch = (e) => {
        if (searchTerm) {
            appHistory.push(`/search?query=${searchTerm}`);
        }
        if (!searchTerm) {
            appHistory.push(`/`);
        }
    }

    const submitSearch = (e) => {
        e.preventDefault();
        initiateSearch()
    }

    const handleBlur = (e) => {
        // setShowSuggestions(false)
    }

    useEffect(() => {
        const keyword = location.search.split("&")[0].split("=")[1]
        if (keyword) {
            setSearchTerm(keyword)
        }
        if (isHomepage) {
            inputRef.current.focus();
        }
    }, [])


    return (
        <div className="searchbar">
            <form onSubmit={(e) => submitSearch(e)} >
                <div className="textbox-wrapper">
                    <input
                        ref={inputRef}
                        className="textbox"
                        aria-label="Search here"
                        placeholder="Tiles, people, genres"
                        value={searchTerm}
                        onChange={e => handleSearch(e.target.value)}
                        onBlur={(e) => handleBlur(e)}
                    />
                </div>
                <Button onClick={(e) => submitSearch(e)} type="primary" shape="circle" className="search-button" icon={<SearchOutlined />} />
                {showSuggestions && <Suggestions />}
            </form>
        </div>
    );
}
