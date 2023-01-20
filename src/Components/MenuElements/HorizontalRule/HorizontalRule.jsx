import s from "./index.module.css";
import "../../../index.css";
import cn from "classnames";

export default function HorizontalRule({ editor }) {
    return (
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={cn("menu_button", s.line)}
        title="Горизонталная линия"
        >
       
        </button>
    )
}