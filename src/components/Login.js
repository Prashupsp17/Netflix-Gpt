import React from 'react'
import Header from './Header'
import { useState ,useRef} from 'react';
import {checkValidateData} from "../utils/validate";
import { useNavigate } from 'react-router-dom'
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth} from '../utils/firebase';
import { useDispatch } from 'react-redux';
import {addUser} from  "../utils/userSlice";

const Login = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage,setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }

  const handleClickButton = () => {
    console.log("HI");
    const message = checkValidateData(email.current.value,password.current.value);
    setErrorMessage(message);

    if(message) return ;

    if(!isSignInForm){
      createUserWithEmailAndPassword(
        auth,
         email.current.value,
         password.current.value)
        .then((userCredential) => {
          const {uid,email, displayName,photoURL} = auth.currentUser;
          dispatch
          (addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL}));
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName:name.current.value,
             photoURL: "https://www.livemint.com/lm-img/img/2023/09/21/600x338/Indian_Jersey_1695302184673_1695302194422.jpg"
          }).then(() => {
            navigate("/browse");
          }).catch((error) => {
            
            setErrorMessage(message);
          });
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    }else{
      signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate("/browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });

    }
  }
  return (
    <div>
        <Header />
        <div className='absolute'>
        <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_medium.jpg" alt="netflix-background" />
        </div>
        <form
         onSubmit={(e)=> e.preventDefault()} 
        className='w-3/12 absolute p-12 bg-black my-28 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
          <h1 className="text-3xl font-bold py-4">{isSignInForm ? "Sign In"  : "Sign Up"}</h1>
          {!isSignInForm  && <input type="text" placeholder='Full Name' className="p-4 my-4 w-full bg-gray-700" />}
          <input type="text" ref={email}  placeholder='Email Address' className="p-4 my-4 w-full bg-gray-700" />
       
          <input type="password" ref={password} placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
          <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
          <button className='p-4 my-5 bg-red-700 w-full rounded-lg' onClick={handleClickButton}>{isSignInForm ? "Sign In"  : "Sign Up"}</button>
          <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now"  : "Already Registered Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login