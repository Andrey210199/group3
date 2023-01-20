import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ButtonBack from "../../Components/Buttons/ButtonBack/ButtonBack";
import Post from "../../Components/Post/Post";
import { Spinner } from "../../Components/Spinner/spinner";
import { NAMESINGLEPOSTSLICE } from "../../Constants/StorageConstants";
import { fetchGetComments, fetchGetSinglePost } from "../../Storage/Slices/SinglePostSlice";

export default function PostPage() {

    const isLoading = useSelector(state => state[NAMESINGLEPOSTSLICE].loading);

    const { id: postId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetSinglePost(postId));
        dispatch(fetchGetComments(postId));

    }, [dispatch, postId]);

    return (

        isLoading ? <Spinner /> :
            <>
                <ButtonBack />
                <Post postId={postId} />
            </>

    )
}