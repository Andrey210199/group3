import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NAMEPOSTSSLICE, POSTLIMIT } from "../../Constants/StorageConstants";
import { fetchGetPagePosts, fetchSearch } from "../../Storage/Slices/PostsSlile";
import s from "./index.module.css";
import { fetchGetPagePosts, fetchSearch } from "../../Storage/Slices/PostsSlile";

export default function PaginationCard({ page }) {

    const postsState = useSelector(state => state[NAMEPOSTSSLICE]);
    const { loading, total: count, isSearch, search } = postsState;
    const dispatch = useDispatch();

    function pages() {
        return Math.ceil(count / POSTLIMIT);
    }

    function handleClike(e, value) {
        if (value !== page) {
            isSearch ? dispatch(fetchSearch({ page: value, search }))
                : dispatch(fetchGetPagePosts(value))
        }

    }

    return (
        loading ? <></>
            : pages() !== 1 && <Pagination
            className={s.wrapper}
                onChange={handleClike}
                page={page}
                count={pages()}
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
                        {...item}
                    />
                )}
                showFirstButton showLastButton
            />
    );
}