/*===================
  search.test.jsx
 ===================*/
import React from 'react';
import Search from '../search';
import { render, fireEvent, cleanup } from '@testing-library/react';
afterEach(cleanup);

describe('<Search />', () => {
    // Tests that the onchange event updates the query state variable with the current input value. tags: [happy path]
    it('test_search_input_updates_query_state', () => {
        const { getByTestId } = render(<Search />);
        const input = getByTestId('search_input');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input.value).toBe('test');
    });

    // Tests that the onclick event on the search button calls the getquery callback function with the current query value. tags: [happy path]
    it('test_search_button_calls_get_query_callback', () => {
        const mockGetQuery = jest.fn();
        const { getByTestId } = render(<Search getQuery={mockGetQuery} />);
        const input = getByTestId('search_input');
        const button = getByTestId('search_button');
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.click(button);
        expect(mockGetQuery).toHaveBeenCalledWith('test');
    });

    // Tests that if the user types in an empty search input, the query passed to getquery should be an empty string. tags: [edge case]
    it('test_search_empty_input_returns_empty_string', () => {
        const mockGetQuery = jest.fn();
        const { getByTestId } = render(<Search getQuery={mockGetQuery} />);
        const button = getByTestId('search_button');
        fireEvent.click(button);
        expect(mockGetQuery).toHaveBeenCalledWith('');
    });

    // Tests that the search component renders without errors and contains the correct elements. tags: [general behavior]
    it('test_search_renders_correctly', () => {
        const { getByTestId } = render(<Search />);
        const input = getByTestId('search_input');
        const button = getByTestId('search_button');
        expect(input).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    // Tests that the placeholder text in the search input reads "buscar telefono". tags: [general behavior]
    it('test_search_input_has_correct_placeholder_text', () => {
        const { getByPlaceholderText } = render(<Search />);
        const input = getByPlaceholderText('Buscar telefono');
        expect(input).toBeInTheDocument();
    });

    // Tests that the search button contains an svg icon representing a magnifying glass. tags: [general behavior]
    it('test_search_button_has_correct_svg_icon', () => {
        const { getByTestId } = render(<Search />);
        const button = getByTestId('search_button');
        const svgIcon = button.querySelector('svg');
        expect(svgIcon).toBeInTheDocument();
    });
});
