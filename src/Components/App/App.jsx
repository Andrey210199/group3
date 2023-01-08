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
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser } from "../../Storage/Slices/UserSlice";
import { fetchGetPosts } from "../../Storage/Slices/PostsSlile";
import { NAMEPOSTSSLICE, NAMEUSERSLICE } from "../../Constants/StorageConstants";
import { Header } from "../Header/header";
import { Container } from "@mui/material";





export default function App() {

  // const USER_ID = "636a510659b98b038f779d09"
  // const [allUsers, setAllUsers] = useState([]);
  //const [currentUser, setCurrentUser] = useState({});
  const [postsData, setPostsData] = useState([]);
  const posts = useSelector(state => state[NAMEPOSTSSLICE].data);
  const currentUser = useSelector(state => state[NAMEUSERSLICE].data);

  const dispatch = useDispatch();

  /*   useEffect(() => {
      Promise.all([api.actionPosts("GET"), api.getUsersUser(USER_ID)])
        .then(([posts, currentUser]) => {
          setPostsData(posts);
          setCurrentUser(currentUser);
        })
        .catch((err) => console.log(err))
    }, []) */

  useEffect(() => {
    dispatch(fetchGetUser())
      .then(() => {
        dispatch(fetchGetPosts())
          .then(post => {
            setPostsData(post.payload.data)
          })
      })
  }, [dispatch])

  function deletePost(idPost) {
    api.actionPosts("DELETE", idPost)
      .then((data) => {
        const newPosts = posts?.filter(post => post._id !== data._id)
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
        const newPosts = postsData?.map(post => post._id === postId ? updatePost : post);
        setPostsData(newPosts)
      })
      .catch(err => console.log(err))
  }, [postsData])



  return (
    <UserContext.Provider value={{ currentUser }}>
      <PostContext.Provider value={{ postsData, deletePost, handleLiked }}>
        <Header/>
        <Container>

          <main className="content">
            <Routes>
              <Route path="/" element={
                <PostList posts={postsData} />
              } />

              <Route path="/post/:id" element={
                <PostPage />
              } />

              <Route path="/add_post" element={
                <AddingPostPage />
              } />

              <Route path="*" element={
                <NotFoundPage />
              } />

            </Routes>
          </main>
        </Container>
        {/* <Footer/> */}
      </PostContext.Provider>
    </UserContext.Provider>
  );
}