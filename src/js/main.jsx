import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
// styles
import './main.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShoppingCartProvider } from './context/shoppingcart';
import Head from './components/header/header';
import Catalog from './pages/catalog/catalog';
import Details from './pages/details/details';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);

const Loading = () => {
    return (
        <div className="grid h-screen content-center text-center">
            <p>Loading...?</p>
        </div>
    );
};

root.render(
    <BrowserRouter>
        <ShoppingCartProvider>
            <Suspense fallback={<Loading />}>
                <div className="container">
                    <Head>
                        <Routes>
                            <Route path="/" element={<Catalog />}></Route>
                            <Route path="/details/:id" element={<Details />}></Route>
                        </Routes>
                    </Head>
                </div>
            </Suspense>
        </ShoppingCartProvider>
    </BrowserRouter>,
);
