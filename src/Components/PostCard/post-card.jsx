import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Avatar,
  Badge,
  Tooltip,
  IconButton,
  Typography,

} from "@mui/material";
import { Favorite, ExpandMore, Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import s from "./index.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { useContext } from "react";
import { PostContext } from "../../context/postContext";
import { isLiked } from "../../Utilites/total";
import { UserContext } from "../../context/userContext";

dayjs.locale("ru");

const PostCard = ({  _id, author, created_at, image, text, title, likes,}) => {
  const {deletePost, handleLiked :onLiked} = useContext(PostContext);
  const {currentUser} = useContext(UserContext);
  const liked = isLiked(likes, currentUser._id);

  const handleLike = () => {
    onLiked(_id, liked);
  };
  const handleClickDel = () => {
    if (window.confirm("Вы уверены, что хотите удалить пост?")) deletePost(_id);
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
         
          <CardContent sx={{paddingTop: 0, textAlign:'center'}}>
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
                onClick ={handleLike}
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
                  <Favorite/>
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
            <button>Подробнее</button> 
          </CardActions>

        </Card>

  );
};

export default PostCard;
