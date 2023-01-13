import ButtonWithPopup from "../Buttons/ButtonWithPopup/ButtonWithPopup";
import Codes from "../MenuElements/Codes/Codes"
import Conversion from "../MenuElements/Conversion/Conversion";
import TextStyles from "../MenuElements/TextStyles/TextStyles"

export default function MenuBarComment({ editor }) {

    function changeLink(value) {
        return editor.chain().focus().extendMarkRange("link").toggleLink({ href: value }).run();
    }

    if (!editor) return null

    return (
        <div onClick={(e) => e.preventDefault()}>

            <TextStyles editor={editor} />
            <Codes editor={editor} />
            <ButtonWithPopup editor={editor} event={changeLink} text="link" />
            <Conversion editor={editor} />

        </div>
    )

}