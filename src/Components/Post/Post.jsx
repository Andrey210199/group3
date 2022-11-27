import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";

import s from "./index.module.css"

dayjs.locale("ru");
dayjs.extend(relativeTime)

export default function Post({ _id,image, likes, comments, tags, author, title, text, created_at, updated_at }){
    const {name, avatar, _id: authorId} = author;
    const firstLetter = name?.slice(0,1).toUpperCase();
    return(
        <>
        <div className={s.authorContent}>

            <Avatar src={avatar} alt="creater avatar" className={s.avatar}>{!!avatar ?"" : firstLetter}</Avatar>
            <span className={s.name}>{name}</span>
            <span>{dayjs(updated_at).fromNow()}</span>

        </div>

        <div className={s.postContent}>

            <h1 className={s.title}>{title}</h1>
            <img src={image} className={s.postImage} alt="image"/>
            <p className={s.postText}>{text}</p>
           { !!tags && tags.map(tag => <span key={tag} className={s.tag}>{tag}</span>) }
            
        </div>

        <div className={s.comments}>
            { !!comments && comments.map( (comment,index) => <div key={index} className={s.comment}>{comment}</div>) }
        </div>
            
        </>
    )
}