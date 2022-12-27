import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMESINGLEPOSTSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { isError } from "../../Utilites/StoreFunction";

const initialState = {
    ...STATEINITIAL,
    comments: null
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

export const fetchGetCommentAuthor = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchGetCommentAuthor`,

    async function(authorId, {rejectWithValue,fulfillWithValue, extra: api}){
        
    }
)

export const fetchSetRewiew = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchSetRewiew`,

    async function ({ comment, postId }, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {
            const data = await api.actionComments("POST", postId, "", { text: comment });
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchDeleteRewiew = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchDeleteRewiew`,

    async function ({ postId, commentId }, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionComments("DELETE", postId, commentId);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const singlePostSlice = createSlice({
    name: NAMESINGLEPOSTSLICE,
    initialState,
    reducers: {
        setProductState: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchGetSinglePost.pending, state => {
            state.data = null;
            state.comments = [];
            state.loading = true;
            state.error = null;
            state.comments = null;
        })
            .addCase(fetchGetSinglePost.fulfilled, (state, action) => {
                console.log(action.payload)
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchSetSinglePost.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchSetRewiew.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchDeleteRewiew.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { setProductState } = singlePostSlice.actions;
export default singlePostSlice.reducer;