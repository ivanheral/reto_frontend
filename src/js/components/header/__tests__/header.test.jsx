/*===================
  header.test.jsx
 ===================*/
import React from 'react';
import Header from '../header';
import { render, cleanup } from '@testing-library/react';
import { ShoppingCartContext } from '../../../context/shoppingcart';
afterEach(cleanup);

describe('<Header />', () => {
    // Tests that the header component renders correctly with items in the shopping cart. tags: [happy path]
    it('test_header_renders_with_items', () => {
        const { getByText } = render(
            <ShoppingCartContext.Provider value={{ cart: [{ id: 1, name: 'Item 1', price: 10 }] }}>
                <Header />
            </ShoppingCartContext.Provider>,
        );
        expect(getByText('1')).toBeInTheDocument();
    });

    // Tests that the header component renders correctly with a large number of items in the shopping cart. tags: [edge case]
    it('test_header_renders_with_large_number_of_items', () => {
        const cartItems = [];
        for (let i = 0; i < 100; i++) {
            cartItems.push({ id: i, name: `Item ${i}`, price: 10 });
        }
        const { getByText } = render(
            <ShoppingCartContext.Provider value={{ cart: cartItems }}>
                <Header />
            </ShoppingCartContext.Provider>,
        );
        expect(getByText('100')).toBeInTheDocument();
    });

    it('test_header_renders_with_invalid_props', () => {
        const { queryByText } = render(
            <ShoppingCartContext.Provider value={{ cart: [] }}>
                <Header invalidProp="invalid" />
            </ShoppingCartContext.Provider>,
        );
        expect(queryByText('0')).not.toBeInTheDocument();
    });
});
