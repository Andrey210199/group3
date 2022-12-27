import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMEPOSTSSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { changeLike, changePosts, dataPush, isError } from "../../Utilites/StoreFunction";
import { isLiked } from "../../Utilites/total";

const initialState = {
    ...STATEINITIAL,
    total: null,
    favorites: []
}

export const fetchGetPosts = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchGetPosts`,

    async function (_, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {

            const { user } = getState();
            const data = await api.actionPosts();
            return fulfillWithValue({ data, user });

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchAddPost = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchAddPost`,

    async function (post, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts("POST", "", post);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchChengePost = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchChengePost`,

    async function (post, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts("PATCH", post._id, post);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }

)

export const fetchDeletePost = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchDeletePost`,

    async function (post, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {

            const data = await api.actionPosts("DELETE", post._id);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const fetchChangeLike = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchChangeLike`,

    async function (post, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {

            const { user } = getState();
            const liked = isLiked(post.likes, user.data._id);
            const data = await api.changeLike(post._id, liked);
            return fulfillWithValue({ data, liked });

        } catch (error) {
            rejectWithValue(error);
        }
    }
);


const postsSlice = createSlice({
    name: NAMEPOSTSSLICE,
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchGetPosts.pending, state => {
            state.data = null;
            state.loading = true;
            state.error = null;
            state.total = null;
            state.favorites = null;
        })
            .addCase(fetchGetPosts.fulfilled, (state, action) => {
                const { data: posts, user: currentUser } = action.payload;
                state.total = posts.length;
                state.data = posts;
                state.favorites = state.data.filter(post => isLiked(post.likes, currentUser.data._id));
                state.loading = false;
            })
            .addCase(fetchChengePost.fulfilled, (state, action) => {
                const { data } = action.payload;
                changePosts(state, data);
            })
            .addCase(fetchAddPost.fulfilled, (state, action) => {
                dataPush(state, action.payload.data);
            })
            .addCase(fetchChangeLike.fulfilled, (state, action) => {
                const { data, liked } = action.payload;
                changePosts(state, data)
                changeLike({ state, data, liked });

            })
            .addCase(fetchDeletePost.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.data = state.data.filter(post => post._id !== data._id);
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
            })
    }

});

export default postsSlice.reducer;