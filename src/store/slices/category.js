// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    loading: true,
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

        // HAS ERROR
        hasLoading(state, action) {
            state.loading = action.payload;
        },

        // GET Categories
        getCategoriesSuccess(state, action) {
            state.categories = action.payload;
        },

        // ADD Categories
        addCategorySuccess(state, action) {
            state.categories = action.payload;
        },

        // UPDATE Categories
        updateCategorySuccess(state, action) {
            state.categories = action.payload;
        },

        // REMOVE Categories
        removeCategorySuccess(state, action) {
            state.categories = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCategories() {
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

export function addEvent(event) {
    return async () => {
        try {
            const response = await axios.post('/api/categories', event);
            dispatch(slice.actions.addCategorySuccess(response.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
        }
    };
}

export function updateEvent(event) {
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

export function removeEvent(eventId) {
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
