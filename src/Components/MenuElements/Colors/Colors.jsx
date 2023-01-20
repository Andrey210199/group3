
import s from "./index.module.css";
import cn from "classnames";
import "../../../index.css";
import ButtonMenu from "../../Buttons/ButtonMenu/ButtonMenu";
export default function Colors({ editor, color }) {
    return (
        <>
            <ButtonMenu onClick={() => editor.chain().focus().toggleHighlight({ color: color }).run()}
                className={cn(s.highlight, editor.isActive("highlight") ? "elem_active" : "")}
                title="Заливка текста">
            </ButtonMenu>

            <ButtonMenu onClick={() => { editor.chain().focus().setColor(color).run() }}
                className={s.color_text}
                title="Цвет текста">
            </ButtonMenu>
        </>
    )
}