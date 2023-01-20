import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import useOutsideClick from "../../Hooks/useOutsideClick";
import { setSearch } from "../../Storage/Slices/PostsSlile";
import Button from "../Buttons/Button/Button";

import s from "./index.module.css";

export default function SearchPopap({ query, active, onClose }) {
    const ref = useRef(null);
    const state = useSelector(state => state[NAMEPOSTSSLICE]);
    const posts = state.dataSearch?.posts;
    const page = state.dataSearch?.total / state.dataSearch?.postLength;
    const dispatch = useDispatch();

    function searchClear() {
        onClose();
        dispatch(setSearch(""));
    }

    useOutsideClick({ ref, handler: onClose, isActive: active });

    return (
        (posts && active) &&
        <div ref={ref} className={s.search}>
            {posts.length > 1 ?
                posts?.map((post) => <Link onClick={searchClear} key={post._id} to={`/post/${post._id}`} className={s.search__content}>
                    <img className={s.search__img} src={post.image} alt={post.title} />
                    <div>
                        <h4 className={s.search__title}>
                            {post.title}
                        </h4>
                        <p className={s.search__author}>{post.author.name}</p>

                    </div>
                </Link>)
                :
                <p>По вашему запросу ничего не найденно.</p>

            }
            {page > 1 && <Button onClick={(e) => { query(e); searchClear() }}>Показать все</Button>}

        </div>
    )
}
