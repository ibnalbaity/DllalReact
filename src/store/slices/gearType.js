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
    gearTypes: []
};

const slice = createSlice({
    name: 'gearType',
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
        getGearTypesSuccess(state, action) {
            state.gearTypes = action.payload;
        },

        // ADD GearType
        addGearTypeSuccess(state, action) {
            state.gearTypes = action.payload;
        },

        // UPDATE GearType
        updateGearTypeSuccess(state, action) {
            state.gearTypes = action.payload;
        },

        // REMOVE GearType
        removeGearTypeSuccess(state, action) {
            state.gearTypes = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getGearTypes() {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/gear-types');
            dispatch(slice.actions.getGearTypesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterGearTypes(filterBy) {
    dispatch(slice.actions.hasLoading(true));
    const url = `/api/gear-types?populate=*&${filterBy}`;
    return async () => {
        try {
            const response = await axios.get(url);
            dispatch(slice.actions.getGearTypesSuccess(response.data.data));
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
            const response = await axios.post('/api/gear-types', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addGearTypeSuccess(response.data));
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
            const response = await axios.post('/api/gear-types', event);
            dispatch(slice.actions.updateGearTypeSuccess(response.data.events));
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
            const response = await axios.post('/api/gear-types', { eventId });
            dispatch(slice.actions.removeGearTypeSuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
