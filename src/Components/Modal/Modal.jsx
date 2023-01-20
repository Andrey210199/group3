import cn from "classnames";
import { useNavigate } from "react-router";

import s from "./index.module.css";

export default function Modal({ active, setActive, children, ...props }) {

    const navigate = useNavigate();

    return (
        <div className={s.modal} onClick={() => {
            setActive ? setActive(false): navigate(-1)}}>

            <div className={cn(s.modal__content, { [s.modal__content_active]: active })} {...props} onClick={(e) => { e.stopPropagation() }}>
                {children}
            </div>

        </div>
    )
}