import { isLiked } from "./total";

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

export function dataLiked(state, userId) {
    return state.data.filter(post => isLiked(post.likes, userId));
}

export function dataPush(state, data) {
    state.favorites.push(data);
}

export function dataFilter(state, data) {
    state.favorites = state.favorites.filter(post => post._id !== data._id);
}

export function changePosts(state, data) {
    state.data = state.data?.map(post => post._id === data._id ? data : post);
}

export function deleteComment(state, comments) {

    const newComments = [];
    state.comments.filter(comment => {
        comments.forEach(element => {
            if (comment._id === element._id) {
               return newComments.push(comment);
            }
        });
        return newComments
    });

    return newComments;
}