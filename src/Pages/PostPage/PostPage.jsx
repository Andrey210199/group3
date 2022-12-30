import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComment from "../../Components/AddComment/AddComment";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import ButtonEdit from "../../Components/Buttons/ButtonEdit/ButtonEdit";
import CommentList from "../../Components/CommentList/CommentList";
import Post from "../../Components/Post/Post";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchGetComments, fetchGetSinglePost } from "../../Storage/Slices/SinglePostSlice";

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

    return (
        <>
            {
                isLoading ? <></> :
                    <>
                        <ButtonEdit author={author} isEnable={setIsEditor} />

                        <div className={s.authorContent}>
                            <AvatarInfo created={created} author={author} s={s} />
                        </div>

                        <Post isEditor={isEditor} postId={postId} />

                        {isCommentLoading ? <></> :
                            <div className={s.comments}>
                                <CommentList>
                                    <AddComment enable />
                                </CommentList>
                            </div>}
                    </>
            }

        </>
    )
}