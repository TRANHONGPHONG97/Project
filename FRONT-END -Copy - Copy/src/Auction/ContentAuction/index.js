import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductService from '../../dashboard/services/productService';
import ProductMediaService from '../../dashboard/services/ProductImageService';
import AuctionService from '../../dashboard/services/AuctionService';
import { Carousel, FormatMoney } from '../../products/Hooks/Hooks';
import ComponentAuction from '../ComponentAuction';
import ReviewsProductShop from '../../products/components/Content/ProductDetail/Review/ReviewProductShop';
import LoadCart from '../../products/components/Loading/LoadCart';
import { Link } from 'react-router-dom';
function ContentAuctionDetail() {
    const { auctionId } = useParams();
    const [listAuctions, setListAuctions] = useState();
    const [AuctionProduct, setAuctionProduct] = useState({
        Product: {},
        imageProductAuctions: [],
        loading: false,
        auction: {},
    });
    useEffect(() => {
        try {
            window.scrollTo(0, 0);
            setAuctionProduct({ ...AuctionProduct, loading: true });
            async function getproduct() {
                let productAuction = await ProductService.ProductById(auctionId);
                let productImageAuction = await ProductMediaService.getListMedia(productAuction.data.id);
                let AuctionAPI = await AuctionService.getAuctionById(auctionId);
                let listAuctionsRes = await ProductService.getAllProductAuctions();
                setListAuctions(listAuctionsRes.data);
                setAuctionProduct({
                    ...AuctionProduct,
                    Product: productAuction.data,
                    imageProductAuctions: productImageAuction.data,
                    loading: false,
                    auction: AuctionAPI.data,
                });
            }
            getproduct();
        } catch (error) { }
    }, [auctionId]);

    console.log("listAuctions", listAuctions === undefined);

    const { Product, imageProductAuctions, loading, auction } = AuctionProduct;

    let max_visibility = imageProductAuctions.length;
    return (
        <div className="pages" id="productAuction">
            {loading ? (
                <LoadCart />
            ) : (
                <div id="lot-body">
                    <div className="grid-x grid-margin-x" id="lot-page-redesign-2">
                        <div className="medium-7 medium-large-8 cell left-col">
                            <div className="lot-page-left">
                                <div className="lot-title">
                                    <h2 className="text-center">{Product.title}</h2>
                                </div>
                                <div className="lot-notice alert-info hide" />
                                <div className="lot-image-showcase">
                                    <div className="slide-image">
                                        <Carousel maxVisibility={max_visibility}>
                                            {imageProductAuctions.map((media, i) => (
                                                <img key={i} src={media.fileUrl} alt="" />
                                            ))}
                                        </Carousel>
                                    </div>
                                </div>
                                <div className="lot-detail">
                                    <div className="lot-tabs">
                                        <div className="lot-tab-item" tab="lot-overview">
                                            Tổng quan sản phẩm
                                        </div>
                                        <div className="lot-tab-item" tab="lot-rules">
                                            Liên hệ
                                        </div>
                                    </div>
                                    <div className="lot-content ms-5">
                                        <div className="item lot-overview active">
                                            <div className="lot-donator">THÔNG TIN MÔ TẢ SẢN PHẨM</div>
                                            <div className="lot-description">
                                                <p>{Product.description}</p>
                                            </div>
                                            <hr style={{ borderWidth: '1px' }} />
                                            <ReviewsProductShop product={Product} />
                                            <hr style={{ borderWidth: '1px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ComponentAuction auction={auction} />
                    </div>
                    <div id="related-lots" style={{ clear: 'both' }} className="unactionable-lots">
                        <div id="related-lots-title" style={{}}>
                            <h2>SẢN PHẨM ĐẤU GIÁ KHÁC</h2>
                        </div>
                        <div className="lots-wrapper mt-4" style={{ display: 'flex' }}>
                            {listAuctions === undefined ? null : listAuctions.map((product) => (
                                AuctionProduct.Product.id === product.id ? null :
                                <Link to={`/auction/${product.id}`} key={product.id} className="individual-item-view cell medium-3">
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
                                                    <span className="price">Giá khởi điểm: {FormatMoney(product.price)} ₫</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ContentAuctionDetail;
