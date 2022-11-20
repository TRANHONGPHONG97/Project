import React from "react";
import Header from './../../Header/Header';
import { Provider } from "react-redux";
import store from "../../../redux/store";
import OrderDetail from './OrderDetail';
import Footer from './../../Footer/Footer';
import { useSelector } from 'react-redux';
import { getAccount } from "../../../redux/selector";

function ShowOrderDetail() {
    const account = useSelector(getAccount);

    return (
        <>
            <Header className="product-client" />
            {account.email === undefined ? null : (
                <OrderDetail account={account} />
            )}
            <Footer />
        </>
    );
}

export default ShowOrderDetail;