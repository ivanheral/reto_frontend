import * as React from 'react';

export const ShoppingCartContext = React.createContext({ user: 0 });

const ShoppingCartProvider = ({ children }) => {
    const [cart, setCart] = React.useState([]);

    React.useEffect(() => {
        setCart([]);
    }, []);

    return <ShoppingCartContext.Provider value={{ cart, setCart }}>{children}</ShoppingCartContext.Provider>;
};

export { ShoppingCartProvider };
