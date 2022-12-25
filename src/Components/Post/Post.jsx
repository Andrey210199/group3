import { useSelector } from "react-redux";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import AddingPost from "../AddingPost/AddingPost";

import s from "./index.module.css";


export default function Post() {

    const { image, likes, tags, title, text } = useSelector(state => state[NAMESINGLEPOSTSLICE].data);

    return (

        <div className={s.postContent}>

            <AddingPost image={image} title={title} text={text} tags={tags}/>

            <div className={s.like}>

                {!!likes?.length && likes.length}
                <button className={s.like__btn}>♥</button>

            </div>

        </div>

    )
}