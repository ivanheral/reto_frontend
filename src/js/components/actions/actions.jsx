import React, { useContext, useState } from 'react';
import fetchAPI from '../../api/api';
import { ShoppingCartContext } from '../../context/shoppingcart';

const Actions = ({ options, id }) => {
    const [product, setProduct] = useState({
        id: id,
        colorCode: options.colors.length === 1 ? options.colors[0].code : null,
        storageCode: options.storages.length === 1 ? options.storages[0].code : null,
    });

    const { cart, setCart } = useContext(ShoppingCartContext);

    const addCart = () => {
        fetchAPI('api/cart', 'POST', 'cart', cart)
            .then((_data) => {
                /** */
            })
            .catch((_error) => {
                /** */
            })
            .finally(() => {
                /** */
                setCart([...cart, product]);
            });
    };
    const handleOptionStorageChange = (changeEvent) => {
        setProduct({ ...product, storageCode: changeEvent.target.value });
    };

    const handleOptionColorChange = (changeEvent) => {
        setProduct({ ...product, colorCode: changeEvent.target.value });
    };

    return (
        <div className="mt-10">
            <div>
                <h3 className="text-sm font-medium text-gray-900">Eliga un Color</h3>
                <fieldset className="mt-4">
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-8 lg:grid-cols-3">
                        {options.colors.map((e, i) => {
                            return (
                                <label
                                    key={i}
                                    className={`${
                                        e.code == product.colorCode || options.colors?.length == 1
                                            ? 'border-2 border-indigo-500'
                                            : ''
                                    } group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase text-gray-900 shadow-sm focus:outline-none sm:flex-1 sm:py-6`}
                                >
                                    <input
                                        type="radio"
                                        name="size-choice"
                                        value={e.code}
                                        checked={e.code == product.colorCode || options.colors?.length == 1}
                                        onChange={handleOptionColorChange}
                                        className="sr-only"
                                        aria-labelledby="size-choice-1-label"
                                    />
                                    <span id="size-choice-1-label">{e.name}</span>
                                    <span
                                        className="pointer-events-none absolute -inset-px rounded-md"
                                        aria-hidden="true"
                                    ></span>
                                </label>
                            );
                        })}
                    </div>
                </fieldset>
            </div>
            <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Eliga una capacidad de almacenamiento</h3>
                <fieldset className="mt-4">
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-8 lg:grid-cols-3">
                        {options.storages.map((e, i) => {
                            return (
                                <label
                                    key={i}
                                    className={`${
                                        e.code == product.storageCode || options.storage?.length == 1
                                            ? 'border-2 border-indigo-500'
                                            : ''
                                    } group relative flex cursor-pointer items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase text-gray-900 shadow-sm focus:outline-none sm:flex-1 sm:py-6`}
                                >
                                    <input
                                        type="radio"
                                        name="size-choice"
                                        value={e.code}
                                        checked={e.code == product.storageCode || options.storage?.length == 1}
                                        onChange={handleOptionStorageChange}
                                        className="sr-only"
                                        aria-labelledby="size-choice-1-label"
                                    />
                                    <span id="size-choice-1-label">{e.name}</span>
                                    <span
                                        className="pointer-events-none absolute -inset-px rounded-md"
                                        aria-hidden="true"
                                    ></span>
                                </label>
                            );
                        })}
                    </div>
                </fieldset>
            </div>

            <button
                onClick={() => addCart()}
                disabled={!product.colorCode || !product.storageCode}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-500"
            >
                Agregar al carro
            </button>
        </div>
    );
};

export default Actions;
