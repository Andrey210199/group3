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

dayjs.locale("ru");

const Post = ({  _id, author, created_at, image, text, title, likes,}) => {
  console.log(author, created_at, image, text, title, likes);

  const ExpandMoreStyle = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
              
          
              >
                <Badge
                  badgeContent={"likes.length"}
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
            <Tooltip title="Delete">
              <IconButton>
                <Delete />
              </IconButton>
            </Tooltip>
            <ExpandMoreStyle
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMore />
            </ExpandMoreStyle>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{text}</Typography>
            </CardContent>
          </Collapse>
        </Card>

  );
};

export default Post;
