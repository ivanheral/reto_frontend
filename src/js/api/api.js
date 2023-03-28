import { getLocalStorage } from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL;

function fetchAPI(path, method, storage, body) {
    if (getLocalStorage(storage)) return Promise.resolve(getLocalStorage(storage));

    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    });

    const Init = { method, headers: myHeaders };

    if (body) Init.body = JSON.stringify(body);
    return fetch(`${API_URL}/${path}`, Init).then((postsResponse) => {
        if (postsResponse.ok) {
            return postsResponse.json();
        }
        return Promise.reject();
    });
}

export default fetchAPI;
