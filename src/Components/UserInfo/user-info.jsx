import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";


import s from "./index.module.css";

export const UserInfo = () => {
  const user = useSelector(state => state[NAMEUSERSLICE].data);
  const { name, avatar } = user;

  return (
    <div className={s.wrapper}>
      <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} />
      <p className={s.name}>{name}</p>
    </div>
  );
};
