import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMEPOSTSSLICE, NAMEUSERSLICE, POSTLIMIT, STATEINITIAL } from "../../Constants/StorageConstants";
import { changeLike, changePosts, dataLiked, dataPush, isError } from "../../Utilites/StoreFunction";
import { isLiked } from "../../Utilites/total";

const initialState = {
    ...STATEINITIAL,
    postsObject: null,
    total: null,
    favorites: [],
    tags: {},
    search: "",
    isSearch: false
}

export const fetchGetPagePosts = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchGetPagePosts`,

    async function (page, { rejectWithValue, fulfillWithValue, getState, extra: api }) {
        try {
            const { [NAMEUSERSLICE]: user } = getState();
            const data = await api.getPaginate({ pageNumber: page, limit: POSTLIMIT });
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

            const data = await api.actionPosts({});
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchAddPost = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchAddPost`,

    async function (postData, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts({ method: "POST", postData });
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

            const data = await api.actionPosts({ method: "PATCH", postId: post._id, postData: post });
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }

)

export const fetchDeletePost = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchDeletePost`,

    async function (post, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.actionPosts({ method: "DELETE", postId: post._id });
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

            const { [NAMEUSERSLICE]: user } = getState();
            const liked = isLiked(post.likes, user.data._id);
            const data = await api.changeLike(post._id, liked);
            return fulfillWithValue({ data, liked });

        } catch (error) {
            rejectWithValue(error);
        }
    }
);


export const fetchSearch = createAsyncThunk(
    `${NAMEPOSTSSLICE}/fetchSearch`,

    async function ({ page, search }, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {
            const { [NAMEUSERSLICE]: user } = getState();
            const data = await api.getPaginate({ pageNumber: page, limit: POSTLIMIT, titleSearch: search });
            return fulfillWithValue({ data, user });

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const postsSlice = createSlice({
    name: NAMEPOSTSSLICE,
    initialState,
    reducers: {
        addTag: (state, action) => {
            state.tags = { ...state.tags, [action.payload]: action.payload };
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchGetPosts.pending, state => {
            state.postsObject = null;
            state.error = null;
            state.favorites = null;
            state.loading = true;
        })
            .addCase(fetchSearch.pending, state => {
                state.data = null;
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
                state.isSearch = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetPagePosts.fulfilled, (state, action) => {
                const { data, user } = action.payload;
                state.data = data.posts;
                state.total = data.total;
                state.favorites = dataLiked(state, user.data._id);
                state.isSearch = false;
                state.loading = false;
            })
            .addCase(fetchChengePost.fulfilled, (state, action) => {
                changePosts(state, action.payload);
            })
            .addCase(fetchAddPost.fulfilled, (state, action) => {
                dataPush(state, action.payload.data);
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                const { data, user } = action.payload;
                state.data = data.posts;
                state.total = data.total;
                state.favorites = dataLiked(state, user.data._id);
                state.isSearch = true;
                state.loading = false;
            })
            .addCase(fetchChangeLike.fulfilled, (state, action) => {
                const { data, liked } = action.payload;
                changePosts(state, data)
                changeLike({ state, data, liked });

            })
            .addCase(fetchDeletePost.fulfilled, (state, action) => {
                state.data = state.data.filter(post => post._id !== action.payload._id);
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.isSearch = false;
                state.loading = false;
            })
    }

});

export const { addTag, setSearch } = postsSlice.actions;
export default postsSlice.reducer;