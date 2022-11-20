import React, { useState, useEffect } from "react";
import { getLoadData, getResultsFiltersChange, productsRemainingCategorySelector, productsRemainingSortSelector } from "../../../redux/selector";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { FormatMoney } from './../../../Hooks/Hooks';
import NotFound from './../../Loading/NotFound';
import { setLoadData, setShowInfoProduct } from "../../../redux/actions";
import Searching from './../../Loading/Searching';
import { Link } from 'react-router-dom';


const ContentResultFilters = () => {
    const dispatch = useDispatch();

    const products = useSelector(getResultsFiltersChange);

    return (
        <>
            {products.length > 0 ? (

                <div className="lot-cards grid-x grid-margin-x">
                    {
                        products.map(product => (
                            <div key={product.id} className="card small-12 medium-6 cell"
                                // onClick={handleShowInfoProduct} 
                                style={{ transform: 'none' }}>
                                {product.action ? (
                                    <Link to={`/auction/${product.id}`} style={{ color: '#333' }}>
                                        <figure className="card__image">
                                            <img src={product.image} alt="" style={{ transform: 'none' }} />
                                            <div className="add-to-watchlist">
                                                <span className="ico-circle" ico_action="fav">
                                                    <i className="fa-regular fa-heart"></i>
                                                </span>
                                            </div>
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
                                                <div className="stats-group__stat"><b>Đang tham gia:</b> 5</div>
                                                <div className="stats-group__stat"><b>Theo dõi:</b> 34</div>
                                                <div className="stats-group__stat"><b>Giá ước tính:</b> {FormatMoney(product.estimatePrice)} ₫</div>
                                                <div className="stats-group__stat">
                                                    <b>Giá khởi điểm:</b>
                                                    <div className="stat__price">{FormatMoney(product.price)} ₫</div>
                                                </div>
                                                <div className="stats-group__stat">
                                                    <b>Giá hiện tại:</b>
                                                    <div className="stat__price">4,600 ₫</div>
                                                </div>
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
                                            <div className="add-to-watchlist">
                                                <span className="ico-circle" ico_action="fav">
                                                    <i className="fa-regular fa-heart"></i>
                                                </span>
                                            </div>
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
                                                    <span className="ItemCard-module__lineThrough___3xq25">{product.sold}
                                                    </span>
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
            ) : (
                <NotFound />
            )}
        </>
    )
}

export default ContentResultFilters;