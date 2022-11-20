import axios from 'axios';
import {
    CATEGORY_URL,
    DATATABLE_CATEGORY_URL,
    ADD_CATEGORIES,
    EDIT_CATEGORIES,
    DELETE_CATEGORIES,
    CATEGORY_ID,
} from './Commom';

class CategoryService {

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static getCategory() {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(CATEGORY_URL);
    }
    static getDataTableCategory(search, currentPage, recordPerPage) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${DATATABLE_CATEGORY_URL}${search}?page=${currentPage}&size=${recordPerPage}`);
    }
    static addCategory(category) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${ADD_CATEGORIES}`, category);
    }
    static editCategory(editCategory, editCategoryId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${EDIT_CATEGORIES}/${editCategoryId}`, editCategory);
    }
    static deleteCategory(productId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.put(`${DELETE_CATEGORIES}/${productId}`);
    }
    static getCategoryById(editCategoryId) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.get(`${CATEGORY_ID}/` + editCategoryId);
    }
}

export default CategoryService;
