import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

import { Link } from 'react-router-dom'

const MovieCard = ({posterPath,movieId}) => {
  if(!posterPath) return null;
  return (
    <div className="w-36 md:w-48 pr-4">
        
        <Link to={"/watch?"+movieId}><img src={IMG_CDN_URL + posterPath} alt="movie card" /> </Link> 
        {/* <Link to={"/watch?v="+video.id}><VideoCard key={video.id} info={video} /> </Link>  */}
        {/* <VideoCard key={video.id} info={video} /> */}
    </div>
  )
}

export default MovieCard