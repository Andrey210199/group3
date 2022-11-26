import { Avatar } from "@mui/material";

export default function Post({ _id,image, likes, comments, tags, author, title, text, created_at, updated_at }){
    const {name, avatar, _id: authorId} = author;
    const firstLetter = name.slice(0,1).toUpperCase();
    return(
        <>
        <div className={s.authorContent}>
            <Avatar src={avatar} alt="creater avatar" className={s.avatar}>{!!avatar ?"" : firstLetter}</Avatar>
            <span className={s.name}>{name}</span>

        </div>

        <div className={s.postContent}>

            <h1 className={s.title}>{title}</h1>
            <img src={image} className={s.postImage} alt="image"/>
            <p className={s.postText}>{text}</p>
            
        </div>
            
        </>
    )
}