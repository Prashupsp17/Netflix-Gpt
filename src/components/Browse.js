import React from 'react'
import useNowPlayingMovies from '../hooks/useNowPlaying'
import usePopularMovies from '../hooks/usePopularMovies';
import GPTSearch from './GPTSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import {useSelector} from 'react-redux';
import useTopRatedMovies from '../hooks/useTopRatedMovies';

const Browse = () => {
 const showGptSearch = useSelector(store=> store.gpt.showGptSearch); 
 useNowPlayingMovies();
 usePopularMovies();
 useTopRatedMovies();
  return (
    <>
    <Header />
    {
      showGptSearch ? (
        <GPTSearch />
      ):(
        <>
          
    <MainContainer />
    <SecondaryContainer />
        </>
      )
    }

     </>
  )
}

export default Browse