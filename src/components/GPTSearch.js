import React from 'react'
import { BG_URL } from '../utils/constants'
import GptMovieSuggestion from './GptMovieSuggestion'
import GptSearchBar from './GptSearchBar'

const GPTSearch = () => {
  return (
    <>
    <div className='fixed -z-10'>
        <img className="h-screen w-screen object-cover overflow-hidden" src={BG_URL} alt="netflix-background" />
        </div>
    <div className="">
       
      <GptSearchBar />
    <GptMovieSuggestion /> 
  
    </div>
    </>
  )
}

export default GPTSearch