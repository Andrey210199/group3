
import { useState } from "react";
import s from "./index.module.css";

export default function AddComment({handleSubComment}){

    const [commentText, setCommentText] = useState();

    function handleClick(evt){
        evt.preventDefault();
       commentText.trim() && handleSubComment(commentText);

    }

    function handleTextArea(event){
        setCommentText(event.target.value);
    }

    return(

        <form className={s.addComment}>

            <textarea value={commentText} className={s.textarea} onInput={handleTextArea}/>
            <button onClick={handleClick}>Отправить</button>

        </form>
    )
}