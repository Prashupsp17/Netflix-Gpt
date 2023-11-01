import React from 'react'
import {useSelector} from 'react-redux';
import MovieList from "../components/MovieList";

const GptMovieSuggestion = () => {
  const gpt = useSelector(store => store.gpt );
  const {movieResults, movienames} = gpt;
console.log(movienames);
  if(!movienames){
return null;
  }
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movienames.map((movieName,index) =>
           <MovieList 
             key={movieName}
             title={movieName}
             movies={movieResults[index]}

           />)}
        </div>
        </div>
  )
}

export default GptMovieSuggestion