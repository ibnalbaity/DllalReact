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
    cities: [],
    city: {}
};

const slice = createSlice({
    name: 'city',
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

        // GET cities
        getCitiesSuccess(state, action) {
            state.cities = action.payload;
        },

        // GET cities
        getCitySuccess(state, action) {
            state.city = action.payload;
        },

        // ADD Dllals
        addCitySuccess(state, action) {
            state.cities = action.payload;
        },

        // UPDATE cities
        updateCitySuccess(state, action) {
            state.cities = action.payload;
        },

        // REMOVE cities
        removeCitySuccess(state, action) {
            state.cities = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCities() {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/cities');
            dispatch(slice.actions.getCitiesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getCityByID(ID) {
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get(`/api/cities/${ID}`);
            dispatch(slice.actions.getCitySuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function filterCities(filterBy) {
    dispatch(slice.actions.hasLoading(true));
    const url = `/api/cities?populate=*&${filterBy}&pagination[pageSize]=50`;
    return async () => {
        try {
            const response = await axios.get(url);
            dispatch(slice.actions.getCitiesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postCity(title, desc, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand) {
    return async () => {
        try {
            const response = await axios.post('/api/cities', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addCitySuccess(response.data));
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

export function updateCity(event) {
    return async () => {
        try {
            const response = await axios.post('/api/cities', event);
            dispatch(slice.actions.updateCitySuccess(response.data.events));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function removeCity(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/cities', { eventId });
            dispatch(slice.actions.removeCitySuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
