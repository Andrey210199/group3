import { useNavigate } from "react-router-dom";
import s from "./index.module.css";
import "../../../index.css";
import cn from "classnames";

export default function ButtonBack() {
    const navigate =useNavigate();
    function handleClick(e) {
        e.preventDefault();
        navigate(-1);
        
    }
    return (

        <button className ={cn("btn", s.back)} onClick={handleClick}>Назад</button>
    )
}