import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Divider, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch } from '../../../store';
import { postDllal } from '../../../store/slices/dllal';
import { getCategories } from '../../../store/slices/category';
import { filterCities } from '../../../store/slices/city';
import { gridSpacing } from '../../../store/constant';
import AutoCompleteForm from './AutoCompleteForm';
import { getGvernorates } from '../../../store/slices/gvernorate';
import { getVehicleBrands } from '../../../store/slices/vehicleBrand';
import { getYears } from '../../../store/slices/year';
import TextForm from './TextForm';
import Treaty from './Treaty';
import { filterCarModels } from '../../../store/slices/carModel';
import { getAdTypes } from '../../../store/slices/adType';
import { getDoubles } from '../../../store/slices/double';
import { getFuelTypes } from '../../../store/slices/fuelType';
import useAuth from '../../../hooks/useAuth';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { getGearTypes } from '../../../store/slices/gearType';
import UploadImage from './UploadImage';
import SendIcon from '@mui/icons-material/Send';
import HandleError from '../../../utils/HandleError';
import { openSnackbar } from '../../../store/slices/snackbar';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialogRaw from '../deleteDllal/ConfirmationDialog';
import ButtonCancel from '../../component/ButtonCancel';

const validationSchema = yup.object({
    title: yup.string().required('يرجى كتابة عنوان الإعلان'),
    desc: yup.string().required('يرجى كتابة وصف الإعلان'),
    images: yup.array().min(1, 'يرجى إرفاق صورة الإعلان'),
    gvernorate: yup.string().required('يرجى اختيار المحافظة'),
    city: yup.string().required('يرجى اختيار المدينة'),
    category: yup.string().required('يرجى اختيار القسم.'),
    treatyApproval: yup.bool().required('يرجى الموافقة على المعاهدة'),
    subCategory: yup.string(),
    year: yup.string(),
    vehicleBrand: yup.string(),
    contactMethod: yup.string(),
    counter: yup.number(),
    price: yup.number(),
    carModel: yup.string(),
    adType: yup.string(),
    double: yup.string(),
    fuelType: yup.string(),
    gearType: yup.string()
});

const AddDllalForms = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, checkLoggedIn } = useAuth();

    useEffect(() => {
        const handleIsLogIn = async () => {
            try {
                await checkLoggedIn();
            } catch (err) {
                console.error(err);
            }
        };
        handleIsLogIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { loading: loadingDllal, loadingAction, dllal, error: errorDllal } = useSelector((state) => state.dllal);
    const { loading: loadingCate, categories, error: errorCate } = useSelector((state) => state.category);
    const { loading: loadingGove, gvernorates, error: errorGove } = useSelector((state) => state.gvernorate);
    const { loading: loadingCity, cities, error: errorCity } = useSelector((state) => state.city);
    const { loading: loadingVehicleBrand, vehicleBrands, error: errorVehicleBrand } = useSelector((state) => state.vehicleBrand);
    const { loading: loadingCarModel, carModels, error: errorCarModels } = useSelector((state) => state.carModel);
    const { loading: loadingYear, years, error: errorYear } = useSelector((state) => state.year);
    const { loading: loadingAdType, adTypes, error: errorAdType } = useSelector((state) => state.adType);
    const { loading: loadingDouble, doubles, error: errorDouble } = useSelector((state) => state.double);
    const { loading: loadingFuelType, fuelTypes, error: errorFuelType } = useSelector((state) => state.fuelType);
    const { loading: loadingGearType, gearTypes, error: errorGearType } = useSelector((state) => state.gearType);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            treatyApproval: false,
            images: [],
            title: '',
            category: '',
            gvernorate: '',
            city: '',
            adType: '',
            vehicleBrand: '',
            carModel: '',
            year: '',
            double: '',
            fuelType: '',
            gearType: '',
            counter: '',
            contactMethod: '',
            price: '',
            desc: '',
            user: user?.id,
            subCategory: ''
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'جاري إضافة الإعلان...',
                    variant: 'alert',
                    alert: {
                        color: 'info'
                    },
                    close: true
                })
            );
            await dispatch(
                postDllal(
                    values.title,
                    values.desc,
                    values.images,
                    values.user,
                    values.city,
                    values.category,
                    values.subCategory || null,
                    values.treatyApproval,
                    values.carModel || null,
                    values.year || null,
                    values.vehicleBrand || null,
                    values.contactMethod || null,
                    values.counter || null,
                    values.price || null,
                    values.double || null,
                    values.fuelType || null,
                    values.gearType || null,
                    values.adType || null,
                    values.gvernorate
                )
            );
            resetForm();
        }
    });

    const { values, errors, handleSubmit, handleChange, touched, setFieldValue } = formik;

    useEffect(() => {
        if (!values.treatyApproval || !values.category) {
            values.category = '';
            values.gvernorate = '';
            values.city = '';
            values.adType = '';
            values.vehicleBrand = '';
            values.carModel = '';
            values.year = '';
            values.double = '';
            values.fuelType = '';
            values.gearType = '';
        } else if (!values.gvernorate) {
            values.city = '';
        } else if (!values.adType) {
            values.vehicleBrand = '';
        } else if (!values.vehicleBrand) {
            values.carModel = '';
        } else if (!values.carModel) {
            values.year = '';
        } else if (!values.year) {
            values.double = '';
        } else if (!values.double) {
            values.fuelType = '';
        } else if (!values.fuelType) {
            values.gearType = '';
        } else if (!values.gearType) {
            values.counter = '';
        } else if (!values.counter) {
            values.price = '';
        }
    }, [values]);

    useEffect(() => {
        if (!loadingAction && Object.keys(dllal).length > 0) {
            navigate(`/dllal/${dllal.id}`, { replace: true });
        }
    }, [dllal, loadingAction, navigate]);

    const [open, setOpen] = useState(false);
    const CancelAdd = () => {
        setOpen(true);
    };
    const handleClickCancel = () => {
        navigate('/');
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={gridSpacing} sx={{ my: 0 }}>
            <Grid item xs={12}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Treaty
                                    switchID="treatyApproval"
                                    switchLabel="الموافقة على المعاهدة"
                                    switchLabelPlacement="start"
                                    switchValue={values.treatyApproval}
                                    handleChange={handleChange}
                                    touched={touched.treatyApproval}
                                    errors={errors.treatyApproval}
                                />
                            </Grid>
                            {values.treatyApproval && (
                                <Grid item xs={12} sm={12}>
                                    <UploadImage
                                        id="images"
                                        setFieldValue={setFieldValue}
                                        value={values.images}
                                        touched={touched.images}
                                        errors={errors.images}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.images.length > 0 && (
                                <Grid item xs={12} sm={6}>
                                    <TextForm
                                        id="title"
                                        type="text"
                                        label="العنوان"
                                        handleChange={handleChange}
                                        value={values.title}
                                        touched={touched.title}
                                        errors={errors.title}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.title && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="category"
                                        label="القسم"
                                        getData={getCategories}
                                        data={categories}
                                        loading={loadingCate}
                                        touched={touched.category}
                                        errors={errors.category}
                                        setFieldValue={setFieldValue}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="gvernorate"
                                        label="المحافظة"
                                        getData={getGvernorates}
                                        data={gvernorates}
                                        loading={loadingGove}
                                        touched={touched.gvernorate}
                                        errors={errors.gvernorate}
                                        setFieldValue={setFieldValue}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.gvernorate && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="city"
                                        label="المدينة"
                                        getData={filterCities}
                                        data={cities}
                                        loading={loadingCity}
                                        setFieldValue={setFieldValue}
                                        touched={touched.city}
                                        errors={errors.city}
                                        filterBy={`filters[gvernorate][id][$eq]=${values.gvernorate}`}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.city && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="adType"
                                        label="حالة السلعة"
                                        getData={getAdTypes}
                                        data={adTypes}
                                        loading={loadingAdType}
                                        setFieldValue={setFieldValue}
                                        touched={touched.adType}
                                        errors={errors.adType}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category === 1 && values.adType && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="vehicleBrand"
                                        label="ماركة السيارة"
                                        getData={getVehicleBrands}
                                        data={vehicleBrands}
                                        loading={loadingVehicleBrand}
                                        setFieldValue={setFieldValue}
                                        touched={touched.vehicleBrand}
                                        errors={errors.vehicleBrand}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category === 1 && values.vehicleBrand && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="carModel"
                                        label="موديل السيارة"
                                        getData={filterCarModels}
                                        data={carModels}
                                        loading={loadingCarModel}
                                        setFieldValue={setFieldValue}
                                        touched={touched.carModel}
                                        errors={errors.carModel}
                                        filterBy={`filters[vehicleBrand][id][$eq]=${values.vehicleBrand}`}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category === 1 && values.carModel && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="year"
                                        label="سنة صنع السيارة"
                                        getData={getYears}
                                        data={years}
                                        loading={loadingYear}
                                        setFieldValue={setFieldValue}
                                        touched={touched.year}
                                        errors={errors.year}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category === 1 && values.year && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="double"
                                        label="هل يوجد دبل"
                                        getData={getDoubles}
                                        data={doubles}
                                        loading={loadingDouble}
                                        setFieldValue={setFieldValue}
                                        touched={touched.double}
                                        errors={errors.double}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category === 1 && values.double && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="fuelType"
                                        label="نوع الوقود"
                                        getData={getFuelTypes}
                                        data={fuelTypes}
                                        loading={loadingFuelType}
                                        setFieldValue={setFieldValue}
                                        touched={touched.fuelType}
                                        errors={errors.fuelType}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category === 1 && values.fuelType && (
                                <Grid item xs={12} sm={6}>
                                    <AutoCompleteForm
                                        id="gearType"
                                        label="نوع القير"
                                        getData={getGearTypes}
                                        data={gearTypes}
                                        loading={loadingGearType}
                                        setFieldValue={setFieldValue}
                                        touched={touched.gearType}
                                        errors={errors.gearType}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.category === 1 && values.gearType && (
                                <Grid item xs={12} sm={6}>
                                    <TextForm
                                        id="counter"
                                        type="number"
                                        label="عداد ممشى السيارة"
                                        handleChange={handleChange}
                                        value={values.counter}
                                        touched={touched.counter}
                                        errors={errors.counter}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.city && (
                                <Grid item xs={12} sm={6}>
                                    <TextForm
                                        id="contactMethod"
                                        type="text"
                                        label="وسيلة الإتصال"
                                        loading={loadingCate}
                                        handleChange={handleChange}
                                        value={values.contactMethod}
                                        touched={touched.contactMethod}
                                        errors={errors.contactMethod}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.contactMethod && (
                                <Grid item xs={12} sm={6}>
                                    <TextForm
                                        id="price"
                                        type="number"
                                        label="السعر بالريال السعودي"
                                        handleChange={handleChange}
                                        value={values.price}
                                        touched={touched.price}
                                        errors={errors.price}
                                    />
                                </Grid>
                            )}
                            {values.treatyApproval && values.price && (
                                <Grid item xs={12}>
                                    <TextForm
                                        id="desc"
                                        label="الوصف"
                                        multiline
                                        loading={loadingCate}
                                        handleChange={handleChange}
                                        value={values.desc}
                                        touched={touched.desc}
                                        errors={errors.desc}
                                    />
                                </Grid>
                            )}
                            {errorDllal && (
                                <Grid item xs={12}>
                                    <Divider />
                                    <HandleError errorData={errorDllal} />
                                </Grid>
                            )}
                            {values.treatyApproval && values.title && (
                                <>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="center" spacing={1}>
                                            <Grid item xs={12} sm={6}>
                                                <AnimateButton>
                                                    <LoadingButton
                                                        type="submit"
                                                        fullWidth
                                                        size="large"
                                                        loading={loadingAction}
                                                        disabled={loadingAction}
                                                        loadingPosition="start"
                                                        variant="contained"
                                                        startIcon={<SendIcon />}
                                                        sx={{
                                                            boxShadow: theme.customShadows.primary,
                                                            ':hover': {
                                                                boxShadow: 'none'
                                                            }
                                                        }}
                                                    >
                                                        أضف الإعلان
                                                    </LoadingButton>
                                                </AnimateButton>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <AnimateButton>
                                                    <ButtonCancel ButtonText="إلغاء الإعلان" Cancel={CancelAdd} disabled={loadingAction} />
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Form>
                </FormikProvider>
            </Grid>
            <ConfirmationDialogRaw
                title="تأكيد إلغاء الإضافة"
                content="هل تريد بالتأكيد عدم إضافة هذا الإعلان والعودة للصفحة الرئيسية؟"
                cancel="إلغاء"
                ok="الصفحة الرئيسية"
                _onOk={handleClickCancel}
                _onCancel={handleClose}
                open={open}
                keepMounted
            />
        </Grid>
    );
};

export default memo(AddDllalForms);
