import React from 'react';
import { Link } from 'wouter';
import Image from '../../components/image/image';

const Item = ({ imgUrl, brand, model, price, id }) => {
    return (
        <Link to={`details/${id}`} data-testid="item" className="group relative">
            <div
                data-testid="item_image"
                className="lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80"
            >
                <Image imgUrl={imgUrl} />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 data-testid="item_brand" className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0"></span>
                        {brand}
                    </h3>
                    <p data-testid="item_model" className="mt-1 text-sm text-gray-500">
                        {model}
                    </p>
                </div>
                <p data-testid="item_price" className="text-sm font-medium text-gray-900">
                    {price}€
                </p>
            </div>
        </Link>
    );
};

export default Item;
