
import { useDispatch } from "react-redux";
import { fetchDeleteRewiew, fetchGetComments } from "../../Storage/Slices/SinglePostSlice";
import AddComment from "../AddComment/AddComment";
import AvatarInfo from "../AvatarInfo/AvatarInfo";
import ButtonDelete from "../Buttons/ButtonDelete/ButtonDelete";

import s from "./index.module.css";

export default function Comment({ author, created_at, text: comment, _id: id, postId }) {

    const dispatch = useDispatch();

    function handleClickDel(){
        dispatch(fetchDeleteRewiew({postId, commentId: id }))
        .then(()=>{
            dispatch(fetchGetComments(postId));
        })
    }

    return (
        <div className={s.comment}>

            <AvatarInfo created={created_at} author={author} s={s} />
            
            <div className={s.comment__content}>
                <AddComment content={comment}/>
            </div>
            
            <ButtonDelete author={author} onDelete={handleClickDel} style={{position: "absolute",  top: "15px", right: "20px"}}/>
        </div>
    )
}