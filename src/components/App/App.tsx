import React, { useEffect, useState } from 'react';

import './App.css';
import Router from '../Router';
import initApp from '../../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /**
   * Init firebase.
   */
  initApp();
  /**
   * Review if the user is logged.
   */
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <Router isLoggedIn={isLoggedIn}/>
  );
}

export default App;
