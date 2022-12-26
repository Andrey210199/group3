import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NAMEUSERSLICE, STATEINITIAL } from "../../Constants/StorageConstants";
import { isError } from "../../Utilites/StoreFunction";


const initialState = {
    ...STATEINITIAL,
    isAutch: false
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

const userSlice = createSlice({
    name: NAMEUSERSLICE,
    initialState,
    extraReducers: builder => {

        builder.addCase(fetchGetUser.pending, state => {
            state.data = null;
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchGetUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});

export default userSlice.reducer;