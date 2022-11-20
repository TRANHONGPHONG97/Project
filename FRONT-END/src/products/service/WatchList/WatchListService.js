import axios from "axios";
import { ADD_WATCH_LISTS, WATCH_LISTS } from "../API";
import { CHECK_WATCH_LISTS } from './../API';

class WatchListsService{
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static addWatchList(accountId, product){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${ADD_WATCH_LISTS}/${accountId}`, product);
    }
    static getWatchListByAccountId(accountId){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${WATCH_LISTS}/${accountId}`);
    }
    static checkProductInWatchListByAccountId(accountId, product){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${CHECK_WATCH_LISTS}/${accountId}`, product);
    }

}

export default WatchListsService;