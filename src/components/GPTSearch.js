import React from 'react'
import { BG_URL } from '../utils/constants'
import GptMovieSuggestion from './GptMovieSuggestion'
import GptSearchBar from './GptSearchBar'

const GPTSearch = () => {
  return (
    <div>
       <div className='absolute -z-10'>
        <img src={BG_URL} alt="netflix-background" />
        </div>
      <GptSearchBar />
      <GptMovieSuggestion />
    </div>
  )
}

export default GPTSearch