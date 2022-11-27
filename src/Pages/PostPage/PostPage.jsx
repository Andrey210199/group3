import Post from "../../Components/Post/Post";

const data =
    {
        "image": "http://dummyimage.com/400x200.png/5fa2dd/ffffff",
        "likes": [
            "622bd81b06c7d323b8ae4614"
        ],
        "comments": [
            "622c6c4f1bd0d37edc594b21"
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

export default function PostPage(){

    return(
        <>
            <Post {...data}/>

        </>
    )
}