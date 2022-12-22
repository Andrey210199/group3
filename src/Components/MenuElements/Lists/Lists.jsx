

export default function Lists({ editor }) {
    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}>
                bullet list
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}>
                ordered list
            </button>
        </>
    )
}