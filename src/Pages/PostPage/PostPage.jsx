import { useEffect, useState } from "react";
import AddComment from "../../Components/AddComment/AddComment";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import CommentList from "../../Components/CommentList/CommentList";
import Post from "../../Components/Post/Post";

import s from "./index.module.css";

export default function PostPage({currentUser,...props}) {

    const {author, comments, created_at, updated_at} = props;
    const [postComments, setpostComments] = useState();

    //Надо добавить запрос на сервер, чтобы добавлять комментарии
    function handleSubComment(comment) {
        const commentObj ={
            "_id": postComments.length, //Возможно нужно получать все посты, чтобы не было повторяющегося id, спросить или посмотреть, что возвращает allComment и PostComment
            "author": currentUser,
            "comment": comment,
            "created_at": new Date( Date.now()),
            "updated_at": new Date( Date.now())

        };
       setpostComments([...postComments, commentObj]);
    }

    useEffect(() => {
        setpostComments(comments);
    }, [comments]);

    return (
        <>
            <div className={s.authorContent}>
                <AvatarInfo {...author} created={created_at} updated={updated_at} s={s} />
            </div>

            <Post {...props}/>

            <div className={s.comments}>
                <CommentList postComments={postComments}>
                    <AddComment handleSubComment={handleSubComment}/>
                </CommentList>
            </div>

        </>
    )
}