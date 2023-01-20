import cn from "classnames";

import cs from "./index.module.css";

export default function Button({ children, ...props }){

    return (
        <button {...props} className={cn(cs.btn, props.className)}>{children}</button>
    )
}