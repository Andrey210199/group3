import React from 'react';
import error404 from './img/404.svg';
import rabbit from './img/rabbit.svg';
import './style.css';

export const NotFound = ({ title, buttonText }) => {
  return (
    <>
      <div className="notFound">
        <img src={error404} className="error404" aria-hidden="true" />
        <h1 className="title">{title}</h1>
        <img src={rabbit} className="rabbit" />

        <a href="/" className="btn">
          {buttonText}
        </a>
      </div>
    </>
  );
};
