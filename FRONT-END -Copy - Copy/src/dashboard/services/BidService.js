import axios from "axios";
import { BID_URL, LISTBID_URL } from "./Commom";

class BidService{

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static getBidByAuctionId(auctionId){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${LISTBID_URL}/${auctionId}`)
    }
    static postCreateBid(Bid){
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(BID_URL, Bid)
    }
}

export default BidService;