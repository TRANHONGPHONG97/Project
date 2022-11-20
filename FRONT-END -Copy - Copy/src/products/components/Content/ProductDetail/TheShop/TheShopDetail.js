import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductService from './../../../../service/Product/ProductService';
import { Carousel, FormatMoney } from '../../../../Hooks/Hooks';
import BuyComponent from './BuyComponent';
import ReviewProductShop from '../Review/ReviewProductShop';
import LoadCart from './../../../Loading/LoadCart';
import NotFound from './../../../Loading/NotFound';

function TheShopDetail() {
    const productSlug = useParams();

    const [products, setProducts] = useState([]);

    const [productsByCategory, setProductsByCategory] = useState([]);
    const [productsByCreatedBy, setProductsByCreatedBy] = useState([]);

    const [theShop, setTheShop] = useState({
        product: {},
        productMedias: [],
        loading: true,
    });

    const getProductsByCategory = (products, categoryId) => {
        return products.filter((product) => {
            return product.category.id === categoryId;
        });
    }
    const getProductsByCreatedBy = (products, createdBy) => {
        return products.filter((product) => {
            return product.createdBy === createdBy;
        });
    }

    useEffect(() => {
        try {
            async function getData() {
                let productsRes = await ProductService.getAllProducts();
                let productRes = await ProductService.getProductBySlug(productSlug.slug);
                let productMediasRes = await ProductService.getAllMediaByProductId(productRes.data.id);
                setProducts(productsRes.data);
                setProductsByCategory(getProductsByCategory(products, productRes.data.category.id));
                setProductsByCreatedBy(getProductsByCreatedBy(products, productRes.data.createdBy));
                setTheShop({
                    ...theShop,
                    product: productRes.data,
                    productMedias: productMediasRes.data,
                    loading: false,
                });
                window.scrollTo(0, 0);
            }
            getData();
        } catch (error) { }
    }, [productSlug]);

    useEffect(() => {
        try {
            setProductsByCategory(getProductsByCategory(products, theShop.product.category.id));
            setProductsByCreatedBy(getProductsByCreatedBy(products, theShop.product.createdBy));
        } catch (error) { }
    }, [theShop.product]);

    const { product, productMedias, loading } = theShop;
    let max_visibility = theShop.productMedias.length;

    return (
        <div className="pages" id="productTheShop" style={{ marginTop: '160px' }}>
            {loading ? (
                <LoadCart />
            ) : (
                <div id="lot-body">
                    <div className="grid-x grid-margin-x" id="lot-page-redesign-2">
                        <div className="medium-7 medium-large-8 cell left-col">
                            <div className="lot-page-left">
                                <div className="lot-title">
                                    <h2 style={{ textAlign: 'center' }}>{theShop.product.title}</h2>
                                </div>
                                <div className="lot-image-showcase">
                                    <div className="slide-image">
                                        <Carousel maxVisibility={max_visibility}>
                                            {productMedias.map((media, i) => (
                                                <img key={i} src={media.fileUrl} alt="" />
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="lot-detail">
                                    <div className="lot-tabs">
                                        <div className="lot-tab-item" tab="lot-overview">
                                            Tổng quan
                                        </div>
                                        {/* <div className="lot-tab-item" tab="lot-rules">
                                            Điều kiện bán hàng
                                        </div>
                                        <div className="lot-tab-item" tab="lot-shipping">
                                            Giao hàng &amp; Đổi trả
                                        </div> */}
                                    </div>
                                    <div className="ms-5 lot-content">
                                        <div className="item-lot-overview active">
                                            <div className="lot-donator">
                                                <h2 className="lot-desc">MÔ TẢ SẢN PHẨM: </h2>
                                                <p className="lot-description">{product.description}</p>
                                                <hr />
                                            </div>
                                            <hr style={{ borderWidth: '1px' }} />
                                        </div>
                                    </div>
                                    <div className="new-terms-wrapper">
                                        <div className="new-term-item">
                                            <br />
                                            <div className="new-terms-detail">
                                                <ReviewProductShop product={product} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <BuyComponent product={product} />
                        {/* Them component BUY */}
                    </div>

                    {/* more */}
                    <div id="related-lots" style={{ clear: 'both' }}>
                        {productsByCategory.length === 0 ? null : (
                            <div>
                                <div id="related-lots-title">
                                    <h2>SẢN PHẨM TƯƠNG TỰ</h2>
                                </div>
                                <div className="lots-wrapper mt-4" style={{ display: 'flex' }}>
                                    {productsByCategory.map((product) => (
                                        (product.action) ? null :
                                            (product.id === theShop.product.id) ? null :
                                                <Link to={`/product/the-shop/${product.slug}`} key={product.id} className="individual-item-view cell medium-3">
                                                    <div className="item">
                                                        <div>
                                                            <div className="item-wrapper">
                                                                <div className="catalog-item-image">
                                                                    <img
                                                                        src={product.image}
                                                                        alt=""
                                                                        style={{ height: '200px' }}
                                                                    />
                                                                </div>
                                                                <div className="catalog-item-info">
                                                                    <span className="title">
                                                                        {product.title}
                                                                    </span>
                                                                    <span className="price">Giá sản phẩm: {FormatMoney(product.price)} ₫</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {productsByCreatedBy.length > 0 ? (
                            <div>
                                <div>
                                    <h2>SẢN PHẨM CÙNG NGƯỜI ĐĂNG</h2>
                                </div>
                                <div className="lots-wrapper mt-4" style={{ display: 'flex' }}>
                                    {productsByCreatedBy.map((product) => (
                                        (product.action) ? null :
                                            (product.id === theShop.product.id) ? null :
                                                <Link to={`/product/the-shop/${product.slug}`} key={product.id} className="individual-item-view cell medium-3">
                                                    <div className="item">
                                                        <div>
                                                            <div className="item-wrapper">
                                                                <div className="catalog-item-image">
                                                                    <img
                                                                        src={product.image}
                                                                        alt=""
                                                                        style={{ height: '200px' }}
                                                                    />
                                                                </div>
                                                                <div className="catalog-item-info">
                                                                    <span className="title">
                                                                        {product.title}
                                                                    </span>
                                                                    <span className="price">Giá sản phẩm: {FormatMoney(product.price)} ₫</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TheShopDetail;
