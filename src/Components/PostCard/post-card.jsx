import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Avatar,
  Badge,
  Tooltip,
  IconButton,
  Typography,

} from "@mui/material";
import { Favorite, Delete } from "@mui/icons-material";
import s from "./index.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useContext } from "react";
import { PostContext } from "../../context/postContext";
import { isLiked } from "../../Utilites/total";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NAMEUSERSLICE } from "../../Constants/StorageConstants";
import { fetchChangeLike, fetchDeletePost } from "../../Storage/Slices/PostsSlile";

dayjs.locale("ru");

const PostCard = (props) => {
  const { _id, author, created_at, image, text, title, likes } = props;
  //const { deletePost } = useContext(PostContext);
  const currentUser = useSelector(state => state[NAMEUSERSLICE].data);
  const liked = isLiked(likes, currentUser._id);
  const dispatch = useDispatch();

  function handleLike() {
    dispatch(fetchChangeLike(props));
  }
  const handleClickDel = () => {
    if (window.confirm("Вы уверены, что хотите удалить пост?")) dispatch(fetchDeletePost(props));
  };





  return (

    <Card className={s.card} sx={{ maxWidth: 270, borderRadius: 0, backgroundColor: 'inherit', boxShadow: 0 }}>
      <CardMedia component="img" height="195" image={image} alt={title} />
      <CardHeader
        avatar={
          <Avatar
            src={author?.avatar && author?.avatar}
            aria-label="recipe"
          >
            {author?.name.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={author?.name}
        subheader={dayjs(created_at).format("dddd, D MMMM YYYY")}
      />

      <CardContent sx={{ paddingTop: 0, textAlign: 'center' }}>
        <Typography variant="h6" component="h2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" noWrap color="text.secondary">
          {text}
        </Typography>

      </CardContent>
      <CardActions className={s.margin} disableSpacing>
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

        {
          currentUser._id === author._id &&
          <Tooltip title="Delete" onClick={handleClickDel}>
            <IconButton>

              <Delete />
            </IconButton>
          </Tooltip>
        }

        {/* Роутинг на страницу с Подробной карточкой */}
        <Link to={`/post/${_id}`}>Подробнее</Link>
      </CardActions>

    </Card>

  );
};

export default PostCard;
