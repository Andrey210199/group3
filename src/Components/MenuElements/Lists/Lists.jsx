
import "../../../index.css";
import s from "./index.module.css";
import cn from "classnames";

export default function Lists({ editor }) {
    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn("menu_button", s.unorder, editor.isActive('bulletList') ? 'elem_active' : '')}
                title="Маркированный список">
               
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn("menu_button", s.order, editor.isActive('orderedList') ? 'elem_active' : '')}
                title="Нумерованный список">
                
            </button>
        </>
    )
}