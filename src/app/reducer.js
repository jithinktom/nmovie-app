import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        selectedMovie: {},
        selectedActor: {}
    },
    reducers: {
        setMovieList: (state, action) => {
            console.log({payload: action.payload})
            state.list = action.payload;
        },
        setSelectedMovie: (state, action) => {
            state.selectedMovie = action.payload;;
        },
        setSelectedActor: (state, action) => {
            state.selectedActor = action.payload;
        },
    },
});

export const { setMovieList, setSelectedMovie, setSelectedActor } = moviesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const search = keyword => async dispatch => {
    const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/multi?api_key=df458795d04dc5b54c9af749ca8fd6bb&language=en-US&query=${keyword}&page=1&include_adult=false`
    })
    const {results} = response.data;
    dispatch(setMovieList(results));
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const getMoviesList = state => state.movies.list;
export const getSelectedMovie = state => state.movies.selectedMovie;
export const getSelectedActor = state => state.movies.selectedActor;

export default moviesSlice.reducer;
