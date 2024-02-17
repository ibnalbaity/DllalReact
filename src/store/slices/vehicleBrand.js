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
    vehicleBrands: []
};

const slice = createSlice({
    name: 'vehicleBrand',
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

        // GET vehicle Brands
        getVehicleBrandsSuccess(state, action) {
            state.vehicleBrands = action.payload;
        },

        // ADD vehicleBrands
        addVehicleBrandsSuccess(state, action) {
            state.vehicleBrands = action.payload;
        },

        // UPDATE vehicleBrands
        updateVehicleBrandsSuccess(state, action) {
            state.vehicleBrands = action.payload;
        },

        // REMOVE vehicleBrands
        removeVehicleBrandsSuccess(state, action) {
            state.vehicleBrands = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getVehicleBrands() {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/vehicle-brands');
            dispatch(slice.actions.getVehicleBrandsSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterVehicleBrands(filterBy) {
    dispatch(slice.actions.hasLoading(true));
    const url = `/api/cities?populate=*&${filterBy}`;
    return async () => {
        try {
            const response = await axios.get(url);
            dispatch(slice.actions.getVehicleBrandsSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postVehicleBrands(title, desc, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand) {
    return async () => {
        try {
            const response = await axios.post('/api/vehicle-brands', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addVehicleBrandsSuccess(response.data));
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

export function updateVehicleBrands(event) {
    return async () => {
        try {
            const response = await axios.post('/api/vehicle-brands', event);
            dispatch(slice.actions.updateVehicleBrandsSuccess(response.data.events));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function removeVehicleBrands(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/vehicle-brands', { eventId });
            dispatch(slice.actions.removeVehicleBrandsSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
