import s from "./index.module.css";
import cn from "classnames";
import "../../../index.css"
import ButtonMenu from "../../Buttons/ButtonMenu/ButtonMenu";

export default function Conversion({ editor }) {
    return (
        <>
            <ButtonMenu
                className={cn("menu_button", s.back)}
                title="Отменить изменения"
                onClick={(val) => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}>

            </ButtonMenu>

            <ButtonMenu
                className={cn("menu_button", s.forward)}
                title="Вернуть изменения"
                onClick={(val) => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}>
            </ButtonMenu>
        </>
    )
}