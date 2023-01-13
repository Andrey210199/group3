
import { useDispatch } from "react-redux";
import { fetchDeleteRewiew } from "../../Storage/Slices/SinglePostSlice";
import AddComment from "../AddComment/AddComment";
import AvatarInfo from "../AvatarInfo/AvatarInfo";
import ButtonDelete from "../Buttons/ButtonDelete/ButtonDelete";

import s from "./index.module.css";

export default function Comment({ author, created_at, text: comment, _id: id, postId }) {

    const dispatch = useDispatch();

    function handleClickDel() {
        dispatch(fetchDeleteRewiew({ postId, commentId: id }));
    }

    return (
        <div className={s.comment}>

            <AvatarInfo created={created_at} author={author} s={s} />

            <div className={s.comment__content}>
                <AddComment content={comment} />
            </div>

            <ButtonDelete author={author} onDelete={handleClickDel} />
        </div>
    )
}