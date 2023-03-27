import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
// styles
import './main.css';
import { Router, Route } from 'wouter';
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
    <Router>
        <ShoppingCartProvider>
            <Suspense fallback={<Loading />}>
                <div className="container">
                    <Head>
                        <Route path="/">
                            <Catalog />
                        </Route>
                        <Route path="/details/:id">{(params) => <Details id={params.id} />}</Route>
                    </Head>
                </div>
            </Suspense>
        </ShoppingCartProvider>
    </Router>,
);
