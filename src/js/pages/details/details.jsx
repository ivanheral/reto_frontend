import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchAPI from '../../api/api';
import Actions from '../../components/actions/actions';
import Image from '../../components/image/image';
const Details = () => {
    let { id } = useParams();

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        fetchAPI(`api/product/${id}`, 'GET', id)
            .then((data) => {
                setProduct(data);
            })
            .catch((_error) => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const showProduct = () => {
        if (loading) {
            return (
                <div data-testid="product_loading" className="grid h-screen place-items-center">
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="mr-2 h-8 w-8 animate-spin text-gray-200 dark:text-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                    </div>
                </div>
            );
        } else if (error) {
            return (
                <div data-testid="product_error" className="grid h-screen place-items-center">
                    <div>HA SURGIDO UN ERROR</div>
                </div>
            );
        } else if (product) {
            return (
                <div className="bg-white">
                    <div className="pt-6">
                        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                            <div className="overflow-hidden rounded-lg lg:col-span-1">
                                <Image imgUrl={product.imgUrl} />
                            </div>

                            <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {product.brand} / {product.model}
                                </h1>
                                <div className="mt-10">
                                    <h3 className="text-sm font-medium text-gray-900">Caracteristicas</h3>
                                </div>
                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.cpu}</span>
                                        </li>
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.ram}</span>
                                        </li>
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.os}</span>
                                        </li>
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.displayResolution}</span>
                                        </li>
                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.battery}</span>
                                        </li>

                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.primaryCamera}</span>
                                        </li>

                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.secondaryCmera}</span>
                                        </li>

                                        <li className="text-gray-400">
                                            <span className="text-gray-600">{product.dimentions}</span>
                                        </li>

                                        <li className="text-gray-400">
                                            <span className="text-gray-600">
                                                {product.weight ? product.weight : 0}g
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">{product.price}€</p>
                                {<Actions {...product} />}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            <div data-testid="product_nodata" className="grid h-screen place-items-center">
                <div>NO HAY DATOS</div>
            </div>;
        }
    };

    return <>{showProduct()}</>;
};

export default Details;
