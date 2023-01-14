import { createPortal } from "react-dom";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import s from "./index.module.css";

export default function ButtonWithPopup({ event, text }) {

  const [value, setValue] = useState("");
  const [position, setPosition] = useState();
  const [active, setActive] = useState(false);

  function installLink() {
    event(value);
    setValue("");
  }

  function positionCalc(e) {
    const parent = e.target.parentNode.getBoundingClientRect();
    setPosition({ x: parent.x - parent.width, y: parent.y + parent.height });
    setActive(true);
  }


  return (
    <span className={s.content}>

      <button onClick={positionCalc}>{text}</button>

      {active &&
        createPortal(<Modal active={active} setActive={setActive} style={{ position: "fixed", left: position?.x, top: position?.y }}>
          <div>
            <input value={value} type="text" onChange={(e) => setValue(e.target.value)} />
            <button onClick={(e) => { installLink(e); setActive(false) }}>Ok</button>
            <button onClick={() => { setActive(false); setValue("") }}>Cancel</button>
          </div>

        </Modal>, document.body)}

    </span>
  )
}