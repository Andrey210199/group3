import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMESINGLEPOSTSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { deleteComment, isError } from "../../Utilites/StoreFunction";

const initialState = {
    ...STATEINITIAL,
    commentsLoading: true,
    comments: null
}

export const fetchGetSinglePost = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchGetSinglePost`,

    async function (postId, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {
            const data = await api.actionPosts({ postId });
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

            const data = await api.actionPosts({ method: "PATCH", postId, postData });
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchGetComments = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchGetComments`,

    async function (postId, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionComments({ postId });
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }

    }
)

export const fetchSetRewiew = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchSetRewiew`,

    async function ({ comment, postId }, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {
            const { user } = getState();
            const data = await api.actionComments({ method: "POST", postId, commentData: { text: comment } });
            return fulfillWithValue({ data, user });

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchDeleteRewiew = createAsyncThunk(
    `${NAMESINGLEPOSTSLICE}/fetchDeleteRewiew`,

    async function ({ postId, commentId }, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionComments({ method: "DELETE", postId, commentId });
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
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchGetComments.pending, state => {
                state.commentsLoading = true;
                state.comments = null;
            })
            .addCase(fetchGetComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.commentsLoading = false;
            })
            .addCase(fetchGetSinglePost.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchSetSinglePost.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchSetRewiew.fulfilled, (state, action) => {
                const { data, user } = action.payload;
                const comment = data.comments[data.comments.length - 1];
                state.comments.push({ ...comment, author: user.data });
            })
            .addCase(fetchDeleteRewiew.fulfilled, (state, action) => {
                const { comments } = action.payload;
                state.comments = deleteComment(state, comments);
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
    }
});

export const { setProductState } = singlePostSlice.actions;
export default singlePostSlice.reducer;