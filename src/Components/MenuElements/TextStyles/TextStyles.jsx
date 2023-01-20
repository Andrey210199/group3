
import cn from "classnames";
import s from "./index.module.css";
import "../../../index.css";
import ButtonMenu from "../../Buttons/ButtonMenu/ButtonMenu";
export default function TextStyles({ editor }) {

    return (
        <>
            <ButtonMenu
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Жирный"
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn(s.bold, editor.isActive('bold') ? 'elem_active' : '')}>
            </ButtonMenu>

            <ButtonMenu
                title="Курсив"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can().chain().focus().toggleItalic().run()}
                className={cn(s.italic, editor.isActive('italic') ? 'elem_active' : '')}>
            </ButtonMenu>

            <ButtonMenu
                title="Подчеркнутый" onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={cn(s.underline, editor.isActive('underline') ? 'elem_active' : '')}>
            </ButtonMenu>

            <ButtonMenu
                title="Зачеркнутый"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={cn(s.strike, editor.isActive('strike') ? 'elem_active' : '')}>
            </ButtonMenu>



            <ButtonMenu onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className={cn(s.clear)}
                title="Очистить стили">
            </ButtonMenu>
        </>
    )
}