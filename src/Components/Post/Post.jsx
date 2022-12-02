import cn from "classnames";

import s from "./index.module.css";


export default function Post({ _id,image, likes, tags, title, text,}){

    return(

        <div className={s.postContent}>

            <h1 className={s.title}>{title}</h1>
            <img src={image} className={s.postImage} alt="image" decoding="async"/>
            <p className={s.postText}>{text}</p>
           { !!tags && tags.map(tag => <a href="#" key={tag} className={s.tag}>{tag}</a>) }

           <div className={s.like}>

            {!!likes?.length && likes.length}
            <button className={s.like__btn}>♥</button>

            </div>
            
        </div>

    )
}