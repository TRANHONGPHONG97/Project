import React, { useEffect, useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, getCheckPayment, getShowModalCheckout } from '../redux/selector';
import { setCheckPayment, setShowCartModalCheckout } from './../redux/actions';
import { FormatMoney } from './../Hooks/Hooks';
import { FormControl, InputLabel, Select, MenuItem, Box, TextField } from '@mui/material';
import LocationService from './../service/LocationService/LocationService';
import OrderService from './../service/Order/OrderService';
import PaymentComponent from './PaymentComponent';
import Loading from '../components/Loading/Loading';

const Checkout = ({ items }) => {
    let amount = 0;

    items.forEach((item) => {
        amount = amount + item.amountTransaction;
    });

    const dispatch = useDispatch();

    const account = useSelector(getAccount);

    const checkPayment = useSelector(getCheckPayment);

    const [loadSaveOrder, setLoadSaveOrder] = useState(false);

    const [errors, setErrors] = useState({});

    const [state, setState] = useState({
        orders: {
            fullName: '',
            phone: '',
            email: '',
            locationRegion: {
                id: 0,
                provinceId: null,
                provinceName: null,
                districtId: null,
                districtName: null,
                wardId: null,
                wardName: null,
                address: null,
            },
            description: '',
        },
        provinces: [],
        districts: [],
        wards: [],
        province_id: null,
        district_id: null,
        ward_id: null,
        errorMessage: '',
    });

    const [newOrder, setNewOrder] = useState({});

    const addresses = ['provinceId', 'districtId', 'wardId'];


    useEffect(() => {
        try {
            async function getLocationRegion() {
                let provinceRes = await LocationService.getProvinces();
                let districtRes = await LocationService.getDistricts(
                    state.orders.locationRegion.provinceId ?? account.locationRegion.provinceId,
                );
                let wardRes = await LocationService.getWards(
                    state.orders.locationRegion.districtId ?? account.locationRegion.districtId,
                );
                setState({
                    ...state,
                    orders: {
                        ...state.orders,
                        fullName: account.fullName,
                        phone: account.phone,
                        email: account.email,
                        locationRegion: {
                            // id: state.orders.locationRegion.provinceId ?? account.locationRegion.id,
                            provinceId: state.orders.locationRegion.provinceId ?? account.locationRegion.provinceId,
                            provinceName:
                                state.orders.locationRegion.provinceName ?? account.locationRegion.provinceName,
                            districtId: state.orders.locationRegion.districtId ?? account.locationRegion.districtId,
                            districtName:
                                state.orders.locationRegion.districtName ?? account.locationRegion.districtName,
                            wardId: state.orders.locationRegion.wardId ?? account.locationRegion.wardId,
                            wardName: state.orders.locationRegion.wardName ?? account.locationRegion.wardName,
                            address: state.orders.locationRegion.address ?? account.locationRegion.address,
                        },
                    },
                    provinces: provinceRes.data.results,
                    districts: districtRes.data.results,
                    wards: wardRes.data.results,
                    province_id: account.locationRegion.provinceId,
                });
            }
            getLocationRegion();
        } catch (error) {
            console.log(error);
        }
    }, [state.province_id, state.district_id]);

    const handleClose = () => {
        dispatch(setShowCartModalCheckout(false));
        dispatch(setCheckPayment(false));
    };
    const showModalCheckout = useSelector(getShowModalCheckout);

    const handleInputValue = (e) => {
        setState({
            ...state,
            orders: {
                ...state.orders,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleOnChangeSelect = (e) => {
        if (e.target.name === 'provinceId') {
            state.provinces.forEach((province) => {
                if (province.province_id === e.target.value) {
                    try {
                        async function getDistrict() {
                            let districtRes = await LocationService.getDistricts(province.province_id);
                            let wardRes = await LocationService.getWards(districtRes.data.results[0].district_id);

                            setState({
                                ...state,
                                orders: {
                                    ...state.orders,
                                    locationRegion: {
                                        ...state.orders.locationRegion,
                                        [e.target.name]: province.province_id,
                                        provinceName: province.province_name,
                                        districtId: districtRes.data.results[0].district_id,
                                        districtName: districtRes.data.results[0].district_name,
                                        wardId: wardRes.data.results[0].ward_id,
                                        wardName: wardRes.data.results[0].ward_name,
                                    },
                                },
                                province_id: province.province_id,
                                district_id: districtRes.data.results[0].district_id,
                            });
                        }
                        getDistrict();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        } else if (e.target.name === 'districtId') {
            state.districts.forEach((district) => {
                if (district.district_id === e.target.value) {
                    try {
                        async function getWards() {
                            let wardRes = await LocationService.getWards(district.district_id);

                            setState({
                                ...state,
                                orders: {
                                    ...state.orders,
                                    locationRegion: {
                                        ...state.orders.locationRegion,
                                        [e.target.name]: district.district_id,
                                        districtName: district.district_name,
                                        wardId: wardRes.data.results[0].ward_id,
                                        wardName: wardRes.data.results[0].ward_name,
                                    },
                                },
                                district_id: district.district_id,
                            });
                        }
                        getWards();
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        } else if (e.target.name === 'wardId') {
            state.wards.forEach((ward) => {
                if (ward.ward_id === e.target.value) {
                    setState({
                        ...state,
                        orders: {
                            ...state.orders,
                            locationRegion: {
                                ...state.orders.locationRegion,
                                [e.target.name]: ward.ward_id,
                                wardName: ward.ward_name,
                            },
                        },
                    });
                }
            });
        } else {
            setState({
                ...state,
                orders: {
                    ...state.orders,
                    locationRegion: {
                        ...state.orders.locationRegion,
                        [e.target.name]: e.target.value,
                    },
                },
            });
        }
    };

    const handleOrder = (accountId, order) => {
        try {
            setLoadSaveOrder(true);
            async function checkoutOrder() {
                await OrderService.createCheckoutOrder(accountId, order)
                    .then((resp) => {
                        setNewOrder(resp.data);
                        dispatch(setCheckPayment(true));
                        setLoadSaveOrder(false);
                    })
                    .catch((error) => {
                        if (error.response) {
                            dispatch(setCheckPayment(false));
                            setLoadSaveOrder(false);
                            setErrors(error.response.data);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                    });
            }
            checkoutOrder();
        } catch (error) {
            console.log(error);
        }
    };

    console.log('errors', errors);
    return (
        <>
            <Modal size="xl" show={showModalCheckout} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton style={{ backgroundColor: '#004cbc' }}>
                    <Modal.Title style={{ color: '#fff' }}>Hoàn tất thông tin để mua hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-checkout-modal" style={{ backgroundColor: '#f2f2f2' }}>
                    <Container>
                        {loadSaveOrder ? (
                            <Loading />
                        ) : checkPayment ? (
                            <PaymentComponent
                                infoRecipient={state.orders}
                                items={items}
                                amount={amount}
                                newOrder={newOrder}
                            />
                        ) : (
                            <>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <div className="row mx-2 my-2">
                                            <b>Thông tin người nhận</b>
                                        </div>
                                        <div
                                            className="row ms-1"
                                            style={{
                                                height: '300px',
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)',
                                            }}
                                        >
                                            <div className="row-info-recipient">
                                                <label
                                                    htmlFor="fullNameRecipient"
                                                    id="error_checkout_fullName"
                                                    className="col-4 labelRecipient"
                                                >
                                                    Họ và tên
                                                    {errors.fullName ? (
                                                        <span
                                                            id="error_checkout_fullName"
                                                            style={{
                                                                color: 'red',
                                                                fontSize: 'smaller',
                                                                fontStyle: 'italic',
                                                            }}
                                                            className="errors-checkout ms-2"
                                                        >
                                                            *{errors.fullName}
                                                        </span>
                                                    ) : null}
                                                </label>
                                                <label
                                                    htmlFor="phoneRecipient"
                                                    id="error_checkout_phone"
                                                    className="col-4 labelRecipient"
                                                >
                                                    Số điện thoại
                                                    {errors.phone ? (
                                                        <span
                                                            id="error_checkout_phone"
                                                            style={{
                                                                color: 'red',
                                                                fontSize: 'smaller',
                                                                fontStyle: 'italic',
                                                            }}
                                                            className="errors-checkout ms-2"
                                                        >
                                                            *{errors.phone}
                                                        </span>
                                                    ) : null}
                                                </label>
                                                <label
                                                    htmlFor="emailRecipient"
                                                    id="error_checkout_email"
                                                    className="col-4 labelRecipient"
                                                >
                                                    Email
                                                    {errors.email ? (
                                                        <span
                                                            id="error_checkout_email"
                                                            style={{
                                                                color: 'red',
                                                                fontSize: 'smaller',
                                                                fontStyle: 'italic',
                                                            }}
                                                            className="errors-checkout ms-2"
                                                        >
                                                            *{errors.email}
                                                        </span>
                                                    ) : null}
                                                </label>
                                            </div>
                                            <div
                                                className="row-info-recipient"
                                                style={{ justifyContent: 'space-around', margin: '0' }}
                                            >
                                                <input
                                                    onChange={handleInputValue}
                                                    type="text"
                                                    name="fullName"
                                                    className="info-input form-control col-4"
                                                    id="fullNameRecipient"
                                                    value={state.orders.fullName}
                                                />
                                                <input
                                                    onChange={handleInputValue}
                                                    type="tel"
                                                    name="phone"
                                                    className="info-input form-control col-4"
                                                    id="phoneRecipient"
                                                    value={state.orders.phone}
                                                />
                                                <input
                                                    onChange={handleInputValue}
                                                    type="email"
                                                    name="email"
                                                    className="info-input form-control col-4"
                                                    id="emailRecipient"
                                                    value={state.orders.email}
                                                />
                                            </div>

                                            <div
                                                className="row-info-recipient mt-4"
                                                style={{ justifyContent: 'space-around' }}
                                            >
                                                <div className="col-3" style={{ padding: '0' }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="province-simple-select-label">
                                                            Chọn Tỉnh/Thành phố
                                                        </InputLabel>
                                                        <Select
                                                            className="col-12"
                                                            labelId="province-simple-select-label"
                                                            id="province-simple-select"
                                                            value={state.orders.locationRegion.provinceId}
                                                            label="Chọn Tỉnh/Thành phố"
                                                            name={addresses[0]}
                                                            onChange={handleOnChangeSelect}
                                                        >
                                                            {state.provinces.map((province) => (
                                                                <MenuItem
                                                                    value={province.province_id}
                                                                    key={province.province_id}
                                                                >
                                                                    <span style={{ fontSize: '16px' }}>
                                                                        {province.province_name}
                                                                    </span>
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-3" style={{ padding: '0' }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="district-simple-select-label">
                                                            Chọn Quận/Huyện
                                                        </InputLabel>
                                                        <Select
                                                            className="col-12"
                                                            labelId="district-simple-select-label"
                                                            id="district-simple-select"
                                                            value={state.orders.locationRegion.districtId}
                                                            label="Chọn Quận/Huyện"
                                                            name={addresses[1]}
                                                            onChange={handleOnChangeSelect}
                                                        >
                                                            {state.districts.map((district) => (
                                                                <MenuItem
                                                                    value={district.district_id}
                                                                    key={district.district_id}
                                                                >
                                                                    <span style={{ fontSize: '16px' }}>
                                                                        {district.district_name}
                                                                    </span>
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-3" style={{ padding: '0' }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="ward-simple-select-label">
                                                            Chọn Phường/Xã
                                                        </InputLabel>
                                                        <Select
                                                            className="col-12"
                                                            labelId="ward-simple-select-label"
                                                            id="ward-simple-select"
                                                            value={state.orders.locationRegion.wardId}
                                                            label="Chọn Phường/Xã"
                                                            name={addresses[2]}
                                                            onChange={handleOnChangeSelect}
                                                        >
                                                            {state.wards.map((ward) => (
                                                                <MenuItem value={ward.ward_id} key={ward.ward_id}>
                                                                    <span style={{ fontSize: '16px' }}>
                                                                        {ward.ward_name}
                                                                    </span>
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="col-3" style={{ padding: '0' }}>
                                                    <Box
                                                        component="form"
                                                        sx={{
                                                            '& > :not(style)': { m: 1, width: '25ch' },
                                                        }}
                                                        noValidate
                                                        autoComplete="on"
                                                    >
                                                        <TextField
                                                            onChange={handleOnChangeSelect}
                                                            value={state.orders.locationRegion.address}
                                                            name="address"
                                                            id="outlined-basic"
                                                            label="Địa chỉ ..."
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                </div>
                                            </div>
                                            <div
                                                className="row-info-recipient"
                                                style={{ justifyContent: 'space-around' }}
                                            >
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& > :not(style)': { m: 1, width: '50ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="on"
                                                >
                                                    <TextField
                                                        onChange={handleInputValue}
                                                        placeholder="Lưu ý cho người gửi..."
                                                        value={state.orders.description}
                                                        name="description"
                                                        id="outlined-basic"
                                                        label="Lời nhắn"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row
                                    style={{
                                        margin: '20px 0px',
                                        height: '60px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Col xs={12} md={2} className="text-end">
                                        <Button
                                            style={{
                                                borderRadius: '5px',
                                                width: 100,
                                                boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)',
                                            }}
                                            variant="secondary"
                                            onClick={handleClose}
                                        >
                                            Quay lại
                                        </Button>
                                    </Col>
                                    <Col xs={12} md={10} className="text-end">
                                        <Button
                                            style={{ borderRadius: '5px', width: 120 }}
                                            variant="primary"
                                            onClick={() => handleOrder(account.id, state.orders)}
                                        >
                                            Đặt hàng
                                        </Button>
                                    </Col>
                                </Row>
                            </>
                        )}

                        <Row>
                            <Col xs={12} md={12}>
                                <div className="items-checkout row mx-2 my-2">
                                    <b>Danh sách sản phẩm</b>
                                </div>
                                <div
                                    className="row mt-2"
                                    style={{
                                        borderRadius: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '70px',
                                        backgroundColor: '#fff',
                                        boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)',
                                    }}
                                >
                                    <div className="item-info text-center col-7">Sản phẩm</div>

                                    <div className="item-info text-center col-2">Số lượng mua</div>

                                    <div className="item-info text-center col-3">Thành tiền</div>
                                </div>
                                {items.map((item) => (
                                    <div className="row items-checkout-info my-1" key={item.id}>
                                        <div className="col-7" style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="col-3">
                                                <img className="item-info-image" src={item.product.image} alt="" />
                                            </div>
                                            <div className="col-9">
                                                <div>{item.product.title}</div>
                                                <div>{item.product.description}</div>
                                                <div className="item-category">{item.product.category.title}</div>
                                                <div className="fw-bold">{FormatMoney(item.product.price)} ₫</div>
                                            </div>
                                        </div>

                                        <div className="col-2 text-center">{item.quantity}</div>

                                        <div className="col-3 text-end">{FormatMoney(item.amountTransaction)} ₫</div>
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer style={{ borderTop: '0' }}></Modal.Footer>
            </Modal>
        </>
    );
};

export default Checkout;
