import React from 'react';

const Image = ({ imgUrl }) => {
    return (
        imgUrl &&
        isNaN(imgUrl) && (
            <img
                data-testid="image"
                src={imgUrl}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            ></img>
        )
    );
};

export default Image;
