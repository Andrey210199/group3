import s from "./index.module.css"
import PostCard from "../PostCard/post-card"
import { useSelector } from "react-redux";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";

const PostList = ({ posts }) => {

    const loading = useSelector(state => state[NAMEPOSTSSLICE].loading);

    return (

        <div className={s.posts}>
            {loading ? <></>
                : posts?.map(item => (
                    <PostCard key={item._id} {...item} />
                )
                )
            }
        </div>
    );
}

export default PostList;
