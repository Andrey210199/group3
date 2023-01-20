import { Link } from "react-router-dom"
import { UserInfo } from "../UserInfo/user-info"
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";
import s from "./index.module.css";
import cn from "classnames";
import { unAutch } from "../../Storage/Slices/UserSlice";

export default function HeaderMenu({user}){


  const currentUser = useSelector((state) => state[NAMEUSERSLICE].data);
return(
  <div className={s.menu}>
  
  
  {!!currentUser && 
          <>
            <UserInfo />
            <Link
              className={s.link }
              to={"?userEdit=true"}
              title=" Редактирование пользователя"
          >
            <span className={s.editUser}>Изменить</span>
          </Link>
          </>          
          }
    

          {user ? (
            <Link className={cn(s.link, s.login_link)} to="#" onClick={unAutch}>
              <span className={s.login}>
                <LogoutIcon />
                Выйти
              </span>
            </Link>
          ) : (
            <Link className={cn(s.link, s.login_link)} to={"?login=true"}>
              <span className={s.login}>
                <LoginIcon />
                Войти
              </span>
            </Link>
          )}
          <Link className={cn(s.link, s.registr_link)} to={"?registration=true"}>
            <span className={s.registration}>Регистрация</span>
          </Link>

          <Link to="/add_post" className={cn(s.link, s.add_link)} >
            <span className={s.add_post}>Создать пост</span>
          </Link>

  
  
  </div>
  

)


 }
 
 