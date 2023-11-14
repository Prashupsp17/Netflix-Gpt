
import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch,useSelector } from 'react-redux';
import {  addTopRatedMovies } from '../utils/movieSlice';


const useTopRatedMovies = () => {
    
//Fetch Data from TMDB API and Update the store 
const dispatch = useDispatch();

const TopRatedMovies = useSelector(store=> store.movies.popularMovies);

const getTopRatedMovies = async () => {
//   const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
//   const json = await data.json();
const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS )
const json = await data.json();
  dispatch(addTopRatedMovies(json.results));
}

useEffect(() => {
    !TopRatedMovies && getTopRatedMovies();
},[]);


}

export default useTopRatedMovies