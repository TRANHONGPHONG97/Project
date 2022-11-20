import axios from 'axios';
import { ALL_PROVINCE_URL, ALL_DISTRICT_URL, ALL_WARD_URL } from '../API';

class LocationService{
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static getProvinces() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(ALL_PROVINCE_URL);
    }
    static getDistricts(provinceId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ALL_DISTRICT_URL}/${provinceId}`);
    }
    static getWards(districtId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ALL_WARD_URL}/${districtId}`);
    }
}

export default LocationService;