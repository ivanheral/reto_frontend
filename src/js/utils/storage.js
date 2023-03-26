const getLocalStorage = (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    const result = item.value;
    return result;
};

const setLocalStorage = (key, value, ttl) => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl * 60 * 60,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

export { setLocalStorage, getLocalStorage };
