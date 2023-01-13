import s from "./index.module.css"

export default function Conversion({ editor }) {
    return (
        <>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}>
                undo
            </button>

            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}>
                redo
            </button>
        </>
    )
}