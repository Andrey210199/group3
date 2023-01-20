import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LIMITMESSAGE, MAXADDTAGS, MAXSINTAG } from "../../Constants/Constant";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import { addTag, fetchGetPosts } from "../../Storage/Slices/PostsSlile";
import s from "./index.module.css";
import "../../index.css";
import FormInput from "../FormInput/FormInput";
import Button from "../Buttons/Button/Button";
export default function Tags({ setInputTags, tags }) {


    const stateOptions = useSelector(state => state[NAMEPOSTSSLICE].tags);
    const dispatch = useDispatch();
    const [newTag, setNewTag] = useState("");
    const [message, setMessage] = useState("");
    const [autoCompleteValue, setAutoCompleteValue] = useState([]);

    const options = Object.values(stateOptions);

    function testTags(autoCompleteValue, newTag) {
        let test = true;
        autoCompleteValue.forEach(tag => {

            if (newTag === tag) {
                test = false;
            }
        })
        return test;
    }

    function newOption() {
        if (newTag.length > 1 && autoCompleteValue.length < MAXADDTAGS) {
            dispatch(addTag(newTag));
            if (testTags(autoCompleteValue, newTag)) {
                setAutoCompleteValue([...autoCompleteValue, newTag]);
            }
        }
        setNewTag("");
    }

    function handleAutocomplete(_, value) {
        if (autoCompleteValue.length < MAXADDTAGS)
            setAutoCompleteValue(value);
    }

    function handleTagChange(value) {
        if (value.length <= MAXSINTAG) {
            setMessage("");
            setNewTag(value);
        }
        else {
            setMessage(LIMITMESSAGE);
        }
    }

    useEffect(() => {
            dispatch(fetchGetPosts());
    }, [dispatch])

    useEffect(() => {
        tags && setAutoCompleteValue(tags);
    }, [tags])

    useEffect(() => {
        setInputTags && setInputTags([...autoCompleteValue]);
    }, [autoCompleteValue, setInputTags])

    return (
        <div className={s.tags}>
            <Autocomplete
                multiple
                value={autoCompleteValue}

                onChange={handleAutocomplete}
                options={options}
                getOptionLabel={option => option}
                renderInput={
                    params => (
                        <TextField {...params} variant="standard" label="Существующие теги" placeholder="Теги" />
                    )
                }
            />

            <FormInput className={s.new_tag} placeholder="Создать новый тег" val={newTag} change={handleTagChange} clear={() => { setNewTag(""); setMessage("") }} />
            {message !== "" && <p>{message}</p>}

            <Button className={s.btn_tag} type="button" onClick={newOption}>Создать тег</Button>

        </div>
    )
}