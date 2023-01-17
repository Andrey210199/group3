import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import { fetchGetPagePosts, fetchSearch, setSearch } from "../../Storage/Slices/PostsSlile";
import cn from "classnames";

import { ReactComponent as ClearIcon } from "./img/clear.svg";
import { ReactComponent as SearchIcon } from "./img/magnifier.svg";

import s from "./index.module.css";

export default function Search() {

    const inputText = useSelector(state => state[NAMEPOSTSSLICE].search);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleInput(e) {
        dispatch(setSearch(e.target.value))
    }

    function handleClear() {
        dispatch(fetchGetPagePosts(1))
        .then(()=>{
            navigate("/")
            dispatch(setSearch(""));
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/?search=${inputText}`);
        dispatch(fetchSearch({ page: 1, search: inputText }))
    }

    return (
        <form className={s.search} onSubmit={handleSubmit}>
            <input type="text" className={s.search__input} value={inputText} onInput={handleInput} placeholder="Поиск" />

            {inputText !== "" &&
                <div className={s.btns}>
                    <button type="button" className={cn(s.btn, s.btn__clear)} onClick={handleClear}><ClearIcon className={s.icon} /></button>
                    <button type="submit" className={cn(s.btn, s.btn__search)}><SearchIcon className={s.icon} /></button>
                </div>

            }

        </form>
    )
}