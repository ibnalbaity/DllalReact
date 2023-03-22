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
    years: []
};

const slice = createSlice({
    name: 'year',
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

        // GET years
        getYearsSuccess(state, action) {
            state.years = action.payload;
        },

        // ADD year
        addYearSuccess(state, action) {
            state.years = action.payload;
        },

        // UPDATE year
        updateYearSuccess(state, action) {
            state.years = action.payload;
        },

        // REMOVE year
        removeYearSuccess(state, action) {
            state.years = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getYears() {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/years');
            dispatch(slice.actions.getYearsSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterYears(filterBy) {
    dispatch(slice.actions.hasLoading(true));
    const url = `/api/years?populate=*&${filterBy}`;
    return async () => {
        try {
            const response = await axios.get(url);
            dispatch(slice.actions.getYearsSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postYear(title, desc, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand) {
    return async () => {
        try {
            const response = await axios.post('/api/years', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addYearSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم إضافة الإعلان ${response.data?.data?.attributes?.name} بنجاح`,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
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
                    close: false
                })
            );
        }
    };
}

export function updateYear(event) {
    return async () => {
        try {
            const response = await axios.post('/api/years', event);
            dispatch(slice.actions.updateYearSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function removeYear(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/years', { eventId });
            dispatch(slice.actions.removeCarModelSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
