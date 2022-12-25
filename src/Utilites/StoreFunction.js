
export function isError(action){
    return action.type.endsWith("rejected");
}

export function StateFavorites({liked, data, state}){
    if (!liked) {
        state.favorites.push(data);
    }
    else {
       state.favorites = state.favorites.filter(post => post._id !== data._id);
    }
}