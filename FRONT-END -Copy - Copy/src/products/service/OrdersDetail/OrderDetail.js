import axios from 'axios';
import { CREATE_ORDER_DETAIL, GET_BY_PRODUCT_CREATED_BY, UPDATE_STATUS } from '../API';
import { ALL_ORDERS_DETAIL } from './../API';

class OrdersDetailService {
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static createOrdersDetail(orderId, ordersDetail) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${CREATE_ORDER_DETAIL}/${orderId}`, ordersDetail);
    }
    static getAllOrdersDetail(accountEmail) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ALL_ORDERS_DETAIL}/${accountEmail}`);
    }
    static getOrdersDetailByProductCreatedBy(createdBy) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${GET_BY_PRODUCT_CREATED_BY}/${createdBy}`);
    }
    static updateStatus(orderDetailId, status) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${UPDATE_STATUS}/${orderDetailId}`, status);
    }
}

export default OrdersDetailService;
