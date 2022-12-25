import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMEPOSTSSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { isError, StateFavorites } from "../../Utilites/StoreFunction";
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
    reducers: {

        favoritesAdd: (state, action) => {
            state.favorites.push(action.payload);
        },

        favoritesDelete: (state, action) => {
            state.favorites = state.favorites.filter(post => post._id !== action.payload._id);
        },

        changePost: (state, action) => {
            const { data } = action.payload;
            state.data = state.data.map(post => post._id === data._id ? data : post);
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchGetPosts.pending, state => {
            state.data = null;
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchGetPosts.fulfilled, (state, action) => {
                const { total, data: posts, user: currentUser } = action.payload;
                state.total = total;
                state.data = posts;
                state.favorites = state.data.filter(post => isLiked(post.likes, currentUser._id));
                state.loading = false;
            })
            .addCase(fetchChengePost.fulfilled, () => {
                changePost();
            })
            .addCase(fetchAddPost.fulfilled, (state, action) => {
                state.data = state.data.push(action.payload);
            })
            .addCase(fetchChangeLike.fulfilled, (state, action) => {
                const { data, liked } = action.payload;
                changePost();
                StateFavorites({ liked, data, state });

            })
            .addCase(fetchDeletePost.fulfilled, (state, action) => {
                state.data = state.data.filter(post => post._id !== action.payload._id);
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
            })
    }

});

export const { favoritesAdd, favoritesDelete, changePost } = postsSlice.actions;
export default postsSlice.reducer;