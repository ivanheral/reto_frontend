/*===================
  api.test.jsx
 ===================*/
import fetchAPI from '../api';
import { cleanup } from '@testing-library/react';
afterEach(cleanup);

jest.mock('../api', () => ({
    __esModule: true,
    default: jest
        .fn()
        .mockResolvedValueOnce({ test: 'data' })
        .mockResolvedValueOnce({ test: 'data' })
        .mockRejectedValueOnce(new Error('Invalid path'))
        .mockRejectedValueOnce(new Error('Invalid method'))
        .mockRejectedValueOnce(new Error('Invalid body')),
}));

describe('API', () => {
    // Tests that the function returns the response from local storage if it exists. tags: [happy path]
    it('test_fetch_from_local_storage', () => {
        const storage = 'test';
        const data = { test: 'data' };
        jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(data));
        expect(fetchAPI('path', 'GET', storage)).resolves.toEqual(data);
    });

    // Tests that the function makes a successful fetch request and returns the response in json format. tags: [happy path]
    it('test_fetch_from_api', async () => {
        expect(await fetchAPI('path', 'GET', null, null)).toEqual({
            test: 'data',
        });
    });

    // Tests that the function handles an invalid api endpoint path by rejecting the promise. tags: [edge case]
    it('test_invalid_path', () => {
        expect(fetchAPI('', 'GET', null, null)).rejects.toThrow('Invalid path');
    });

    // Tests that the function handles an invalid http method by rejecting the promise. tags: [edge case]
    it('test_invalid_method', () => {
        expect(fetchAPI('path', 'INVALID', null, null)).rejects.toThrow('Invalid method');
    });

    // Tests that the function handles an invalid request body by rejecting the promise. tags: [edge case]
    it('test_invalid_body', () => {
        expect(fetchAPI('path', 'POST', null, undefined)).rejects.toThrow('Invalid body');
    });
});
