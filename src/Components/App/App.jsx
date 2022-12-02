import { useEffect, useState } from "react";
import PostPage from "../../Pages/PostPage/PostPage"
import api from "../../Utilites/Api";

import './App.css';

export default function App() {

  const [currentUser, setCurrentUser]= useState();
  const [currentPost, setCurrentPost] = useState();

  //Получение текущего пользователя и поста (временное)
  useEffect(()=>{
    api.getUsersUser("636a510659b98b038f779d09")
    .then((user)=> setCurrentUser(user));

    api.actionPosts("GET","638251d259b98b038f779d52")
    .then((post)=> setCurrentPost(post));
  },[])

  return (

    <>
    <PostPage {...currentPost} currentUser={currentUser}/>
        </>
  );

}
