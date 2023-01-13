import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMEPOSTSSLICE, NAMEUSERSLICE, POSTLIMIT, STATEINITIAL } from "../../Constants/StorageConstants";
import { changeLike, changePosts, dataPush, isError } from "../../Utilites/StoreFunction";
import { isLiked } from "../../Utilites/total";

const initialState = {
    ...STATEINITIAL,
    postsObject: null,
    total: null,
    favorites: [],
    tags: {}
}

export const fetchGetPagePosts = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchGetPagePosts`,

    async function (page, { rejectWithValue, fulfillWithValue, getState, extra: api }) {
        try {
            const { [NAMEUSERSLICE]: user } = getState();
            const data = await api.getPaginate(page, POSTLIMIT);
            return fulfillWithValue({ data, user });

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const fetchGetPosts = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchGetPosts`,

    async function (_, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts();
            return fulfillWithValue(data);

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
        addTag: (state, action) => {
            state.tags = { ...state.tags, [action.payload]: action.payload };
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchGetPosts.pending, state => {
            state.postsObject = null;
            state.error = null;
            state.favorites = null;
            state.loading = true;
        })
            .addCase(fetchGetPosts.fulfilled, (state, action) => {
                state.postsObject = action.payload;
                state.loading = false;
                state.postsObject.map(post => {

                    post.tags.map(tag => {
                        return state.tags = { ...state.tags, [tag]: tag };
                    })
                    return state.tags;
                });
            })
            .addCase(fetchGetPagePosts.pending, state => {
                state.data = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetPagePosts.fulfilled, (state, action) => {
                const { data, user } = action.payload;
                state.data = data.posts;
                state.total = data.total;
                state.favorites = state.data.filter(post => isLiked(post.likes, user.data._id));
                state.loading = false;
            })
            .addCase(fetchChengePost.fulfilled, (state, action) => {
                changePosts(state, action.payload);
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

export const { addTag } = postsSlice.actions;
export default postsSlice.reducer;