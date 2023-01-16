import { useState } from "react";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { getToken } from "../../../Utilites/Cookie";
import s from "./index.module.css"

export default function ButtonEdit({ author, isEnable }) {

    const currentUser = useSelector(state => state[NAMEUSERSLICE].data);
    const [enable, setEneble] = useState(false);

    function hangleClick() {
        isEnable(!enable);
        setEneble(!enable);
    }

    return (
       /* getToken() &&  */ currentUser?._id === author?._id &&
        <button className={s.btn_edit} onClick={hangleClick}>Редактировать</button>
    )
}