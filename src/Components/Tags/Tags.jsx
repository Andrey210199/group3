import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MAXADDTAGS } from "../../Constants/Constant";
import { NAMEPOSTSSLICE } from "../../Constants/StorageConstants";
import { addTag } from "../../Storage/Slices/PostsSlile";

export default function Tags({ setInputTags, tags }) {


    const stateOptions = useSelector(state => state[NAMEPOSTSSLICE].tags);
    const dispatch = useDispatch();
    const [newTag, setNewTag] = useState("");
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
        if (autoCompleteValue.length < MAXADDTAGS) {
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

    useEffect(() => {
        tags && setAutoCompleteValue(tags);
    }, [tags])

    useEffect(() => {
        setInputTags && setInputTags([...autoCompleteValue]);
    }, [autoCompleteValue, setInputTags])

    return (
        <div>
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

            <input placeholder="Создать новый тег" value={newTag} onChange={(e) => setNewTag(e.target.value)} /><button type="button" onClick={newOption}>Создать тег</button>
        </div>
    )
}