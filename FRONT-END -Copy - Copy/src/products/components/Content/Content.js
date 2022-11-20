import React, { useState, useEffect } from 'react';
import './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../../../../node_modules/bootstrap/dist/js/bootstrap.js';
import ContentLotType from './ContentNav/ContentLotType';
import ContentAll from './ContentAll/ContentAll';
import ContentAuction from './ContentAuction/ContentAuction';
import ContentTheShop from './ContentTheShop/ContentTheShop';
import './content.css';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getAccount, getCheckProduct, getType, getAllCartItems, getShowCart } from '../../redux/selector';
import { getSearchingFilters, getShowInfoProduct, getLoginStatus, getReloadWatchList } from './../../redux/selector';
import ContentResultFilters from './ContentResultFilters/ContentResultFilters';
import { setCategories, setLoadData, setProducts, setWatchLists } from './../../redux/actions';
import ProductService from '../../service/Product/ProductService';
import CategoriesService from '../../service/Categories/CategoriesService';
import WatchListsService from '../../service/WatchList/WatchListService';
import TopProducts from './HeaderTopProduct/TopProducts';
import PagingProducts from './ContentAll/index';
import PagingResultFilters from './ContentResultFilters/index';

const Content = () => {
    const dispatch = useDispatch();

    const type = useSelector(getType);

    const searchStatus = useSelector(getSearchingFilters);

    const loginStatus = useSelector(getLoginStatus);

    const account = useSelector(getAccount);

    const reloadWatchList = useSelector(getReloadWatchList);

    useEffect(() => {
        try {
            WatchListsService.getWatchListByAccountId(account.id)
                .then((res) => {
                    dispatch(setWatchLists(res.data));
                })
                .catch((resp) => {
                    console.log(resp);
                });
        } catch (error) {
            console.log(error);
        }
    }, [reloadWatchList]);

    useEffect(() => {
        try {
            dispatch(setLoadData(true));
            async function getData() {
                let productsRes = await ProductService.getAllProducts();
                let categoriesRes = await CategoriesService.getAllCategories();

                dispatch(setProducts(productsRes.data));
                dispatch(setCategories(categoriesRes.data));
                dispatch(setLoadData(false));
            }
            getData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
            <div className="base-width main-yield" id="client-content" style={{ maxWidth: '96%',margin: '30px' }}>
                <TopProducts />
                <div className="pages" data-pages-shell="">
                    <div id="homepage-lot">
                        <div
                            className="category-items-wrapper cell medium-12 float-center"
                            id="homepage-lot-list-wrapper"
                        >
                            <div id="homepage-lot-list">
                                <a id="top-categories" name="top-categories"></a>
                                <div className="sorter-wrapper">
                                    <div>
                                        <div>
                                            <ContentLotType />
                                            {searchStatus ? (
                                                <PagingResultFilters />
                                            ) : type === 'Đấu giá' ? (
                                                <ContentAuction />
                                            ) : type === 'Cửa hàng' ? (
                                                <ContentTheShop />
                                            ) : (
                                                <PagingProducts />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Content;
