import { favoritesAdd, favoritesDelete } from "../Storage/Slices/PostsSlile";

export function isError(action){
    return action.type.endsWith("rejected");
}

export function StateFavorites({liked, data, state}){
    if (!liked) {
        favoritesAdd(state, data);
    }
    else {
       favoritesDelete(state, data);
    }
}