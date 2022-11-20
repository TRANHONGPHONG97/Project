import axios from "axios";
import { SEND_EMAIL_AUCTIONS_SUCCESS } from "../API";

class EmailService{
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static auctionsSuccessSendEmail(email, product){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${SEND_EMAIL_AUCTIONS_SUCCESS}/${email}`, product);
    }
}

export default EmailService;