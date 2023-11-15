import React, { useState } from 'react';
import Header from './Header';
import { useRef } from 'react';
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleClickButton = () => {
    const message = checkValidateData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    setLoading(true); // Set loading to true while waiting for login credentials

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL: 'https://i.pinimg.com/474x/5b/50/e7/5b50e75d07c726d36f397f6359098f58.jpg',
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
              setLoading(false); // Set loading to false after successful login
            })
            .catch((error) => {
              setErrorMessage(message);
              setLoading(false); // Set loading to false on error
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
          setLoading(false); // Set loading to false on error
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // const user = userCredential.user;
          setLoading(false); // Set loading to false after successful login
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          setErrorMessage('Invalid Login Credentials');
          setLoading(false); // Set loading to false on error
        });
    }
  };

  return (
    <div>
      <Header />
      <div className='overflow-hidden absolute'>
        <img className='h-screen w-screen object-cover overflow-hidden md:h-screen w-screen object-cover overflow-hidden' src={BG_URL} alt='netflix-background' />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='w-full md:w-3/12 absolute p-6 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 className='text-3xl font-bold py-4'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && <input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />}
        <input type='text' ref={email} placeholder='Email Address' className='p-4 my-2 w-full bg-gray-700' />
        <input type='password' ref={password} placeholder='Password' className='p-4 my-2 w-full bg-gray-700' />

        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='p-4 my-2 bg-red-700 w-full rounded-lg' onClick={handleClickButton}>
          {loading ? 'Loading...' : isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p className='py-6 cursor-pointer' onClick={toggleSignInForm}>
          {isSignInForm ? 'New to Netflix? Sign Up Now' : 'Already Registered Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
