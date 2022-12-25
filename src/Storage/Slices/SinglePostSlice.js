import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMESINGLEPOSTSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { isError } from "../../Utilites/StoreFunction";

const initialState = {
    ...STATEINITIAL
}

export const fetchGetSinglePost = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchGetSinglePost`,

    async function (postId, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {
            const data = await api.actionPosts("GET", postId);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchSetSinglePost = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchSetSinglePost`,

    async function ({ postId, postData }, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts("PATCH", postId, postData);
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
        builder.addCase(fetchGetSinglePost.pending, state => {
            state.data = null;
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchGetSinglePost.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchSetSinglePost.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export default singlePostSlice.reducer;