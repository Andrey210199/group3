import "../../../index.css";
import s from "./index.module.css";
import cn from "classnames";
import ButtonMenu from "../../Buttons/ButtonMenu/ButtonMenu";

export default function Lists({ editor }) {
    return (
        <>
            <ButtonMenu
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(s.unorder, editor.isActive('bulletList') ? 'elem_active' : '')}
                title="Маркированный список">
            </ButtonMenu>

            <ButtonMenu
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(s.order, editor.isActive('orderedList') ? 'elem_active' : '')}
                title="Нумерованный список">
            </ButtonMenu>
        </>
    )
}