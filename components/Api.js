class Api { 
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    }


getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
    })
    .then(this._handleResponse);
}

getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name, about })
    })
    .then(this._handleResponse);
}

addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({ name, link })
    })
    .then(this._handleResponse);
}

deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
    })
    .then(this._handleResponse);
}

likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers
    })
    .then(this._handleResponse);
}

unlikeCard(cardId) {

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers
    })
    .then(this._handleResponse);
}

updateAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink 
            })
        })
        .then(this._handleResponse);
    }
}
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
      authorization: "dcc2a3e3-62b5-4472-860e-62d48674ae2c",
     "Content-Type": "application/json"
  }
});

export default api;

