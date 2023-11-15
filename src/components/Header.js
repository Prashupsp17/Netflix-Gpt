import React, { useEffect } from 'react'
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth} from '../utils/firebase';
import { useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from  "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { addGptMovieResult } from '../utils/gptSlice';


const Header = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
const user  = useSelector(store => store.user);

const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
   console.log("error occured");
    });
  };

  useEffect(() => {
  const unsubscribe =  onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email, displayName,photoURL} = user;
          dispatch(addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL}));
            navigate("/browse");
        } else {
          dispatch(removeUser());
          navigate("/");
        }
      });
      
      // unsubscribe when component unmounts
      return () => {
        unsubscribe();
      } 
}, [dispatch, navigate]); 

const handleGptSearchClick = () => {
dispatch(toggleGptSearchView());
dispatch(addGptMovieResult([]));
}
const handleLanguageChange = (e) => {
dispatch(changeLanguage(e.target.value));
}

  return (
    <div className="overflow-hidden absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
       <img className='overflow-hidden w-44 mx-auto md:mx-0' src={LOGO} alt="netflix-logo"/>
       {
         user && (
          <div className="overflow-hidden flex p-2 mt-[-20px] md:mt-0 justify-between">
          {
            showGptSearch && 
            (<select className="overflow-hidden  p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>)
          } 
          
            <button className='py-2 px-4 my-2 mx-4 text-white bg-purple-800 rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" :"GPT Search"}</button>
          <img
          className='hidden md:block w-10 h-10 '
           src={user.photoURL}
           alt="netflix-user-icon"/>
           <button onClick={handleSignOut} className="font-bold text-white">Sign Out</button>
        </div>
         )
       }
     
    </div>
  )
}

export default Header