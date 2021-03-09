import React from 'react';
import {
    Link
} from "react-router-dom";
import constants from '../../helpers/constants';
import "./Card.scss"

export function Card({ type, data }) {

    const renderItem = (type, id, title, image) => {
        return <Link to={`/${type}/${id}`}>
            <div className="card">
                <div className="card-cover" style={image ? { "backgroundImage": `url('${constants.IMAGE_BASE_URL}${image}')` }: {}}>
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
            return renderItem("person", id, name, profile_path)
        }
        else if(type === "tv"){
            return renderItem("tv", id, name, poster_path)
        }
        return renderItem("movie", id, title, poster_path)
    }
    return (
        <div className="search-item">
            {renderSearchItem()}
        </div>
    );
}
