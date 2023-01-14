import { useEffect } from "react";
import { useState } from "react";
import { forwardRef } from "react";

const FormInput = forwardRef(({ value="", ...props }, ref) => {
    
    const [text, setText] = useState(value);

    useEffect(()=>{
        setText(value);
    }, [value])


    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <input {...props} value={text} onChange={handleChange} ref={ref} />
    )
})

export default FormInput;