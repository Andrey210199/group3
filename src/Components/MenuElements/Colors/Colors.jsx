
export default function Colors({ editor, color }) {
    return (
        <>
            <button onClick={() => editor.chain().focus().toggleHighlight({ color: color }).run()}
                className={editor.isActive("highlight") ? "is-active" : ""}>Highlight</button>

            <button onClick={() => { editor.chain().focus().setColor(color).run() }}>color</button>
        </>
    )
}