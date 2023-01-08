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
import { UserContext } from "../../context/userContext";
import ButtonDelete from "../Buttons/ButtonDelete/ButtonDelete";
import ButtonLike from "../Buttons/ButtonLike/ButtonLike";
import { Link } from "react-router-dom";

dayjs.locale("ru");

const PostCard = ({  _id, author, created_at, image, text, title, likes,}) => {
  const {deletePost, handleLiked :onLiked} = useContext(PostContext);
  const { currentUser } = useContext(UserContext);
  const liked = isLiked(likes, currentUser._id);
  const handleLike = () => {
    onLiked(_id, liked);
  };
  const handleClickDel = () => {
    if (window.confirm("Вы уверены, что хотите удалить пост?")) deletePost(_id);
  };

  return (
    <Card
      className={s.card}
      sx={{
        maxWidth: 270,
        borderRadius: "20px",
        backgroundColor: "inherit",
        boxShadow: 0,
      }}
    >
      <Link to={`/post/${_id}`} className={s.link}>
      <CardMedia component="img" height="195" image={image} alt={title} />
      <CardHeader
      
        avatar={
          <Avatar src={author?.avatar && author?.avatar} aria-label="recipe">
            {author?.name.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        title={author?.name}
        subheader={dayjs(created_at).format("dddd, D MMMM YYYY")}
        sx={{ color: "inherit"}}
        
      />

      <CardContent sx={{ paddingTop: 0, textAlign: "center" }}>
        <Typography variant="h6" component="h2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" noWrap color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      </Link>
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

        

        {/* Роутинг на страницу с Подробной карточкой */}
        
      <ButtonDelete author ={author} onDelete = {handleClickDel} style = {{position: "absolute", right: "15px"}}/>

      </CardActions>
    </Card>

  )}
export default PostCard;
