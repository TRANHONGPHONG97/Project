import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getAccount, getReloadCartItem, getReloadWatchList } from '../../../../redux/selector';
import { FormatMoney, isNumber } from './../../../../Hooks/Hooks';
import CartItemService from './../../../../service/CartItem/CartItemService';
import ValidationQuantity from '../../../../utils/ValidationQuantity';
import { setCart, setReloadCartItem, setReloadWatchList } from '../../../../redux/actions';
import WatchListsService from '../../../../service/WatchList/WatchListService';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

const BuyComponent = ({ product }) => {
    const dispatch = useDispatch();

    const reloadCartItem = useSelector(getReloadCartItem);
    const [checkQuantity, setCheckQuantity] = useState(true);
    const [errorMess, setErrorMess] = useState('');
    const [loading, setLoading] = useState(false);

    const account = useSelector(getAccount);

    const currentPrice = product.price;

    const [newTotalPrice, setNewTotalPrice] = useState(product.price);

    const [quantity, setQuantity] = useState(1);

    const [checkWatchList, setCheckWatchList] = useState(false);
    const [loadCheckWatchList, setLoadCheckWatchList] = useState(false);

    const reloadWatchList = useSelector(getReloadWatchList);
    const notify = (title) =>
        toast.success(`Đã thêm ${title} vào giỏ hàng của bạn!`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const notifyWarn = (err) =>
        toast.warn(`${err}`, {
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
        setLoadCheckWatchList(true);
        try {
            WatchListsService.checkProductInWatchListByAccountId(account.id, product).then((res) => {
                if (res.data) {
                    setCheckWatchList(true);
                    setLoadCheckWatchList(false);
                    return;
                }
                setCheckWatchList(false);
                setLoadCheckWatchList(false);
            }).catch((resp) => {
                console.log("catch", resp);
            });
        } catch (error) {
            console.log("err", error);
        }
    }, []);

    useEffect(() => {
        if (!isNumber(quantity)) {
            setCheckQuantity(false);
            setErrorMess('Số lượng không hợp lệ');
            return;
        }

        if (quantity > product.available) {
            setCheckQuantity(false);
            setErrorMess(`Vượt quá số lượng còn lại của sản phẩm là ${product.available}`);
            return;
        }

        setCheckQuantity(true);
        setNewTotalPrice(currentPrice * quantity);
    }, [quantity]);

    const cartItem = {
        product: product
        ,
        title: product.title,
        quantity: quantity
    };

    const reduceQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increasingQuantity = () => {
        if (quantity < product.available) {
            setQuantity(quantity + 1);
        }
    };

    const handleAddCartItem = () => {
        try {
            if (account.email === undefined) {
                notifyWarn('Hãy đăng nhập để thực hiện thao tác này');
                return;
            }
            if (!checkQuantity) {
                setErrorMess('Hãy chọn số lượng hợp lệ');
                return;
            }
            setLoading(true);
            async function postData() {
                await CartItemService.addCartItem(account.id, cartItem).then((res) => {
                    console.log("cartitem", res.data);
                    dispatch(setCart(res.data.cart.id))
                    dispatch(setReloadCartItem(!reloadCartItem));
                    setLoading(false);
                    notify(product.title);
                }).catch((resp) => {
                    if (resp.response) {
                        console.log(resp);
                        setLoading(false);
                        notifyWarn(resp.response.data.message ?? 'Hãy đăng nhập để thực hiện thao tác này');
                    }

                });
            }
            postData();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAddWatchList = (product) => {
        try {
            async function addWatchList() {
                WatchListsService.addWatchList(account.id, product).then((res) => {
                    setCheckWatchList(true);
                    dispatch(setReloadWatchList(!reloadWatchList))
                    toast.info(`Đã thêm ${product.title} vào danh sách yêu thích`)
                }).catch((err) => {
                    if (err.response.data) {
                        toast.error(err.response.data);
                    }
                });
            }
            addWatchList();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="buy-tool" style={{ width: '22%', margin: '50px auto' }}>
            <div className="bb-rows-wrapper">
                <div className="bb-row bb-current-buy">
                    <Link to={'/product/the-shop'}>
                        <div className="bb-row title-buy text-center">
                            <i className="fa fa-info-circle me-2" aria-hidden="true" style={{ color: '#0e78cf' }} />
                            <span>Xem thêm nhều sản phẩm khác trong <b>Cửa hàng</b></span>
                        </div>
                    </Link>
                    <div className="bb-item my-3" style={{ paddingLeft: '15px' }}>
                        <div className="current-bidder">
                            <div className="bb-title is-label text-start">
                                <span className="current-bid bid-box-label">Giá của sản phẩm:</span>
                            </div>
                            <div className="bb-content my-2 text-end">
                                <div className="bin-price fw-bold me-5">
                                    <span>{FormatMoney(product.price)} ₫</span>
                                </div>
                            </div>
                        </div>
                        <div className="current-bidder">
                            <div className="bb-title is-label text-start">
                                <span className="current-bid bid-box-label">Giá tạm tính:</span>
                            </div>
                            <div className="bb-content my-2 text-end">
                                <div className="bin-price fw-bold me-5">
                                    <span>{FormatMoney(newTotalPrice)} ₫</span>
                                </div>
                            </div>
                        </div>
                        <div className="bb-row bb-bin-bid">
                            <form>
                                <div className="bb-item">
                                    <div className="bb-item-qty" style={{ width: '30%', display: 'inline-block' }}>
                                        <label htmlFor='quantity' className="bid-box-label" style={{ color: '#333', fontWeight: 600, padding: '3px 0px' }}>Số lượng</label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div id='reduce-quantity' data-tip="Giảm số lượng" onClick={reduceQuantity}>
                                                <ReactTooltip />
                                                <i
                                                    className="fa fa-window-minimize"
                                                >
                                                </i>
                                            </div>
                                            <input
                                                onChange={(e) => { setQuantity(e.target.value) }}
                                                type="text"
                                                id='quantity'
                                                className="quantity_control ms-2 mt-2"
                                                name="qty"
                                                value={quantity}
                                                style={{ lineHeight: '30px', width: '50px' }}>
                                            </input>
                                            <div id='increasing-quantity' data-tip="Tăng số lượng" onClick={increasingQuantity}>
                                                <ReactTooltip />
                                                <i
                                                    className="fa fa-plus"
                                                >
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    {loading ? (
                                        <div className="me-1" style={{ width: '150px', marginTop: '46px', float: 'right' }}>
                                            <button className="btn btn-primary" style={{ borderRadius: '5px' }} type="button" disabled>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Đang mua...
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="ms-1" style={{ width: '150px', marginTop: '46px', float: 'right' }}>
                                            <span className="current-bid bid-box-label" style={{ color: '#788088', fontWeight: 600, fontSize: '11pt', padding: '3px 0px' }}>&nbsp;</span>
                                            <a className="btn btn-primary me-4" onClick={handleAddCartItem}>Mua ngay</a>
                                        </div>
                                    )}
                                    {checkQuantity ? null : <ValidationQuantity message={errorMess} />}
                                </div>
                            </form>
                            <div className="bin-qty text-center mt-3">
                                số lượng còn lại <strong>{product.available}</strong></div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="watchlist-action">
                        {loadCheckWatchList ? null : (
                            <>
                                {checkWatchList ? (
                                    <div className="watcher-btn text-center" style={{ width: 'auto' }}
                                    >
                                        <div className="relative-wrapper watch-wrapper btn">
                                            <div className="watching-favorite" style={{ color: 'red', fontStyle: 'normal', display: 'block !important' }}>
                                                <i className="fa-regular fa-heart"></i>
                                                <span className="watch-type"> Yêu thích</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="watcher-btn text-center" style={{ width: 'auto' }} onClick={() => handleAddWatchList(product)}>
                                        <div className="relative-wrapper watch-wrapper btn">
                                            <div className="watching-plus" style={{ fontStyle: 'normal', display: 'block !important' }}>
                                                <i className="fa-regular fa-heart"></i>
                                                <span className="watch-type"> Thêm vào danh sách yêu thích</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="viewers text-center mt-2" style={{ fontSize: '14px' }}><b>30</b> người đang theo dõi sản phẩm này</div>
                    <div className="cs-action text-center" style={{ fontSize: '14px' }}><b>{product.sold}</b> sản phẩm đã bán</div>
                </div>
            </div>
            <ToastContainer autoClose={1000} />
        </div>
    );
}

export default BuyComponent;