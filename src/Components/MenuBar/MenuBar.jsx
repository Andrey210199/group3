import { useState } from "react";
import ButtonWithPopup from "../Buttons/ButtonWithPopup/ButtonWithPopup";
import Aligns from "../MenuElements/Aligns/Aligns";
import Blockquote from "../MenuElements/Blockquote/Blockquote";
import Codes from "../MenuElements/Codes/Codes";
import Colors from "../MenuElements/Colors/Colors";
import Conversion from "../MenuElements/Conversion/Conversion";
import Headers from "../MenuElements/Headers/Headers";
import HorizontalRule from "../MenuElements/HorizontalRule/HorizontalRule";
import Lists from "../MenuElements/Lists/Lists";
import TextStyles from "../MenuElements/TextStyles/TextStyles";

export default function MenuBar({ editor }) {

  const [color, setColor] = useState("#000000");

  function changeLink(value) {
    return editor.chain().focus().extendMarkRange("link").toggleLink({ href: value }).run();
  }

  function changeImg(value) {
    return editor.chain().focus().setImage({ src: value }).run();
  }

  if (!editor) {
    return null;
  }
  return (
    <>

      <div onClick={(e) => e.preventDefault()}>

        <TextStyles editor={editor} />

        <Codes editor={editor} />

        <Headers editor={editor} />

        <Lists editor={editor} />

        <Blockquote editor={editor} />

        <HorizontalRule editor={editor} />

        <ButtonWithPopup editor={editor} event={changeImg} text="image" />
        <ButtonWithPopup editor={editor} event={changeLink} text="link" />

        <Colors editor={editor} color={color} />

        <Aligns editor={editor} />

        <Conversion editor={editor} />

      </div>

      <input type="color"
        onInput={(e) => setColor(e.target.value)}
        value={color} />

    </>
  )

}