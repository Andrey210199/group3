
export default function Blockquote({ editor }) {

    return (
        <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}>
            blockquote
        </button>
    )

}