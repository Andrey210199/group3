import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";


import s from "./index.module.css";

export const UserInfo = () => {
  const currentUser = useSelector(state => state[NAMEUSERSLICE].data);
  const { name, avatar } = currentUser;

  return (
    <div className={s.wrapper}>
      <Avatar alt={name} src={avatar} sx={{ width: 56, height: 56 }} />
      <p>{name}</p>
    </div>
  );
};
