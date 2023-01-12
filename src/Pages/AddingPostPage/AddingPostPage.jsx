import { useDispatch } from "react-redux";
import AddingPost from "../../Components/AddingPost/AddingPost";
import { fetchAddPost } from "../../Storage/Slices/PostsSlile";
import s from "./index.module.css"
export default function AddingPostPage() {

    const dispatch = useDispatch();

    function handleSubmit(text, tags, editorText) {
        dispatch(fetchAddPost({ ...text, tags, text: editorText }));
    }

    return (

        <>
            <h1 className={s.title}>Добавления поста</h1>

            <AddingPost handleSubmit={handleSubmit} enabled={true} />
        </>
    )
}