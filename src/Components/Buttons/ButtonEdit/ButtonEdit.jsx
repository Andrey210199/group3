import { useState } from "react";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { getToken } from "../../../Utilites/Cookie";
import Button from "../Button/Button";
import s from "./index.module.css"

export default function ButtonEdit({ author, isEnable }) {

    const currentUser = useSelector(state => state[NAMEUSERSLICE].data);
    const [enable, setEneble] = useState(false);

    function hangleClick() {
        isEnable(!enable);
        setEneble();
    }

    return (
        getToken() && currentUser?._id === author?._id &&
        <Button className={s.btn_edit} onClick={hangleClick} btnClass={false}>Редактировать</Button>
    )
}