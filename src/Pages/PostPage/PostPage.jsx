import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddComment from "../../Components/AddComment/AddComment";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import CommentList from "../../Components/CommentList/CommentList";
import Post from "../../Components/Post/Post";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchGetSinglePost } from "../../Storage/Slices/SinglePostSlice";

import s from "./index.module.css";

export default function PostPage(props) {

    const isLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].loading);
    const currentUser = useSelector(state => state.user.data);
    const { id: postId } = useParams();
    const dispatch = useDispatch();

    //избавиться
    const post = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
    const { comments } = post !== null ? post : "";
    const [postComments, setpostComments] = useState();

    useEffect(() => {
        dispatch(fetchGetSinglePost(postId));
    }, [dispatch, postId]);

    //Надо добавить запрос на сервер, чтобы добавлять комментарии
    function handleSubComment(comment) {
        const commentObj = {
            "_id": postComments.length, //Возможно нужно получать все посты, чтобы не было повторяющегося id, спросить или посмотреть, что возвращает allComment и PostComment
            "author": currentUser,
            "comment": comment,
            "created_at": new Date(Date.now()),
            "updated_at": new Date(Date.now())

        };
        setpostComments([...postComments, commentObj]);
    }

    useEffect(() => {
        setpostComments(comments);
    }, [comments]);

    return (
        <>
            {
                isLoading ? <></> :
                    <>
                        <div className={s.authorContent}>
                            <AvatarInfo s={s} />
                        </div>

                        <Post />

                        <div className={s.comments}>
                            <CommentList postComments={postComments}>
                                <AddComment handleSubComment={handleSubComment} />
                            </CommentList>
                        </div>
                    </>
            }

        </>
    )
}