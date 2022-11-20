import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getAccount } from '../products/redux/selector';
import { loginStatus, setAccount } from '../products/redux/actions';
import axios from 'axios';

const RequireAuth = ({ allowedRoles }) => {
    const dispatch = useDispatch();
    const getCookie = (name) => {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    };
    const token = getCookie('JWT');
    let decoded = jwt_decode(token);
    const account = useSelector(getAccount);
    console.log('account: ', account);
    if (Object.keys(account).length === 0 && token) {
        async function getAccoun() {
            await axios
                .get(`${'http://localhost:8080/api/accounts/getAccountEmail'}/${decoded.sub}`)
                .then((account) => {
                    // toast.success('Kiểm tra email thành công!');
                    dispatch(loginStatus(true));
                    dispatch(setAccount(account.data));
                })
                .catch((error) => {
                    console.log('error: ', error);
                });
        }
        getAccoun();
    }

    const location = useLocation();
    return decoded.role.find((role) => allowedRoles?.includes(role.authority)) ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};
export default RequireAuth;
