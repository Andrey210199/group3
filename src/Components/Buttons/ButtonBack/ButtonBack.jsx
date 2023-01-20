import { useNavigate } from "react-router-dom";
import s from "./index.module.css";
import "../../../index.css";
import Button from "../Button/Button";

export default function ButtonBack() {
    const navigate =useNavigate();
    function handleClick(e) {
        e.preventDefault();
        navigate(-1);
        
    }
    return (

        <Button className ={s.back} onClick={handleClick}>Назад</Button>
    )
}