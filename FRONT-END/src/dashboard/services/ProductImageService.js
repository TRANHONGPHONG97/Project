import axios from 'axios';
import { DELETEPRODUCTIMAGE_URL, LISTPRODUCTIMAGE_URL, PRODUCTIMAGE_URL } from './Commom';

class ProductMediaService {

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static getListMedia(idProductMedia) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${LISTPRODUCTIMAGE_URL}/${idProductMedia}`);
    }
    static AddMedia(img) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(PRODUCTIMAGE_URL, img);
    }
    static DeleteMedia(idProductMedia) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.delete(`${DELETEPRODUCTIMAGE_URL}/${idProductMedia}`);
    }
}

export default ProductMediaService;