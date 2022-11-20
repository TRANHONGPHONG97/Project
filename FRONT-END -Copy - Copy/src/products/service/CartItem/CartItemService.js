import axios from 'axios';
import {
    ADD_CART_ITEM,
    ALL_CART_ITEM,
    REDUCE_CART_ITEM,
    INCREASING_CART_ITEM,
    REMOVE_CART_ITEM,
    REMOVE_CART_ITEMS,
    ALL_CART_ITEM_BY_CART_ID
} from './../API.js';

class CartItemService {
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static addCartItem(accountId, cartItem) {
        
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${ADD_CART_ITEM}/${accountId}`, cartItem);
    }

    static getCartItems(email) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ALL_CART_ITEM}/${email}`);
    }

    static getCartItemsByCart(cartId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ALL_CART_ITEM_BY_CART_ID}/${cartId}`);
    }

    static getReduceCartItem(cartItemId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${REDUCE_CART_ITEM}/${cartItemId}`);
    }

    static getIncreasingCartItem(cartItemId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${INCREASING_CART_ITEM}/${cartItemId}`);
    }
    static getRemoveCartItem(cartItemId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${REMOVE_CART_ITEM}/${cartItemId}`);
    }
    static getRemoveCartItems(accountId, cartItems) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${REMOVE_CART_ITEMS}/${accountId}`, cartItems);
    }
}

export default CartItemService;
