import React from 'react'
import useNowPlayingMovies from '../hooks/useNowPlaying'
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
 useNowPlayingMovies();

  return (
    <>
    <Header />
    <MainContainer />
    <SecondaryContainer />
     </>
  )
}

export default Browse