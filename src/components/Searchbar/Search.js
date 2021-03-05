import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    search
} from '../../app/reducer';
import { Button } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';

import './Search.scss';

export function Search() {

    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("")


    const handleSearch = (keyword) => {
        setSearchTerm(keyword);
        if(keyword.length > 5){
            console.log("dispatching...")
            dispatch(search(keyword))
        }
    }


    return (
        <div className="searchbar">
            <div className="textbox-wrapper">
                <input
                    className="textbox"
                    aria-label="Search here"
                    placeholder="Tiles, people, genres"
                    value={searchTerm}
                    onChange={e => handleSearch(e.target.value)}
                />
            </div>
            <Button type="primary" shape="circle" className="search-button" icon={<SearchOutlined />} />
        </div>
    );
}
