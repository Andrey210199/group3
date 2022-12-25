import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMEPOSTSSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { isError, StateFavorites } from "../../Utilites/StoreFunction";
import { isLiked } from "../../Utilites/total";

const initialState = {
    ...STATEINITIAL,
    total: null,
    favorites: []
}

const fetchGetPosts = createAsyncThunk(
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

const fetchChangeLike = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchChangeLike`,

    async function (post, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {

            const { user } = getState();
            const liked = isLiked(post.liked, user.data._id);
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
        })
            .addCase(fetchGetPosts.fulfilled, (state, action) => {
                const { total, data: posts, user: currentUser } = action.payload;
                state.total = total;
                state.data = posts;
                state.favorites = state.data.filter(post => isLiked(post.likes, currentUser._id));
                state.loading = false;
            })
            .addCase(fetchChangeLike.fulfilled, (state, action) => {
                const { data, liked } = action.payload;
                state.data = data;
                StateFavorites({ liked, data, state });

            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
            })
    }

});

export default postsSlice.reducer;