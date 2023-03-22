import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import { openSnackbar } from '../store/slices/snackbar';
import { useDispatch } from '../store';

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

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

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const dispatchMessage = useDispatch();
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
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
        };

        init();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/local', { identifier: email, password });
        const { jwt, user } = response.data;
        setSession(jwt);
        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const register = async (username, email, password) => {
        // todo: this flow need to be recode as it not verified
        const response = await axios.post('/api/auth/local/register', {
            username,
            email,
            password
        });

        window.localStorage.setItem('user', JSON.stringify(response.data.user));
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const forgotPassword = async (email) => {
        const response = await axios.post('/api/auth/forgot-password', {
            email
        });
        console.log(response);
        if (response.status === 2000) {
            dispatchMessage(
                openSnackbar({
                    open: true,
                    message: 'تم إرسال رابط استعادة كلمة المرور على إيميلك.',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        }
    };

    const resetPassword = async (code, password, passwordConfirmation) => {
        const response = await axios.post('/api/auth/reset-password', {
            code,
            password,
            passwordConfirmation
        });

        if (response?.status === 200) {
            dispatchMessage(
                openSnackbar({
                    open: true,
                    message: 'تم تغيير كلمة المرور بنجاح.',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );
        } else if (response === undefined) {
            dispatchMessage(
                openSnackbar({
                    open: true,
                    message: 'خطأ في تغيير كلمة المرور',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        } else {
            dispatchMessage(
                openSnackbar({
                    open: true,
                    message: 'خطأ في تغيير كلمة المرور',
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: false
                })
            );
        }
    };

    const updateProfile = () => {};

    const checkLoggedIn = async () => {
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
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, forgotPassword, resetPassword, updateProfile, checkLoggedIn }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
