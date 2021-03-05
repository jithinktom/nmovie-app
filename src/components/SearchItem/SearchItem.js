import React, { useState } from 'react';
import { Card } from 'antd';
import {
    Link
} from "react-router-dom";
import "./SearchItem.scss"

const { Meta } = Card;



export function SearchItem({type}) {

    return (
        <div className="search-item">
            <Link to={`/${type}/1`}>
                <div class="card card-hoverable">
                    <div class="card-cover" style={{ "backgroundImage": "url('http://image.tmdb.org/t/p/w500/8kNruSfhk5IoE4eZOc4UpvDn6tq.jpg')" }}>

                    </div>
                    <div class="card-body">
                        <div class="card-detail">
                            <div class="card-title">Europe Street beat</div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
