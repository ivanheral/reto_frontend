/*===================
  image.test.jsx
 ===================*/
import React from 'react';
import Image from '../image';
import { render, cleanup } from '@testing-library/react';
afterEach(cleanup);

describe('<Image />', () => {
    // Tests that providing a valid imgurl renders the image correctly. tags: [happy path]
    test('test_valid_img_url', () => {
        const imgUrl = 'https://example.com/image.jpg';
        const { getByTestId } = render(<Image imgUrl={imgUrl} />);
        const imageElement = getByTestId('image');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', imgUrl);
    });

    // Tests that providing an empty string as imgurl does not render an image. tags: [edge case]
    test('test_empty_img_url', () => {
        const imgUrl = '';
        const { queryByTestId } = render(<Image imgUrl={imgUrl} />);
        const imageElement = queryByTestId('image');
        expect(imageElement).not.toBeInTheDocument();
    });

    // Tests that providing an invalid url as imgurl does not render an image. tags: [edge case]
    test('test_invalid_img_url', () => {
        const imgUrl = null;
        const { queryByTestId } = render(<Image imgUrl={imgUrl} />);
        const imageElement = queryByTestId('image');
        expect(imageElement).not.toBeInTheDocument();
    });

    // Tests that the image is centered within its container. tags: [general behavior]
    test('test_image_centered', () => {
        const imgUrl = 'https://example.com/image.jpg';
        const { getByTestId } = render(<Image imgUrl={imgUrl} />);
        const imageElement = getByTestId('image');
        expect(imageElement).toHaveClass('object-center');
    });

    // Tests that the image is full height and width. tags: [general behavior]
    test('test_image_full_size', () => {
        const imgUrl = 'https://example.com/image.jpg';
        const { getByTestId } = render(<Image imgUrl={imgUrl} />);
        const imageElement = getByTestId('image');
        expect(imageElement).toHaveClass('h-full w-full');
    });

    // Tests that the 'classname' and 'data-testid' attributes are set correctly. tags: [general behavior]
    test('test_correct_attributes', () => {
        const imgUrl = 'https://example.com/image.jpg';
        const { getByTestId } = render(<Image imgUrl={imgUrl} />);
        const imageElement = getByTestId('image');
        expect(imageElement).toHaveAttribute('data-testid', 'image');
        expect(imageElement).toHaveClass('h-full w-full object-cover object-center lg:h-full lg:w-full');
    });
});
