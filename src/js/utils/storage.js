// Esta función se encarga de obtener un valor del localStorage.
// Primero, obtiene el valor asociado a la key pasada como parámetro.
// Si no existe, devuelve null.
const getLocalStorage = (key) => {
    // Obtiene el valor asociado a la key pasada como parámetro.
    const itemStr = localStorage.getItem(key);

    // Si no existe, devuelve null.
    if (!itemStr) return null;

    // Parsea el string a un objeto JSON.
    const item = JSON.parse(itemStr);

    // Crea una nueva instancia de Date para obtener la fecha actual.
    const now = new Date();

    // Si la fecha actual es mayor que la fecha de expiración guardada en el objeto JSON, elimina el elemento del localStorage y devuelve null.
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    // Parsea el valor guardado en el objeto JSON a un nuevo objeto JSON y lo devuelve como resultado de la función.
    const result = JSON.parse(item.value);
    return result;
};

// Esta función recibe 3 parámetros:
// key (una clave para identificar el elemento en localStorage),
// value (el valor que se guardará) y ttl (tiempo de vida del elemento).
const setLocalStorage = (key, value, ttl) => {
    // Creamos un objeto Date para obtener la fecha actual.
    const now = new Date();

    // Creamos un objeto con el valor y la fecha de expiración del elemento.
    const item = {
        value: value,
        expiry: now.getTime() + ttl, // La fecha de expiración es igual a la fecha actual más el tiempo de vida.
    };

    // Guardamos el elemento en localStorage transformado a formato JSON.
    localStorage.setItem(key, JSON.stringify(item));
};

export { setLocalStorage, getLocalStorage };
