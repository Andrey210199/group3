import { useSelector } from "react-redux";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import Comment from "../Comment/Comment";

export default function CommentList({ children }) {

    const { comments, data } = useSelector(state => state[NAMESINGLEPOSTSLICE]);

    return (
        <>
            {children}
            {comments && comments.map(comment => <Comment key={comment._id} {...comment} postId={data._id} />)}
        </>
    )
}