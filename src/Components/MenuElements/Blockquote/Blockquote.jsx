import blockquote from "./blockquote.png"
export default function Blockquote({ editor }) {

    return (
        <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}>
            <img src={blockquote} alt="Цитата" title="Цитата"/>
        </button>
    )

}