
import s from "./index.module.css";
import cn from "classnames";


export default function Aligns({ editor }) {
    function addActiveStyle(el){
        const style_element = document.querySelector(`.${s.elem_active}`);
        style_element&&style_element.classList.remove(`${s.elem_active}`);
        el.target.classList.add(`${s.elem_active}`);     
    }
    function selectAlign(val){
        addActiveStyle(val);
        console.log(val);
        return editor.chain().focus().setTextAlign(val.target.outerText).run();
    }

    return (
        <>
            <button value="left" onClick={selectAlign} className={cn(s.left, editor.isActive({ textAlign: "left" }) ? 'is-active' : '')}><p className={s.hidden} title="Выровнять влево">left</p></button>
            <button value="right" onClick={selectAlign} className={cn(s.right, editor.isActive({ textAlign: "right" }) ? 'is-active' : '')}><p  className={s.hidden} title="Выровнять вправо">right</p></button>
            <button value="center" onClick={selectAlign} className={cn(s.center,editor.isActive({ textAlign: "center" }) ? 'is-active' : '')}><p  className={s.hidden} title="По центру">center</p></button>
        </>
    )

}