import { useDispatch } from "react-redux";
import AddingPost from "../../Components/AddingPost/AddingPost";
import { fetchAddPost } from "../../Storage/Slices/PostsSlile";
import api from "../../Utilites/Api";

export default function AddingPostPage() {

    const dispatch = useDispatch();

    function handleSubmit(text, editorText) {
        dispatch(fetchAddPost({ ...text, text: editorText }));
    }

    return (

        <>
            <h1>Добавления поста</h1>

            <AddingPost handleSubmit={handleSubmit} enabled={true} />
        </>
    )
}