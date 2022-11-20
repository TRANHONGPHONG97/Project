import axios from "axios";
import { MODERATION_BY_PRODUCT_ID_URL } from "./Commom";

class AuctionService{

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static getAuctionById(idAuction){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${MODERATION_BY_PRODUCT_ID_URL}/${idAuction}`)
    }
}

export default AuctionService;