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
    uploadedIDs: []
};

const slice = createSlice({
    name: 'upload',
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
        getDllalUploadedIDsSuccess(state, action) {
            state.uploadedIDs = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function uploadImages(images) {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.hasLoading(true));
    const UPLOAD_URL = '/api/upload';

    return async () => {
        try {
            const formData = new FormData();
            for (let i = 0; i < images.length; i += 1) {
                formData.append('files', images[i]);
            }
            const uploadRes = await axios.post(UPLOAD_URL, formData);
            const imagesID = await uploadRes.data.map((id) => id.id);
            dispatch(slice.actions.getDllalUploadedIDsSuccess([...imagesID]));
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
    oldImages,
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
        const UPLOAD_URL = '/api/upload';
        let imagesIDs = [...oldImages];
        try {
            if (!images[0].id) {
                const formData = new FormData();
                for (let i = 0; i < images.length; i += 1) {
                    formData.append('files', images[i]);
                }
                const uploadRes = await axios.post(UPLOAD_URL, formData);
                const imagesID = await uploadRes.data.map((id) => id.id);
                imagesIDs = [...imagesID];
            }

            // todo: التحقق من القسم قبل تحديث الإعلان
            const response = await axios.put(`/api/dllals/${dllalID}`, {
                data: {
                    title,
                    treatyApproval,
                    desc,
                    images: imagesIDs,
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
            });
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
                    error,
                    message: `خطأ: لم يتم تحديث الإعلان`,
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
