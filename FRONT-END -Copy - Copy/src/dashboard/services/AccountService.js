import axios from 'axios';
import {
    ACCOUNTBYEMAIL_URL,
    ACCOUNTBYID_URL,
    ACCOUNT_URL,
    ADDACCOUNT_URL,
    DATATABLEACCOUNT_URL,
    DELETEACCOUNT_URL,
    DISTRICT_URL,
    EDITACCOUNT_URL,
    LOCKACCOUNT_URL,
    PROVINCE_URL,
    RESTARTPASSWORD_URL,
    ROLES_URL,
    UNLOCKACCOUNT_URL,
    WARD_URL,
    EDIT_PASSWORD_ACCOUNT_URL,
} from './Commom';
import { toast } from 'react-toastify';

class AccountService {
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static getAccount() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(ACCOUNT_URL);
    }
    static getAddAccount(account) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(ADDACCOUNT_URL, account);
    }
    static getDataTableAccount(search, currentPage, recordPerPage) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${DATATABLEACCOUNT_URL}${search}?page=${currentPage}&size=${recordPerPage}`);
    }
    static getAccountById(accountId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${ACCOUNTBYID_URL}/${accountId}`);
    }
    static getEditAccount(account, accountId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${EDITACCOUNT_URL}/${accountId}`, account);
    }
    static getDeleteAccount(accountId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.patch(`${DELETEACCOUNT_URL}/${accountId}`);
    }
    static patchLockAccount(id) {
        let cookie = this.getCookie('JWT');
        console.log('cookie: ', cookie);
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.patch(`${LOCKACCOUNT_URL}/${id}`);
    }
    static patchUnLockAccount(id) {
        let cookie = this.getCookie('JWT');
        console.log('cookie: ', cookie);
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.patch(`${UNLOCKACCOUNT_URL}/${id}`);
    }
    static getRoles() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(ROLES_URL);
    }
    static getProvinces() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(PROVINCE_URL);
    }
    static getDistrict(idProvince) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${DISTRICT_URL}/${idProvince}`);
    }
    static getWard(idDistrict) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${WARD_URL}/${idDistrict}`);
    }
    // static async getEmail(email) {
    //     let cookie = this.getCookie('JWT');
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
    //     return await axios
    //         .get(`${ACCOUNTBYEMAIL_URL}/${email}`)
    //         .then((res) => {
    //             toast.success('Kiểm tra email thành công');
    //             document.querySelector('#email').disabled = true;
    //         })
    //         .catch((error) => {
    //             console.log('error: ', error);
    //         });
    // }
    static postRestartPassword(account) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(RESTARTPASSWORD_URL, account);
    }
    static editPasswordAccount(account) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(EDIT_PASSWORD_ACCOUNT_URL, account);
    }
}

export default AccountService;
