import React from 'react';
import {
    Link
} from "react-router-dom";
import "./SearchItem.scss"

export function SearchItem({ type, data }) {

    const renderItem = (type, id, title, image) => {
        return <Link to={`/${type}/${id}`}>
            <div className="card card-hoverable">
                <div className="card-cover" style={{ "backgroundImage": `url('http://image.tmdb.org/t/p/w500${image}')` }}>
                </div>
                <div className="card-body">
                    <div className="card-detail">
                        <div className="card-title">{title}</div>
                    </div>
                </div>
            </div>
        </Link>
    }

    const renderSearchItem = () => {
        const { poster_path, title, name, profile_path, id } = data;
        if (type === "person") {
            return renderItem("actor", id, name, profile_path)
        }
        else if(type === "tv"){
            return renderItem("show", id, name, poster_path)
        }
        return renderItem("movie", id, title, poster_path)
    }
    return (
        <div className="search-item">
            {renderSearchItem()}
        </div>
    );
}
