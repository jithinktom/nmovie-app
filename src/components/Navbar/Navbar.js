import React from 'react';
import { Search } from "../Searchbar/Search"
import { useHistory } from "react-router-dom";
import './Navbar.scss';

export function Navbar() {

    const history = useHistory();

    return (
        <div className="navbar">
            <div className="logo" onClick={() => {
                history.push(`/`);
            }}>
                <img alt="Netflix" src="https://www.seekpng.com/png/full/15-158699_netflix-logo-png-download-logo-netflix-png.png" />
            </div>
            <Search />
        </div>
    );
}
