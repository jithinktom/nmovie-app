import React from 'react';
import sampleData from "./data.json"
import { Descriptions, Typography } from 'antd';
import "./MovieDetail.scss";

const { Title } = Typography;

export function Movie() {
    const movieDetail = sampleData;
    return (
        <div className="movie-detail">
            <Title level={4}>{movieDetail.title}</Title>
            <div className="movie-poster">
                <img src={`http://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} />
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
        </div>
    );
}
