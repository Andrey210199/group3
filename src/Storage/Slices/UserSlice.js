import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { COOKIETOKEN } from "../../Constants/Constant";
import { NAMEUSERSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { deleteCookie, setCookie } from "../../Utilites/Cookie";
import { isError } from "../../Utilites/StoreFunction";


const initialState = {
    ...STATEINITIAL,
    isAutch: false,
    allUsers: null
}

export const fetchGetUser = createAsyncThunk(
    `${NAMEUSERSLICE}/fetchGetUser`,

    async function (_, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {
            const data = await api.userInfo();
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchUpdateUser = createAsyncThunk(
    `${NAMEUSERSLICE}/fetchUpdateUser`,

    async function (name, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.getPathUser("PATH", name);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchUserAutch = createAsyncThunk(
    `${NAMEUSERSLICE}/fetchUserAutch`,

    async function (userData, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.authorization(userData);

            if (data.token) {
                const token_date = new Date();
                setCookie(COOKIETOKEN, data.token, { "max-age": token_date.setMonth(token_date.getMonth() + 1) });
            }
            else {
                return rejectWithValue(data);
            }

            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchRegistration = createAsyncThunk(
    `${NAMEUSERSLICE}/fetchRegistration`,

    async function (userData, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.register(userData);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchTokenCheck = createAsyncThunk(
    `${NAMEUSERSLICE}/fetchTokenCheck`,

    async function (token, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.getPathUser("GET", token);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const fetchUpdatAvatar = createAsyncThunk(
    `${NAMEUSERSLICE}/fetchUpdatAvatar`,

    async function (avatar, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {
            const data = await api.changeAvatar(avatar);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export function unAutch() {
    deleteCookie(COOKIETOKEN);
}



const userSlice = createSlice({
    name: NAMEUSERSLICE,
    initialState,
    extraReducers: builder => {

        builder.addCase(fetchGetUser.pending, state => {
            state.data = null;
            state.allUsers = null;
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchTokenCheck.pending, state => {
                state.data = null;
                state.allUsers = null;
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchTokenCheck.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserAutch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isAutch = true;
            })
            .addCase(fetchUpdatAvatar.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});

export default userSlice.reducer;