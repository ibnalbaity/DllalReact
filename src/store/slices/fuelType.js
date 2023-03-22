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
    fuelTypes: []
};

const slice = createSlice({
    name: 'fuelType',
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

        // GET FuelType
        getFuelTypesSuccess(state, action) {
            state.fuelTypes = action.payload;
        },

        // ADD FuelType
        addFuelTypeSuccess(state, action) {
            state.fuelTypes = action.payload;
        },

        // UPDATE FuelType
        updateFuelTypeSuccess(state, action) {
            state.fuelTypes = action.payload;
        },

        // REMOVE FuelType
        removeFuelTypeSuccess(state, action) {
            state.fuelTypes = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getFuelTypes() {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/fuel-types');
            dispatch(slice.actions.getFuelTypesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterFuelTypes(filterBy) {
    dispatch(slice.actions.hasLoading(true));
    const url = `/api/fuel-types?populate=*&${filterBy}`;
    return async () => {
        try {
            const response = await axios.get(url);
            dispatch(slice.actions.getFuelTypesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postFuelType(title, desc, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand) {
    return async () => {
        try {
            const response = await axios.post('/api/fuel-types', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addFuelTypeSuccess(response.data));
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

export function updateFuelType(event) {
    return async () => {
        try {
            const response = await axios.post('/api/fuel-types', event);
            dispatch(slice.actions.updateFuelTypeSuccess(response.data.events));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function removeFuelType(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/fuel-types', { eventId });
            dispatch(slice.actions.removeFuelTypeSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
