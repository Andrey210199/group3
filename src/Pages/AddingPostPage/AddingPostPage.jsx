import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddingPost from "../../Components/AddingPost/AddingPost";
import ProtectedComponent from "../../Components/ProtectedComponent/ProtectedComponent";
import { fetchAddPost } from "../../Storage/Slices/PostsSlile";
import s from "./index.module.css"
export default function AddingPostPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(text, tags, editorText) {
        dispatch(fetchAddPost({ ...text, tags, text: editorText }))
            .then(() => {
                navigate("/");
            });
    }

    return (
        <ProtectedComponent>
            <>
                <h1 className={s.title}>Добавления поста</h1>

                <AddingPost handleSubmit={handleSubmit} enabled={true} />
            </>
        </ProtectedComponent>
    )
}