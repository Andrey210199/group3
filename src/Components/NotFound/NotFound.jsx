import React from 'react';
import { Link } from 'react-router-dom';
import error404 from './img/404.svg';
import rabbit from './img/rabbit.svg';
import s from './index.module.css';

export const NotFound = ({ title, buttonText }) => {
  return (
    <>
      <div className={s.notFound}>
        <img src={error404} className={s.notFound__img} aria-hidden="true" alt="NoFoundImg" />
        <h1 className={s.notFound__title}>{title}</h1>
        <img src={rabbit} className={s.notFound__img} alt="decorationImg" />

        <Link to="/" className={s.notFound__btn}>
          {buttonText}
        </Link>
      </div>
    </>
  );
};
