
import ButtonWithPopup from "../Buttons/ButtonWithPopup/ButtonWithPopup";

import Conversion from "../MenuElements/Conversion/Conversion";
import TextStyles from "../MenuElements/TextStyles/TextStyles";
import s from "./index.module.css"

export default function MenuBarComment({ editor, addActiveStyle }) {

    function changeLink(value) {
        return editor.chain().focus().extendMarkRange("link").toggleLink({ href: value }).run();
    }

    if (!editor) return null

    return (
        <div className = {s.menu_bar_comment} onClick={(e) => e.preventDefault()}>

            <TextStyles editor={editor} addActiveStyle={addActiveStyle}/>
            <ButtonWithPopup editor={editor}  addActiveStyle={addActiveStyle} event={changeLink} text="🔗" />
            <Conversion editor={editor}  addActiveStyle={addActiveStyle} />

        </div>
    )

}