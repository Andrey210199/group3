import { Favorite } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { getToken } from "../../../Utilites/Cookie";
import { isLiked } from "../../../Utilites/total";


export default function ButtonLike({ likes, onLike, iconSize = "medium" }) {

  const currentUser = useSelector(state => state[NAMEUSERSLICE].data);
  const liked = isLiked(likes, currentUser?._id);

  function handleLike() {
    onLike();
  }

  return (
    getToken() &&
    <Tooltip title={"Liked"}>
      <IconButton
        aria-label="add to favorites"
        onClick={handleLike}
        size={iconSize}
        sx={[liked && { color: "#942a00" }]}

      >
        <Badge
          badgeContent={likes.length}
          color="error"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Favorite />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}