
import s from "./index.module.css";
import cn from "classnames";
import "../../../index.css";
export default function Colors({ editor, color }) {
    return (
        <>
            <button onClick={() => editor.chain().focus().toggleHighlight({ color: color }).run()}
                className={cn("menu_button", s.highlight, editor.isActive("highlight") ? "elem_active" : "")}
                title="Заливка текста">
                   
                </button>

            <button onClick={() => { editor.chain().focus().setColor(color).run() }}
            className={cn("menu_button", s.color_text)}
            title="Цвет текста">
          
            </button>
        </>
    )
}