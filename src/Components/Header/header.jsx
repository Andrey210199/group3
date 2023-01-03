import { Container, IconButton} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import s from "./index.module.css";

import { Logo } from "../Logo/logo";
import { UserInfo } from "../UserInfo/user-info";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export function Header() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={s.header}>
      <Container>
        <div  className={s.flex}>
         <Logo/>
          <div className={s.menu}>
           {currentUser&&<UserInfo/>} 
            {/* <IconButton sx={{color:"var(--text-secondary-color)"}}>
              <LoginIcon/>
              <span className={s.login}>Войти</span>
            </IconButton> */}
          </div>


        </div>
      </Container>
    </div>
  );
}


