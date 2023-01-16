import s from "./index.module.css"
import PostCard from "../PostCard/post-card"
import { useDispatch, useSelector } from "react-redux";
import { NAMEPOSTSSLICE, NAMEUSERSLICE } from "../../Constants/StorageConstants";
import PaginationCard from "../PaginationCard/PaginationCard";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchGetPagePosts, fetchGetPosts, fetchSearch } from "../../Storage/Slices/PostsSlile";

const PostList = ({ posts }) => {

   // const userLoad = useSelector(state => state[NAMEUSERSLICE].loading);
    const state = useSelector(state => state[NAMEPOSTSSLICE]);
    const { loading, isSearch, search } = state;

/*     const dispatch = useDispatch();
    const [query] = useSearchParams();
    const page = parseInt(query.get('page') || 1);

    useEffect(() => {
        if (!userLoad) {
            dispatch(fetchGetPosts());
            isSearch ? dispatch(fetchSearch({ page, search }))
                : dispatch(fetchGetPagePosts(page));
        }
    }, [dispatch, page, isSearch, userLoad]) */

    return (
        <>
            <div className={s.posts}>
                {loading ? <></>
                    : posts?.map(item => (
                        <PostCard key={item._id} {...item} />
                    )
                    )
                }
            </div>
            {/* {!loading && <PaginationCard page={page} />} */}
        </>
    );
}

export default PostList;
