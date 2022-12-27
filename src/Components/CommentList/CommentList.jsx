import { useSelector } from "react-redux";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import Comment from "../Comment/Comment";

export default function CommentList({ children }) {

    const { comments } = useSelector(state => state[NAMESINGLEPOSTSLICE].data);

    return (
        <>
            {children}
            {comments && comments.map(comment => <Comment key={comment._id} {...comment} />)}
        </>
    )
}