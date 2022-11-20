import { faCheck, faCircleInfo, faClock, faDollar, faHeart, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { isNumber } from '../../products/Hooks/Hooks';
import ValidationQuantity from '../../products/utils/ValidationQuantity';
import BidService from '../../dashboard/services/BidService';
import { Link, useParams } from 'react-router-dom';
import AuctionService from '../../dashboard/services/AuctionService';
import { useSelector, useDispatch } from 'react-redux';
import { getAccount, getReloadCartItem, getReloadWatchList } from '../../products/redux/selector';
import { toast, ToastContainer } from 'react-toastify';
import WatchListsService from '../../products/service/WatchList/WatchListService';
import { setCart, setReloadCartItem, setReloadWatchList } from '../../products/redux/actions';
import moment from 'moment';
import CartItemService from '../../products/service/CartItem/CartItemService';
import Swal from 'sweetalert2';
import ListBids from '../ListBidAuction/listBids';
import EmailService from '../../products/service/Email/EmailService';

function ComponentAuction(props) {
    const dispatch = useDispatch();
    moment.locale('vi');

    const reloadCartItem = useSelector(getReloadCartItem);

    const { auction } = props;

    const product = { ...auction.product };

    const account = useSelector(getAccount);

    const [timeAuction, setTimeAuction] = useState([]);
    const [Price, setPrice] = useState(0);
    const currentPrice = auction.currentPrice;
    const [checkPrice, setCheckPrice] = useState(true);
    const [errorMess, setErrorMess] = useState('');
    const [state, setState] = useState({ bids: [], auction: {} });
    const [rerender, setRerender] = useState(false);
    const [closeAction, setCloseAction] = useState(false);
    const [checkWatchList, setCheckWatchList] = useState(false);
    const [loadCheckWatchList, setLoadCheckWatchList] = useState(false);
    const [loadBids, setLoadBids] = useState(false);
    const [showListBids, setShowListBids] = useState(false);
    const [addToCart, setAddToCart] = useState(false);

    const reloadWatchList = useSelector(getReloadWatchList);

    const changeShowListBids = (boo) => {
        setShowListBids(boo);
    };

    const cartItem = {
        product: product,
        title: product.title,
        price: 0,
        quantity: 1,
    };

    const { auctionId } = useParams();
    const [bid, setBid] = useState({
        id: 0,
        email: account.email,
        bidPrice: 0,
        account: { id: account.id },
        auction: { id: auction.id },
        deleted: false,
        estimatePrice: 0,
    });

    useEffect(() => {
        if (new Date(auction.auctionEndTime).valueOf() > new Date().valueOf()) {
            let diffTime = Math.abs(new Date(auction.auctionEndTime).valueOf() - new Date().valueOf());
            let days = diffTime / (24 * 60 * 60 * 1000);
            let hours = (days % 1) * 24;
            let minutes = (hours % 1) * 60;
            let secs = (minutes % 1) * 60;
            setTimeout(() => {
                if (
                    Math.floor(days) == 0 &&
                    Math.floor(hours) == 0 &&
                    Math.floor(minutes) == 0 &&
                    Math.floor(secs) == 0
                ) {
                    // cartItem.price = state.bids[0].bidPrice;
                    // CartItemService.addCartItem(state.bids[0].account.id, cartItem).then((res) => {
                    //     if (account.id === state.bids[0].account.id) {
                    //         Swal.fire({
                    //             title: '<strong>Chúc mừng!</strong>',
                    //             icon: 'success',
                    //             html:
                    //                 `<p>Bạn là người chiến thắng phiên đấu giá <b>${product.title}</b></p>` +
                    //                 '<p>Hãy vào giỏ hàng của bạn để hoàn tất thanh toán</p> ',
                    //             //   'and other HTML tags',
                    //             showCloseButton: true,
                    //             showCancelButton: true,
                    //             focusConfirm: false,
                    //             confirmButtonText:
                    //                 '<a href="/product/cart" style="color: #fff; text-decoration: none;">Giỏ hàng</a>',
                    //             cancelButtonText:
                    //                 'Quay lại',
                    //         })
                    //     } else {
                    //         Swal.fire({
                    //             icon: 'info',
                    //             html: `Chúc mừng <b>${state.bids[0].account.fullName}</b>!</br>` +
                    //                 `Đã chiến thắng phiên đấu giá và sở hữu sản phẩm <b>${product.title}</b>`,
                    //             showCloseButton: true,
                    //             showConfirmButton: false,
                    //             timer: 2500
                    //         })
                    //     }
                    //     dispatch(setReloadCartItem(!reloadCartItem));
                    // }).catch((resp) => {

                    // });
                    setAddToCart(true);
                    setCloseAction(true);
                } else {
                    setTimeAuction([Math.floor(days), Math.floor(hours), Math.floor(minutes), Math.floor(secs)]);
                }
            }, 1000);
        } else {
            setCloseAction(true);
        }
    });

    useEffect(() => {
        if (addToCart) {
            cartItem.price = state.bids[0].bidPrice;
            CartItemService.addCartItem(state.bids[0].account.id, cartItem)
                .then((res) => {
                    if (account.id === state.bids[0].account.id) {
                        Swal.fire({
                            title: '<strong>Chúc mừng!</strong>',
                            icon: 'success',
                            html:
                                `<p>Bạn là người chiến thắng phiên đấu giá <b>${product.title}</b></p>` +
                                '<p>Hãy vào giỏ hàng của bạn để hoàn tất thanh toán</p> ',
                            //   'and other HTML tags',
                            showCloseButton: true,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText:
                                '<a href="/product/cart" style="color: #fff; text-decoration: none;">Giỏ hàng</a>',
                            cancelButtonText: 'Quay lại',
                        });
                    } else {
                        Swal.fire({
                            icon: 'info',
                            html:
                                `Chúc mừng <b>${state.bids[0].account.fullName}</b>!</br>` +
                                `Đã chiến thắng phiên đấu giá và sở hữu sản phẩm <b>${product.title}</b>`,
                            showCloseButton: true,
                            showConfirmButton: false,
                            timer: 2500,
                        });
                    }
                    EmailService.auctionsSuccessSendEmail(state.bids[0].account.email, product)
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((resp) => {
                            console.log(resp);
                        });
                    dispatch(setReloadCartItem(!reloadCartItem));
                })
                .catch((resp) => {});
        }
    }, [addToCart]);

    useEffect(() => {
        setLoadCheckWatchList(true);
        try {
            console.log('account.id', account.id);
            WatchListsService.checkProductInWatchListByAccountId(account.id, product)
                .then((res) => {
                    if (res.data) {
                        setCheckWatchList(true);
                        setLoadCheckWatchList(false);
                        return;
                    }
                    setCheckWatchList(false);
                    setLoadCheckWatchList(false);
                })
                .catch((resp) => {
                    console.log('catch', resp);
                });
        } catch (error) {
            console.log('err', error);
        }
    }, []);

    useEffect(() => {
        if (!isNumber(Price)) {
            setCheckPrice(false);
            setErrorMess('Giá phải là một số nguyên');
            return;
        }

        if (state.bids.length !== 0) {
            if (Price < state.bids[0].bidPrice + state.bids[0].bidPrice * 0.12) {
                setCheckPrice(false);
                setErrorMess(`Bạn phải đấu thầu lơn hơn giá hiện tại lớn hơn 12%`);
                return;
            }
        }

        setCheckPrice(true);
    }, [Price]);

    useEffect(() => {
        async function getListBid() {
            if (rerender) {
                setLoadBids(true);
                BidService.postCreateBid(bid)
                    .then((res) => {
                        setLoadBids(false);
                        toast.success('Đặt giá thành công');
                    })
                    .catch((res) => {
                        console.log(res);
                        setLoadBids(false);
                        toast.warn(res.response.data.message);
                    });
            }
            AuctionService.getAuctionById(auctionId).then((res) => {
                BidService.getBidByAuctionId(auction.id).then((restBid) => {
                    setState({ ...state, bids: restBid.data, auction: res.data });
                });
            });
        }
        getListBid();
        setRerender(false);
    }, [rerender]);

    const handleMinAuction = () => {
        let priceAuction =
            Math.ceil((state.bids[0].bidPrice + state.bids[0].bidPrice * 0.12001).toFixed() / 1000) * 1000;
        setPrice(priceAuction);
    };

    const handleBid = () => {
        let priceAuction =
            Math.ceil((state.bids[0].bidPrice + state.bids[0].bidPrice * 0.12001).toFixed() / 1000) * 1000;
        let bidPrice = Number(document.querySelector('#bid').value);
        if (!isNumber(bidPrice)) {
            setErrorMess('Giá phải là một số nguyên');
            return;
        }
        if (Price < (state.bids[0].bidPrice + state.bids[0].bidPrice * 0.12).toFixed()) {
            setCheckPrice(false);
            setErrorMess(`Bạn phải đấu thầu lơn hơn giá hiện tại lớn hơn 12% với giá tiền hiện tại`);
            return;
        }
        if (bidPrice > priceAuction + 500000) {
            setCheckPrice(false);
            setErrorMess(`Giá thầu hiện tại không được quá lớn! (bé hơn 500.000 đ)`);
            return;
        }
        bidPrice = Math.ceil(bidPrice / 1000) * 1000;
        let subBid = { ...bid, bidPrice: bidPrice, estimatePrice: state.bids[0].estimatePrice };
        setBid({ ...subBid });
        setRerender(true);
        setPrice(0);
    };

    const handleAddWatchList = (product) => {
        try {
            async function addWatchList() {
                WatchListsService.addWatchList(account.id, product)
                    .then((res) => {
                        setCheckWatchList(true);
                        dispatch(setReloadWatchList(!reloadWatchList));
                        toast.info(`Đã thêm ${product.title} vào danh sách yêu thích`);
                    })
                    .catch((err) => {
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

    const handleShowListBids = () => {
        setShowListBids(true);
    };

    return (
        <div className="medium-5 medium-large-4 cell right-col">
            <div className="bidding-tool">
                <div id="space-holder-for-live-stream" />
                <div className="bid-mask exp-1" />
                <div className="bidding-box-nav">
                    <div className="close-btn">Close</div>
                </div>
                <div className="bidding-box exp-1 ">
                    {closeAction ? (
                        <div className="bb-panel-header warning">Đã kết thúc</div>
                    ) : (
                        <div className="bb-panel-header success bg-success" style={{ color: '#fff' }}>
                            Phiên đấu giá
                        </div>
                    )}
                    <div className="bb-row bb-time exp-1 warning">
                        <div className="bb-icon">
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                        <div className="bb-item">
                            <div className="bb-title">
                                <span>THỜI GIAN CÒN LẠI...</span>
                            </div>
                            <div className="bb-content">
                                <div className="bb-counter bid-closing-soon">
                                    <div className="closeness-wrapper exp-1">
                                        {closeAction ? (
                                            <span>Phiên đấu giá đã kết thúc</span>
                                        ) : (
                                            <span>
                                                {timeAuction[0]}d : {timeAuction[1]}h : {timeAuction[2]}m :{' '}
                                                {timeAuction[3]}s
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="bb-datetime exp-1">
                                    <p>Thời gian kết thúc:</p>
                                    <span className="time-left-close-date">
                                        {/* {Moment(state.auction.auctionEndTime).format('DD-MM-YYYY HH:MM:SS')} */}
                                        {moment(state.auction.auctionEndTime).format('LTS DD-MM-YYYY')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bb-rows-wrapper">
                        <div className="bb-row bb-current-bid exp-1">
                            <div className="bb-icon">
                                {/* <i className="icon icon-ok-sign" /> */}
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className="bb-item">
                                <div className="current-bidder">
                                    {closeAction ? (
                                        <div className="bb-title is-label">
                                            <span
                                                aria-haspopup="true"
                                                className="current-bid bid-box-label"
                                                data-allow-html="true"
                                                data-position="left"
                                                data-tooltip2
                                                data-title="<div class='title-block'><b>About Current Bid</b></div> <div class='text-block'>The “Current Bid” is the current winning bid placed by an auction participant.</div> <div class='text-block'>If the auction closes at this price, this bid amount does not reflect additional taxes, shipping, or buyer’s premium. Please see the Conditions of Sale for details.</div>"
                                            >
                                                GIÁ KẾT THÚC: <FontAwesomeIcon icon={faCircleInfo} />
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="bb-title is-label">
                                            <span
                                                aria-haspopup="true"
                                                className="current-bid bid-box-label"
                                                data-allow-html="true"
                                                data-position="left"
                                                data-tooltip2
                                                data-title="<div class='title-block'><b>About Current Bid</b></div> <div class='text-block'>The “Current Bid” is the current winning bid placed by an auction participant.</div> <div class='text-block'>If the auction closes at this price, this bid amount does not reflect additional taxes, shipping, or buyer’s premium. Please see the Conditions of Sale for details.</div>"
                                            >
                                                GIÁ HIỆN TẠI: <FontAwesomeIcon icon={faCircleInfo} />
                                            </span>
                                        </div>
                                    )}
                                    <div className="bb-content">
                                        <div className="has-bids" style={{ display: 'block' }}>
                                            <div className="bid-data">
                                                <div
                                                    className="winning-amount big-numbers exp-1"
                                                    data-view="current-price"
                                                    style={{
                                                        lineHeight: 1,
                                                        paddingTop: 0,
                                                        paddingBottom: 0,
                                                    }}
                                                >
                                                    <NumericFormat
                                                        value={state.bids.length === 0 ? '' : state.bids[0].bidPrice}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' đ'}
                                                    />
                                                </div>
                                                <span className="bidder-identifier">
                                                    <hr />
                                                </span>
                                                <div
                                                    className="bid-link exp-1"
                                                    style={{ lineHeight: 1, paddingTop: 0 }}
                                                    onClick={handleShowListBids}
                                                >
                                                    {closeAction ? (
                                                        <div
                                                            className="bid-box-bid-count"
                                                            style={{
                                                                fontSize: 'large',
                                                                cursor: 'pointer',
                                                                color: '#b86c17',
                                                            }}
                                                        >
                                                            Lịch sử đấu giá
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="bid-box-bid-count"
                                                            style={{
                                                                fontSize: 'large',
                                                                cursor: 'pointer',
                                                                color: '#198553',
                                                            }}
                                                        >
                                                            Danh sách đấu giá
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="max-bid" data-max>
                                                <div className="thirteen-font medium-gray max-bid-label">
                                                    Đấu thầu tối đa của bạn
                                                </div>
                                                <div className="max-bid-number">
                                                    <span />
                                                </div>
                                                <div className="clear" />
                                            </div>
                                            <div className="clear" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {closeAction ? null : (
                            <div className="bb-row bb-est-val exp-1">
                                <div className="bb-icon">
                                    {/* <i className="icon icon-tag" /> */}
                                    <FontAwesomeIcon icon={faTag} />
                                </div>
                                <div className="bb-item">
                                    <div className="bb-title">
                                        <span
                                            aria-haspopup="true"
                                            data-allow-html="true"
                                            data-position="left"
                                            data-tooltip2
                                            data-title="<div class='title-block'><b>About Estimates</b></div> <div class='text-block'>Estimate is based on various factors which may include past or expected sale prices of similar items in other auctions. Any listed estimate is not a guarantee of the actual selling price of this auction, or a representation of actual retail or other value.</div>"
                                        >
                                            GIÁ ƯỚC TÍNH:
                                        </span>
                                    </div>
                                    <div className="bb-content">
                                        <div className="est-val">
                                            <NumericFormat
                                                value={state.bids.length === 0 ? '' : state.bids[0].estimatePrice}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' đ'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="bb-row bb-place-bid bb-desktop">
                            {closeAction ? null : (
                                <div className="bb-item" id="bid-box-wrapper">
                                    <h3 className="bad-auth" style={{ display: 'none' }} />
                                    <form
                                        className="lot-form"
                                        style={{ margin: 0 }}
                                        id="new_bid"
                                        acceptCharset="UTF-8"
                                        // method="post"
                                    >
                                        <div className="bid-wrapper">
                                            <div className="bid-box grid-x" id="bid-box">
                                                <div className="icon-cell cell small-1">
                                                    {/* <div className="icon-wrapper icon-dollar-sign"> */}
                                                    {/* <i className="icon icon-dollar" /> */}
                                                    <FontAwesomeIcon icon={faDollar} className="iconDollar" />
                                                    {/* </div> */}
                                                </div>
                                                <div className="bid-amt cell small-7">
                                                    <input
                                                        id="bid"
                                                        onChange={(e) => {
                                                            setPrice(e.target.value);
                                                        }}
                                                        value={Price}
                                                        className="bid-input-field big-numbers exp-1"
                                                        name="bid"
                                                        placeholder="Vui lòng nhập giá thầu..."
                                                    />
                                                </div>
                                                <div className="bid-min-btn cell small-4">
                                                    <button
                                                        type="button"
                                                        className="button next-min-bid-flag"
                                                        onClick={handleMinAuction}
                                                    >
                                                        <span>ĐẤU GIÁ NHỎ NHẤT</span>
                                                    </button>
                                                </div>
                                                {checkPrice ? null : <ValidationQuantity message={errorMess} />}
                                                <input
                                                    autoComplete="off"
                                                    id="paid_entry_lot_id"
                                                    type="hidden"
                                                    name="bid[paid_entry_lot_id]"
                                                />
                                            </div>
                                            <div
                                                className="careted-flag"
                                                data-js-behavior="has-tooltipish"
                                                id="next-min-bid-flag"
                                                style={{ display: 'none' }}
                                                title="Click to bid next increment"
                                            />
                                        </div>
                                        <div className="bid-animation-wrapper relative-wrapper overflow-hidden">
                                            {loadBids ? (
                                                <button
                                                    className="float-center button expanded bid-button exp-1"
                                                    type="button"
                                                    disabled
                                                >
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Đang đặt giá...
                                                </button>
                                            ) : (
                                                <button
                                                    className="float-center button expanded bid-button exp-1"
                                                    id="bid-button"
                                                    type="button"
                                                    onClick={handleBid}
                                                >
                                                    ĐẤU GIÁ
                                                </button>
                                            )}
                                        </div>
                                        <div className="bid-pending-icon">
                                            <i className="icon-spin icon-spinner" />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="bidding-actions mt-3">
                    {loadCheckWatchList ? null : (
                        <>
                            {checkWatchList ? (
                                <div className="watcher-btn text-center" style={{ width: 'auto' }}>
                                    <div className="relative-wrapper watch-wrapper btn">
                                        <div
                                            className="watching-favorite"
                                            style={{ color: 'red', fontStyle: 'normal', display: 'block !important' }}
                                        >
                                            <i className="fa-regular fa-heart"></i>
                                            <span className="watch-type"> Yêu thích</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="watcher-btn text-center"
                                    style={{ width: 'auto' }}
                                    onClick={() => handleAddWatchList(product)}
                                >
                                    <div className="relative-wrapper watch-wrapper btn">
                                        <div
                                            className="watching-plus"
                                            style={{ fontStyle: 'normal', display: 'block !important' }}
                                        >
                                            <i className="fa-regular fa-heart"></i>
                                            <span className="watch-type"> Thêm vào danh sách yêu thích</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <ListBids
                showListBids={showListBids}
                bids={state.bids}
                closeAction={closeAction}
                timeAuction={timeAuction}
                changeShowListBids={changeShowListBids}
            />
            <ToastContainer autoClose={1500} />
        </div>
    );
}

export default ComponentAuction;
