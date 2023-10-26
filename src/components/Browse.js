import React from 'react'
import useNowPlayingMovies from '../hooks/useNowPlaying'
import usePopularMovies from '../hooks/usePopularMovies';
import GPTSearch from './GPTSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import {useSelector} from 'react-redux';

const Browse = () => {
 const showGptSearch = useSelector(store=> store.gpt.showGptSearch); 
 useNowPlayingMovies();
 usePopularMovies();

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