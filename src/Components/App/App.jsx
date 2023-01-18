import { useEffect } from "react";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";

import PostList from "../PostList/post-list";
import AddingPostPage from "../../Pages/AddingPostPage/AddingPostPage";
import PostPage from "../../Pages/PostPage/PostPage";
import { NotFoundPage } from "../../Pages/NotFoundPage/not-found-page";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetUser,
  fetchTokenCheck,
  unAutch,
} from "../../Storage/Slices/UserSlice";
import {
  fetchGetPagePosts,
  fetchGetPosts,
  fetchSearch,
} from "../../Storage/Slices/PostsSlile";
import {
  NAMEPOSTSSLICE,
  NAMEUSERSLICE,
} from "../../Constants/StorageConstants";
import { Header } from "../Header/header";

import { Footer } from "../Footer/footer";


import PaginationCard from "../PaginationCard/PaginationCard";
import EditUser from "../Form/EditUser/EditUser";

import Login from "../Form/Login/Login";
import Registration from "../Form/Registration/Registration";
import { getToken } from "../../Utilites/Cookie";
import s from "./index.module.css";

import HeaderMenu from "../HeaderMenu/HeaderMenu";

export default function App() {
  const statePosts = useSelector((state) => state[NAMEPOSTSSLICE]);
  const { data: posts, isSearch, search } = statePosts;

  const [query] = useSearchParams(); //удалить
  const page = parseInt(query.get('page') || 1); //удалить
  const searching = query.get("search"); //удалить

  const dispatch = useDispatch();
  const user = getToken();


  useEffect(() => {
    if (user) {
      dispatch(fetchTokenCheck(user))
        .then(() => { //удалить
          dispatch(fetchGetPosts());
          searching ? dispatch(fetchSearch({ page, searching }))
            : dispatch(fetchGetPagePosts(page));
        })

    }
    else {
      dispatch(fetchGetUser())
        .then(() => { //удалить
          dispatch(fetchGetPosts());
          searching ? dispatch(fetchSearch({ page, search: searching }))
            : dispatch(fetchGetPagePosts(page));
        });
    }
  }, [dispatch, user, searching])

  return (
    <>
      <Login />
      <Registration />
      <EditUser />

      <Header>
          <HeaderMenu user={user}/>      
       
    
      </Header>

      <main className="container content">

        <Routes>
          <Route
            path="/"
            element={
              <>
                <PostList posts={posts} />
                <PaginationCard page={page} />
              </>
            }
          />

          <Route path="/post/:id" element={<PostPage />} />

          <Route path="/add_post" element={<AddingPostPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
