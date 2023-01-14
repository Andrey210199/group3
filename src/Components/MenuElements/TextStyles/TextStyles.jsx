import bold from "./img/bold.png";
import italic from "./img/italic.png";
import strike from "./img/strike.png";
import underline from "./img/underline.png";
import cn from "classnames";
import "../../../index.css"
export default function TextStyles({ editor, addActiveStyle }) {
 
    return (
        <>
            <button
                onClick={(val) => {
                    addActiveStyle(val);
                    return editor.chain().focus().toggleBold().run()}}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={cn("menu_button", editor.isActive('bold') ? 'is-active' : '')}>
                <img src={bold} alt="Жирный" title="Жирный"/>
            </button>

            <button
                onClick={(val) => {
                    addActiveStyle(val);
                    return editor.chain().focus().toggleItalic().run()}}
                disabled={
                    !editor.can().chain().focus().toggleItalic().run()}
                    className={cn("menu_button", editor.isActive('italic') ? 'is-active' : '')} 
                >
                <img src={italic} alt="Курсив" title="Курсив"/>
            </button>

            <button
                onClick={(val) => {
                    addActiveStyle(val);
                    return editor.chain().focus().toggleStrike().run()}}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={cn("menu_button", editor.isActive('strike') ? 'is-active' : '')}>
                <img src={strike} alt="Зачеркнутый" title="Зачеркнутый"/>
            </button>

            <button onClick={(val) => {
                addActiveStyle(val);
                return editor.chain().focus().toggleUnderline().run()}}
                className={cn("menu_button", editor.isActive('underline') ? 'is-active' : '')}>
                <img src={underline} alt="Подчеркнутый" title="Подчеркнутый"/>
            </button>

            <button onClick={(val) => {
                addActiveStyle(val);
                return editor.chain().focus().unsetAllMarks().clearNodes().run()}}
                className="menu_button-text">
                Очистить стили
            </button>
        </>
    )
}