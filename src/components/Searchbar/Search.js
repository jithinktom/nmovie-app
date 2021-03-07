import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import {
    SearchOutlined
} from '@ant-design/icons';

import './Search.scss';

export function Search() {
    const appHistory = useHistory();
    const [searchTerm, setSearchTerm] = useState("")


    const handleSearch = (keyword) => {
        setSearchTerm(keyword);
        if(keyword.length > 3){
            appHistory.push(`/search?query=${keyword}`);
        }
        if(!keyword){
            appHistory.push(`/`);
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
