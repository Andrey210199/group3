import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import { fetchGetPagePosts, fetchMiniSearch, fetchSearch, miniSearch, search, setSearch } from "../../Storage/Slices/PostsSlile";
import cn from "classnames";

import { ReactComponent as ClearIcon } from "./img/clear.svg";
import { ReactComponent as SearchIcon } from "./img/magnifier.svg";

import s from "./index.module.css";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../Hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";
import SearchPopap from "../SearchPopap/SearchPopap";

export default function Search() {

    const inputText = useSelector(state => state[NAMEPOSTSSLICE].search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const [active, setActive] = useState(false);

    const [position, setPosition] = useState();

    const inputSearch = useDebounce(inputText, 1000);

    const debounce = useCallback((inputSearch) => {
        dispatch(fetchMiniSearch({ search: inputSearch }));

    }, [dispatch]);

    useEffect(() => {
        if (inputSearch) {
            debounce(inputSearch);
        }
    }, [inputSearch, debounce])


    function handleInput(e) {
        const parent = e.target.parentNode.getBoundingClientRect();
        setPosition({ top: parent.height +3 });
        setActive(true);
        dispatch(setSearch(e.target.value));
    }

    function handleClear() {
        query.get("search") ? dispatch(fetchGetPagePosts(1))
            .then(() => {
                navigate("/")
                dispatch(setSearch(""));
            })
            : dispatch(setSearch(""));
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/?search=${inputText}`);
        dispatch(fetchSearch({ page: 1, search: inputText }));
    }

    const onClose = useCallback(() => {
        setActive(false);
    }, [active]);

    return (
        <div className={s.content}>
            <form className={s.search} onSubmit={handleSubmit}>
                <input type="text" className={s.search__input} value={inputText} onInput={handleInput} placeholder="Поиск" />

                {inputText !== "" &&
                    <div className={s.btns}>
                        <button type="button" className={cn(s.btn, s.btn__clear)} onClick={handleClear}><ClearIcon className={s.icon} /></button>
                        <button type="submit" className={cn(s.btn, s.btn__search)}><SearchIcon className={s.icon} /></button>
                    </div>

                }

            </form>

            <SearchPopap query={handleSubmit} active={active} onClose={onClose} position={position} />
        </div>
    )
}