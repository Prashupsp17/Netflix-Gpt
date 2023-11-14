import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useSearchParams } from 'react-router-dom';
import { API_OPTIONS } from '../utils/constants';
import { LOGO } from '../utils/constants';

const WatchPage = () => {

  const [trailers, setTrailer] = useState();
  const [searchParams] = useSearchParams();

  

  const getTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${searchParams}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json);

    const filterData = json.results.filter((video) => video.type === 'Trailer');
    // console.log(filterData);
    const trailerVideo = filterData.length ? filterData[0] : json.results[0];
    // console.log(trailerVideo);
    setTrailer(trailerVideo);
  };

  useEffect(() => {
    getTrailer();
  }, []);

  return (
    <>
      <div className='w-screen'>
      <div className="overflow-hidden absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
       <img className='overflow-hidden w-44 mx-auto md:mx-0' src={LOGO} alt="netflix-logo"/>
       </div>
       
        {trailers ? (
          <iframe
          className='w-screen h-screen aspect-video'
            // src={`https://www.youtube.com/embed/${trailers.key}?&autoplay=1&mute=1"`}
            src={"https://www.youtube.com/embed/"+trailers.key + "?&autoplay=1&mute=1"}
            title='YouTube video player'
            allow="accelerometer;
            autoplay; clipboard-write; 
            encrypted-media; gyroscope; 
            picture-in-picture; web-share" 
          ></iframe>
        )
      :
      <div className="pt-[30%] bg-black md:pt-[20%] h-screen flex justify-center ">
        <h1 className="text-white text-3xl" >Video Not Available</h1>
      </div>
      }
      </div>
    </>
  );
};

export default WatchPage;
