
import Button from "../Button/Button";
import s from "./index.module.css";

export default function ButtonForm({ children, type = "button", onClick }) {

    function handleClick(e) {
        e.preventDefault();
        onClick(e)
    }

    return (
        <Button type={type} className={s.btn} onClick={onClick && handleClick} btnClass={false}>{children}</Button>
    )
}