import React, { Fragment, useEffect } from 'react';
import { Descriptions, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchItem } from "../SearchItem/SearchItem"
import {
    getSelectedMovie,
    searchMovieDetail
} from '../../app/reducer';
import "./MovieDetail.scss";

const { Title } = Typography;

export function Movie() {
    const dispatch = useDispatch();
    const params = useParams();
    const movieDetail = useSelector(getSelectedMovie);
    useEffect(() => {
        const { id } = params;
        if (id) {
            dispatch(searchMovieDetail(id))
        }
    }, [params, dispatch])
    return (
        <div className="movie-detail">
            {Object.keys(movieDetail).length > 0 && (
                <Fragment>
                    <Title level={4}>{movieDetail.title}</Title>
                    <div className="movie-poster">
                        <img alt={movieDetail.title} src={movieDetail.poster_path ? `http://image.tmdb.org/t/p/w500${movieDetail.poster_path}`: "https://www.wildhareboca.com/wp-content/uploads/sites/310/2018/03/image-not-available.jpg"} />
                    </div>
                    <Descriptions title="" bordered>
                        <Descriptions.Item label="Vote Average">{movieDetail.vote_average}</Descriptions.Item>
                        <Descriptions.Item label="Runtime">{movieDetail.runtime}</Descriptions.Item>
                        <Descriptions.Item label="Budget">$ {movieDetail.budget}</Descriptions.Item>
                        <Descriptions.Item label="Genres">{movieDetail.genres.map(genre => (genre.name)).toString()}</Descriptions.Item>
                        <Descriptions.Item label="Popularity" span={2}>
                            {movieDetail.popularity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Production Companies" span={3}>
                            {movieDetail.production_companies.map(p => (p.name)).toString()}
                        </Descriptions.Item>
                        <Descriptions.Item label="Production Countries">{movieDetail.production_countries.map(p => (p.name)).toString()}</Descriptions.Item>
                        <Descriptions.Item label="Release date">{movieDetail.release_date}</Descriptions.Item>
                        <Descriptions.Item label="Spoken Languages">{movieDetail.spoken_languages.map(p => (p.name)).toString()}</Descriptions.Item>
                        <Descriptions.Item label="Overview">{movieDetail.overview}</Descriptions.Item>
                    </Descriptions>
                    <div className="extra-details">
                        <Title level={4}>Cast</Title>
                        <div className="results-row">
                            {movieDetail.credits.cast.map((cast => {
                                return <SearchItem key={cast.id} type="person" data={cast} />
                            }))}
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
}
