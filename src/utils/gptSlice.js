import {createSlice} from "@reduxjs/toolkit";

const gptSlice = createSlice({
name:'gpt',
initialState:{
    showGptSearch :false,
    movieResults :null,
    movienames:null
},

reducers:{
    toggleGptSearchView : (state) => {
state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult :(state,action) => {
        const {movienames,movieResults} = action.payload;
        state.movienames = movienames; 
        state.movieResults = movieResults;
    }
}
})
export const {toggleGptSearchView,addGptMovieResult} = gptSlice.actions;
export default gptSlice.reducer;