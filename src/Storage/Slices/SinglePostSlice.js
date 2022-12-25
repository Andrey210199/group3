import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { NAMESINGLEPOSTSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { isError } from "../../Utilites/StoreFunction";

const initialState = {
    ...STATEINITIAL
}

export const fetchGetPost = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchGetPost`,

    async function (postId, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts("", postId);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchSetPost = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchSetPost`,

    async function ({ postId, postData }, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts("PATCH", postId, postData);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchAddPost = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchAddPost`,

    async function (post, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts("POST", "", post);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const singlePostSlice = createSlice({
    name: NAMESINGLEPOSTSLICE,
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchGetPost.pending, state => {
            state.data = null;
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchGetPost.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchSetPost.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchAddPost.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export default singlePostSlice.reducer;