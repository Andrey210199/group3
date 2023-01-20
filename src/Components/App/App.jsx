import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import PostList from "../PostList/post-list";
import AddingPostPage from "../../Pages/AddingPostPage/AddingPostPage";
import PostPage from "../../Pages/PostPage/PostPage";
import { NotFoundPage } from "../../Pages/NotFoundPage/not-found-page";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetUser,
  fetchTokenCheck,
} from "../../Storage/Slices/UserSlice";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import Header from "../Header/header";

import Footer from "../Footer/footer";

import EditUser from "../Form/EditUser/EditUser";

import Login from "../Form/Login/Login";
import Registration from "../Form/Registration/Registration";
import { getToken } from "../../Utilites/Cookie";

import HeaderMenu from "../HeaderMenu/HeaderMenu";

export default function App() {
  const statePosts = useSelector((state) => state[NAMEPOSTSSLICE]);
  const { data: posts } = statePosts;

  const dispatch = useDispatch();
  let user = getToken();

  useEffect(() => {
    if (user) {
      dispatch(fetchTokenCheck(user));

    }
    else {
      dispatch(fetchGetUser());
    }
  }, [dispatch, user])

  return (
    <>
      <Login />
      <Registration />
      <EditUser />

      <Header>
        <HeaderMenu />
      </Header>

      <main className="container content">

        <Routes>
          <Route
            path="/"
            element={
              <PostList posts={posts} />
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

