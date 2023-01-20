import s from "./index.module.css";
import "../../../index.css";
import cn from "classnames";
export default function Blockquote({ editor }) {

    return (
        <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Цитата"
            className={cn("menu_button", s.blockquote, editor.isActive('blockquote') ? 'elem_active' : '')}>
        
        </button>
    )

}