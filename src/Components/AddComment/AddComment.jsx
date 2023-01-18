
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAXCHARACTERS } from "../../Constants/Constant";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchSetRewiew } from "../../Storage/Slices/SinglePostSlice";
import MenuBarComment from "../MenuBarComment/MenuBarComment";
import s from "./index.module.css";
import "../../index.css";
import Button from "../Buttons/Button/Button";

export default function AddComment({ enable = false, content }) {

    const { _id: postId } = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
    const limit = MAXCHARACTERS;
    const dispatch = useDispatch();

    function handleSubmit(evt) {
        evt.preventDefault();
        editor.getText().trim() && dispatch(fetchSetRewiew({ postId, comment: editor.getHTML() }));
        editor.commands.setContent("");

    }


    const editor = useEditor({
        editorProps:{
            attributes:{
                class: enable ? s.new_text : s.text_comment

            }
        },

        editorProps: {
            attributes: {
                class: enable && s.editor
            }
        },

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

    useEffect(() => {
        editor?.setEditable(enable);
        editor?.commands.setContent(content)
    }, [editor, enable, content])

    return (

        <form className={s.addComment} onSubmit={handleSubmit}>
            
            {enable && 
            <>
            <h3 className={s.add_comment_title}>Добавить комментарий</h3>
            
            <MenuBarComment editor={editor} className={s.comment_menu}  />
            </>}
            
            <EditorContent editor={editor} className={s.new_comment}/>

            {enable &&
                <>
                    <div className="character-count">
                        {editor?.storage.characterCount.characters()}/{limit} Символов
                        <br />
                        {editor?.storage.characterCount.words()} Слов
                    </div>
                    <Button>Отправить</Button>
                </>}

        </form>
    )
}