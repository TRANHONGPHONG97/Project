import React from 'react';
import Header from './../../../Header/Header';
import { Provider } from 'react-redux';
import store from '../../../../redux/store';
import PageAuction from './PageAuction';
import Footer from '../../../Footer/Footer';

function ShowPageAuction() {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <PageAuction />
            <Footer />
        </Provider>
    );
}

export default ShowPageAuction;
