import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";
import s from "./index.module.css";
import cn from "classnames";
import { Autch, unAutch } from "../../Storage/Slices/UserSlice";
import { URLEDITUSER, URLLOGIN, URLREGISTRATION } from "../../Constants/Constant";
import AvatarInfo from "../AvatarInfo/AvatarInfo";

export default function HeaderMenu() {

  const currentUser = useSelector((state) => state[NAMEUSERSLICE].data);
  const isUser = useSelector((state => state[NAMEUSERSLICE].isAutch));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    unAutch();
    dispatch(Autch());
    navigate("/");
  }

  return (
    <div className={s.menu}>

      {isUser && currentUser &&
        <>
          <AvatarInfo s={s} author={currentUser} sx={{ width: 56, height: 56 }} />
          <Link
            className={s.link}
            to={`?${URLEDITUSER}=true`}
            title=" Редактирование пользователя"
          >
            <span className={s.editUser}>Изменить</span>
          </Link>
        </>
      }

      <Link className={cn(s.link, s.login_link)} to={isUser ? "#" : `?${URLLOGIN}=true`} onClick={isUser ? handleClick : ""}>
        <span className={s.login}>
          {isUser ?
            <><LogoutIcon />Выйти</>
            :
            <><LoginIcon />Войти</>
          }
        </span>
      </Link>

      {!isUser && <Link className={cn(s.link, s.registr_link)} to={`?${URLREGISTRATION}=true`}>
        <span className={s.registration}>Регистрация</span>
      </Link>}

      {isUser && <Link to="/add_post" className={cn(s.link, s.add_link)} >
        <span className={s.add_post}>Создать пост</span>
      </Link>}

    </div>


  )


}

