/*===================
  storage.test.jsx
 ===================*/
import { getLocalStorage, setLocalStorage } from '../storage';

describe('Storage', () => {
    // Tests that the function retrieves a valid value from localstorage with a valid key and value. tags: [happy path]
    test('test_retrieving_valid_value', () => {
        // Arrange
        const key = 'testKey';
        const value = { name: 'John', age: 30 };
        localStorage.setItem(
            key,
            JSON.stringify({ value: JSON.stringify(value), expiry: new Date().getTime() + 1000 }),
        );

        // Act
        const result = getLocalStorage(key);

        // Assert
        expect(result).toEqual('{"name":"John","age":30}');
    });

    // Tests that the function retrieves null from localstorage with a key that has an expired value. tags: [happy path]
    test('test_retrieving_expired_value', () => {
        // Arrange
        const key = 'testKey';
        const value = { name: 'John', age: 30 };
        localStorage.setItem(
            key,
            JSON.stringify({ value: JSON.stringify(value), expiry: new Date().getTime() - 1000 }),
        );

        // Act
        const result = getLocalStorage(key);

        // Assert
        expect(result).toBeNull();
    });

    // Tests that the function removes the item from localstorage if the expiry date and time is in the past. tags: [happy path]
    test('test_remove_expired_item', () => {
        // Arrange
        const key = 'testKey';
        const value = { name: 'John', age: 30 };
        localStorage.setItem(
            key,
            JSON.stringify({ value: JSON.stringify(value), expiry: new Date().getTime() - 1000 }),
        );

        // Act
        getLocalStorage(key);

        // Assert
        expect(localStorage.getItem(key)).toBeNull();
    });

    // Tests that the function returns null when trying to retrieve a value from localstorage with a key that does not exist. tags: [edge case]
    test('test_retrieving_nonexistent_key', () => {
        // Arrange
        const key = 'nonexistentKey';

        // Act
        const result = getLocalStorage(key);

        // Assert
        expect(result).toBeNull();
    });

    // Tests setting a valid key, value, and ttl. tags: [happy path]
    test('test_valid_input: sets a valid key, value, and ttl', () => {
        const key = 'testKey';
        const value = { name: 'John', age: 30 };
        const ttl = 1000;
        setLocalStorage(key, value, ttl);
        const storedItem = JSON.parse(localStorage.getItem(key));
        expect(storedItem.value).toEqual(value);
        expect(storedItem.expiry).toBeGreaterThan(new Date().getTime());
    });

    // Tests overwriting an existing item with the same key. tags: [happy path]
    test('test_overwrite_existing_item: overwrites an existing item with the same key', () => {
        const key = 'testKey';
        const value1 = { name: 'John', age: 30 };
        const value2 = { name: 'Jane', age: 25 };
        const ttl = 1000;
        setLocalStorage(key, value1, ttl);
        setLocalStorage(key, value2, ttl);
        const storedItem = JSON.parse(localStorage.getItem(key));
        expect(storedItem.value).toEqual(value2);
    });
});
