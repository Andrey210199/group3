import { createPortal } from "react-dom";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import s from "./index.module.css";
import "../../../index.css"
import FormInput from "../../FormInput/FormInput";
import Button from "../Button/Button";
import ButtonMenu from "../ButtonMenu/ButtonMenu";



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

      <ButtonMenu onClick={positionCalc}>{text}</ButtonMenu>

      {active &&
        createPortal(<Modal active={active} setActive={setActive} style={{ position: "fixed", left: position?.x, top: position?.y }}>
          <div>
            <FormInput value={value} type="text" clear={() => setValue("")} change={(value) => setValue(value)} />
            <Button onClick={(e) => { installLink(e); setActive(false) }} btnClass={false}>Ok</Button>
            <Button onClick={() => { setActive(false); setValue("") }} btnClass={false}>Cancel</Button>
          </div>

        </Modal>, document.body)}

    </span>
  )
}