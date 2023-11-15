import React, { useState } from 'react'
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import openai from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
const dispatch = useDispatch();
    const langKey =  useSelector(store =>store.config.lang);
    const searchText = useRef(null);
    const [loading,setLoading] = useState(false);

    const searchMovieTMDB = async (movie) => {
      const data = await fetch(`https://api.themoviedb.org/3/search/movie?query="
      ${movie}
     &include_adult=false&language=en-US&page=1`, API_OPTIONS);
       const json = await data.json();
       setLoading(false);

       return json.results;
    }
    const handleGptSearchClick = async () => {
      setLoading(true);
// Make an API call to get the movie results

const gptQuery = 
"Act as a Movie Recommendation system and suggest some movies fro the query:" 
+ searchText.current.value +
".only give me names of 5 movie, comma separated like the example  result given ahead. Example Result: Gadar, Sholay, DON, Golmaal,Koi Mil Gaya";

  const gptResults = await openai.chat.completions.create({
    messages: [{ role: 'user', content:gptQuery}],
    model: 'gpt-3.5-turbo',
  });

  if(!gptResults.choices){
    console.error("error");
  }

  // console.log(gptResults.choices?.[0]?.message?.content);
  const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

  // Andaz Apna Apna, Chupke Chupke, Padosan, Angoor, Hera Pheri

  // For each movie i will search TMDB API

  const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));

  const tmdbResults = await Promise.all(promiseArray);

 dispatch(addGptMovieResult({movienames : gptMovies, movieResults : tmdbResults}));
// console.log(tmdbResults);


    }

  return (
    <>
      <div className="pt-[35%] pt-[30%] md:pt-[10%] flex justify-center">
    <form className='w-full md:w-1/2 bg-black grid grid-cols-12 ' onSubmit={(e) => e.preventDefault()}>
        <input 
        ref={searchText} 
        className='m-4 p-4 col-span-9'
        type='text'
        placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className='py-2 px-2 m-4 col-span-3 bg-red-800 text-white rounded-lg ' onClick={handleGptSearchClick}>
            {lang[langKey].search}
        </button>
    </form>
    </div>
    {loading  ? <h1 className="text-3xl text-white flex justify-center">Loading....</h1> :""}
     </>

  )
}

export default GptSearchBar