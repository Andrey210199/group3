import cn from "classnames";

import cs from "./index.module.css";

export default function Button({ children, btnClass = true, ...props }) {

    return (
        <button {...props} className={cn({ [cs.btn]: btnClass }, props.className)}>{children}</button>
    )
}