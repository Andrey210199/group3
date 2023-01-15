
import cn from "classnames";
import s from "./index.module.css";
import "../../../index.css";
export default function TextStyles({ editor}) {
 
    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                    title="Жирный"
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn("menu_button", s.bold, editor.isActive('bold') ? 'elem_active' : '')}>
           
            </button>

            <button
            title="Курсив"
                onClick={() =>  editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can().chain().focus().toggleItalic().run()}
                    className={cn("menu_button", s.italic, editor.isActive('italic') ? 'elem_active' : '')} 
                >
 
            </button>
            <button 
            title="Подчеркнутый"onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={cn("menu_button", s.underline, editor.isActive('underline') ? 'elem_active' : '')}>
              
            </button>
            <button
            title="Зачеркнутый"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={cn("menu_button", s.strike, editor.isActive('strike') ? 'elem_active' : '')}>
              
            </button>

           

            <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className={cn("menu_button", s.clear)}
                title="Очистить стили">
                
            </button>
        </>
    )
}