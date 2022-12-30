import { useDispatch } from "react-redux";
import AddingPost from "../../Components/AddingPost/AddingPost";
import { fetchAddPost } from "../../Storage/Slices/PostsSlile";

export default function AddingPostPage() {

    const dispatch = useDispatch();

    function handleSubmit(text, tags, editorText) {
        dispatch(fetchAddPost({ ...text, tags, text: editorText }));
    }

    return (

        <>
            <h1>Добавления поста</h1>

            <AddingPost handleSubmit={handleSubmit} enabled={true} />
        </>
    )
}