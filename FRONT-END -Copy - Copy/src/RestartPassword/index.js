import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../singup/asset/css/intro331js.min.css';
import '../singup/asset/css/slick181.min.css';
import '../singup/asset/css/slick181-theme.css';
import '../singup/asset/css/index-772c07.css';
import '../singup/asset/css/application-2ecd1175.css';
import { Provider } from 'react-redux';
import store from '../products/redux/store';
import Header from '../products/components/Header/Header';
import ContentRestartPassword from './ContentRestartPassword';
import Footer from '../products/components/Footer/Footer';

const restartPassword = () => {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <ContentRestartPassword className="product-client" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* <Footer /> */}
        </Provider>
    );
};

export default restartPassword;
