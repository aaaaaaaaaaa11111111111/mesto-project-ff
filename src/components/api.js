const config = {
    baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
    headers: {
      authorization: 'f2fff402-cd1f-48d2-956a-824e054efa33',
      'Content-Type': 'application/json'
    }
};

export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => {
        if(res.ok) {
          return res.json();   
        }
    return Promise.reject(`Ошибка: ${res.status}`)
    })
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export const patchUserInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export const postCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
};

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    return Promise.reject(`Ошибка: ${res.status}`);
    })
};