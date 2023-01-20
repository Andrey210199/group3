import { useDispatch, useSelector } from "react-redux";

import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchChengePost } from "../../Storage/Slices/PostsSlile";
import AddingPost from "../AddingPost/AddingPost";

import { useState } from "react";
import AddComment from "../../Components/AddComment/AddComment";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import ButtonEdit from "../../Components/Buttons/ButtonEdit/ButtonEdit";
import ButtonLike from "../../Components/Buttons/ButtonLike/ButtonLike";
import CommentList from "../../Components/CommentList/CommentList";
import { Spinner } from "../../Components/Spinner/spinner";
import { fetchChangeLike } from "../../Storage/Slices/PostsSlile";
import { setProductState } from "../../Storage/Slices/SinglePostSlice";
import { getToken } from "../../Utilites/Cookie";

import s from "./index.module.css";



export default function Post({ postId }) {

    const isCommentLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].commentsLoading);
    const post = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
    const [isEditor, setIsEditor] = useState(false);
    const { image, tags, title, text, _id: id, likes, author, created_at: created } = post;
    const dispatch = useDispatch();

    function handleSubmit(text, tags, editorText) {
        dispatch(fetchChengePost({ ...text, tags, text: editorText, _id: postId }))
            .then((data) => {
                dispatch(setProductState(data.payload))
                setIsEditor(false);
            })

    }

    function handleLike() {
        dispatch(fetchChangeLike({ id, likes }))
            .then((newPost) => dispatch(setProductState(newPost.payload.data)));
    }


    return (
        <>
            <AvatarInfo created={created} author={author} s={s} />
            <div className={s.postContent}>

                <AddingPost image={image} title={title} text={text} tags={tags} enabled={isEditor} handleSubmit={handleSubmit}>

                    <div className={s.like}>
                        <ButtonLike likes={likes} onLike={handleLike} iconSize={"large"} />
                        <ButtonEdit author={author} isEnable={setIsEditor} />
                    </div>
                </AddingPost>

            </div>

            {isCommentLoading ? <Spinner /> :
                <div className={s.comments}>

                    <CommentList>
                         {getToken() ?<AddComment enable />: <p>Комментарии могут оставлять только зарегистрированные пользователи.</p>}
                    </CommentList>
                </div>}
        </>

    )
}