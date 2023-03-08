import { Pagination } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MAXCOMMENTS } from "../../Constants/Constant";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import Comment from "../Comment/Comment";

import s from "./index.module.css";

export default function CommentList({ children }) {

    const { comments, data } = useSelector(state => state[NAMESINGLEPOSTSLICE]);
    const [commentNow, setCommentNow] = useState(comments?.slice(0, MAXCOMMENTS));


    function pages() {
        return Math.ceil(comments.length / MAXCOMMENTS);
    }

    function handleClick(_, num) {
        const end = MAXCOMMENTS * num;
        const start = end - MAXCOMMENTS;
        setCommentNow(comments.slice(start, end));
    }

    return (
        <>
            {children}
            {commentNow && commentNow.map(comment => <Comment key={comment._id} {...comment} postId={data._id} />)}
            {pages() > 1 && <Pagination
                className={s.pagination}
                count={pages()}
                onChange={handleClick}
                showFirstButton showLastButton />}
        </>
    )
}