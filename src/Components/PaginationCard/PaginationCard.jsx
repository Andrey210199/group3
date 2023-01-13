import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NAMEPOSTSSLICE, POSTLIMIT } from "../../Constants/StorageConstants";
import { fetchGetPagePosts } from "../../Storage/Slices/PostsSlile";

export default function PaginationCard({ page }) {

    const postsState = useSelector(state => state[NAMEPOSTSSLICE]);
    const { loading, total: count } = postsState;
    const dispatch = useDispatch();



    function handleClike(e, value) {
        if (value !== page) {
            dispatch(fetchGetPagePosts(value))
        }

    }

    return (
        loading ? <></>
            : <Pagination
                onChange={handleClike}
                page={page}
                count={Math.ceil(count / POSTLIMIT)}
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