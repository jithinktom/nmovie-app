import React, { useState } from 'react';
import { Card } from 'antd';
import {
    Link
} from "react-router-dom";
import "./SearchItem.scss"

const { Meta } = Card;



export function SearchItem({ type, data }) {
    const { poster_path, title } = data;
    return (
        <div className="search-item">
            <Link to={`/${type}/1`}>
                <div className="card card-hoverable">
                    <div className="card-cover" style={{ "backgroundImage": `url('http://image.tmdb.org/t/p/w500${poster_path}')` }}>

                    </div>
                    <div className="card-body">
                        <div className="card-detail">
                            <div className="card-title">{title}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
