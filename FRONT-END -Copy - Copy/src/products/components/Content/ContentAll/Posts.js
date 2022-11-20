import React, { useState } from 'react';
import { FormatMoney } from '../../../Hooks/Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct, setShowInfoProduct } from '../../../redux/actions';
import { getLoadData, getWatchLists } from '../../../redux/selector';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import LoadCart from './../../Loading/LoadCart';

const Posts = ({ products }) => {
    const dispatch = useDispatch();
    const [watchLists, setWatchLists] = useState([]);

    // debugger;
    const handleShowInfoProduct = (product) => {
        dispatch(setShowInfoProduct(true));
        dispatch(setProduct(product));
    };

    const currentWatchLists = useSelector(getWatchLists);

    useEffect(() => {
        async function checkWatchList() {
            if (currentWatchLists.length > 0) {
                setWatchLists(currentWatchLists);
                return;
            } else {
            }
        }
        checkWatchList();
    }, [currentWatchLists]);

    const loadData = useSelector(getLoadData);
    return (
        <>
            {loadData ? <LoadCart /> : (
                <div className="lot-cards grid-x grid-margin-x">
                    {
                        products.map((product) => (
                            <div
                                key={product.id}
                                className="card small-12 medium-6 cell"
                                style={{ transform: 'none' }}
                                onClick={() => handleShowInfoProduct(product)}
                            >
                                {product.action ? (
                                    <Link to={`/auction/${product.id}`} style={{ color: '#333' }}>
                                        <figure className="card__image">
                                            <img src={product.image} alt="" style={{ transform: 'none' }} />

                                            {watchLists.forEach((item) => (
                                                <div key={item.id} className="add-to-watchlist">
                                                    {
                                                        item.product.id === product.id ? (
                                                            <span className="ico-circle" ico_action="fav">
                                                                <i style={{ color: 'red' }} className="fa-solid fa-heart"></i>
                                                            </span>
                                                        ) : null
                                                    }
                                                </div>
                                            ))}
                                        </figure>
                                        <div className="card__info-container">
                                            <div className="info-container__label">
                                                <span className="ico-circle c-bid">
                                                    <i className="fas fa-gavel"></i>
                                                </span>
                                                <span className="label__main"> Đấu giá </span>
                                            </div>
                                            <h3 className="card__title">
                                                <span>{product.title}</span>
                                            </h3>
                                            <div className="card__meta-group" />
                                            <div className="card__stats-group">
                                                <div className="stats-group__stat">
                                                    <b>Đang tham gia:</b> 5
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Theo dõi:</b> 34
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Giá ước tính:</b> {FormatMoney(product.estimatePrice)} ₫
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Giá khởi điểm:</b>
                                                    <div className="stat__price">{FormatMoney(product.price)} ₫</div>
                                                </div>
                                                {/* <div className="stats-group__stat">
                                                    <b>Giá hiện tại:</b>
                                                    <div className="stat__price">4,600</div>
                                                </div> */}
                                            </div>
                                            <div className="card__tertiary-container">
                                                <span className="tertiary-container__optional-group" />
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <Link to={`/product/the-shop/${product.slug}`} style={{ color: '#333' }}>
                                        <figure className="card__image">
                                            <img src={product.image} alt="" style={{ transform: 'none' }} />
                                            {watchLists.map((item) => (
                                                <div key={item.id} className="add-to-watchlist">
                                                    {
                                                        item.product.id === product.id ? (
                                                            <span className="ico-circle" ico_action="fav" data-tip="Yêu thích">
                                                                <i style={{ color: 'red' }} className="fa-solid fa-heart"></i>
                                                            </span>
                                                        ) : null
                                                    }
                                                </div>
                                            ))}
                                        </figure>
                                        <div className="card__info-container">
                                            <div className="info-container__label">
                                                <span className="ico-circle c-bin">
                                                    <i className="fas fa-tag"></i>
                                                </span>
                                                <span className="label__main"> Cửa hàng </span>
                                            </div>
                                            <h3 className="card__title">
                                                <span>{product.title}</span>
                                            </h3>
                                            <div className="card__stats-group">
                                                <div className="stats-group__stat">
                                                    <b>Số lượng còn lại:</b> {product.available}
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Giá sản phẩm:</b>
                                                    <div className="stat__price ItemCard-module__binPriceCentered___3hyVZ">
                                                        {FormatMoney(product.price)} ₫
                                                    </div>
                                                </div>
                                                <div className="ItemCard-module__marketPrice___3E7JK">
                                                    <b>Đã bán: </b>
                                                    <span className="ItemCard-module__lineThrough___3xq25">{product.sold}</span>
                                                </div>
                                            </div>
                                            <div className="card__tertiary-container">
                                                <span className="tertiary-container__optional-group" />
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        ))
                    }
                </div>
            )}
        </>
    );
};

export default Posts;
