import { createPortal } from "react-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import s from "./index.module.css";

export default function ButtonWithPopup({editor, active, setActive, event, text}){

    const [value, setValue] = useState("");
    const [position, setPosition] = useState();

    function installLink(){
        event(value);
    }

    return(
        <span className={s.content}>

      <button onClick={(e)=>{setPosition({x: e.clientX, y: e.clientY}); setActive(true)}
    }>{text}</button>

       { active &&
       createPortal(<Modal setActive={setActive} s={s} position={{position: "fixed", left: position?.x-100, top: position?.y+20 /*Костыль на время*/}}>
          <div>
            <input value={value} type="text" onChange={(e)=> setValue(e.target.value)}/>
            <button onClick={(e)=>{installLink(e); setActive(false)}}>Ok</button>
            <button onClick={()=> setActive(false)}>Cancel</button>
          </div>

        </Modal>, document.body)}

      </span>
    )
}