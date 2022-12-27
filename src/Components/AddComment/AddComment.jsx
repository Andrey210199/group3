
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDispatch, useSelector } from "react-redux";
import { MAXCHARACTERS } from "../../Constants/Constant";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchSetRewiew } from "../../Storage/Slices/SinglePostSlice";
import MenuBarComment from "../MenuBarComment/MenuBarComment";
import s from "./index.module.css";

export default function AddComment() {

    const { _id: postId} = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
    const limit = MAXCHARACTERS;
    const dispatch = useDispatch();

    function handleSubmit(evt) {
        evt.preventDefault();
        editor.getText().trim() && dispatch(fetchSetRewiew({ postId, comment: editor.getHTML()}));

    }

    const editor = useEditor({

        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
            Highlight.configure({
                multicolor: true
            }),
            Underline,
            Link,
            CharacterCount.configure({
                limit
            }),
            Placeholder.configure({
                placeholder: 'Написать комментарий',
            })
        ]

    });

    return (

        <form className={s.addComment} onSubmit={handleSubmit}>

            <MenuBarComment editor={editor} />
            <EditorContent editor={editor} />

            <div className="character-count">
                {editor?.storage.characterCount.characters()}/{limit} Символов
                <br />
                {editor?.storage.characterCount.words()} Слов
            </div>

            <button>Отправить</button>

        </form>
    )
}