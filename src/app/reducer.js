import { createSlice } from '@reduxjs/toolkit';
import {filterSearchResults, filterMovieDetail, filterActorDetail} from "../helpers/search.helper";
import axios from 'axios';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        actorsList: [],
        moviesList: [],
        selectedMovie: {},
        selectedActor: {}
    },
    reducers: {
        setResults: (state, action) => {
            const {actors, movies, shows} = action.payload;
            state.actorsList = actors;
            state.moviesList = movies;
            state.showsList = shows;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        setSelectedActor: (state, action) => {
            state.selectedActor = action.payload;
        },
    },
});

export const { setResults, setSelectedMovie, setSelectedActor } = moviesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const search = keyword => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/multi?api_key=df458795d04dc5b54c9af749ca8fd6bb&language=en-US&query=${keyword}&page=1&include_adult=true`
    })
    const { results } = response.data;
    const filteredData = filterSearchResults(results)
    dispatch(setResults(filteredData));
};

export const searchRecommendations = () => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/discover/movie?api_key=df458795d04dc5b54c9af749ca8fd6bb&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    })
    const { results } = response.data;
    const filteredData = filterSearchResults(results)
    dispatch(setResults(filteredData));
};

export const searchMovieDetail = (id) => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=df458795d04dc5b54c9af749ca8fd6bb&language=en-US&append_to_response=credits`
    })
    const movieDetails = response.data;
    const filteredData = filterMovieDetail(movieDetails)
    dispatch(setSelectedMovie(filteredData));
};

export const searchActorDetail = (id) => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/person/${id}?api_key=df458795d04dc5b54c9af749ca8fd6bb&language=en-US&append_to_response=movie_credits`
    })
    const actorDetails = response.data;
    const filteredData = filterActorDetail(actorDetails)
    dispatch(setSelectedActor(filteredData));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getMoviesList = state => state.movies.moviesList;
export const getActorsList = state => state.movies.actorsList;
export const getShowsList = state => state.movies.showsList;
export const getSelectedMovie = state => state.movies.selectedMovie;
export const getSelectedActor = state => state.movies.selectedActor;

export default moviesSlice.reducer;
