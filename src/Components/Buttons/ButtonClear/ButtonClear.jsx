import cn from "classnames";
import Button from "../Button/Button";

import { ReactComponent as ClearIcon } from "./img/clear.svg";
import s from "./index.module.css";

export default function ButtonClear({ onClick }) {

    function handleClear(e) {
        onClick && onClick(e);
    }

    return (
        <Button type="button" className={cn(s.btn, s.btn__clear)} onClick={handleClear} btnClass={false}><ClearIcon className={s.icon} /></Button>
    )
}