import { Pagination } from "@mui/material";
import { useEffect } from "react";
import { MAXCOMMENTS } from "../../Constants/Constant";
import Comment from "../Comment/Comment";

import s from "./index.module.css";

export default function CommentList({commentNow, setCommentNow, num, setNum, comments, data, children }) {

    useEffect(()=> {
        const end = MAXCOMMENTS * num;
        const start = end - MAXCOMMENTS;
        setCommentNow(comments.slice(start, end));
    }, [num, comments, setCommentNow]);

    function pages() {
        return Math.ceil(comments.length / MAXCOMMENTS);  
    }

    function handleClick(_, numN) {
        setNum(numN);  
    }

    return (
        <>
            {children}
            {commentNow && commentNow.map(comment => <Comment pages = {pages} setNum = {setNum} key={comment._id} {...comment} postId={data._id} />)}
            {pages() > 1 && <Pagination
                className={s.pagination}
                count={pages()}
                onChange={handleClick}
                showFirstButton showLastButton />}
        </>
    )
}