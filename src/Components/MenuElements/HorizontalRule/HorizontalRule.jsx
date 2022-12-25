
export default function HorizontalRule({ editor }) {
    return (
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            horizontal rule
        </button>
    )
}