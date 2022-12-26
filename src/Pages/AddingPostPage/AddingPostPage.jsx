import AddingPost from "../../Components/AddingPost/AddingPost";
import api from "../../Utilites/Api";

export default function AddingPostPage() {

    function handleSubmit(text, editor){
        api.actionPosts("POST", "", { ...text, text: editor.getHTML() })
    }

    return (

        <>
            <h1>Добавления поста</h1>
            
            <AddingPost handleSubmit={handleSubmit}/>
        </>
    )
}