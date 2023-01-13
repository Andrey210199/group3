import { useState } from "react";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";


export default function ButtonEdit({author, isEnable}){

    const currentUser = useSelector(state => state[NAMEUSERSLICE].data);
    const [enable, setEneble] = useState(false);

    function hangleClick(){
        isEnable(!enable);
        setEneble(!enable);
    }

    return(
        currentUser?._id === author?._id &&
        <button onClick={hangleClick}>Редактировать</button>
    );
}