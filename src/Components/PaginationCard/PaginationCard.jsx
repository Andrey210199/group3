import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { NAMEPOSTSSLICE, POSTLIMIT } from "../../Constants/StorageConstants";
import { fetchGetPagePosts, fetchSearch } from "../../Storage/Slices/PostsSlile";
import { Spinner } from "../Spinner/spinner";
import s from "./index.module.css";


export default function PaginationCard({ page }) {

    const postsState = useSelector(state => state[NAMEPOSTSSLICE]);
    const { total: count } = postsState;
    const [query] = useSearchParams();
    const dispatch = useDispatch();

    const searching = query.get("search");

    function pages() {
        return Math.ceil(count / POSTLIMIT);
    }

    function handleClike(e, value) {
        if (value !== page) {
            searching ? dispatch(fetchSearch({ page: value, search: searching }))
                : dispatch(fetchGetPagePosts(value))
        }

    }

    function getSearch(item) {
        switch (true) {
            case searching && item.page > 1:
                return `?search=${searching}&page=${item.page}`;
            case searching && item.page === 1:
                return `?search=${searching}`;
            case item.page > 1:
                return `?page=${item.page}`;
            default:
                return "";
        }
    }

    return (
        pages() > 1 && <Pagination
            className={s.wrapper}
            onChange={handleClike}
            page={page}
            count={pages()}
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={getSearch(item)}
                    {...item}
                />
            )}
            showFirstButton showLastButton
        />
    );
}