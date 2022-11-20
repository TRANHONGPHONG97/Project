import axios from 'axios';
import { BARCHART_URL, TURNOVERBYMONTH_URL } from './Commom';

class ChartService {

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    
    static getListChart(sYear) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${BARCHART_URL}/${sYear}`);
    }
    static getTurnoverByMonth() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${TURNOVERBYMONTH_URL}`);
    }
}

export default ChartService;