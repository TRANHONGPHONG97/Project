import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_PRODUCTS_AUCTIONS } from '../../products/service/API';
import {
    ADDPRODUCT_URL,
    DATATABLEPRODUCT_URL,
    EDITPRODUCT_URL,
    PRODUCTBYID_URL,
    PRODUCTMODERATIONBYID_URL,
    PRODUCTMODERATION_URL,
    PRODUCT_URL,
    REMOVEPRODUCT_URL,
} from './Commom';


class ProductService {

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static getProducts() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(PRODUCT_URL);
    }
    static getProductsModeration() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(PRODUCTMODERATION_URL);
    }
    static getDataTableProduct(search, currentPage, recordPerPage) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${DATATABLEPRODUCT_URL}${search}?page=${currentPage}&size=${recordPerPage}`);
    }
    static async AddProduct(product) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        await axios.post(`${ADDPRODUCT_URL}`, product).then(() => {
            toast.success('Đã thêm thành công!');
        }).catch((error) => {
            toast.error(error.response.data.exceptionMessage);
        });
    }
    static EditProduct(editProduct, editProductId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${EDITPRODUCT_URL}/${editProductId}`, editProduct);
    }
    static ModerationProduct(editProductId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${PRODUCTMODERATIONBYID_URL}/${editProductId}`);
    }
    static ProductById(editProductId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${PRODUCTBYID_URL}/` + editProductId);
    }
    static DeleteProduct(productId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${REMOVEPRODUCT_URL}/${productId}`);
    }

    static getAllProductAuctions() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(GET_PRODUCTS_AUCTIONS);
    }
}

export default ProductService;
