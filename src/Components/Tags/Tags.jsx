import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import { addTag } from "../../Storage/Slices/PostsSlile";
import s from "./index.module.css";
import "../../index.css";
export default function Tags({ setInputTags, tags }) {


    const stateOptions = useSelector(state => state[NAMEPOSTSSLICE].tags);
    const dispatch = useDispatch();
    const [newTag, setNewTag] = useState("");
    const [autoCompleteValue, setAutoCompleteValue] = useState([]);

    const options = Object.values(stateOptions);

    function newOption() {
        dispatch(addTag(newTag));
        setAutoCompleteValue([...autoCompleteValue, newTag]);
        setInputTags && setInputTags([...autoCompleteValue, newTag]);
        setNewTag("");
    }

    function handleAutocomplete(_, value) {
        setAutoCompleteValue(value);
    }

    useEffect(()=>{
        tags && setAutoCompleteValue(tags);
    }, [tags])

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

            <input className = {s.new_tag} placeholder="Создать новый тег" value={newTag} onChange={(e) => setNewTag(e.target.value)} /><button className ={`btn ${s.btn_tag}`} type="button" onClick={newOption}>Создать тег</button>
        </div>
    )
}