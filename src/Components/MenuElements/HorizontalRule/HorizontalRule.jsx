import s from "./index.module.css";
import ButtonMenu from "../../Buttons/ButtonMenu/ButtonMenu";

export default function HorizontalRule({ editor }) {
    return (
        <ButtonMenu onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={s.line}
            title="Горизонталная линия">
        </ButtonMenu>
    )
}