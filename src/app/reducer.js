import { createSlice } from '@reduxjs/toolkit';
import { filterSearchResults, filterMovieDetail, filterActorDetail } from "../helpers/search.helper";
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        actorsList: [],
        moviesList: [],
        selectedMovie: {},
        selectedActor: {},
        selectedShow: {},
        suggestions: {
            actors: [],
            movies: [],
            shows: []
        }
    },
    reducers: {
        setResults: (state, action) => {
            const { actors, movies, shows } = action.payload;
            state.actorsList = actors;
            state.moviesList = movies;
            state.showsList = shows;
        },
        setSuggestions: (state, action) => {
            state.suggestions = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
        setSelectedActor: (state, action) => {
            state.selectedActor = action.payload;
        },
        setSelectedShow: (state, action) => {
            state.selectedShow = action.payload;
        },
    },
});

export const { setResults, setSelectedMovie, setSelectedActor, setSelectedShow, setSuggestions } = moviesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const multiSearch = (keyword, searchOption, suggestionsSearch = false) => async dispatch => {
    let API_URL = `${BASE_URL}/search/${searchOption}?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`;
    const response = await axios({
        method: 'get',
        url: API_URL
    })
    const { results } = response.data;
    const filteredData = filterSearchResults(results, searchOption)
    if (suggestionsSearch) {
        dispatch(setSuggestions(filteredData));
    }
    else {
        dispatch(setResults(filteredData));
    }
};

export const searchRecommendations = () => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    })
    const { results } = response.data;
    const filteredData = filterSearchResults(results)
    dispatch(setResults(filteredData));
};

export const searchMovieDetail = (id) => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    })
    const movieDetails = response.data;
    const filteredData = filterMovieDetail(movieDetails)
    dispatch(setSelectedMovie(filteredData));
};

export const searchActorDetail = (id) => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=movie_credits`
    })
    const actorDetails = response.data;
    const filteredData = filterActorDetail(actorDetails)
    dispatch(setSelectedActor(filteredData));
};

export const searchShowDetail = (id) => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`
    })
    const showDetails = response.data;
    const filteredData = filterMovieDetail(showDetails)
    dispatch(setSelectedShow(filteredData));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getMoviesList = state => state.movies.moviesList;
export const getActorsList = state => state.movies.actorsList;
export const getShowsList = state => state.movies.showsList;
export const getSuggestions = state => state.movies.suggestions;
export const getSelectedMovie = state => state.movies.selectedMovie;
export const getSelectedActor = state => state.movies.selectedActor;
export const getSelectedShow = state => state.movies.selectedShow;

export default moviesSlice.reducer;
