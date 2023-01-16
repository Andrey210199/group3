import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { getToken } from "../../../Utilites/Cookie";

export default function ButtonDelete({ author, onDelete, style }) {

    const currentUser = useSelector(state => state[NAMEUSERSLICE].data);

    function handleClickDel() {
        onDelete();
    }

    return (

       /* getToken()&& */ currentUser?._id === author?._id &&
        currentUser?._id === author?._id &&
        <Tooltip title="Delete" onClick={handleClickDel} sx={style}>
            <IconButton>
                <Delete />
            </IconButton>
        </Tooltip>

    )
}