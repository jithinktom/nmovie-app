import React, { Fragment, useEffect } from 'react';
import { Descriptions, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchItem } from "../SearchItem/SearchItem"
import {
    getSelectedShow,
    searchShowDetail
} from '../../app/reducer';
import "../MovieDetail/MovieDetail.scss";
import { renderImage } from '../../helpers/render.helper';

const { Title } = Typography;

export function Show() {
    const dispatch = useDispatch();
    const params = useParams();
    const showDetail = useSelector(getSelectedShow);
    console.log({showDetail})
    useEffect(() => {
        const { id } = params;
        if (id) {
            dispatch(searchShowDetail(id))
        }
    }, [params, dispatch])
    return (
        <div className="movie-detail">
            {Object.keys(showDetail).length > 0 && (
                <Fragment>
                    <Title level={4}>{showDetail.title}</Title>
                    <div className="movie-poster">
                        <img alt={showDetail.title} src={renderImage(showDetail.poster_path)} />
                    </div>
                    <Descriptions title="" bordered>
                        <Descriptions.Item label="Vote Average">{showDetail.vote_average}</Descriptions.Item>
                        <Descriptions.Item label="First Air Date">{showDetail.first_air_date}</Descriptions.Item>
                        <Descriptions.Item label="Origin Country">{showDetail.origin_country[0]}</Descriptions.Item>
                        <Descriptions.Item label="Genres">{showDetail.genres.map(genre => (genre.name)).toString()}</Descriptions.Item>
                        <Descriptions.Item label="Popularity" span={2}>
                            {showDetail.popularity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Production Companies" span={3}>
                            {showDetail.production_companies.map(p => (p.name)).toString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Production Countries">{showDetail.production_countries.map(p => (p.name)).toString()}</Descriptions.Item>
                        <Descriptions.Item label="Seasons">{showDetail.seasons.map(season => (season.name)).toString()}</Descriptions.Item>
                        <Descriptions.Item label="Spoken Languages">{showDetail.spoken_languages.map(p => (p.name)).toString()}</Descriptions.Item>
                        <Descriptions.Item label="Overview">{showDetail.overview}</Descriptions.Item>
                    </Descriptions>
                    <div className="extra-details">
                        <Title level={4}>Cast</Title>
                        <div className="results-row">
                            {showDetail.credits.cast.map((cast => {
                                return <SearchItem key={cast.id} type="person" data={cast} />
                            }))}
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
}
