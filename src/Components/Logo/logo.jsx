import logo from "./logo.png";
import s from "./index.module.css";
import { Link } from "react-router-dom";

export const Logo = () => {

  return (
    <Link className={s.logo} to="/">
      <img src={logo} alt="logo" className={s.logo_img} />
      <span className={s.logo_text}>Posts</span>
    </Link>
  )

};
