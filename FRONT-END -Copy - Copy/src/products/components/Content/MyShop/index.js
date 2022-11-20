import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAccount, getReloadOrder } from "../../../redux/selector";
import Header from '../../Header/Header';
import SideBar from "./SideBar.tsx";
import ProductService from './../../../service/Product/ProductService';
import { toast, ToastContainer } from "react-toastify";
import MyProduct from "./MyProduct";
import OrdersDetailService from './../../../service/OrdersDetail/OrderDetail';
import { getMenu } from './../../../redux/selector';
import MyNotification from "./MyNotification";
import LoadCart from "../../Loading/LoadCart";

function ShowMyShop() {
    const account = useSelector(getAccount);

    const [orderDetails, setOrderDetails] = useState([]);

    const menu = useSelector(getMenu);

    const [waitingLists, setWaitingLists] = useState([]);

    const reLoadOrder = useSelector(getReloadOrder);

    const getWaitingLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 7;
        });
    };

    useEffect(() => {
        try {
            OrdersDetailService.getOrdersDetailByProductCreatedBy(account.email).then((res) => {
                setOrderDetails(res.data);
                setWaitingLists(getWaitingLists(res.data));
            }).catch((resp) => {
                toast.warn(resp.data.message);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <Header className="product-client" />
            {account.email === undefined ? (null) : (
                <SideBar orderDetails={waitingLists} account={account} />
            )}
            {menu === 'myProduct' ? (
                account.email === undefined ? null : <MyProduct account={account} />
            ) : (
                account.email === undefined ? null : <MyNotification account={account}/>
            )}
            <ToastContainer />
        </>
    );
}

export default ShowMyShop;