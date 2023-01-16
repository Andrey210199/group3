import { Container } from "@mui/material";

import s from "./index.module.css";

export function Footer() {
  return (
    <footer className={s.footer}>
      <Container>
        <div className={s.flex}>
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
