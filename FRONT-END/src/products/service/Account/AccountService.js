import axios from 'axios';
import { ACCOUNT_LOGIN_URL } from './../API';

class AccountService {

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static addAccount() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(ACCOUNT_LOGIN_URL);
    }
}

export default AccountService;
