
export default function TextStyles({ editor }) {
    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}>
                bold
            </button>

            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}>
                italic
            </button>

            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}>
                strike
            </button>

            <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'is-active' : ''}>
                underline
            </button>

            <button onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
                clear style
            </button>
        </>
    )
}