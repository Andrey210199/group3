import { useDispatch, useSelector } from "react-redux";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchChangeLike } from "../../Storage/Slices/PostsSlile";
import { setProductState } from "../../Storage/Slices/SinglePostSlice";
import AddingPost from "../AddingPost/AddingPost";
import ButtonLike from "../Buttons/ButtonLike/ButtonLike";

import s from "./index.module.css";


export default function Post() {

    const post = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
    const { image, tags, title, text } = post;
    const dispatch = useDispatch();

    function handleLike(post){
        dispatch(fetchChangeLike(post))
        .then((newPost)=>dispatch(setProductState(newPost.payload.data)));
    }

    return (

        <div className={s.postContent}>

            <AddingPost image={image} title={title} text={text} tags={tags}/>

            <div className={s.like}>

                <ButtonLike post={post} onLike={handleLike}/>

            </div>

        </div>

    )
}