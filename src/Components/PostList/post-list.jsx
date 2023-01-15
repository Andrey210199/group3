import s from './index.module.css';
import PostCard from '../PostCard/post-card';
import { useSelector } from 'react-redux';
import { NAMEPOSTSSLICE } from '../../Constants/StorageConstants';
import { Skelet } from '../Skeleton/skelet';

const PostList = ({ posts }) => {
  const loading = useSelector((state) => state[NAMEPOSTSSLICE].loading);

  return (
    <div className={s.posts}>
      {loading
        ? [...Array(12)].map((item, index) => <Skelet key={index} />)
        : posts?.map((item) => <PostCard key={item._id} {...item} />)}
    </div>
  );
};

export default PostList;
