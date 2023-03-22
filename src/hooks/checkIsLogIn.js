import { dispatch } from '../store';
import axios from '../utils/axios';
import { LOGIN, LOGOUT } from '../store/actions';
import jwtDecode from 'jwt-decode';

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};
export default async function checkIsLogIn() {
    try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
            setSession(serviceToken);
            const response = await axios.get('/api/users/me');

            const { data } = response;
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user: data
                }
            });
        } else {
            setSession(null);
            dispatch({ type: LOGOUT });
        }
    } catch (err) {
        console.error(err);
        setSession(null);
        dispatch({ type: LOGOUT });
    }
}
