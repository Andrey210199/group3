
export default function Headers({ editor }) {

    function selectHeader(val) {
        return editor.chain().focus().toggleHeading({ level: Number(val.target.value) }).run();
    }

    return (
        <select onClick={(e) => e.button !== 0 ? selectHeader(e) : ""}>
            <option value={1}>h1</option>
            <option value={2}>h2</option>
            <option value={3}>h3</option>
            <option value={4}>h4</option>
            <option value={5}>h5</option>
            <option value={6}>h6</option>
        </select>
    )

}