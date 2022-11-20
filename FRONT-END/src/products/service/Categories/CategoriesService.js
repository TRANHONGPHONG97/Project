import axios from 'axios';
import { ALL_CATEGORIES } from './../API';

class CategoriesService {
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static getAllCategories() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(ALL_CATEGORIES);
    }
}

export default CategoriesService;
