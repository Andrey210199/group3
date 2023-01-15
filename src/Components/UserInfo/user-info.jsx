import { Avatar } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";


import s from "./index.module.css";

export const UserInfo = () => {
  const { currentUser } = useContext(UserContext);
  const { name, avatar } = currentUser;

  return (
    <div className={s.wrapper}>
      <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} />
      <p>{name}</p>
    </div>
  );
};
