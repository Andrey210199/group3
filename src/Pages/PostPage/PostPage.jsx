import { useEffect, useState } from "react";
import AddComment from "../../Components/AddComment/AddComment";
import AvatarInfo from "../../Components/AvatarInfo/AvatarInfo";
import CommentList from "../../Components/CommentList/CommentList";
import Post from "../../Components/Post/Post";

import s from "./index.module.css";

const data =
{
    "image": "http://dummyimage.com/400x200.png/5fa2dd/ffffff",
    "likes": [
        "622bd81b06c7d323b8ae4614"
    ],
    "comments": [
        {
            "_id": 0,
            "author": {
                "name": "Максим Иванов",
                "about": "Наставник",
                "avatar": "https://u.kanobu.ru/articles/pics/7e6dc974-43f4-4ad0-9a55-2465566e9662.jpg",
                "_id": "622bd81b06c7d323b8ae4614",
                "email": "maxim_91@inbox.ru",
                "__v": 0
            },
            "comment": "Комментарий",
            "created_at": "2022-03-11T23:23:20.891Z",
            "updated_at": "2022-03-12T09:51:45.683Z"

        }

    ],
    "tags": [
        "legendary"
    ],
    "isPublished": true,
    "_id": "622bd9e806c7d323b8ae4615",
    "title": "Batman Beyond: Return of the Joker",
    "author": {
        "name": "Максим Иванов",
        "about": "Наставник",
        "avatar": "https://u.kanobu.ru/articles/pics/7e6dc974-43f4-4ad0-9a55-2465566e9662.jpg",
        "_id": "622bd81b06c7d323b8ae4614",
        "email": "maxim_91@inbox.ru",
        "__v": 0
    },
    "text": "Change Other Device on Right Upper Arm",
    "created_at": "2022-03-11T23:23:20.891Z",
    "updated_at": "2022-03-12T09:51:45.683Z",
    "__v": 0,
    "updatedAt": "2022-03-14T12:31:11.479Z"
}

export default function PostPage() {
    const [postComments, setpostComments] = useState();

    function handleSubComment(comment) {
        const commentObj ={
            "_id": postComments.length, //Возможно нужно получать все посты, чтобы не было повторяющегося id, спросить или посмотреть, что возвращает allComment и PostComment
            "author": data.author, //Тут должен быть текущий пользователь
            "comment": comment,
            "created_at": new Date( Date.now()),
            "updated_at": new Date( Date.now())

        };
       setpostComments([...postComments, commentObj]);
    }

    useEffect(() => {
        setpostComments(data.comments);
    }, [data]);


    return (
        <>
            <div className={s.authorContent}>
                <AvatarInfo {...data.author} created={data.created_at} updated={data.updated_at} s={s} />
            </div>

            <Post {...data}/>

            <div className={s.comments}>
                <CommentList postComments={postComments}>
                    <AddComment handleSubComment={handleSubComment}/>
                </CommentList>
            </div>

        </>
    )
}