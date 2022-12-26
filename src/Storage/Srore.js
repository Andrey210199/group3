import { configureStore } from "@reduxjs/toolkit";
import { NAMEPOSTSSLICE, NAMESINGLEPOSTSLICE, NAMEUSERSLICE } from "../Constants/StorageConstants";
import api from "../Utilites/Api";
import PostsSlile from "./Slices/PostsSlile";
import SinglePostSlice from "./Slices/SinglePostSlice";
import UserSlice from "./Slices/UserSlice";


const store = configureStore({
    reducer: {
        [NAMEUSERSLICE]: UserSlice,
        [NAMEPOSTSSLICE]: PostsSlile,
        [NAMESINGLEPOSTSLICE]: SinglePostSlice

    },
    middleware: getdefaufltMiddleware => {
        return getdefaufltMiddleware({
            thunk: {
                extraArgument: api
            }
        })
    }
});

export default store;