import { useEffect } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import ButtonClear from "../Buttons/ButtonClear/ButtonClear";
import cn from "classnames";

import cs from "./index.module.css";

const FormInput = forwardRef(({ val = "", clear, change, ...props }, ref) => {

    const [text, setText] = useState("");

    useEffect(() => {
        val && setText(val);
        props.value && setText(props.value);
    }, [val, props.value])


    function handleChange(e) {
        setText(e.target.value);
        change && change(e.target.value);
    }

    function handleClear() {
        clear && clear(props.name);
        setText("");
    }

    return (
        <div className={cs.content}>
            <input  {...props} value={val ? val : text} onChange={handleChange} ref={ref} />
            <ButtonClear onClick={handleClear} />

        </div>
    )
})

export default FormInput;