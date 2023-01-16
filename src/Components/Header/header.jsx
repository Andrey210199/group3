import { IconButton } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import s from "./index.module.css";
import "../../index.css";
import cn from "classnames";
import { Logo } from "../Logo/logo";
import { UserInfo } from "../UserInfo/user-info";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";
import { useSelector } from "react-redux";
import Search from "../Search/Search";

export function Header({children}) {
  const user = useSelector((state) => state[NAMEUSERSLICE].data);
  console.log(user);
  return (
    <header className={s.header}>
      <div className={cn("container", s.content)}>
        <Logo />
        <Search/>
        <div className={s.menu}>
          {user && <UserInfo />}
          {children}
          {/* <IconButton sx={{ color: "var(--text-secondary-color)" }}>
            <LoginIcon />
            <span className={s.login}>Войти</span>
          </IconButton> */}
        </div>
        
      </div>
        
    </header>
  );
}
