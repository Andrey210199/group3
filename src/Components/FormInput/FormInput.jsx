import { useEffect } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import s from "./index.module.css";

const FormInput = forwardRef(({ value="", ...props }, ref) => {
    
    const [text, setText] = useState(value);

    useEffect(()=>{
        setText(value);
    }, [value])


    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <input className={s.input} {...props} value={text} onChange={handleChange} ref={ref} />
    )
})

export default FormInput;