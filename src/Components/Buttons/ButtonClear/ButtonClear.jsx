import cn from "classnames";

import { ReactComponent as ClearIcon } from "./img/clear.svg";
import s from "./index.module.css";

export default function ButtonClear({ onClick }) {

    function handleClear(e){
        onClick && onClick(e);
    }

    return (
        <button type="button" className={cn(s.btn, s.btn__clear)} onClick={handleClear}><ClearIcon className={s.icon} /></button>
    )
}