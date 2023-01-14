import colorText from "./img/color.png";
import highlight from "./img/highlight.png";
export default function Colors({ editor, color }) {
    return (
        <>
            <button onClick={() => editor.chain().focus().toggleHighlight({ color: color }).run()}
                className={editor.isActive("highlight") ? "is-active" : ""}>
                    <img src={highlight} alt="Заливка текста" title="Заливка текста"/>
                </button>

            <button onClick={() => { editor.chain().focus().setColor(color).run() }}>
            <img src={colorText} alt="Цвет  текста" title="Цвет текста"/>
            </button>
        </>
    )
}