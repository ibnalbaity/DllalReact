// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    loading: true,
    loadingAction: false,
    users: [],
    user: {}
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // HAS LOADING
        hasLoading(state, action) {
            state.loading = action.payload;
        },

        // HAS LADING ADD
        hasLoadingAction(state, action) {
            state.loadingAction = action.payload;
        },

        // GET Dllals
        getDllalsSuccess(state, action) {
            state.users = action.payload;
        },

        // GET Dllals By Category Name
        getDllalsByCatNameSuccess(state, action) {
            state.users = action.payload;
        },

        // GET USER
        getUserSuccess(state, action) {
            state.user = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getUsers() {
    dispatch(slice.actions.hasError(null));
    const URL = '/api/users?populate=*';
    const sortDesc = '&sort[updatedAt]=desc';
    return async () => {
        try {
            const response = await axios.get(`${URL}${sortDesc}`);
            dispatch(slice.actions.getDllalsSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUser(id) {
    dispatch(slice.actions.hasError(null));
    const URL = `/api/users/${id}?populate=*`;
    return async () => {
        try {
            const response = await axios.get(`${URL}`);

            if (response.status === 200) {
                dispatch(slice.actions.getUserSuccess(response.data));
                dispatch(slice.actions.hasLoading(false));
            } else {
                dispatch(slice.actions.hasError('خطأ لم تتم الإستجابة للطلب'));
                dispatch(slice.actions.hasLoading(false));
            }
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function updateUser(userID, username, email) {
    console.log(username, userID, email);
    return async () => {
        dispatch(slice.actions.hasError(null));
        dispatch(slice.actions.hasLoadingAction(true));
        dispatch(slice.actions.getUserSuccess({}));
        const updateUserURL = `/api/users/${userID}`;
        try {
            axios
                .put(updateUserURL, {
                    username,
                    email
                })
                .then((res) => {
                    dispatch(slice.actions.getUserSuccess(res.data));
                    dispatch(slice.actions.hasLoadingAction(false));
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: `تم تحديث معلومات المستخدم بنجاح`,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: true
                        })
                    );
                })
                .catch((e) => console.log(e));
            dispatch(slice.actions.hasLoadingAction(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم تحديث معلومات المستخدم بنجاح`,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoadingAction(false));
            console.log(error);
            dispatch(
                openSnackbar({
                    open: true,
                    error,
                    message: `خطأ: لم يتم تحديث معلومات المستخدم`,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        }
    };
}

export function removeUser(dllalID, imagesIDs) {
    dispatch(slice.actions.hasLoadingAction(true));
    return async () => {
        try {
            await imagesIDs.map((item) => axios.delete(`/api/upload/files/${item}`));
            const response = await axios.delete(`/api/dllals/${dllalID}`);
            dispatch(slice.actions.getDllalsSuccess(response.data));
            dispatch(slice.actions.hasLoadingAction(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم حذف المستخدم: ${response.data?.data?.attributes?.username} بنجاح`,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoadingAction(false));
        }
    };
}

export function removeImage(imagesID) {
    dispatch(slice.actions.hasLoadingAction(true));
    return async () => {
        try {
            await axios.delete(`/api/upload/files/${imagesID}`);
            dispatch(slice.actions.hasLoadingAction(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم حذف الصورة بنجاح.`,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoadingAction(false));
        }
    };
}
