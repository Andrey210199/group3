import line from "./line.png"
export default function HorizontalRule({ editor }) {
    return (
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <img src={line} alt="Горизонталная линия" title="Горизонталная линия"/>
        </button>
    )
}