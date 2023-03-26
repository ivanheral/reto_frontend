import * as React from 'react';

const ShoppingCartContext = React.createContext();

const ShoppingCartProvider = ({ children }) => {
    const [cart, setCart] = React.useState([]);

    React.useEffect(() => {
        setCart([]);
    }, []);

    return <ShoppingCartContext.Provider value={{ cart, setCart }}>{children}</ShoppingCartContext.Provider>;
};

export { ShoppingCartProvider, ShoppingCartContext };
