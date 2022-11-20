import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Row, Col, Button } from 'react-bootstrap';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { FormatMoney } from './../Hooks/Hooks';
import OrdersDetailService from './../service/OrdersDetail/OrderDetail';
import OrderService from './../service/Order/OrderService';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckPayment, setReloadCartItem } from '../redux/actions';
import { setShowCartModalCheckout } from './../redux/actions';
import CartItemService from './../service/CartItem/CartItemService';
import { getAccount, getReloadCartItem } from '../redux/selector';

const PaymentComponent = ({ infoRecipient, items, amount, newOrder }) => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);
    const [transportFee, getTransportFee] = useState(0);
    const reloadCartItem = useSelector(getReloadCartItem);

    const [waitPayment, setWaitPayment] = useState(false);
    const [removeOrder, setRemoveOrder] = useState(false);

    const [state, setState] = useState({
        payment: "Thanh toán khi nhận hàng",
        methods: ["Thanh toán khi nhận hàng", "Thanh toán online"],
        estimateAmount: amount,
        totalAmount: amount + transportFee
    });

    const handleChangeMethod = (e) => {
        setState({
            ...state,
            payment: e.target.value
        })
    };

    const handleCreateOrderDetail = (items) => {
        try {
            setWaitPayment(true);
            async function createOrdersDetail() {
                await OrdersDetailService.createOrdersDetail(newOrder.id, items);
                let cartItemList = await CartItemService.getRemoveCartItems(account.email, items);
                setWaitPayment(false);
                dispatch(setShowCartModalCheckout(false));
                dispatch(setReloadCartItem(!reloadCartItem));
                toast.success('Đã hoàn tất đặt hàng!');
            }
            createOrdersDetail();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveOrder = (order) => {
        try {
            setRemoveOrder(true);
            async function removeOrders() {
                let results = await OrderService.removeOrder(order.id);
                dispatch(setShowCartModalCheckout(false));
                dispatch(setCheckPayment(false));
                setRemoveOrder(false);
            }
            removeOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Row>
                <Col xs={12} md={12}>
                    <div className="row mx-2 my-2">
                        <b>Phương thức thanh toán</b>
                    </div>
                    <div className="row ms-1" style={{ height: 'auto', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)' }}>
                        <div className="row-payment col-8" style={{ margin: '0', padding: '0' }}>
                            <ul className="list-group col-12" style={{ margin: '0' }}>
                                <li className="list-group-item active">Thông tin người nhận</li>
                                <li className="list-group-item">
                                    <span className='col-3'>Họ và tên:</span>
                                    <span className='col-9'>{infoRecipient.fullName}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className='col-3'>Số điện thoại:</span>
                                    <span className='col-9'>{infoRecipient.phone}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className='col-3'>Email:</span>
                                    <span className='col-9'>{infoRecipient.email}</span>
                                </li>
                                <li className="list-group-item">
                                    <span className='col-3'>Địa chỉ nhận hàng:</span>
                                    <span className='col-9'>{infoRecipient.locationRegion.address},
                                        {" " + infoRecipient.locationRegion.wardName},
                                        {" " + infoRecipient.locationRegion.districtName},
                                        {" " + infoRecipient.locationRegion.provinceName}
                                    </span>
                                </li>
                            </ul>
                            <div className='col-12 mt-4' >
                                <div className='col-10 d-flex'>
                                    <div className='col-4 fw-bold' style={{ fontSize: 'smaller' }}>Tạm tính:</div>
                                    <div className='col-8 text-end'>{FormatMoney(state.estimateAmount)} ₫</div>
                                </div>
                                <div className='col-10 my-1 d-flex'>
                                    <div className='col-4 fw-bold' style={{ fontSize: 'smaller' }}>Phí vận chuyển:</div>
                                    <div className='col-8 text-end'>
                                        {FormatMoney(transportFee)} ₫
                                    </div>
                                </div>
                                <hr className='col-10' />
                                <div className='col-10 d-flex'>
                                    <div className='col-4 fw-bold'>Tổng tiền:</div>
                                    <div className='col-8 text-end fw-bold'>{FormatMoney(state.totalAmount)} ₫</div>
                                </div>
                            </div>
                        </div>
                        <div className="row-payment col-4 text-center mt-3" style={{ height: '100px' }}>
                            <FormControl>
                                <FormLabel id="demo-controlled-radio-buttons-group">Chọn phương thức thanh toán</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={state.payment}
                                    onChange={handleChangeMethod}
                                >
                                    {/* {state.methods.map((method) => (
                                        <FormControlLabel key={method} value={method} control={<Radio />} label={method}/>
                                    ))} */}
                                    <FormControlLabel value={"Thanh toán khi nhận hàng"} control={<Radio />} label={"Thanh toán khi nhận hàng"} />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row style={{ margin: '20px 0px', height: '60px', display: 'flex', alignItems: 'center' }}>
                <Col xs={12} md={10} className='text-end'>
                    {waitPayment ? (
                        <Button disabled style={{ borderRadius: '5px', width: 150 }} variant="outline-danger" onClick={() => handleRemoveOrder(newOrder)}>
                            Hủy đơn hàng
                        </Button>
                    ) : (
                        <Button style={{ borderRadius: '5px', width: 150 }} variant="outline-danger" onClick={() => handleRemoveOrder(newOrder)}>
                            Hủy đơn hàng
                        </Button>
                    )}
                </Col>
                <Col xs={12} md={2} className='text-center'>
                    {removeOrder ? <Button disabled style={{ borderRadius: '5px', width: 120 }} variant="primary" onClick={() => handleCreateOrderDetail(items)}>
                        Thanh toán
                    </Button> : (
                        <>
                            {waitPayment ?
                                <button className="btn btn-primary" style={{ borderRadius: '5px', width: '170px' }} type="button" disabled>
                                    <span className="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    Đang thực hiện...
                                </button> :
                                <Button style={{ borderRadius: '5px', width: 120 }} variant="primary" onClick={() => handleCreateOrderDetail(items)}>
                                    Thanh toán
                                </Button>
                            }
                        </>
                    )}
                </Col>
            </Row>
            <ToastContainer />
        </>
    );
}

export default PaymentComponent;