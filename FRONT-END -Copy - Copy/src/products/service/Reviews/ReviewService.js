import axios from 'axios';
import { REVIEW_ALL_URL, REVIEW_GET_BY_ID_URL, REVIEW_ADD_URL, REVIEW_DELETE_URL, REVIEW_EDIT_URL } from '../API';

class ReviewService {
    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }
    static getAllReviews() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(REVIEW_ALL_URL);
    }
    static getReviewById(reviewId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${REVIEW_GET_BY_ID_URL}/${reviewId}`);
    }
    static addReview(review) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${REVIEW_ADD_URL}`, review);
    }
    static editReview(editReview, editReviewId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${REVIEW_EDIT_URL}/${editReviewId}`, editReview);
    }
    static deleteReview(reviewId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${REVIEW_DELETE_URL}/${reviewId}`);
    }
}
export default ReviewService;
