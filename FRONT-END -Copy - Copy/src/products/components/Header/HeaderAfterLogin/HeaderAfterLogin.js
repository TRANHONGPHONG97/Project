import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setShowCart, setShowAddProduct } from '../../../redux/actions';
import { getAccount, getAllCartItems, getShowAddProduct, getReloadCartItem } from '../../../redux/selector';

import { Link, useNavigate } from 'react-router-dom';

import Tippy from '@tippyjs/react';
import ModalAdd from '../../../../dashboard/modal/product/ModalAdd';
import CartItemService from '../../../service/CartItem/CartItemService';
import { ToastContainer } from 'react-toastify';
import AdminInfo from './../../../../dashboard/Layout/Header/adminInfo/AdminInfo';
import OrdersDetailService from './../../../service/OrdersDetail/OrderDetail';
import { width } from '@mui/system';
import Notification from '../Notification/Notification.js';
import ClientInfo from './../ClientInfo/ClientInfo';

const HeaderAfterLogin = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginUser');
    };

    const [cartItems, setListCartItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [myOrderDetails, setMyOrderDetails] = useState([]);
    const [waitingLists, setWaitingLists] = useState([]);

    const reloadCartItem = useSelector(getReloadCartItem);

    useEffect(() => {
        try {
            async function getCartItems() {
                const allCartItems = await CartItemService.getCartItems(account.email);
                const allOrderDetails = await OrdersDetailService.getAllOrdersDetail(account.email);
                const myOrderDetailsRes = await OrdersDetailService.getOrdersDetailByProductCreatedBy(account.email);
                setListCartItems(allCartItems.data);
                setOrderDetails(allOrderDetails.data);
                setWaitingLists(getWaitingLists(allOrderDetails.data));
                setMyOrderDetails(getWaitingLists(myOrderDetailsRes.data));
            }
            getCartItems();
        } catch (error) {
            console.log('header after login', error);
        }
    }, [reloadCartItem]);

    const getWaitingLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 7 || orderDetail.status.id === 8 || orderDetail.status.id === 9;
        });
    };
    const handleShowModalAddProduct = () => {
        dispatch(setShowAddProduct(true));
    };

    const renderAccount = () => {
        return (
            <div className="dropdown-menu-right shadow animated--grow-in accountAdmin" aria-labelledby="userDropdown">
                {/* <a className="tippy-account p-2" href="#">
                    <FontAwesomeIcon icon={faPlus} className="pr-2" />
                    Add product
                </a> */}
                <a
                    title="Thêm mới"
                    type="button"
                    className="btn btn-success"
                    style={{ width: '180px' }}
                    onClick={handleShowModalAddProduct}
                >
                    <i className="fa-solid fa-plus me-2" title="Thêm mới"></i>Tạo sản phẩm
                </a>
            </div>
        );
    };
    const showAddProduct = useSelector(getShowAddProduct);
    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
                <Link to={'/product/cart'} style={{ fontSize: '14px' }}>
                    <i
                        style={{ position: 'relative' }}
                        className="fa-brands fa-opencart fa-2x ic-cart me-3"
                        aria-hidden="true"
                    >
                        {cartItems.length === 0 ? null : (
                            <span
                                style={{
                                    textAlign: 'center',
                                    position: 'absolute',
                                    border: '0.5px solid white',
                                    width: 'auto',
                                    height: '20px',
                                    borderRadius: '10px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    fontSize: '12px',
                                    left: '30px',
                                    bottom: '15px',
                                    padding: '3px',
                                }}
                            >
                                {cartItems.length}
                            </span>
                        )}
                    </i>
                </Link>
                <div className="widget-notif-wrapper mx-2">
                    <div>
                        <div className="ic-notif-num">
                            <Notification countOrder={waitingLists.length} myOrderDetails={myOrderDetails.length} />
                            {/* <Notification countOrder={orderDetails.length} /> */}
                        </div>
                    </div>
                </div>
                <div className="widget-notif-wrapper">
                    <div>
                        <div className="ic-notif-num">
                            <Tippy
                                placement="bottom-end"
                                interactive
                                content={renderAccount()}
                                hideOnClick={true}
                                trigger="click"
                            >
                                <button className="logged_in_name mx-3" href="#">
                                    ĐĂNG SẢN PHẨM
                                </button>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
            <ClientInfo />
            <ModalAdd />
            <ToastContainer autoClose={1500} />
        </div>
    );
};

export default HeaderAfterLogin;
