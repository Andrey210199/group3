import { Container, IconButton} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import s from "./index.module.css";

import { Logo } from "../Logo/logo";
import { UserInfo } from "../UserInfo/user-info";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export function Footer() {
  const { currentUser } = useContext(UserContext);
  return (
    <footer className={s.footer}>
      <Container>
        <div  className={s.flex}>
         <Logo/>
            <h2 className={s.title}>Авторы проекта:</h2>
         <ul className={s.authors}>
            <li className={s.name}>Молчанов Андрей Евгеньевич</li>
            <li className={s.name}>Курашко Анна Олеговна</li>
            <li className={s.name}>Костенко Андрей Викторович</li>
        </ul>
        </div>
      </Container>
    </footer>
  );
}


