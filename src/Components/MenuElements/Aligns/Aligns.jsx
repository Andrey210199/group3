
import s from "./index.module.css";
import cn from "classnames";


export default function Aligns({ editor }) {

    function selectAlign(val){

        return editor.chain().focus().setTextAlign(val.target.outerText).run();
    }

    return (
        <>
            <button value="left" onClick={selectAlign} className={cn(s.button, s.left, editor.isActive({ textAlign: "left" }) ? 'elem_active' : '')}><p className={s.hidden} title="Выровнять влево">left</p></button>
            <button value="right" onClick={selectAlign} className={cn(s.button, s.right, editor.isActive({ textAlign: "right" }) ? 'elem_active' : '')}><p  className={s.hidden} title="Выровнять вправо">right</p></button>
            <button value="center" onClick={selectAlign} className={cn(s.button, s.center, editor.isActive({ textAlign: "center" }) ? 'elem_active' : '')}><p  className={s.hidden} title="По центру">center</p></button>
        </>
    )

}