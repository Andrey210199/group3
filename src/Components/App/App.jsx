import { useEffect } from 'react';
import { Link, Route, Routes, useSearchParams } from "react-router-dom";

import PostList from "../PostList/post-list";
import AddingPostPage from '../../Pages/AddingPostPage/AddingPostPage';
import PostPage from "../../Pages/PostPage/PostPage";
import { NotFoundPage } from "../../Pages/NotFoundPage/not-found-page";
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchGetUser, fetchTokenCheck, unAutch } from "../../Storage/Slices/UserSlice";
import { fetchGetPagePosts, fetchGetPosts, fetchSearch } from "../../Storage/Slices/PostsSlile";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import PaginationCard from "../PaginationCard/PaginationCard";
import EditUser from '../Form/EditUser/EditUser';
import Search from '../Search/Search';
import Login from '../Form/Login/Login';
import Registration from '../Form/Registration/Registration';
import { getToken } from '../../Utilites/Cookie';


export default function App() {

  const statePosts = useSelector(state => state[NAMEPOSTSSLICE]);
  const { data: posts, isSearch, search } = statePosts;

  const [query] = useSearchParams(); //удалить
  const page = parseInt(query.get('page') || 1); //удалить

  const dispatch = useDispatch();
  const user = getToken();

  useEffect(() => {
    if (user) {
      dispatch(fetchTokenCheck(user))
        .then(() => { //удалить
          dispatch(fetchGetPosts());
          isSearch ? dispatch(fetchSearch({ page, search }))
            : dispatch(fetchGetPagePosts(page));
        })

    }
    else {
      dispatch(fetchGetUser())
        .then(() => { //удалить
          dispatch(fetchGetPosts());
          isSearch ? dispatch(fetchSearch({ page, search }))
            : dispatch(fetchGetPagePosts(page));
        });
    }
  }, [dispatch, user])

  return (
    <>
      <Login />
      <Registration />
      <EditUser />

      {/* Временно */}
{/*       {user ? <Link to="#" onClick={unAutch}>Выход</Link>
        : <Link to={"?login=true"}>Вход</Link>}
      <Link to={"?registration=true"}>Регистрация</Link>
      <Link to={"?userEdit=true"} >Редактирования пользователя</Link> */}

      {/* <Header/> */}

      <main className="container content">
        <Routes>
          <Route path="/" element={
            <>
              <PostList posts={posts} />
              <PaginationCard page={page} />
            </>
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
      {/* <Footer/> */}
    </>
  );
}