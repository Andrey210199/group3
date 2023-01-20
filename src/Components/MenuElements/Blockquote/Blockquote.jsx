import s from "./index.module.css";
import "../../../index.css";
import cn from "classnames";
import ButtonMenu from "../../Buttons/ButtonMenu/ButtonMenu";
export default function Blockquote({ editor }) {

    return (
        <ButtonMenu
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            title="Цитата"
            className={cn(s.blockquote, editor.isActive('blockquote') ? 'elem_active' : '')}>
        </ButtonMenu>
    )

}