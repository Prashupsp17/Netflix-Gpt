
import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch,useSelector } from 'react-redux';
import { addNowPlayingMovies, addPopularMovies } from '../utils/movieSlice';

const usePopularMovies = () => {
//Fetch Data from TMDB API and Update the store 
const dispatch = useDispatch();

const popularMovies = useSelector(store=> store.movies.popularMovies);

const getPopularMovies = async () => {
  const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
  const json = await data.json();
  dispatch(addPopularMovies(json.results));
}

useEffect(() => {
    !popularMovies && getPopularMovies();
},[]);
}

  export default usePopularMovies