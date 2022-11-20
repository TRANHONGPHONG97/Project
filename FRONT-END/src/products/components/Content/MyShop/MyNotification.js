import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, FormLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getAccount, getOpenSidebar, getReloadOrder } from "../../../redux/selector";
import EmptyOrder from "../../Loading/EmptyOrder";
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from "react-tooltip";
import OrdersDetailService from './../../../service/OrdersDetail/OrderDetail';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { DateRangePicker } from 'rsuite';

function MyNotification({account}) {
    const dispatch = useDispatch();
    const openSidebar = useSelector(getOpenSidebar);

    const [orderDetails, setOrderDetails] = useState([]);

    const typeLists = ['waitingList', 'confirm', 'completed', 'canceled'];


    const [typeList, setTypeList] = useState('waitingList');

    const [changeStatus, setChangeStatus] = useState(false);

    const [orderChoice, setOrderChoice] = useState({});

    const [status, setStatus] = useState({
        id: null,
        name: null
    });

    const [loadStatus, setLoadStatus] = useState(false);

    const [waitingLists, setWaitingLists] = useState([]);
    const [confirmLists, setConfirmLists] = useState([]);
    const [completedLists, setCompletedLists] = useState([]);
    const [canceledLists, setCanceledLists] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const [dateRanger, setDateRanger] = useState([]);

    const notifySuccess = (text) =>
        toast.success(`Đã thay đổi trạng thái đơn hàng thành ${text}`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const notifyWarn = (mess) =>
        toast.warn(`${mess}`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

    useEffect(() => {
        try {
            OrdersDetailService.getOrdersDetailByProductCreatedBy(account.email).then((res) => {
                setOrderDetails(res.data);
            }).catch((resp) => {
                toast.warn(resp.data.message);
            });
        } catch (error) {
            console.log(error);
        }
    }, [changeStatus]);

    const getWaitingLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 7;
        });
    };
    const getConfirmLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id !== 7 && orderDetail.status.id !== 6 && orderDetail.status.id !== 5;
        });
    };
    const getCompletedLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 5;
        });
    };
    const getCanceledLists = (orderDetails) => {
        return orderDetails.filter((orderDetail) => {
            return orderDetail.status.id === 6;
        });
    };

    const getCompletedListsBetween = (orderDetails, startDate, endDate) => {
        let date1 = new Date(startDate);
        let date2 = new Date(endDate);
        return orderDetails.filter((orderDetail) => {
            return orderDetail.updatedAt >= date1 && orderDetail.updatedAt <= date2;
        });
    };


    useEffect(() => {
        let total = 0;
        let cplList = getCompletedLists(orderDetails);
        setWaitingLists(getWaitingLists(orderDetails));
        setConfirmLists(getConfirmLists(orderDetails));
        setCompletedLists(getCompletedLists(orderDetails));
        setCanceledLists(getCanceledLists(orderDetails));
        for (let index = 0; index < cplList.length; index++) {
            total += cplList[index].amountTransaction;
        }

        setTotalAmount(total);
    }, [orderDetails]);

    useEffect(() => {
        if (openSidebar) {
            document.querySelector('#show-list-my-order-detail').style.marginLeft = '250px';
        }
        else {
            document.querySelector('#show-list-my-order-detail').style.marginLeft = '0';
        }
    }, [openSidebar]);

    const handleShowInfo = (orderDetail) => {
        if (document.getElementById(`info_my_order_${orderDetail.id}`).classList.contains('hide')) {
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.remove('hide');
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.add('show');
        } else {
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.remove('show');
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.add('hide');
        }
    };

    const handleChangeStatus = (orderDetail) => {
        let choiceOrder = document.getElementById(`choice_order_${orderDetail.id}`);
        let statusChoice = choiceOrder.options[choiceOrder.selectedIndex].value;
        let nameStatus = choiceOrder.options[choiceOrder.selectedIndex].text;

        setOrderChoice(orderDetail);
        setStatus({
            id: statusChoice,
            name: nameStatus
        });
    };

    const handleUpdateOrder = (orderDetail) => {
        let choiceOrder = document.getElementById(`choice_order_${orderDetail.id}`);
        let statusChoice = choiceOrder.options[choiceOrder.selectedIndex].value;
        let nameStatus = choiceOrder.options[choiceOrder.selectedIndex].text;

        let newStatus = {
            id: statusChoice,
            name: nameStatus
        };
        setLoadStatus(true);
        try {
            OrdersDetailService.updateStatus(orderDetail.id, newStatus).then((res) => {
                notifySuccess(newStatus.name);
                setChangeStatus(!changeStatus);
                setLoadStatus(true);
            }).catch((resp) => {
                notifyWarn(resp.response.data);
            });
        } catch (error) {
            console.log("Err:", error);
        }
    };

    const handleChangeTypeList = (item) => {
        setTypeList(item);
    };

    const handleChangDate = (value) => {
        setCompletedLists(getCompletedListsBetween(completedLists, value[0], value[1]));
    };

    return (
        <>
            <div id="show-list-my-order-detail">
                <div className="container text-center">
                    <div className="filter-order-detail">
                        {typeLists.map((item, index) => (
                            <div key={index} className="col-3" onClick={() => handleChangeTypeList(item)}>
                                <div className="fw-bold col-12 filter-item-order-detail" style={item === typeList ? { textDecorationLine: 'underline', color: '#0068b8' } : null}>
                                    {item === 'waitingList' ? `Đơn hàng đang chờ (${waitingLists.length})` : (item === 'confirm' ? `Đơn hàng đã xác nhận (${confirmLists.length})` : (item === 'completed' ? `Đơn hàng đã hoàn thành (${completedLists.length})` : `Đơn hàng đã bị hủy (${canceledLists.length})`))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <div className="row col-12 my-3" style={{ height: '50px', maxWidth: 'none', marginLeft: '0', marginRight: '0' }}>
                        <span className="text-center col-4" id="image-order"> Sản phẩm</span>
                        <span className="text-center col-2" id="date-item-order">Thời gian mua</span>
                        <span className="text-center col-2" id="price-item-order">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item-order">Tổng tiền</span>
                        <span className="text-center col-2" id="status-item-order">Người mua</span>
                    </div>
                    {typeList === 'waitingList' ?
                        waitingLists.length > 0 ?
                            waitingLists.map((orderDetail, index) => (
                                <div key={index}>
                                    <div
                                        className="col-12 order-item mt-2"
                                        // key={index}
                                        onClick={() => handleShowInfo(orderDetail)}
                                        data-tip="Nhấn để xem thông tin đơn hàng"
                                        id={`order-detail-${orderDetail.id}`}
                                    >
                                        <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                            <span
                                                style={{
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
                                        <span className="text-center col-2 fw-bold">{orderDetail.order.account.fullName}</span>
                                    </div>
                                    <div className="order-item my-order-action-dropdown hide" id={`info_my_order_${orderDetail.id}`}>
                                        <div className="action-group">
                                            <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                Xác nhận đơn hàng
                                            </div>
                                            <div className="action-item col-8" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <FormLabel style={{ margin: '0' }} className="col-2">Trạng thái</FormLabel>
                                                <Form.Select
                                                    id={`choice_order_${orderDetail.id}`}
                                                    onChange={() => handleChangeStatus(orderDetail)}
                                                    value={orderChoice.id === orderDetail.id ? (status.id ?? orderDetail.status.id) : undefined}
                                                    className="me-2 select-status col-3"
                                                    aria-label="Default select example"
                                                    defaultChecked={orderChoice.id === orderDetail.id ? (status.id ?? orderDetail.status.id) : undefined}
                                                >
                                                    <option value={7}>Đang chờ</option>
                                                    <option value={8}>Đang chuẩn bị</option>
                                                    <option value={9}>Đang giao hàng</option>
                                                    <option value={5}>Đã hoàn thành</option>
                                                    <option value={10}>Trả lại hàng</option>
                                                    <option value={11}>Thất lạc</option>
                                                </Form.Select>
                                                <button type="button" onClick={() => handleUpdateOrder(orderDetail)} className="col-2 btn btn-outline-success">Xác nhận</button>
                                            </div>
                                        </div>
                                        <div className="action-group">
                                            <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                Thông tin người nhận
                                            </div>
                                            <div className="action-item col-9" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Họ và tên: {orderDetail.order.fullName}</div>
                                                <div>Số điện thoại: {orderDetail.order.phone}</div>
                                                <div>Email: {orderDetail.order.email}</div>
                                            </div>
                                        </div>
                                        <div className="action-group">
                                            <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                Địa chỉ giao hàng
                                            </div>
                                            <div className="action-item col-9" style={{ display: 'flex' }}>
                                                <div>{orderDetail.order.locationRegion.address},
                                                    {" "}{orderDetail.order.locationRegion.wardName},
                                                    {" "}{orderDetail.order.locationRegion.districtName},
                                                    {" "}{orderDetail.order.locationRegion.provinceName}
                                                </div>
                                            </div>
                                        </div>
                                        {orderDetail.order.description ? (
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                    Lời nhắn
                                                </div>
                                                <div className="action-item col-9" style={{ display: 'flex' }}>
                                                    <div>
                                                        {orderDetail.order.description}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            )) : <EmptyOrder />
                        : (typeList === 'confirm' ?
                            (confirmLists.length > 0 ?
                                confirmLists.map((orderDetail, index) => (
                                    <div key={index}>
                                        <div
                                            className="col-12 order-item mt-2"
                                            onClick={() => handleShowInfo(orderDetail)}
                                            data-tip="Nhấn để xem thông tin đơn hàng"
                                            id={`order-detail-${orderDetail.id}`}
                                        >
                                            <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                                <span
                                                    style={{
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
                                            <span className="text-center col-2 fw-bold">{orderDetail.order.account.fullName}</span>
                                        </div>
                                        <div className="order-item my-order-action-dropdown hide" id={`info_my_order_${orderDetail.id}`}>
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                    Xác nhận đơn hàng
                                                </div>
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#173b79' }}>
                                                    Trạng thái: {orderDetail.status.name}
                                                </div>
                                                <div className="action-item col-6" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Form.Select
                                                        id={`choice_order_${orderDetail.id}`}
                                                        onChange={() => handleChangeStatus(orderDetail)}
                                                        value={orderChoice.id === orderDetail.id ? (status.id ?? orderDetail.status.id) : undefined}
                                                        className="me-2 select-status col-3"
                                                        aria-label="Default select example"
                                                    // defaultValue={orderDetail.status.id}
                                                    >
                                                        <option value={7}>Đang chờ</option>
                                                        <option value={8}>Đang chuẩn bị</option>
                                                        <option value={9}>Đang giao hàng</option>
                                                        <option value={5}>Đã hoàn thành</option>
                                                        <option value={10}>Trả lại hàng</option>
                                                        <option value={11}>Thất lạc</option>
                                                    </Form.Select>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateOrder(orderDetail)}
                                                        className="col-2 btn btn-outline-success"
                                                    >
                                                        Cập nhật
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                    Thông tin người nhận
                                                </div>
                                                <div className="action-item col-9" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div>Họ và tên: {orderDetail.order.fullName}</div>
                                                    <div>Số điện thoại: {orderDetail.order.phone}</div>
                                                    <div>Email: {orderDetail.order.email}</div>
                                                </div>
                                            </div>
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                    Địa chỉ giao hàng
                                                </div>
                                                <div className="action-item col-9" style={{ display: 'flex' }}>
                                                    <div>{orderDetail.order.locationRegion.address},
                                                        {" "}{orderDetail.order.locationRegion.wardName},
                                                        {" "}{orderDetail.order.locationRegion.districtName},
                                                        {" "}{orderDetail.order.locationRegion.provinceName}
                                                    </div>
                                                </div>
                                            </div>
                                            {orderDetail.order.description ? (
                                                <div className="action-group">
                                                    <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                        Lời nhắn
                                                    </div>
                                                    <div className="action-item col-9" style={{ display: 'flex' }}>
                                                        <div>
                                                            {orderDetail.order.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                )) : <EmptyOrder />) :
                            typeList === 'completed' ? (
                                completedLists.length > 0 ?
                                    <>
                                        {completedLists.map((orderDetail, index) => (
                                            <div key={index}>
                                                <div
                                                    className="col-12 order-item mt-2"
                                                    onClick={() => handleShowInfo(orderDetail)}
                                                    data-tip="Nhấn để xem thông tin đơn hàng"
                                                    id={`order-detail-${orderDetail.id}`}
                                                >
                                                    <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                                        <span
                                                            style={{
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
                                                    <span className="text-center col-2 fw-bold">{orderDetail.order.account.fullName}</span>
                                                </div>
                                                <div className="order-item my-order-action-dropdown hide" id={`info_my_order_${orderDetail.id}`}>
                                                    <div className="action-group">
                                                        <div className="ms-3 action-item fw-bold" style={{ color: '#26cf8e' }}>
                                                            <i className="fa-solid fa-circle-check"></i> {orderDetail.status.name}
                                                            <span className="ms-2">{orderDetail.updatedAt}</span>
                                                        </div>
                                                    </div>
                                                    <div className="action-group">
                                                        <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                            Thông tin người nhận
                                                        </div>
                                                        <div className="action-item col-9" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <div>Họ và tên: {orderDetail.order.fullName}</div>
                                                            <div>Số điện thoại: {orderDetail.order.phone}</div>
                                                            <div>Email: {orderDetail.order.email}</div>
                                                        </div>
                                                    </div>
                                                    <div className="action-group">
                                                        <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                            Địa chỉ giao hàng
                                                        </div>
                                                        <div className="action-item col-9" style={{ display: 'flex' }}>
                                                            <div>{orderDetail.order.locationRegion.address},
                                                                {" "}{orderDetail.order.locationRegion.wardName},
                                                                {" "}{orderDetail.order.locationRegion.districtName},
                                                                {" "}{orderDetail.order.locationRegion.provinceName}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {orderDetail.order.description ? (
                                                        <div className="action-group">
                                                            <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                                Lời nhắn
                                                            </div>
                                                            <div className="action-item col-9" style={{ display: 'flex' }}>
                                                                <div>
                                                                    {orderDetail.order.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>

                                            </div>
                                        ))}
                                        <div className="col-12 order-item mt-5" style={{ justifyContent: 'flex-end' }}>
                                            <div className="me-2">
                                                {/* <DateRangePicker showOneCalendar onChange={handleChangDate} /> */}
                                            </div>
                                            <div className="me-2">Tổng tiền:</div>
                                            <div className="fw-bold">{FormatMoney(totalAmount)} ₫</div>
                                        </div>
                                    </>
                                    : <EmptyOrder />
                            ) : (canceledLists.length > 0 ?
                                canceledLists.map((orderDetail, index) => (
                                    <div key={index}>
                                        <div
                                            className="col-12 order-item mt-2"
                                            onClick={() => handleShowInfo(orderDetail)}
                                            data-tip="Nhấn để xem thông tin đơn hàng"
                                            id={`order-detail-${orderDetail.id}`}
                                        >
                                            <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                                <span
                                                    style={{
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
                                            <span className="text-center col-2 fw-bold">{orderDetail.order.account.fullName}</span>
                                        </div>
                                        <div className="order-item my-order-action-dropdown hide" id={`info_my_order_${orderDetail.id}`}>
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: 'red' }}>
                                                    <i className="fa-solid fa-circle-xmark"></i> {orderDetail.status.name}
                                                    <span className="ms-2">{orderDetail.updatedAt}</span>
                                                </div>
                                            </div>
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                    Thông tin người nhận
                                                </div>
                                                <div className="action-item col-9" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <div>Họ và tên: {orderDetail.order.fullName}</div>
                                                    <div>Số điện thoại: {orderDetail.order.phone}</div>
                                                    <div>Email: {orderDetail.order.email}</div>
                                                </div>
                                            </div>
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                    Địa chỉ giao hàng
                                                </div>
                                                <div className="action-item col-9" style={{ display: 'flex' }}>
                                                    <div>{orderDetail.order.locationRegion.address},
                                                        {" "}{orderDetail.order.locationRegion.wardName},
                                                        {" "}{orderDetail.order.locationRegion.districtName},
                                                        {" "}{orderDetail.order.locationRegion.provinceName}
                                                    </div>
                                                </div>
                                            </div>
                                            {orderDetail.order.description ? (
                                                <div className="action-group">
                                                    <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                        Lời nhắn
                                                    </div>
                                                    <div className="action-item col-9" style={{ display: 'flex' }}>
                                                        <div>
                                                            {orderDetail.order.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                )) : <EmptyOrder />)
                        )
                    }
                    <ToastContainer />
                </div>
                <ReactTooltip />
            </div>
        </>
    );
}

export default MyNotification;