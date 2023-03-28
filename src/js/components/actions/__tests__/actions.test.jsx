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
    default: jest.fn().mockResolvedValueOnce({ code: 1 }),
}));

describe('<Actions />', () => {
    it('test_actions_adds_product_to_cart', async () => {
        const mockCart = [{ id: 1, colorCode: 'red', storageCode: '32gb' }];
        const mockSetCart = jest.fn();
        const { getByTestId } = render(
            <ShoppingCartContext.Provider value={{ cart: mockCart, setCart: mockSetCart }}>
                <Actions
                    options={{
                        colors: [{ code: 'red', name: 'Red' }],
                        storages: [{ code: '32gb', name: '32GB' }],
                    }}
                    id={1}
                />
            </ShoppingCartContext.Provider>,
        );
        fireEvent.change(getByTestId('red'));
        fireEvent.change(getByTestId('32gb'));
        expect(getByTestId('actions_add')).not.toBeDisabled();
        fireEvent.click(getByTestId('actions_add'));

        await waitFor(() =>
            expect(fetchAPI).toHaveBeenCalledWith('api/cart', 'POST', 'cart', [
                {
                    id: 1,
                    colorCode: 'red',
                    storageCode: '32gb',
                },
            ]),
        );
        expect(mockSetCart).toHaveBeenCalledWith([...mockCart, { id: 1, colorCode: 'red', storageCode: '32gb' }]);
    });
});
