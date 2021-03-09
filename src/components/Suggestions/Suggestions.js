import React from 'react';
import { useSelector } from 'react-redux';
import {
    getSuggestions
} from '../../app/reducer';
import { List, Typography, Divider } from 'antd';

export function Suggestions({ handleClick }) {

    const suggestions = useSelector(getSuggestions);

    const { movies, actors, shows } = suggestions;
    const urlMap = {
        "movie": "movie",
        "person": "person",
        "tv": "tv"
    }

    const renderList = (title, arr) => {
        const newarr = arr.slice(0, 3)
        if (newarr.length)
            return <>
                <Divider orientation="left">{title}</Divider>
                <List
                    bordered
                    dataSource={newarr}
                    renderItem={item => (
                        <List.Item onClick={() => handleClick(`/${urlMap[item.media_type]}/${item.id}`)}>
                            <Typography.Text mark></Typography.Text>{item.title || item.name}
                        </List.Item>
                    )}
                />
            </>
    }

    return (
        <div>
            <>
                {renderList("Movies", movies)}
                {renderList("Actors", actors)}
                {renderList("Shows", shows)}
            </>
        </div>
    );
}
