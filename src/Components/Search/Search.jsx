import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import { fetchGetPagePosts, fetchMiniSearch, fetchSearch, setSearch } from "../../Storage/Slices/PostsSlile";
import cn from "classnames";

import { ReactComponent as ClearIcon } from "./img/clear.svg";
import { ReactComponent as SearchIcon } from "./img/magnifier.svg";

import s from "./index.module.css";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../Hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";
import SearchPopap from "../SearchPopap/SearchPopap";
import Button from "../Buttons/Button/Button";

export default function Search() {

    const inputText = useSelector(state => state[NAMEPOSTSSLICE].search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const [active, setActive] = useState(false);
    const inputSearch = useDebounce(inputText, 1000);

    function handleInput(e) {
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

    const debounce = useCallback((inputSearch) => {
        dispatch(fetchMiniSearch({ search: inputSearch }));

    }, [dispatch]);

    const onClose = useCallback(() => {
        setActive(false);
    }, [setActive]);

    useEffect(() => {
        if (inputSearch) {
            debounce(inputSearch);
        }
    }, [inputSearch, debounce])



    return (
        <div className={s.content}>
            <form className={s.search} onSubmit={handleSubmit}>
                <input type="text" className={s.search__input} value={inputText} onInput={handleInput} placeholder="Поиск" />

                {inputText !== "" &&
                    <div className={s.btns}>
                        <Button type="button" className={cn(s.btn, s.btn__clear)} onClick={handleClear} btnClass={false}><ClearIcon className={s.icon} /></Button>
                        <Button type="submit" className={cn(s.btn, s.btn__search)} btnClass={false}><SearchIcon className={s.icon} /></Button>
                    </div>

                }

            </form>

            <SearchPopap query={handleSubmit} active={active} onClose={onClose} />
        </div>
    )
}