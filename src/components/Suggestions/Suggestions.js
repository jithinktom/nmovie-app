import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { List, Typography, Divider } from 'antd';
import { getSuggestions } from '../../app/reducer';

export function Suggestions({ handleClick }) {
  const suggestions = useSelector(getSuggestions);

  const { movies, actors, shows } = suggestions;
  const urlMap = {
    movie: 'movie',
    person: 'person',
    tv: 'tv',
  };

  const renderList = (title, arr) => {
    const newarr = arr.slice(0, 3);
    if (newarr.length) {
      return (
        <>
          <Divider orientation="left">{title}</Divider>
          <List
            bordered
            dataSource={newarr}
            renderItem={(item) => (
              <List.Item
                onClick={() => handleClick(`/${urlMap[item.media_type]}/${item.id}`)}
              >
                <Typography.Text mark />
                {item.title || item.name}
              </List.Item>
            )}
          />
        </>
      );
    }
    return <></>;
  };

  return (
    <div>
      <>
        {renderList('Movies', movies)}
        {renderList('Actors', actors)}
        {renderList('Shows', shows)}
      </>
    </div>
  );
}

Suggestions.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
