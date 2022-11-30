import Comment from "../Comment/Comment";

export default function CommentList({postComments, children}){
    return(
        <>
        {children}
        {!!postComments && postComments.map(comment=> <Comment key={comment._id} {...comment} /> )}
        </>
    )
}