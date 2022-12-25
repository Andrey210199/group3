

const config = {
    postsUrl: "https://api.react-learning.ru/v2/group-7/posts",
    userUrl: "https://api.react-learning.ru/v2/group-7/users",
    registerUrl: "https://api.react-learning.ru/",
    headers: {
        "content-type": "application/json",
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzlkMDkiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDgsImV4cCI6MTY5OTQ0Nzk0OH0.ulDwC10wR3-KvsxJmhoC1xM3U-d_WJa7XKbKM2x8A2c"
    }
}

class Api {
    constructor({ postsUrl, userUrl, registerUrl, headers }) {
        this.registerUrl = registerUrl;
        this.postsUrl = postsUrl;
        this.userUrl = userUrl;
        this.headers = headers;
    }
    _OnResponse = res => {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    _getRequest() {
        return ({
            method: "GET",
            headers: this.headers
        });
    }

    _postRequest(data) {
        return (
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data)
            }
        )

    }

    _RequestSwitch = (method, data) => {
        return (method === "POST" || method === "PATCH" || method === "DELETE"
            ? {
                method: method,
                headers: this.headers,
                body: method !== "DELETE" ? JSON.stringify(data) : ""
            }
            : this._getRequest())

    }

    actionPosts(method,postId="", postData){
        return fetch(`${this.postsUrl}${postId && `/${postId}`}`, this._RequestSwitch(method, postData))
        .then(this._OnResponse);

    }

    getSearchOnTitle(title) {
        return fetch(`${this.postsUrl}/search/?query=${title}`, this._getRequest())
        .then(this._OnResponse);
    }

    getPaginate(pageNumber, limit, titleSearch) {
        return fetch(`${this.postsUrl}/paginate?page=${pageNumber}&limit=${limit}&query=${titleSearch}`, this._getRequest())
        .then(this._OnResponse);
    }

    changeLike(postId="" ,islike){
        return fetch(`${this.postsUrl}/likes${postId && `/${postId}`}`,
        {
            method: islike? "DELETE": "PUT",
            headers: this.headers
        }).then(this._OnResponse);
    }

    actionComments(method = "", postId = "", commentId = "", commentData) {
        return fetch(`${this.postsUrl}/comments${postId && `/${postId}`}${commentId && `/${commentId}`}`,
            this._RequestSwitch(method, commentData))
            .then(this._OnResponse);
    }

    getUsersUser(userId=""){
        return fetch(`${this.userUrl}${userId &&`/${userId}`}`,this._getRequest())
        .then(this._OnResponse);
    }

    userInfo(){
        return fetch(`${this.userUrl}/users/me`, this._getRequest())
        .then(this._OnResponse);
    }

    getPathUser(method = "", userData = "") {
        return fetch(`${this.userUrl}/me`, this._RequestSwitch(method, userData))
        .then(this._OnResponse);
    }

    changeAvatar(avatar) {
        return fetch(`${this.userUrl}/me/avatar`, {
            method: "PATH",
            headers: this.headers,
            body: JSON.stringify(avatar)
        }).then(this._OnResponse);
    }

    register(regData) {
        return fetch(`${this.registerUrl}/signup`, this._postRequest(regData))
        .then(this._OnResponse);
    }

    authorization(authData) {
        return fetch(`${this.registerUrl}/signin`, this._postRequest(authData))
        .then(this._OnResponse);
    }

    resetPass(newPass, user = "", token) {
        return fetch(`${this.registerUrl}/password-reset${user && `/${user}/${token}`}`, this._postRequest(newPass))
        .then(this._OnResponse);
    }

}

const api = new Api(config);

export default api;