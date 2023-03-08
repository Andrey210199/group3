import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MAXCHARACTERS } from "../../Constants/Constant";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchSetRewiew } from "../../Storage/Slices/SinglePostSlice";
import MenuBarComment from "../MenuBarComment/MenuBarComment";
import Button from "../Buttons/Button/Button";

import s from "./index.module.css";


export default function CommentEditor({ enable = false, content }) {

    const { _id: postId } = useSelector(state => state[NAMESINGLEPOSTSLICE].data);
    const limit = MAXCHARACTERS;
    const dispatch = useDispatch();

    function handleSubmit(evt) {
        evt.preventDefault();
        editor.getText().trim() && dispatch(fetchSetRewiew({ postId, comment: editor.getHTML() }));
        editor.commands.setContent("");

    }

    const editor = useEditor({
        editorProps: {
            attributes: {
                class: enable ? s.text : s.text_active

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

        <form className={s.formComment} onSubmit={handleSubmit}>

            {enable &&
                <div className={s.formComment__header}>

                    <h3 className={s.formComment__title}>Добавить комментарий</h3>
                    <MenuBarComment editor={editor} className={s.formComment__menu} />

                </div>}

            <EditorContent editor={editor} className={s.formComment__editor} />

            {enable &&
                <>
                    <div className={s.character_count}>
                        {editor?.storage.characterCount.characters()}/{limit} Символов
                        <br />
                        {editor?.storage.characterCount.words()} Слов
                    </div>
                    <Button>Отправить</Button>
                </>}

        </form>
    )
}