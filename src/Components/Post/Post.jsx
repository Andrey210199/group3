import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { NAMESINGLEPOSTSLICE, NAMEUSERSLICE } from "../../Constants/StorageConstants";
import { fetchChengePost } from "../../Storage/Slices/PostsSlile";
import PostEditor from "../PostEditor/PostEditor";

import CommentEditor from "../CommentEditor/CommentEditor";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import ButtonEdit from "../../Components/Buttons/ButtonEdit/ButtonEdit";
import ButtonLike from "../../Components/Buttons/ButtonLike/ButtonLike";
import CommentList from "../../Components/CommentList/CommentList";
import { Spinner } from "../../Components/Spinner/spinner";
import { fetchChangeLike } from "../../Storage/Slices/PostsSlile";
import { setProductState } from "../../Storage/Slices/SinglePostSlice";
import { getToken } from "../../Utilites/Cookie";
import { MAXCOMMENTS } from "../../Constants/Constant";

import s from "./index.module.css";
import { editorEnable, editorUnEnable } from "../../Storage/Slices/UserSlice";



export default function Post({ postId }) {

    const isCommentLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].commentsLoading);
    const isEnable = useSelector(state => state[NAMEUSERSLICE].isEditorEnable);
    const post = useSelector(state => state[NAMESINGLEPOSTSLICE].data);

    const { comments, data } = useSelector(state => state[NAMESINGLEPOSTSLICE]);
    const [commentNow, setCommentNow] = useState(comments?.slice(0, MAXCOMMENTS));
    const [num, setNum] = useState(1);

    const { image, tags, title, text, _id: id, likes, author, created_at: created } = post;
    const dispatch = useDispatch();

    function handleSubmit(text, tags, editorText) {
        dispatch(fetchChengePost({ ...text, tags, text: editorText, _id: postId }))
            .then((data) => {
                dispatch(setProductState(data.payload))
                dispatch(editorUnEnable());
            })

    }

    function handleLike() {
        dispatch(fetchChangeLike({ id, likes }))
            .then((newPost) => dispatch(setProductState(newPost.payload.data)));
    }

    function enableEditor(){
        dispatch(editorEnable())
    }


    return (
        <>
            <AvatarInfo created={created} author={author} s={s} />
            <div className={s.postContent}>

                <PostEditor image={image} title={title} text={text} tags={tags} enabled={isEnable} handleSubmit={handleSubmit}>

                    <div className={s.like}>
                        <ButtonLike likes={likes} onLike={handleLike} iconSize={"large"} />
                        <ButtonEdit author={author} isEnable={enableEditor} />
                    </div>
                </PostEditor>

            </div>

            {isCommentLoading ? <Spinner /> :
                <div className={s.comments}>
                    <CommentList commentNow = {commentNow} setCommentNow = {setCommentNow} num = {num} setNum = {setNum} comments = {comments} data = {data}>
                         {getToken() ?<CommentEditor enable />: <p className={s.comments__message}>Комментарии могут оставлять только зарегистрированные пользователи.</p>}
                    </CommentList>
                </div>}
        </>

    )
}