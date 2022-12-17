

export default function Aligns({ editor }) {

    function selectAlign(val){
        return editor.chain().focus().setTextAlign(val.target.value).run();
    }

    return (
        <>
            <button value="left" onClick={selectAlign} className={editor.isActive({ textAlign: "left" }) ? 'is-active' : ''}>left</button>
            <button value="right" onClick={selectAlign} className={editor.isActive({ textAlign: "right" }) ? 'is-active' : ''}>right</button>
            <button value="center" onClick={selectAlign} className={editor.isActive({ textAlign: "center" }) ? 'is-active' : ''}>center</button>
        </>
    )

}