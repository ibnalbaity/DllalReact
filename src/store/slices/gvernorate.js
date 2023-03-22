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
    gvernorates: []
};

const slice = createSlice({
    name: 'gvernorate',
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

        // GET Gvernorate
        getGvernoratesSuccess(state, action) {
            state.gvernorates = action.payload;
        },

        // ADD Gvernorate
        addGvernorateSuccess(state, action) {
            state.gvernorates = action.payload;
        },

        // UPDATE Gvernorate
        updateGvernorateSuccess(state, action) {
            state.gvernorates = action.payload;
        },

        // REMOVE Gvernorate
        removeGvernorateSuccess(state, action) {
            state.gvernorates = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getGvernorates() {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/gvernorates');
            dispatch(slice.actions.getGvernoratesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postGvernorate(title, desc, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand) {
    return async () => {
        try {
            const response = await axios.post('/api/gvernorates', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addGvernorateSuccess(response.data));
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

export function updateGvernorate(event) {
    return async () => {
        try {
            const response = await axios.post('/api/gvernorates', event);
            dispatch(slice.actions.updateGvernorateSuccess(response.data.events));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function removeGvernorate(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/gvernorates', { eventId });
            dispatch(slice.actions.removeGvernorateSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
