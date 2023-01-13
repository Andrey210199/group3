import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,

} from "@mui/material";
import s from "./index.module.css";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchChangeLike, fetchDeletePost } from "../../Storage/Slices/PostsSlile";
import ButtonLike from "../Buttons/ButtonLike/ButtonLike";
import ButtonDelete from "../Buttons/ButtonDelete/ButtonDelete";

dayjs.locale("ru");

const PostCard = (props) => {
  const { _id, author, created_at, image, text, title } = props;
  const dispatch = useDispatch();

  function handleLike(post) {
    dispatch(fetchChangeLike(post));
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
          {text.slice(0,100).replace(/(<([^>]+)>)/g,"")}
        </Typography>

      </CardContent>
      <CardActions className={s.margin} disableSpacing>

        <ButtonLike post={props} onLike={handleLike} />

        <ButtonDelete author={author} onDelete={handleClickDel} />

        {/* Роутинг на страницу с Подробной карточкой */}
        <Link to={`/post/${_id}`}>Подробнее</Link>
      </CardActions>

    </Card>

  );
};

export default PostCard;
