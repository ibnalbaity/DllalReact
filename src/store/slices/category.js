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
    categories: []
};

const slice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        //
        hasLoading(state, action) {
            state.loading = action.payload;
        },

        // GET Categories
        getCategoriesSuccess(state, action) {
            state.categories = action.payload;
        },

        // ADD Category
        addCategorySuccess(state, action) {
            state.categories = action.payload;
        },

        // UPDATE Category
        updateCategorySuccess(state, action) {
            state.categories = action.payload;
        },

        // REMOVE Category
        removeCategorySuccess(state, action) {
            state.categories = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCategories() {
    dispatch(slice.actions.hasError(false));
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get('/api/categories');
            dispatch(slice.actions.getCategoriesSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postCategory(title, desc, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand) {
    return async () => {
        try {
            const response = await axios.post('/api/categories', {
                data: { title, images, user, city, categories, subCategory, treatyApproval, year, vehicleVrand }
            });
            dispatch(slice.actions.addCategorySuccess(response.data));
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

export function updateCategory(event) {
    return async () => {
        try {
            const response = await axios.post('/api/categories', event);
            dispatch(slice.actions.updateCategorySuccess(response.data.events));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function removeCategory(eventId) {
    return async () => {
        try {
            const response = await axios.post('/api/categories', { eventId });
            dispatch(slice.actions.removeCategorySuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}
