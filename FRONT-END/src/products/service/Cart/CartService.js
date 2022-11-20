import axios from "axios";
import { GET_CART_BY_ACCOUNT_ID } from './../API';

class CartService {
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    // static createCart(){
    //     return axios.post(CREATE_CART);
    // }
    static getCartByAccountId(accountId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${GET_CART_BY_ACCOUNT_ID}/${accountId}`);
    }


}

export default CartService;