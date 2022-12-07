
import { useState } from "react";
import Modal from "../Modal/Modal";
import s from "./index.module.css";

export default function ButtonWithPopup({editor, active, setActive, event, text}){

    const [value, setValue] = useState("");

    function installLink(){
        event(value);
    }

    return(
        <span className={s.content}>

      <button onClick={()=>setActive(true)}>{text}</button>

       { active && <Modal setActive={setActive}>
          <div>
            <input value={value} type="text" onChange={(e)=> setValue(e.target.value)}/>
            <button onClick={(e)=>{installLink(e); setActive(false)}}>Ok</button>
            <button onClick={()=> setActive(false)}>Cancel</button>
          </div>

        </Modal>}

      </span>
    )
}