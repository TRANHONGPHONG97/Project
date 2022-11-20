import axios from "axios";
import { CHECKOUT_ORDER, REMOVE_ORDER } from './../API';

class OrderService{
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static createCheckoutOrder(accountId, order){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${CHECKOUT_ORDER}/${accountId}`, order);
    }
    static removeOrder(orderId){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${REMOVE_ORDER}/${orderId}`);
    }
    
}

export default OrderService;