import React, { useContext } from 'react';
import { ShoppingCartContext } from '../../context/shoppingcart';
import { AiOutlineShoppingCart, AiOutlineShop } from 'react-icons/ai';
import { Link } from 'wouter';

const Header = ({ children }) => {
    const context = useContext(ShoppingCartContext);
    return (
        <>
            <header data-testid="header" className="mb-4 bg-white shadow">
                <div className="mx-auto max-w-7xl py-2 pl-6 pr-4 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link to="/" className="flex shrink-0 items-center">
                            <AiOutlineShop size="2em" />
                        </Link>
                        <div className="flex h-16 w-16 items-center justify-center">
                            <div className="relative inline-flex items-center rounded-lg p-3 text-gray-600">
                                <AiOutlineShoppingCart size="2em" />
                                {context.cart.length > 0 && (
                                    <div className="absolute -top-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900">
                                        {context.cart.length}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </>
    );
};

export default Header;
