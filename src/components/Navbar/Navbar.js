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
                <img alt="K_logo" src="k-512.png" />
            </div>
            <Search />
        </div>
    );
}
