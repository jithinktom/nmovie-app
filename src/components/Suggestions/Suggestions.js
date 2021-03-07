import React from 'react';
import { useSelector } from 'react-redux';
import {
    getSuggestions
} from '../../app/reducer';
import {
    Link
} from "react-router-dom";
import { List, Typography, Divider } from 'antd';
import "./Suggestions.scss";

export function Suggestions() {

    const suggestions = useSelector(getSuggestions);

    const { movies, actors, shows } = suggestions;
    const urlMap = {
        "movie": "movie",
        "person": "cast",
        "tv": "show"
    }

    const renderList = (title, arr) => {
        const newarr = arr.slice(0,3)
        if (newarr.length)
            return <>
                <Divider orientation="left">{title}</Divider>
                <List
                    bordered
                    dataSource={newarr}
                    renderItem={item => (
                        <Link to={`/${urlMap[item.media_type]}/${item.id}`}>
                            <List.Item>
                                <Typography.Text mark></Typography.Text>{item.title || item.name}
                            </List.Item>
                        </Link>
                    )}
                />
            </>
    }

    return (
        <div className="suggestions-wrapper">
            <>
                {renderList("Movies", movies)}
                {renderList("Actors", actors)}
                {renderList("Shows", shows)}
            </>
        </div>
    );
}
