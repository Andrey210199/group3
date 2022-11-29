import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ru");
dayjs.extend(relativeTime);


export default function AvatarInfo({avatar, name, s, created, updated}) {

    const firstLetter = name?.slice(0,1).toUpperCase();

    return (
        <>
            <Avatar src={avatar} alt="creater avatar" className={s.avatar} loading="lazy" decoding="async">{!!avatar ? "" : firstLetter}</Avatar>
            <span className={s.name}>{name}</span>
           {!!updated && <span>{dayjs(updated).fromNow()}</span> }
        </>
    )
}