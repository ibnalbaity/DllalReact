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
    dllal: {}
};

const slice = createSlice({
    name: 'dllalDetails',
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

        // GET Dllal
        getDllalSuccess(state, action) {
            state.dllal = action.payload;
        },

        // UPDATE Dllals
        updateDllalSuccess(state, action) {
            state.dllal = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDllalDetails(id) {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.hasLoading(true));
    return async () => {
        try {
            const response = await axios.get(`/api/dllals/${id}?populate=*`);
            dispatch(slice.actions.getDllalSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function updateDllal(
    dllalID,
    title,
    treatyApproval,
    desc,
    images,
    user,
    gvernorate,
    city,
    category,
    year,
    subCategory,
    carModel,
    vehicleBrand,
    contactMethod,
    counter,
    price,
    double,
    fuelType,
    gearType,
    adType
) {
    return async () => {
        dispatch(slice.actions.hasLoading(true));
        try {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'جاري تحديث الإعلان..',
                    variant: 'alert',
                    alert: {
                        color: 'info'
                    },
                    close: true
                })
            );
            // todo: التحقق من القسم قبل تحديث الإعلان
            await axios
                .put(`/api/dllals/${dllalID}`, {
                    data: {
                        title,
                        treatyApproval,
                        desc,
                        images,
                        user,
                        city,
                        category,
                        year: category === 1 ? year : null,
                        subCategory: category === 1 ? subCategory : null,
                        carModel: category === 1 ? carModel : null,
                        vehicleBrand: category === 1 ? vehicleBrand : null,
                        contactMethod,
                        counter: category === 1 ? counter : null,
                        price,
                        double: category === 1 ? double : null,
                        fuelType: category === 1 ? fuelType : null,
                        gearType: category === 1 ? gearType : null,
                        adType: category === 1 ? adType : null,
                        gvernorate
                    }
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        dispatch(slice.actions.updateDllalSuccess(response.data));
                        dispatch(slice.actions.hasLoading(false));
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: `تم تحديث الإعلان ${response.data?.data?.attributes?.title} بنجاح`,
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: true
                            })
                        );
                    } else {
                        dispatch(slice.actions.hasError('ﻻ توجد استجابة من الموقع.'));
                        dispatch(slice.actions.hasLoading(false));
                    }
                })
                .catch((error) => {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'خطأ لم يتم تحديث الإعلان ﻻ توجد إستجابة من الموقع.',
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            close: true
                        })
                    );
                    dispatch(slice.actions.hasError(error));
                    dispatch(slice.actions.hasLoading(false));
                });
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoading(false));
            console.log(error);
            dispatch(
                openSnackbar({
                    open: true,
                    error,
                    message: `خطأ: لم يتم تحديث الإعلان`,
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
