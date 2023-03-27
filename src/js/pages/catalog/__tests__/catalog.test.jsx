/*===================
  catalog.test.tsx
 ===================*/
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import Catalog from '../catalog';

afterEach(cleanup);

jest.mock('../../../api/api', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValueOnce([
        { brand: 'Apple', model: 'iPhone 12' },
        { brand: 'Samsung', model: 'Galaxy S21' },
    ]),
}));

describe('Catalog', () => {
    test('test_fetch_data_success', async () => {
        const { getByTestId } = render(<Catalog />);
        await waitFor(() => expect(getByTestId('catalog_data')).toBeInTheDocument());
        expect(getByTestId('catalog_data').children.length).toBe(1);
        expect(getByTestId('catalog_data').children[0].children.length).toBe(1);
        expect(getByTestId('catalog_data').children[0].children[0].children.length).toBe(2);
    });
});
