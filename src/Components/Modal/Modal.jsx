import cn from "classnames";

import s from "./index.module.css";

export default function Modal({active, setActive, children}){
    return(
        <div className={s.modal} onClick={()=> setActive(false)}>

            <div className={cn(s.modal__content, {[s.modal__content_active]: active})} onClick={(e)=> {e.stopPropagation(); e.preventDefault()}}>
                {children}
            </div>

        </div>
    )
}