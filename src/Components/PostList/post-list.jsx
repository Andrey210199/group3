import s from "./index.module.css";
import PostCard from "../PostCard/post-card";
import { useDispatch, useSelector } from "react-redux";
import {
  NAMEPOSTSSLICE,
  NAMEUSERSLICE
} from "../../Constants/StorageConstants";
import PaginationCard from "../PaginationCard/PaginationCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import {
  fetchGetPagePosts,
  fetchSearch
} from "../../Storage/Slices/PostsSlile";
import { NotFound } from "../NotFound/not-found";
import { Spinner } from "../Spinner/spinner";
import { URLPAGE, URLSEARCH } from "../../Constants/Constant";

export default function PostList({ posts }) {
  const userLoad = useSelector(state => state[NAMEUSERSLICE].loading);
  const loading = useSelector((state) => state[NAMEPOSTSSLICE].loading);

  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const page = parseInt(query.get(URLPAGE) || 1);
  const search = query.get(URLSEARCH)

  useEffect(() => {
    if (!userLoad) {
      search ?
        dispatch(fetchSearch({ page, search }))
        : dispatch(fetchGetPagePosts(page));
    }
  }, [dispatch, page, userLoad, search])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : posts?.length === 0 ? (
        <NotFound title="Страница не найдена" buttonText="На главную" />
      ) : (
        <div className={s.posts}>
          {posts?.map((item) => (
            <PostCard key={item._id} {...item} />
          ))}
        </div>
      )}

      {!loading && <PaginationCard page={page} />}
    </>
  );
};