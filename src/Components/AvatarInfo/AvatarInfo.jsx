import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";

import s from "./index.module.css";

dayjs.locale("ru");
dayjs.extend(relativeTime);


export default function AvatarInfo({ author = {}, created, sx, ...props }) {

    const { avatar, name } = author;

    const style = props.s;

    function firstLetter() {
        return name?.slice(0, 1).toUpperCase();
    }

    return (
        <div className={style?.author ? style.author : s.author}>

            <Avatar sx={sx} className={style?.author__img ? style.author__img : s.author__img} src={avatar} alt="creater avatar" loading="lazy" decoding="async">{avatar ? "" : firstLetter()}</Avatar>
            <h3 className={style?.name ? style?.name : s.name}>{name}</h3>
            {created && <p className={style?.date ? style?.data : s.date}>{dayjs(created).fromNow()}</p>}
        </div >
    )
}