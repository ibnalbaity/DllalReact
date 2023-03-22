// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    loading: false,
    adTypes: []
};

const slice = createSlice({
    name: 'adType',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // HAS ERROR
        hasLoading(state, action) {
            state.loading = action.payload;
        },

        // GET AdType
        getAdTypesSuccess(state, action) {
            state.adTypes = action.payload;
        },

        // ADD AdType
        addAdTypeSuccess(state, action) {
            state.adTypes = action.payload;
        },

        // UPDATE AdType
        updateAdTypeSuccess(state, action) {
            state.adTypes = action.payload;
        },

        // REMOVE AdType
        removeAdTypeSuccess(state, action) {
            state.adTypes = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getAdTypes() {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/ad-types');
            dispatch(slice.actions.getAdTypesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterAdTypes(filterBy) {
    dispatch(slice.actions.hasLoading(true));
    const url = `/api/ad-types?populate=*&${filterBy}`;
    return async () => {
        try {
            const response = await axios.get(url);
            dispatch(slice.actions.getAdTypesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postAdType(title, desc, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand) {
    return async () => {
        try {
            const response = await axios.post('/api/ad-types', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addAdTypeSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم إضافة الإعلان ${response.data?.data?.attributes?.name} بنجاح`,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
            console.log(error);
            dispatch(
                openSnackbar({
                    open: true,
                    message: `خطأ: لم يتم إضافة الإعلان`,
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

export function updateAdType(event) {
    return async () => {
        try {
            const response = await axios.post('/api/ad-types', event);
            dispatch(slice.actions.updateAdTypeSuccess(response.data.events));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function removeAdType(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/ad-types', { eventId });
            dispatch(slice.actions.removeAdTypeSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
