/*===================
  details.test.tsx
 ===================*/
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import Details from '../details';

afterEach(cleanup);

jest.mock('../../../api/api', () => ({
    __esModule: true,
    default: jest.fn().mockRejectedValueOnce(new Error('Test Error')),
}));

describe('Details', () => {
    it('test_error_display', async () => {
        const { getByTestId } = render(<Details id={1} />);
        await waitFor(() => {
            expect(getByTestId('product_error')).toBeInTheDocument();
        });
        expect(getByTestId('product_error')).toHaveTextContent('HA SURGIDO UN ERROR');
    });
});
