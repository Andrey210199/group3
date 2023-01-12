import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddingPost from "../../Components/AddingPost/AddingPost";
import { fetchAddPost } from "../../Storage/Slices/PostsSlile";

export default function AddingPostPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(text, tags, editorText) {
        dispatch(fetchAddPost({ ...text, tags, text: editorText }))
        .then(()=>{
            navigate("/");
        });
    }

    return (

        <>
            <h1>Добавления поста</h1>

            <AddingPost handleSubmit={handleSubmit} enabled={true} />
        </>
    )
}