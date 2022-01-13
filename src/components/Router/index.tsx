import React from 'react';
import PropTypes from "prop-types";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';

const Router = ({ isLoggedIn }: {isLoggedIn: boolean}) => {

  return (
    <BrowserRouter>
      {
        isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
          </Routes>
        )
      }
    </BrowserRouter>
  );
};

Router.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
};

Router.defaultProps = {
	isLoggedIn: false,
};


export default Router;
