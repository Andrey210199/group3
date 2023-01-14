
export default function Conversion({ editor, addActiveStyle }) {
    return (
        <>
            <button
            className="menu_button-text"
                onClick={(val) => {
                    addActiveStyle(val);
                    editor.chain().focus().undo().run()}}
                disabled={!editor.can().chain().focus().undo().run()}>
                Отменить
            </button>

            <button
            className="menu_button-text"
                onClick={(val) =>{
                    addActiveStyle(val);
                    editor.chain().focus().redo().run()}}
                disabled={!editor.can().chain().focus().redo().run()}>
                Вернуть
            </button>
        </>
    )
}