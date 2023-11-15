import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/movieSlice';

const useNowPlayingMovies = () => {
//Fetch Data from TMDB API and Update the store 
const dispatch = useDispatch();

const nowPlayingMovies = useSelector(store=> store.movies.nowPlayingMovies);

const getNowPlayingMovies = async () => {
  const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?&page=1', API_OPTIONS);
  const json = await data.json();
  dispatch(addNowPlayingMovies(json.results));
}

useEffect(() => {
 !nowPlayingMovies && getNowPlayingMovies();
},[nowPlayingMovies]);
}

  export default useNowPlayingMovies