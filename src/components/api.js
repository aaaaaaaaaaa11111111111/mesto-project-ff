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