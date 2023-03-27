/*===================
  item.test.jsx
 ===================*/
import React from 'react';
import Item from '../item';
import { render, fireEvent, cleanup } from '@testing-library/react';

afterEach(cleanup);

describe('<Item />', () => {
    it('test_render_with_valid_inputs', () => {
        const props = {
            imgUrl: 'https://example.com/image.jpg',
            brand: 'Brand',
            model: 'Model',
            price: 100,
            id: '123',
        };
        const { getByTestId } = render(<Item {...props} />);
        const itemLink = getByTestId('item');
        const itemBrand = getByTestId('item_brand');
        const itemModel = getByTestId('item_model');
        const itemPrice = getByTestId('item_price');
        const itemImage = getByTestId('item_image');

        expect(itemLink).toBeInTheDocument();
        expect(itemBrand).toHaveTextContent(props.brand);
        expect(itemModel).toHaveTextContent(props.model);
        expect(itemPrice).toHaveTextContent(`${props.price}€`);
        expect(itemImage.children[0].src).toContain('https://example.com/image.jpg');
    });

    // Tests that clicking on the link component navigates to the correct details page. tags: [happy path]
    it('test_navigation_to_details_page', () => {
        const props = {
            imgUrl: 'https://example.com/image.jpg',
            brand: 'Brand',
            model: 'Model',
            price: 100,
            id: '123',
        };
        const { getByTestId } = render(<Item {...props} />);
        const itemLink = getByTestId('item');

        fireEvent.click(itemLink);

        expect(window.location.href).toContain(`details/${props.id}`);
    });

    // Tests that the component renders correctly with empty strings or null inputs. tags: [edge case]
    it('test_render_with_empty_strings_or_null_inputs', () => {
        const props = {
            imgUrl: '',
            brand: null,
            model: '',
            price: 0,
            id: '123',
        };
        const { getByTestId } = render(<Item {...props} />);
        const itemBrand = getByTestId('item_brand');
        const itemModel = getByTestId('item_model');
        const itemPrice = getByTestId('item_price');
        const itemImage = getByTestId('item_image');

        expect(itemImage.children[0]).toBeUndefined();
        expect(itemBrand).toHaveTextContent('');
        expect(itemModel).toHaveTextContent('');
        expect(itemPrice).toHaveTextContent('0€');
    });
});
