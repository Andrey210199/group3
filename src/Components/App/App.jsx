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
import { Container } from "@mui/material";
import { Footer } from "../Footer/footer";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import PaginationCard from "../PaginationCard/PaginationCard";
import EditUser from "../Form/EditUser/EditUser";
import Search from "../Search/Search";
import Login from "../Form/Login/Login";
import Registration from "../Form/Registration/Registration";
import { getToken } from "../../Utilites/Cookie";
import s from "./index.module.css";
import cn from "classnames";
import edit from "./img/edit.png";
import { UserInfo } from "../UserInfo/user-info";

export default function App() {
  const statePosts = useSelector((state) => state[NAMEPOSTSSLICE]);
  const { data: posts, isSearch, search } = statePosts;

  const [query] = useSearchParams(); //удалить
  const page = parseInt(query.get("page") || 1); //удалить

  const dispatch = useDispatch();
  const user = getToken();
  const currentUser = useSelector((state) => state[NAMEUSERSLICE].data);

  useEffect(() => {
    if (user) {
      dispatch(fetchTokenCheck(user)).then(() => {
        //удалить
        dispatch(fetchGetPosts());
        isSearch
          ? dispatch(fetchSearch({ page, search }))
          : dispatch(fetchGetPagePosts(page));
      });
    } else {
      dispatch(fetchGetUser()).then(() => {
        //удалить
        dispatch(fetchGetPosts());
        isSearch
          ? dispatch(fetchSearch({ page, search }))
          : dispatch(fetchGetPagePosts(page));
      });
    }
  }, [dispatch, user]);

  return (
    <>
      <Login />
      <Registration />
      <EditUser />

      <Header>

      {!!currentUser && 
          <>
          <UserInfo />
          <Link
            className={s.link }
            to={"?userEdit=true"}
            title=" Редактирование пользователя"
          >
            <span className={s.editUser}>Изменить</span>
          </Link>
          </>
          
          }
    
        {/* Временно */}



          {user ? (
            <Link className={cn(s.link, s.login_link)} to="#" onClick={unAutch}>
              <span className={s.login}>
                <LogoutIcon />
                Выйти
              </span>
            </Link>
          ) : (
            <Link className={cn(s.link, s.login_link)} to={"?login=true"}>
              <span className={s.login}>
                <LoginIcon />
                Войти
              </span>
            </Link>
          )}
          <Link className={cn(s.link, s.registr_link)} to={"?registration=true"}>
            <span className={s.registration}>Регистрация</span>
          </Link>
        
   
    
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
