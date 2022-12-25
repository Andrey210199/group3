import { Container } from "@mui/material";
import { useCallback } from "react";
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import { PostContext } from '../../context/postContext';
import { UserContext } from '../../context/userContext';
import api from '../../Utilites/Api';
import PostList from "../PostList/post-list";
import AddingPostPage from '../../Pages/AddingPostPage/AddingPostPage';
import PostPage from "../../Pages/PostPage/PostPage";
import { NotFoundPage } from "../../Pages/NotFoundPage/not-found-page";
import './App.css';


export default function App() {

  const USER_ID = "636a510659b98b038f779d09"
  const [postsData, setPostsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    Promise.all([api.actionPosts("GET"), api.getUsersUser(USER_ID)])
    .then(([posts, currentUser]) => {
      setPostsData(posts);
      setCurrentUser(currentUser);
    })
    .catch((err) => console.log(err))
  }, [])

  function deletePost(idPost) {
    api.actionPosts("DELETE", idPost)
      .then((data) => {
        const newPosts = postsData.filter(post => post._id !== data._id)
        setPostsData(newPosts)
      })
      .catch(err => {
        console.log(err)
        alert('Вы не можете удалить этот пост')
      })
  }


  const handleLiked = useCallback((postId, islike) => {
    api.changeLike(postId, islike)
      .then((updatePost) => {
        const newPosts = postsData.map(post => post._id === postId ? updatePost : post);
        setPostsData(newPosts)
      })
      .catch(err => console.log(err))
  }, [postsData])



  return (
    <UserContext.Provider value={{ currentUser }}>
      <PostContext.Provider value={{ postsData, deletePost, handleLiked }}>
        {/* <Header/> */}
        <main className="container content">
          <Routes>
            <Route path="/" element={
              <PostList />
            } />

            <Route path="/post/:id" element={
              <PostPage currentUser={USER_ID} />
            } />

            <Route path="/add_post" element={
              <AddingPostPage />
            } />

            <Route path="*" element={
              <NotFoundPage />
            } />

          </Routes>
        </main>
        {/* <Footer/> */}
      </PostContext.Provider>
    </UserContext.Provider>
  );
}