import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
import AvatarInfo from "../AvatarInfo/AvatarInfo";
import Comment from "../Comment/Comment";

import s from "./index.module.css"

dayjs.locale("ru");
dayjs.extend(relativeTime);

export default function Post({ _id,image, likes, comments, tags, author, title, text, created_at, updated_at }){
    const {name, avatar, _id: authorId} = author;
    const firstLetter = name?.slice(0,1).toUpperCase();
    return(
        <>
        <div className={s.authorContent}>

            <AvatarInfo {...author} created={created_at} updated={updated_at} s={s}/>

        </div>

        <div className={s.postContent}>

            <h1 className={s.title}>{title}</h1>
            <img src={image} className={s.postImage} alt="image" decoding="async"/>
            <p className={s.postText}>{text}</p>
           { !!tags && tags.map(tag => <a href="#" key={tag} className={s.tag}>{tag}</a>) }
            
        </div>

            <div className={s.comments}>
                {!!comments && comments.map(comment=> <Comment key={comment._id} {...comment} /> )}
            </div>
            
        </>
    )
}