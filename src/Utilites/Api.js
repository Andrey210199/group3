import { getToken } from "./Cookie";

const config = {
    postsUrl: "https://api.react-learning.ru/v2/group-7/posts",
    userUrl: "https://api.react-learning.ru/v2/group-7/users",
    registerUrl: "https://api.react-learning.ru",
    headers: {
        "content-type": "application/json",
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzlkMDkiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDgsImV4cCI6MTY5OTQ0Nzk0OH0.ulDwC10wR3-KvsxJmhoC1xM3U-d_WJa7XKbKM2x8A2c"
    }
}

class Api {
    #registerUrl;
    #postsUrl;
    #userUrl;
    #headers;
    constructor({ postsUrl, userUrl, registerUrl, headers }) {
        this.#registerUrl = registerUrl;
        this.#postsUrl = postsUrl;
        this.#userUrl = userUrl;
        this.#headers = headers;
    }
    #OnResponse = res => {
        return res.ok ? res.json() : res.json().then((resp) => Promise.reject(resp.message));
    }

    #OnToken() {
        return { ...this.#headers, Authorization: getToken() ? getToken() : this.#headers.Authorization }
    }

    #RequestSwitch = (method = "GET", data) => {
        switch (true) {
            case method === "POST" || method === "PATCH" || method === "POST":
                return (
                    {
                        method: method,
                        headers: this.#OnToken(),
                        body: JSON.stringify(data)
                    });

            case method === "GET" || method === "DELETE" || method === "PUT":
                return ({
                    method: method,
                    headers: this.#OnToken()
                });

            default: return null;
        }
    }

    actionPosts({ method = "GET", postId = "", postData }) {
        return fetch(`${this.#postsUrl}${postId && `/${postId}`}`, this.#RequestSwitch(method, postData))
            .then(this.#OnResponse);

    }

    getSearchOnTitle(title) {
        return fetch(`${this.#postsUrl}/search/?query=${title}`, this.#RequestSwitch())
            .then(this.#OnResponse);
    }

    getPaginate({ pageNumber, limit, titleSearch = "" }) {
        return fetch(`${this.#postsUrl}/paginate?page=${pageNumber}&limit=${limit}${titleSearch && `&query=${titleSearch}`}`, this.#RequestSwitch())
            .then(this.#OnResponse);
    }

    changeLike(postId = "", islike) {
        return fetch(`${this.#postsUrl}/likes${postId && `/${postId}`}`, this.#RequestSwitch(islike ? "DELETE" : "PUT"))
            .then(this.#OnResponse);
    }

    actionComments({ method = "GET", postId = "", commentId = "", commentData }) {
        return fetch(`${this.#postsUrl}/comments${postId && `/${postId}`}${commentId && `/${commentId}`}`,
            this.#RequestSwitch(method, commentData))
            .then(this.#OnResponse);
    }

    getUsersUser(userId = "") {
        return fetch(`${this.#userUrl}${userId && `/${userId}`}`, this.#RequestSwitch())
            .then(this.#OnResponse);
    }

    userInfo() {
        return fetch(`${this.#userUrl}/me`, this.#RequestSwitch())
            .then(this.#OnResponse);
    }

    getPathUser(method = "", userData = "") {
        return fetch(`${this.#userUrl}/me`, this.#RequestSwitch(method, userData))
            .then(this.#OnResponse);
    }

    changeAvatar(avatar) {
        return fetch(`${this.#userUrl}/me/avatar`, this.#RequestSwitch("PATCH", { avatar }))
            .then(this.#OnResponse);
    }

    register(regData) {
        return fetch(`${this.#registerUrl}/signup`, this.#RequestSwitch("POST", regData))
            .then(this.#OnResponse);
    }

    authorization(authData) {
        return fetch(`${this.#registerUrl}/signin`, this.#RequestSwitch("POST", authData))
            .then(this.#OnResponse);
    }

    resetPass({ newPass, user = "", token }) {
        return fetch(`${this.#registerUrl}/password-reset${user && `/${user}/${token}`}`, this.#RequestSwitch("POST", newPass))
            .then(this.#OnResponse);
    }

}

const api = new Api(config);

export default api;