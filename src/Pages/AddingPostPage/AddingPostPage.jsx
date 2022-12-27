import AddingPost from "../../Components/AddingPost/AddingPost";
import api from "../../Utilites/Api";

export default function AddingPostPage() {

    function handleSubmit(text, editorText){
        api.actionPosts("POST", "", { ...text, text: editorText })
    }

    return (

        <>
            <h1>Добавления поста</h1>
            
            <AddingPost handleSubmit={handleSubmit} enabled={true}/>
        </>
    )
}