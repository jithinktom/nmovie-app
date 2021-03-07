import React, { Fragment, useEffect } from 'react';
import { Descriptions, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SearchItem } from "../SearchItem/SearchItem"
import {
    getSelectedActor,
    searchActorDetail
} from '../../app/reducer';
import "../SearchItem/SearchItem.scss";

const { Title } = Typography;

export function Actor() {
    const dispatch = useDispatch();
    const params = useParams();
    const actorDetail = useSelector(getSelectedActor);
    useEffect(() => {
        const { id } = params;
        if (id) {
            dispatch(searchActorDetail(id))
        }
    }, [params, dispatch])
    return (
        <div className="movie-detail">
            {Object.keys(actorDetail).length > 0 && (
                <Fragment>
                    <Title level={4}>{actorDetail.name}</Title>
                    <div className="movie-poster">
                        <img alt={actorDetail.name} src={`http://image.tmdb.org/t/p/w500${actorDetail.profile_path}`} />
                    </div>
                    <Descriptions title="" bordered>
                        <Descriptions.Item label="Birthday">{actorDetail.birthday}</Descriptions.Item>
                        <Descriptions.Item label="Place Of Birth">{actorDetail.place_of_birth}</Descriptions.Item>
                        <Descriptions.Item label="Popularity" span={2}>
                            {actorDetail.popularity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Biography">{actorDetail.biography}</Descriptions.Item>
                    </Descriptions>
                    <div className="extra-details">
                        <Title level={4}>Movies</Title>
                        <div className="results-row">
                            {actorDetail.movie_credits.cast.map((cast => {
                                return <SearchItem key={cast.id} type="movie" data={cast} />
                            }))}
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    );
}
