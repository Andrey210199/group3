import { createPortal } from "react-dom";
import { useState } from "react";
import Modal from "../Modal/Modal";
import s from "./index.module.css";

export default function ButtonWithPopup({ event, text }) {

  const [value, setValue] = useState("");
  const [position, setPosition] = useState();
  const [active, setActive] = useState(false);

  function installLink() {
    event(value);
    setValue("");
  }

  return (
    <span className={s.content}>

      <button onClick={(e) => { setPosition({ x: e.clientX, y: e.clientY }); setActive(true) }
      }>{text}</button>

      {active &&
        createPortal(<Modal setActive={setActive} style={{ position: "fixed", left: position?.x - 100, top: position?.y + 20 /*Костыль на время*/ }}>
          <div>
            <input value={value} type="text" onChange={(e) => setValue(e.target.value)} />
            <button onClick={(e) => { installLink(e); setActive(false) }}>Ok</button>
            <button onClick={() =>{ setActive(false); setValue("")} }>Cancel</button>
          </div>

        </Modal>, document.body)}

    </span>
  )
}