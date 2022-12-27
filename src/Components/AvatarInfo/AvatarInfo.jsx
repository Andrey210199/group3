import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale("ru");
dayjs.extend(relativeTime);


export default function AvatarInfo({author, created, s }) {

    const { avatar, name } = author;

    function firstLetter() {
        return name?.slice(0, 1).toUpperCase();
    }

    return (
        <>

            <Avatar src={avatar} alt="creater avatar" loading="lazy" decoding="async">{!!avatar ? "" : firstLetter()}</Avatar>
            <span className={s.name}>{name}</span>
            {!!created && <span>{dayjs(created).fromNow()}</span>}
        </>
    )
}