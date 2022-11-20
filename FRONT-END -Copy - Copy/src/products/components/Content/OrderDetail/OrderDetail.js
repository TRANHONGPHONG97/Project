import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getAccount } from "../../../redux/selector";
import OrdersDetailService from './../../../service/OrdersDetail/OrderDetail';
import { toast } from 'react-toastify';
import { setOrderDetails } from "../../../redux/actions";
import { Link } from 'react-router-dom';
import { compareValues } from './../../../Hooks/Hooks';
import EmptyOrder from './../../Loading/EmptyOrder';
import Swal from "sweetalert2";
import Load3 from "../../Loading/Load3";

const OrderDetail = ({account}) => {
    const dispatch = useDispatch();
    const typeLists = ['ordered', 'completed', 'canceled'];
    const [typeList, setTypeList] = useState('ordered');

    const [emptyOrderDetails, setEmptyOrderDetails] = useState(false);
    const [loadOrderDetails, setLoadOrderDetails] = useState(false);
    const [listOrderDetails, setListOrderDetails] = useState([]);

    const [reloadOrderDetail, setReloadOrderDetail] = useState(false);

    const [waitingLists, setWaitingLists] = useState([]);
    const [completedLists, setCompletedLists] = useState([]);
    const [canceledLists, setCanceledLists] = useState([]);

    useEffect(() => {
        try {
            setLoadOrderDetails(true);
            async function getOrderDetails() {
                OrdersDetailService.getAllOrdersDetail(account.email).then((res) => {
                    if (res.data.length > 0) {
                        let list = res.data.sort(compareValues('id', 'desc'))
                        setListOrderDetails(list);
                        setWaitingLists(getWaitingLists(list));
                        setCompletedLists(getCompletedLists(list));
                        setCanceledLists(getCanceledLists(list));
                        setLoadOrderDetails(false);
                        setEmptyOrderDetails(false);
                        return;
                    }
                    // setLoadOrderDetails(false);
                    setEmptyOrderDetails(true);

                }).catch((err) => {
                    toast.error(err.responseText)
                });
            }
            getOrderDetails();

        } catch (error) {
            console.log(error);
        }
    }, [reloadOrderDetail]);

    const getWaitingLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 7 || orderDetail.status.id === 8;
        });
    };

    const getCompletedLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 5 || orderDetail.status.id === 9;
        });
    };
    const getCanceledLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 6 || orderDetail.status.id === 10 || orderDetail.status.id === 11;
        });
    };

    const handleShowCancelOrder = (orderDetail) => {
        document.getElementById(`cancel_order_detail_${orderDetail.id}`).style.opacity = '1';
    };
    const handleHideCancelOrder = (orderDetail) => {
        document.getElementById(`cancel_order_detail_${orderDetail.id}`).style.opacity = '0';
    };

    const handleCancelOrderDetail = (orderDetail) => {
        let status = {
            id: 6
        };

        Swal.fire({
            icon: 'warning',
            title: `<br/> Bạn muốn hủy ${orderDetail.product.title} ra khỏi đơn hàng?`,
            showDenyButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            denyButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isDenied) {
                OrdersDetailService.updateStatus(orderDetail.id, status).then((res) => {
                    setReloadOrderDetail(!reloadOrderDetail);
                    toast.success(`Đã hủy đơn hàng thành công!`);
                }).catch((resp) => {
                    toast.warn(resp.response.data)
                });
            }
        });
    };

    const handleChangeTypeList = (type) => {
        setTypeList(type);
    };

    dispatch(setOrderDetails(listOrderDetails));

    return (
        <div>
            <div id="show-list-cart-item">
                <div className="container text-center">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {loadOrderDetails ? (<Load3 />) : (
                            typeLists.map((type) => (
                                <div
                                    key={type}
                                    className="fw-bold col-3 typeList"
                                    onClick={() => handleChangeTypeList(type)}

                                    style={typeList === type ? { backgroundColor: '#367289', color: 'white', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' } : null}
                                >
                                    {type === 'ordered' ? `Đơn hàng (${waitingLists.length})` : (
                                        type === 'completed' ? `Đã hoàn thành (${completedLists.length})` : `Không hoàn thành (${canceledLists.length})`
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    <div className="row col-10 my-3" style={{ height: '50px' }}>
                        <span className="text-center col-4" id="image-order"> Sản phẩm</span>
                        <span className="text-center col-2" id="date-item-order">Thời gian mua</span>
                        <span className="text-center col-2" id="price-item-order">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item-order">Tổng tiền</span>
                        <span className="text-center col-2" id="status-item-order">Trạng thái</span>
                    </div>
                    {typeList === 'ordered' ? (
                        waitingLists.length > 0 ?
                            waitingLists.map(orderDetail => (
                                <div
                                    className="row col-10 order-item-list"
                                    key={orderDetail.id}
                                    id={`cancel_order_${orderDetail.id}`}
                                    onMouseOver={() => handleShowCancelOrder(orderDetail)}
                                    onMouseOut={() => handleHideCancelOrder(orderDetail)}
                                >
                                    <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                        <span style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        >
                                            <div className="col-4">
                                                <img style={{
                                                    padding: '5px',
                                                    width: '100px',
                                                    height: '120px'
                                                }} src={orderDetail.product.image} alt="" />
                                            </div>
                                            <div className="text-start mx-2 col-9">
                                                <div>{orderDetail.product.title}</div>
                                                <div style={{ fontSize: 'small', color: 'blue' }}>Sản phẩm: {orderDetail.product.action ? 'Đấu giá' : 'Cửa hàng'}</div>
                                            </div>
                                        </span>
                                    </Link>
                                    <span className="text-center col-2 fw-bold">{orderDetail.createdAt}</span>
                                    <span className="text-center col-2 fw-bold">{orderDetail.quantity}</span>
                                    <span className="text-end col-2 fw-bold">{FormatMoney(orderDetail.amountTransaction)} ₫</span>
                                    <span className="text-center col-2 fw-bold">{orderDetail.status.name}</span>
                                    <span className="text-center col-2 fw-bold show-cancel-order"
                                        id={`cancel_order_detail_${orderDetail.id}`}
                                        onClick={() => handleCancelOrderDetail(orderDetail)}
                                    >
                                        Hủy
                                    </span>
                                </div>
                            )) : <EmptyOrder />
                    ) : (
                        typeList === 'completed' ?
                            completedLists.length > 0 ?
                                completedLists.map(orderDetail => (
                                    <div
                                        className="row col-10 order-item-list"
                                        key={orderDetail.id}
                                        id={`cancel_order_${orderDetail.id}`}
                                    >
                                        <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                            <span style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                            >
                                                <div className="col-4">
                                                    <img style={{
                                                        padding: '5px',
                                                        width: '100px',
                                                        height: '120px'
                                                    }} src={orderDetail.product.image} alt="" />
                                                </div>
                                                <div className="text-start mx-2 col-9">
                                                    <div>{orderDetail.product.title}</div>
                                                    <div style={{ fontSize: 'small', color: 'blue' }}>Sản phẩm: {orderDetail.product.action ? 'Đấu giá' : 'Cửa hàng'}</div>
                                                </div>
                                            </span>
                                        </Link>
                                        <span className="text-center col-2 fw-bold">{orderDetail.createdAt}</span>
                                        <span className="text-center col-2 fw-bold">{orderDetail.quantity}</span>
                                        <span className="text-end col-2 fw-bold">{FormatMoney(orderDetail.amountTransaction)} ₫</span>
                                        <span className="text-center col-2 fw-bold">{orderDetail.status.name}</span>
                                    </div>
                                )) : <EmptyOrder /> : (
                                canceledLists.length > 0 ?
                                    canceledLists.map(orderDetail => (
                                        <div
                                            className="row col-10 order-item-list"
                                            key={orderDetail.id}
                                            id={`cancel_order_${orderDetail.id}`}
                                        >
                                            <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                                >
                                                    <div className="col-4">
                                                        <img style={{
                                                            padding: '5px',
                                                            width: '100px',
                                                            height: '120px'
                                                        }} src={orderDetail.product.image} alt="" />
                                                    </div>
                                                    <div className="text-start mx-2 col-9">
                                                        <div>{orderDetail.product.title}</div>
                                                        <div style={{ fontSize: 'small', color: 'blue' }}>Sản phẩm: {orderDetail.product.action ? 'Đấu giá' : 'Cửa hàng'}</div>
                                                    </div>
                                                </span>
                                            </Link>
                                            <span className="text-center col-2 fw-bold">{orderDetail.createdAt}</span>
                                            <span className="text-center col-2 fw-bold">{orderDetail.quantity}</span>
                                            <span className="text-end col-2 fw-bold">{FormatMoney(orderDetail.amountTransaction)} ₫</span>
                                            <span className="text-center col-2 fw-bold">{orderDetail.status.name}</span>
                                        </div>
                                    )) :
                                    <EmptyOrder />
                            )
                    )}
                </div>

            </div>
        </div >
    );
}

export default OrderDetail;