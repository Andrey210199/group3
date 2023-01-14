
export default function Headers({ editor }) {

    function selectHeader(val) {
        return editor.chain().focus().toggleHeading({ level: Number(val.target.value) }).run();
    }

    return (
        <select onClick={(e) => e.button !== 0 ? selectHeader(e) : ""}>
            <option value={1}>Заголовок 1</option>
            <option value={2}>Заголовок 2</option>
            <option value={3}>Заголовок 3</option>
            <option value={4}>Заголовок 4</option>
            <option value={5}>Заголовок 5</option>
            <option value={6}>Заголовок 6</option>
        </select>
    )

}