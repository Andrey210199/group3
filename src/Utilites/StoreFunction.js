
export function isError(action) {
    return action.type.endsWith("rejected");
}

export function changeLike({ state, data, liked }) {

    if (!liked) {
        dataPush(state, data);
    }
    else {
        dataFilter(state, data);
    }
}

export function dataPush(state, data){
    state.favorites.push(data);
}

export function dataFilter(state, data){
    state.favorites = state.favorites.filter(post => post._id !== data._id);
}

export function changePosts(state, data) {
    state.data = state.data.map(post => post._id === data._id ? data : post);
}