import cn from "classnames";

import style from "./index.module.css";

export default function Modal({active, setActive, children, s=style, position}){
    return(
        <div className={s.modal} onClick={()=> setActive(false)}>

            <div className={cn(s.modal__content, {[s.modal__content_active]: active})} style={position} onClick={(e)=> {e.stopPropagation(); e.preventDefault()}}>
                {children}
            </div>

        </div>
    )
}