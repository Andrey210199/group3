import s from "./index.module.css";
import cn from "classnames";
import "../../../index.css"

export default function Conversion({ editor }) {
    return (
        <>
            <button
            className={cn("menu_button", s.back)}
            title="Отменить изменения"
                onClick={(val) =>  editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}>
               
            </button>

            <button
            className={cn("menu_button", s.forward)}
            title="Вернуть изменения"
                onClick={(val) => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}>
                
            </button>
        </>
    )
}