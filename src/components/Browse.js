import React from 'react'
import useNowPlayingMovies from '../hooks/useNowPlaying'
import usePopularMovies from '../hooks/usePopularMovies';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
 useNowPlayingMovies();
 usePopularMovies();

  return (
    <>
    <Header />
    <MainContainer />
    <SecondaryContainer />
     </>
  )
}

export default Browse