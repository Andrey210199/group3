import { Favorite } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../../Constants/StorageConstants";
import { isLiked } from "../../../Utilites/total";


export default function ButtonLike({ post, onLike }) {

  const currentUser = useSelector(state => state[NAMEUSERSLICE].data);
  const { likes } = post;
  const liked = isLiked(likes, currentUser?._id);

  function handleLike() {
    onLike(post);
  }

  return (

    <Tooltip title={"Liked"}>
      <IconButton
        aria-label="add to favorites"
        onClick={handleLike}
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