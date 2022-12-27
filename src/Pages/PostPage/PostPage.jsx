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

export default function PostPage() {

    const isLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].loading);
    const currentUser = useSelector(state => state.user.data);
    const post = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
    const created = post?.created_at;
    const author = post?.author;
    const { id: postId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetSinglePost(postId))
        .then(post => console.log(post.payload.comments));
    }, [dispatch, postId]);

    //избавиться
    const [postComments, setpostComments] = useState();

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

    return (
        <>
            {
                isLoading ? <></> :
                    <>
                        <div className={s.authorContent}>
                            <AvatarInfo created={created} author={author} s={s} />
                        </div>

                        <Post />

                        <div className={s.comments}>
                            <CommentList>
                                <AddComment handleSubComment={handleSubComment} />
                            </CommentList>
                        </div>
                    </>
            }

        </>
    )
}