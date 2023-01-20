import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ru");
dayjs.extend(relativeTime);


export default function AvatarInfo({author ={}, created, s={}, sx }) {

    const { avatar, name } = author;

    function firstLetter() {
        return name?.slice(0, 1).toUpperCase();
    }

    return (
        <div className={s.about_author}>

            <Avatar sx={sx} className={s.img} src={avatar} alt="creater avatar" loading="lazy" decoding="async">{avatar ? "" : firstLetter()}</Avatar>
            <h3 className={s.name}>{name}</h3>
            {created && <p className={s.date}>{dayjs(created).fromNow()}</p>}
        </div>
    )
}