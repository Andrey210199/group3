import order from "./img/ordered.png";
import unorder from "./img/unordered.png";

export default function Lists({ editor }) {
    return (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}>
                <img src={unorder} alt="Маркированный список" title="Маркированный список"/>
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}>
                <img src={order} alt="Нумерованный список" title="Нумерованный список"/>
            </button>
        </>
    )
}