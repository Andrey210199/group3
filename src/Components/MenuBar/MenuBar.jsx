import { useState } from "react";
import ButtonWithPopup from "../Buttons/ButtonWithPopup/ButtonWithPopup";
import Aligns from "../MenuElements/Aligns/Aligns";
import Blockquote from "../MenuElements/Blockquote/Blockquote";

import Colors from "../MenuElements/Colors/Colors";
import Conversion from "../MenuElements/Conversion/Conversion";
import Headers from "../MenuElements/Headers/Headers";
import HorizontalRule from "../MenuElements/HorizontalRule/HorizontalRule";
import Lists from "../MenuElements/Lists/Lists";
import TextStyles from "../MenuElements/TextStyles/TextStyles";
import s from "./index.module.css";
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
      <input
        className={s.colors}
        type="color"
        onInput={(e) => setColor(e.target.value)}
        value={color}
      />
      <div className={s.menu_bar} onClick={(e) => e.preventDefault()}>
        <Headers editor={editor} />
        <Lists editor={editor} />
        <Blockquote editor={editor} />
        <Aligns editor={editor} />
        <Colors editor={editor} color={color} />
        <TextStyles editor={editor} />
        <HorizontalRule editor={editor} />
        <ButtonWithPopup editor={editor} event={changeImg} text="🖼" />
        <ButtonWithPopup editor={editor} event={changeLink} text="🔗" />

        <Conversion editor={editor} />
      </div>
    </>
  );
}
