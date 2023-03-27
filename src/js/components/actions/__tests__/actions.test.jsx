/*===================
  actions.test.jsx
 ===================*/
import React from 'react';
import Actions from '../actions';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { ShoppingCartContext } from '../../../context/shoppingcart';
import fetchAPI from '../../../api/api';
afterEach(cleanup);

jest.mock('../../../api/api', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValueOnce({ count: 1 }),
}));

describe('<Actions />', () => {
    it('test_actions_adds_product_to_cart', async () => {
        const mockCart = [];
        const mockSetCart = jest.fn();
        const { getByTestId } = render(
            <ShoppingCartContext.Provider value={{ cart: mockCart, setCart: mockSetCart }}>
                <Actions
                    id="1"
                    options={{
                        colors: [
                            {
                                code: 1000,
                                name: 'Black',
                            },
                            {
                                code: 1001,
                                name: 'Gold',
                            },
                        ],
                        storages: [
                            { code: 2000, name: '32 GB' },
                            { code: 2001, name: '64 GB' },
                        ],
                    }}
                />
            </ShoppingCartContext.Provider>,
        );
        fireEvent.click(getByTestId(1000));
        fireEvent.click(getByTestId(2001));
        expect(getByTestId('actions_add')).not.toBeDisabled();
        fireEvent.click(getByTestId('actions_add'));

        await waitFor(() =>
            expect(fetchAPI).toHaveBeenCalledWith('api/cart', 'POST', 'cart', {
                id: '1',
                colorCode: 1000,
                storageCode: 2001,
            }),
        );
    });
});
