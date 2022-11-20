import React from "react";
import CartItem from './CartItem';
import Header from './../../Header/Header';
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { getAccount } from "../../../redux/selector";
import { useSelector } from 'react-redux';

function ShowCartItem() {
    const account = useSelector(getAccount);

    return (
        <Provider store={store}>
            <Header className="product-client" />
            {account.email === undefined ? (null) : (
                <CartItem account={account}/>
            )}
        </Provider>
    );
}

export default ShowCartItem;