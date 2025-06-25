import logo from "./logo.png";
import s from "./index.module.css";
import { Link } from "react-router-dom";

export default function Logo() {

  return (
    <Link className={s.logo} to="/">
      <img src={logo} alt="logo" className={s.logo__img} />
      <span className={s.logo__text}>Posts</span>
    </Link>
  )

};
