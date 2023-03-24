import React from 'react';

const Description = ({ children }) => {
    return (
        <>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex shrink-0 items-center">
                            <img
                                className="block h-8 w-auto"
                                src="https://logos-world.net/wp-content/uploads/2020/05/Zara-Logo.png"
                                alt=""
                            />
                        </div>
                        <div className="flex items-center">
                            <div className="relative ml-3">
                                <div>
                                    <button
                                        type="button"
                                        className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none"
                                        id="user-menu"
                                        aria-haspopup="true"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src="https://logos-world.net/wp-content/uploads/2020/05/Zara-Logo.png"
                                            alt=""
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </>
    );
};

export default Description;
