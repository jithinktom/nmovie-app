import React from 'react';
import { Search } from "../../components/Searchbar/Search"
import './Navbar.scss';

export function Navbar() {

    return (
        <div className="navbar">
            <div className="logo">
                <img alt="Netflix" src="https://www.seekpng.com/png/full/15-158699_netflix-logo-png-download-logo-netflix-png.png" />
            </div>
            <Search />
        </div>
    );
}
