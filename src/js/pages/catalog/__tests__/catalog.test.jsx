/*===================
  catalog.test.tsx
 ===================*/
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import Catalog from '../catalog';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('../../../api/api', () => ({
    __esModule: true,
    default: jest
        .fn()
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce([
            { brand: 'Apple', model: 'iPhone 12' },
            { brand: 'Samsung', model: 'Galaxy S21' },
        ]),
}));

describe('Catalog', () => {
    test('test_products_no_data', async () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Catalog />
            </BrowserRouter>,
        );
        await waitFor(() => {
            const element = getByTestId('catalog_nodata');
            // expect(element).toBeInTheDocument();
            expect(element).toBeTruthy();
        });
    });

    test('test_products_with_data', async () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Catalog />
            </BrowserRouter>,
        );
        await waitFor(() => {
            const element = getByTestId('catalog_data');
            // expect(element).toBeInTheDocument();
            expect(element).toBeTruthy();
        });
    });
});
