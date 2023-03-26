/*===================
  shoppingcart.test.jsx
 ===================*/
import React from 'react';
import { render, fireEvent, renderHook, cleanup } from '@testing-library/react';
import { ShoppingCartProvider, ShoppingCartContext } from '../shoppingcart';
afterEach(cleanup);

describe('<ShoppingCart />', () => {
    it('test_cart_state_set_on_mount', () => {
        const { result } = renderHook(() => ShoppingCartProvider(<></>));
        expect(result.current.props.value.cart).toEqual([]);
    });

    // Tests that the children components receive the cart state and setcart function through the context provider. tags: [happy path]
    it('test_children_receive_context', () => {
        const ChildComponent = () => {
            const { cart } = React.useContext(ShoppingCartContext);
            return <div>{cart.length}</div>;
        };
        const { getByText } = render(
            <ShoppingCartProvider>
                <ChildComponent />
            </ShoppingCartProvider>,
        );
        expect(getByText('0')).toBeInTheDocument();
    });

    // Tests the behavior of the function when no children components are provided. tags: [edge case]
    it('test_no_children_provided', () => {
        const { container } = render(<ShoppingCartProvider />);
        expect(container.firstChild).toBeNull();
    });

    // Tests the behavior of the function when the children components consume the cart state and setcart function incorrectly. tags: [other possible issue]
    it('test_children_consume_context_incorrectly', () => {
        const ChildComponent = () => {
            const { cart, setCart } = React.useContext(ShoppingCartContext);
            return (
                <>
                    <div data-testid="cart">{cart.length}</div>
                    <button onClick={() => setCart([1, 2, 3])}>Add to Cart</button>
                </>
            );
        };

        const { getByText, getByTestId } = render(
            <ShoppingCartProvider>
                <ChildComponent />
            </ShoppingCartProvider>,
        );
        expect(getByTestId('cart').innerHTML).toBe('0');
        fireEvent.click(getByText('Add to Cart'));
        expect(getByTestId('cart').innerHTML).toBe('3');
    });
});
