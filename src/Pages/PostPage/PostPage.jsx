import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComment from "../../Components/AddComment/AddComment";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import CommentList from "../../Components/CommentList/CommentList";
import Post from "../../Components/Post/Post";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchGetComments, fetchGetSinglePost } from "../../Storage/Slices/SinglePostSlice";

import s from "./index.module.css";

export default function PostPage() {

    const isLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].loading);
    const isCommentLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].commentsLoading);

    const post = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
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
                        <div className={s.authorContent}>
                            <AvatarInfo created={created} author={author} s={s} />
                        </div>

                        <Post />

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