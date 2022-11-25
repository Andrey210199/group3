import { json } from "react-router";

const config ={
    postsUrl: "https://api.react-learning.ru/v2/group-7/posts",
    userUrl: "https://api.react-learning.ru/v2/group-7/users",
    registerUrl: "https://api.react-learning.ru/",
    headers: {
        "content-type": "application/json",
        authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzlkMDkiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDgsImV4cCI6MTY5OTQ0Nzk0OH0.ulDwC10wR3-KvsxJmhoC1xM3U-d_WJa7XKbKM2x8A2c"
    }
}

class Api{
    constructor({postsUrl, userUrl, registerUrl, headers}){
        this.registerUrl = registerUrl;
        this.postsUrl = postsUrl;
        this.userUrl = userUrl;
        this.headers = headers;
    }
    _OnResponse= res=>{
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    Posts(method ="GET",postId, postData){
        return fetch(`${this.postsUrl}${postId && `/${postId}`}`,{
            method: method === "POST" || method ==="PATCH" || method ==="DELETE" ? method : "GET",
            headers: this.headers,
            body: method==="DELETE" || method==="GET" ? JSON.stringify(postData) : ""
        }).then(this._OnResponse);

    }

    getTitle(title){
        return fetch(`${this.postsUrl}/search/?query=${title}`,{
            method: "GET",
            headers: this.headers
        }).then(this._OnResponse);
    }

    getPaginate(pageNumber, limit, titleSearch){
        return fetch(`${this.postsUrl}/paginate?page=${pageNumber}&limit=${limit}&query=${titleSearch}`,{
            method: "GET",
            headers: this.headers
        }).then(this._OnResponse);
    }

    setDeleteLike(postId ,islike){
        return fetch(`${this.postsUrl}/likes${postId && `/${postId}`}`,
        {
            method: islike? "DELETE": "PUT",
            headers: this.headers
        }).then(this._OnResponse);
    }
    
    comment(method, postId, commentId, commetData){
        return fetch(`${this.postsUrl}/comments${postId && `/${postId}`}${commentId && `/${commentId}`}`,{
            method: method === "POST" || method ==="DELETE" ? method : "GET",
            headers: this.headers,
            body: method==="DELETE" || method==="GET" ? JSON.stringify(commetData) : ""
        }).then(this._OnResponse);
    }

    getUsersUser(userId){
        return fetch(`${this.userUrl}${userId && `/${userId}`}`,{
            method: "GET",
            headers: this.headers
        }).then(this._OnResponse);
    }

    getParchUser(method, userData=""){
        return fetch(`${this.userUrl}/me`,{
            method: method==="PATH" ? "PATH" : "GET",
            headers: this.headers,
            body: method === "PATH" && userData!=="" ? JSON.stringify(userData) : ""
        }).then(this._OnResponse);
    }

    chengeAvatar(avatar){
        return fetch(`${this.userUrl}/me/avatar`,{
            method: "PATH",
            headers: this.headers,
            body: json.stringify(avatar)
        }).then(this._OnResponse);
    }

    register(regData){
        return fetch(`${this.registerUrl}/signup`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(regData)
        }).then(this._OnResponse);
    }

    authorization(authData){
        return fetch(`${this.registerUrl}/signin`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(authData)
        }).then(this._OnResponse);
    }

    resetPass(newPass, user, token){
        return fetch(`${this.registerUrl}/password-reset${user && `/${user}/${token}`}`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(newPass)
        }).then(this._OnResponse);
    }

}

const api = new Api(config);

export default api;