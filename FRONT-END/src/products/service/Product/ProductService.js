import axios from 'axios';
import {
    ALL_MEDIA_PRODUCT,
    ALL_PRODUCTS,
    GET_PRODUCTS_BY_SLUG,
    GET_PRODUCTS_AUCTIONS,
    GET_PRODUCTS_THE_SHOPS,
    GET_PRODUCTS_MODERATED_BY_CREATED_BY,
    GET_TOP_PRODUCTS,
} from './../API';

class ProductService {
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static getAllProducts() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(ALL_PRODUCTS);
    }

    static getProductById(id) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ALL_PRODUCTS}/${id}`);
    }

    static getProductBySlug(slug) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${GET_PRODUCTS_BY_SLUG}/${slug}`);
    }

    static getAllMediaByProductId(productId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ALL_MEDIA_PRODUCT}/${productId}`);
    }
    static getAllProductAuctions() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(GET_PRODUCTS_AUCTIONS);
    }
    static getAllProductTheShops() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(GET_PRODUCTS_THE_SHOPS);
    }
    static getProductsModeratedByCreatedBy(createBy) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${GET_PRODUCTS_MODERATED_BY_CREATED_BY}/${createBy}`);
    }
    static getTopProductBySold() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(GET_TOP_PRODUCTS);
    }
}

export default ProductService;
