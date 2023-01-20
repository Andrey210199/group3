import Button from "../Button/Button";
import cn from "classnames";

import cs from "./index.module.css";

export default function ButtonMenu({ children, ...props }) {

    return (
        <Button {...props} className={cn(cs.menu_button, props.className)} btnClass={false}>{children}</Button>
    )

}