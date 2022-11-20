import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN_URL, REGISTER_URL } from './Commom';

class AuthService {
    static notify() {
        toast.success('Đăng ký thành công!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
        // setTimeout(() => {
        //     useNavigate('/login', { replace: true });
        // }, 2000);
    }
    static notifyError(error) {
        toast.error(error, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    }

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static postRegister(user) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios
            .post(`${REGISTER_URL}`, user)
            .then(() => {
                this.notify();
            })
            .catch((error) => {
                this.notifyError(error.response.data.message);
            });
    }
    static postLogin(user) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${LOGIN_URL}`, user).catch((error) => {
            toast.error(error.response.data.exceptionMessage);
        });
    }
}

export default AuthService;
