// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { openSnackbar } from './snackbar';
import moment from 'moment';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    loading: true,
    loadingAction: false,
    dllals: [],
    dllal: {},
    lastDllal: [],
    dllalPagination: {},
    searchKey: null,
    results: []
};

const slice = createSlice({
    name: 'dllal',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // HAS LOADING
        hasLoading(state, action) {
            state.loading = action.payload;
        },

        // HAS LADING ADD
        hasLoadingAction(state, action) {
            state.loadingAction = action.payload;
        },

        // ADD Dllals
        getDllalsSuccess(state, action) {
            state.dllals = action.payload;
        },

        // ADD Dllals By Category Name
        getDllalsByCatNameSuccess(state, action) {
            state.dllals = action.payload;
        },

        // ADD Dllal
        getAddDllalSuccess(state, action) {
            state.dllal = action.payload;
        },

        // ADD Last Dllal
        getLastDllalSuccess(state, action) {
            state.lastDllal = action.payload;
        },

        // ADD Dllals Search
        getResultsDllalSuccess(state, action) {
            state.results = action.payload;
        },

        // ADD Dllals
        setSearchKeySuccess(state, action) {
            state.searchKey = action.payload;
        },

        // ADD Pagination
        getDllalPaginationSuccess(state, action) {
            state.dllalPagination = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getDllals(pageNum = 1, pageItemsCount = 6) {
    const getLocalStored = localStorage.getItem('berry-config');
    const storedValue = JSON.parse(getLocalStored);

    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.getAddDllalSuccess({}));
    const URL = '/api/dllals?populate=*';
    const sortDesc = '&sort[updatedAt]=desc';
    const page = `&pagination[page]=${pageNum}`;
    const pageSize = `&pagination[pageSize]=${pageItemsCount}`;
    const filterByCity =
        storedValue && storedValue?.city ? `&filters[$and][0][city][name][$eq]=${storedValue?.city?.attributes?.name}` : '';
    const filterByCate =
        storedValue && storedValue?.category ? `&filters[$and][1][category][name][$eq]=${storedValue?.category?.attributes?.name}` : '';
    return async () => {
        try {
            const response = await axios.get(`${URL}${filterByCity}${filterByCate}${sortDesc}${page}${pageSize}`);
            dispatch(slice.actions.getDllalsSuccess(response.data.data));
            dispatch(slice.actions.getDllalPaginationSuccess(response.data.meta.pagination));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDllalByCatName(name, pageNum = 1, pageItemsCount = 6) {
    const getLocalStored = localStorage.getItem('berry-config');
    const storedValue = JSON.parse(getLocalStored);

    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.getAddDllalSuccess({}));
    const URL = '/api/dllals?populate=*';
    const sortDesc = '&sort[updatedAt]=desc';
    const page = `&pagination[page]=${pageNum}`;
    const pageSize = `&pagination[pageSize]=${pageItemsCount}`;
    const filterByCate = `&filters[$and][0][category][name][$eq]=${name}`;
    const filterByCity =
        storedValue && storedValue?.city ? `&filters[$and][1][city][name][$eq]=${storedValue?.city?.attributes?.name}` : '';
    return async () => {
        try {
            const response = await axios.get(`${URL}${filterByCate}${filterByCity}${sortDesc}${page}${pageSize}`);
            dispatch(slice.actions.getDllalsByCatNameSuccess(response.data.data));
            dispatch(slice.actions.getDllalPaginationSuccess(response.data.meta.pagination));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDllalByCityName(name, pageNum = 1, pageItemsCount = 6) {
    const getLocalStored = localStorage.getItem('berry-config');
    const storedValue = JSON.parse(getLocalStored);

    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.getAddDllalSuccess({}));
    const URL = '/api/dllals?populate=*';
    const sortDesc = '&sort[updatedAt]=desc';
    const page = `&pagination[page]=${pageNum}`;
    const pageSize = `&pagination[pageSize]=${pageItemsCount}`;
    const filterByCity = `&filters[$and][0][city][name][$eq]=${name}`;
    const filterByCate =
        storedValue && storedValue?.category ? `&filters[$and][1][category][name][$eq]=${storedValue?.category?.attributes?.name}` : '';
    return async () => {
        try {
            const response = await axios.get(`${URL}${filterByCity}${filterByCate}${sortDesc}${page}${pageSize}`);
            dispatch(slice.actions.getDllalsByCatNameSuccess(response.data.data));
            dispatch(slice.actions.getDllalPaginationSuccess(response.data.meta.pagination));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDllalByUserID(userID) {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.getAddDllalSuccess({}));
    const URL = '/api/dllals?populate=*';
    const sortDesc = '&sort[updatedAt]=desc';
    const filterByUserID = `&filters[user][id][$eq]=${userID}`;
    return async () => {
        try {
            const response = await axios.get(`${URL}${filterByUserID}${sortDesc}`);
            dispatch(slice.actions.getDllalsByCatNameSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDateForLastPost(userID) {
    dispatch(slice.actions.getAddDllalSuccess({}));
    dispatch(slice.actions.hasError(null));
    const momentDate = moment();
    momentDate.locale('en');
    const date = momentDate.subtract(3, 'days').format('YYYY-MM-DD');

    const URL = '/api/dllals';
    const filterByUserID = `?filters[user][id][$eq]=${userID}`;
    const filterByDateAt = `&filters[createdAt][$gte]=${date}`;
    const sortDesc = '&sort[createdAt]=desc';
    return async () => {
        try {
            const response = await axios.get(`${URL}${filterByUserID}${filterByDateAt}${sortDesc}`);
            dispatch(slice.actions.getLastDllalSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getDllalResults(searchWord) {
    dispatch(slice.actions.hasLoading(false));
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.getResultsDllalSuccess([]));
    dispatch(slice.actions.hasLoading(true));
    const URL = '/api/dllals?populate=*';
    const sortDesc = '&sort[updatedAt]=desc';
    const filterByTitle = searchWord ? `&filters[$or][0][title][$contains]=${searchWord}` : '';
    const filterByDesc = searchWord ? `&filters[$or][1][desc][$contains]=${searchWord}` : '';
    return async () => {
        try {
            const response = await axios.get(`${URL}${filterByTitle}${filterByDesc}${sortDesc}`);
            dispatch(slice.actions.getResultsDllalSuccess(response.data.data));
            dispatch(slice.actions.hasLoading(false));
        } catch (error) {
            dispatch(slice.actions.hasLoading(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function postDllal(
    title,
    desc,
    images,
    user,
    city,
    category,
    subCategory,
    treatyApproval,
    carModel,
    year,
    vehicleBrand,
    contactMethod,
    counter,
    price,
    double,
    fuelType,
    gearType,
    adType,
    gvernorate
) {
    return async () => {
        dispatch(slice.actions.hasError(null));
        dispatch(slice.actions.hasLoadingAction(true));
        dispatch(slice.actions.getAddDllalSuccess({}));
        const UPLOAD_URL = '/api/upload';
        try {
            const formData = new FormData();
            for (let i = 0; i < images.length; i += 1) {
                formData.append('files', images[i]);
            }

            const imagesID = [];
            const uploadRes = await axios.post(UPLOAD_URL, formData);

            uploadRes.data.forEach((id) => imagesID.push(id.id));

            const response = await axios.post('/api/dllals', {
                data: {
                    title,
                    desc,
                    images: imagesID,
                    user,
                    city,
                    category,
                    subCategory,
                    treatyApproval,
                    carModel, // todo: التحقق من القسم قبل إضافة الإعلان مثل التحديث
                    year,
                    vehicleBrand,
                    contactMethod,
                    counter,
                    price,
                    double,
                    fuelType,
                    gearType,
                    adType,
                    gvernorate
                }
            });
            dispatch(slice.actions.getAddDllalSuccess(response.data.data));
            dispatch(slice.actions.hasLoadingAction(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم إضافة الإعلان: ${response.data?.data?.attributes?.title} بنجاح`,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoadingAction(false));
            console.log(error);
            dispatch(
                openSnackbar({
                    open: true,
                    error,
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

export function removeDllal(dllalID, imagesIDs) {
    dispatch(slice.actions.hasLoadingAction(true));
    return async () => {
        try {
            await imagesIDs.map((item, index, array) => {
                axios
                    .delete(`/api/upload/files/${item}`)
                    .then(async (res) => {
                        console.log(res);
                        if (res.status === 200 && index === array.length - 1) {
                            const response = await axios.delete(`/api/dllals/${dllalID}`);
                            dispatch(slice.actions.getDllalsSuccess(response.data));
                            dispatch(slice.actions.hasLoadingAction(false));
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: `تم حذف الإعلان: ${response.data?.data?.attributes?.title} بنجاح`,
                                    variant: 'alert',
                                    alert: {
                                        color: 'error'
                                    },
                                    close: true
                                })
                            );
                        }
                    })
                    .catch((e) => {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: `خطأ لم نتمكن من حذف صور الإعلان ${e.error.message}`,
                                variant: 'alert',
                                alert: {
                                    color: 'error'
                                },
                                close: true
                            })
                        );
                    });
                return null;
            });
            /* const response = await axios.delete(`/api/dllals/${dllalID}`);
            dispatch(slice.actions.getDllalsSuccess(response.data));
            dispatch(slice.actions.hasLoadingAction(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم حذف الإعلان: ${response.data?.data?.attributes?.title} بنجاح`,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            ); */
        } catch (error) {
            console.log(error);
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoadingAction(false));
        }
    };
}

export function removeImage(imagesID) {
    dispatch(slice.actions.hasLoadingAction(true));
    return async () => {
        try {
            await axios.delete(`/api/upload/files/${imagesID}`);
            dispatch(slice.actions.hasLoadingAction(false));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `تم حذف الصورة بنجاح.`,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
        } catch (error) {
            dispatch(slice.actions.hasError(error));
            dispatch(slice.actions.hasLoadingAction(false));
        }
    };
}
