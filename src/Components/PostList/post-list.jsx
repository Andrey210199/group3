import s from "./index.module.css"
import PostCard from "../PostCard/post-card"
import { useContext } from "react";
import { PostContext } from "../../context/postContext";

const PostList = () =>  {
    const { postsData: posts } = useContext(PostContext);

    return (
        
        <div className={s.posts}>
            {posts.map(item => (
                 <PostCard key={item._id} {...item} />
            )
               
            
        )}
        
        </div>     
    
      
    );
  }
  
  export default PostList;
  