import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComment from "../../Components/AddComment/AddComment";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import ButtonBack from "../../Components/Buttons/ButtonBack/ButtonBack";
import ButtonEdit from "../../Components/Buttons/ButtonEdit/ButtonEdit";
import ButtonLike from "../../Components/Buttons/ButtonLike/ButtonLike";
import CommentList from "../../Components/CommentList/CommentList";
import Post from "../../Components/Post/Post";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchChangeLike } from "../../Storage/Slices/PostsSlile";
import { fetchGetComments, fetchGetSinglePost, setProductState } from "../../Storage/Slices/SinglePostSlice";
import { getToken } from "../../Utilites/Cookie";

import s from "./index.module.css";

export default function PostPage() {

    const isLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].loading);
    const isCommentLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].commentsLoading);
    const post = useSelector(state => state[NAMESINGLEPOSTSLICE].data);

    const [isEditor, setIsEditor] = useState(false);
    const created = post?.created_at;
    const author = post?.author;
    const { id: postId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetSinglePost(postId));
        dispatch(fetchGetComments(postId));

    }, [dispatch, postId]);

     function handleLike(post) {
        dispatch(fetchChangeLike(post))
            .then((newPost) => dispatch(setProductState(newPost.payload.data)));
    }

    return (
        <>
            {
                isLoading ? <></> :
                    <>
                        <ButtonBack/>

                        <AvatarInfo created={created} author={author} s={s} />    
                        <Post isEditor={isEditor} postId={postId} isEnable={setIsEditor}>                            
                            <div className={s.like}>
                                <ButtonLike post={post} onLike={handleLike} iconSize = {"large"}/>
                                <ButtonEdit author={author} isEnable={setIsEditor} />
                            </div>                        
                        </Post>
                        {isCommentLoading ? <></> :
                            <div className={s.comments}>
                            
                                <CommentList>
                                    {/*  {getToken() ?<AddComment enable />: <p>Комментарии могут оставлять только зарегистрированные пользователи.</p>} */}
                                    <AddComment enable />
                                </CommentList>
                            </div>}
                    </>
            }

        </>
    )
}