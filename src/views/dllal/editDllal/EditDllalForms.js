import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Divider, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Form, FormikProvider, useFormik } from 'formik';
import { useDispatch } from '../../../store';
import { getDllalDetails, updateDllal } from '../../../store/slices/dllalDetails';
import { getCategories } from '../../../store/slices/category';
import { filterCities } from '../../../store/slices/city';
import { gridSpacing } from '../../../store/constant';
import { getGvernorates } from '../../../store/slices/gvernorate';
import { getVehicleBrands } from '../../../store/slices/vehicleBrand';
import { getYears } from '../../../store/slices/year';
import { filterCarModels } from '../../../store/slices/carModel';
import { getAdTypes } from '../../../store/slices/adType';
import { getDoubles } from '../../../store/slices/double';
import { getFuelTypes } from '../../../store/slices/fuelType';
import useAuth from '../../../hooks/useAuth';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { getGearTypes } from '../../../store/slices/gearType';
import SendIcon from '@mui/icons-material/Send';
import HandleError from '../../../utils/HandleError';
import TextForm from '../addDllal/TextForm';
import AutoCompleteForm from '../addDllal/AutoCompleteForm';
import UploadImage from '../addDllal/UploadImage';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../ui-component/Loader';
import ButtonCancel from '../../component/ButtonCancel';
import ConfirmationDialogRaw from '../deleteDllal/ConfirmationDialog';
import axios from '../../../utils/axios';

const validationSchema = yup.object({
    title: yup.string(),
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
    counter: yup.number().min(0, 'يجب أن يكون عداد المشي أعلى من 0.'),
    price: yup.number().min(1, 'يجب أن يكون السعر أعلى من 1.'),
    carModel: yup.string(),
    adType: yup.string(),
    double: yup.string(),
    fuelType: yup.string(),
    gearType: yup.string()
});

const EditDllalForms = ({ id }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoggedIn, checkLoggedIn } = useAuth();
    // const [imagesIDs, setImagesIDs] = useState([]);
    useEffect(() => {
        const handleIsLogIn = async () => {
            try {
                await checkLoggedIn();
            } catch (err) {
                console.error(err);
            }
        };
        handleIsLogIn();
        if (isLoggedIn) {
            dispatch(getDllalDetails(id));
        } else {
            handleIsLogIn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isLoggedIn]);

    const { loading: loadingDllal, dllal, error: errorDllal } = useSelector((state) => state.dllalDetails);

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

    const [oldImages, setOldImages] = useState([]);
    useEffect(() => {
        if (!loadingDllal) {
            setOldImages(dllal.attributes?.images?.data);
        }
    }, [dllal.attributes?.images?.data, loadingDllal]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: dllal.attributes?.title,
            desc: dllal.attributes?.desc,
            images: [],
            user: user?.id,
            gvernorate: dllal.attributes?.gvernorate?.data?.id || '',
            city: dllal.attributes?.city?.data?.id || '',
            category: dllal.attributes?.category?.data?.id || '',
            subCategory: '',
            treatyApproval: dllal.attributes?.treatyApproval,
            year: dllal.attributes?.year?.data?.id || '',
            vehicleBrand: dllal.attributes?.vehicleBrand?.data?.id || '',
            contactMethod: dllal.attributes?.contactMethod,
            counter: dllal.attributes?.counter || '',
            price: dllal.attributes?.price,
            carModel: dllal.attributes?.carModel?.data?.id || '',
            adType: dllal.attributes?.adType?.data?.id || '',
            fuelType: dllal.attributes?.fuelType?.data?.id || '',
            double: dllal.attributes?.double?.data?.id || '',
            gearType: dllal.attributes?.gearType?.data?.id || ''
        },
        validationSchema,
        onSubmit: async (values) => {
            let imagesIDs = [];
            let oldImagesIDs = [];
            try {
                // في حالو وجود صور عند تحديث الإعلان
                if (dllal.attributes?.images?.data && dllal.attributes?.images?.data.length > 0) {
                    // في حال لم يتم إضافة صور جديدة عند تحديث الإعلان.
                    if (values.images && values.images[0].id && values.images.length > 0) {
                        const imagesIDs = await values.images.map((id) => id.id);
                        oldImagesIDs = [...imagesIDs];
                    } else {
                        const imagesIDs = oldImages.map((id) => id.id);
                        oldImagesIDs = [...imagesIDs];
                    }
                }

                if (!values.images[0].id) {
                    const UPLOAD_URL = '/api/upload';
                    const formData = new FormData();
                    for (let i = 0; i < values.images.length; i += 1) {
                        formData.append('files', values.images[i]);
                    }
                    const uploadRes = await axios.post(UPLOAD_URL, formData);
                    const imagesID = await uploadRes.data.map((id) => id.id);
                    imagesIDs = [...oldImagesIDs, ...imagesID];
                } else {
                    imagesIDs = [...oldImagesIDs];
                }
            } catch (error) {
                console.log(error);
            }

            await dispatch(
                updateDllal(
                    id,
                    values.title,
                    values.treatyApproval,
                    values.desc,
                    imagesIDs,
                    values.user,
                    values.gvernorate,
                    values.city,
                    values.category,
                    values.year || null,
                    values.subCategory || null,
                    values.carModel || null,
                    values.vehicleBrand || null,
                    values.contactMethod || null,
                    values.counter || null,
                    values.price || null,
                    values.double || null,
                    values.fuelType || null,
                    values.gearType || null,
                    values.adType || null
                )
            );
            navigate(`/dllal/${id}`, { replace: true });
        }
    });

    const { values, errors, handleSubmit, handleChange, touched, setFieldValue } = formik;

    const [open, setOpen] = useState(false);
    const CancelAdd = () => {
        setOpen(true);
    };
    const handleClickOk = () => {
        navigate(`/dllal/${id}`, { replace: true });
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
                            {!loadingDllal ? (
                                <>
                                    <Grid item xs={12} sm={12}>
                                        <UploadImage
                                            id="images"
                                            setFieldValue={setFieldValue}
                                            value={values.images}
                                            touched={touched.images}
                                            errors={errors.images}
                                            setOldImages={setOldImages}
                                            oldImages={oldImages}
                                        />
                                    </Grid>
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
                                            defaultValue={dllal.attributes?.category.data || null}
                                        />
                                    </Grid>
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
                                            defaultValue={dllal.attributes?.gvernorate?.data || null}
                                        />
                                    </Grid>
                                    {values.gvernorate && (
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
                                                defaultValue={dllal.attributes?.city?.data || null}
                                            />
                                        </Grid>
                                    )}
                                    {values.category === 1 && (
                                        <Grid item xs={12} sm={6}>
                                            <AutoCompleteForm
                                                id="adType"
                                                label="حالة المركبة"
                                                getData={getAdTypes}
                                                data={adTypes}
                                                loading={loadingAdType}
                                                setFieldValue={setFieldValue}
                                                touched={touched.adType}
                                                errors={errors.adType}
                                                defaultValue={dllal.attributes?.adType?.data}
                                            />
                                        </Grid>
                                    )}
                                    {values.category === 1 && (
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
                                                defaultValue={dllal.attributes?.year?.data}
                                            />
                                        </Grid>
                                    )}
                                    {values.category === 1 && (
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
                                                defaultValue={dllal.attributes?.vehicleBrand?.data}
                                            />
                                        </Grid>
                                    )}
                                    {values.category === 1 && values.vehicleBrand && (
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
                                                defaultValue={dllal.attributes?.carModel?.data}
                                            />
                                        </Grid>
                                    )}
                                    {values.category === 1 && (
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
                                                defaultValue={dllal.attributes?.double?.data}
                                            />
                                        </Grid>
                                    )}
                                    {values.category === 1 && (
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
                                                defaultValue={dllal.attributes?.gearType?.data}
                                            />
                                        </Grid>
                                    )}
                                    {values.category === 1 && (
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
                                    {values.category === 1 && (
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
                                                defaultValue={dllal.attributes?.fuelType?.data}
                                            />
                                        </Grid>
                                    )}
                                    <Grid item xs={12} sm={6}>
                                        <TextForm
                                            id="price"
                                            type="number"
                                            label="السعر"
                                            handleChange={handleChange}
                                            value={values.price}
                                            touched={touched.price}
                                            errors={errors.price}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextForm
                                            id="contactMethod"
                                            type="text"
                                            label="وسيلة الإتصال"
                                            handleChange={handleChange}
                                            value={values.contactMethod}
                                            touched={touched.contactMethod}
                                            errors={errors.contactMethod}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextForm
                                            id="desc"
                                            label="الوصف"
                                            multiline
                                            handleChange={handleChange}
                                            value={values.desc}
                                            touched={touched.desc}
                                            errors={errors.desc}
                                        />
                                    </Grid>
                                </>
                            ) : (
                                <Grid item xs={12}>
                                    <Loader />
                                    <Typography>جاري التحميل</Typography>
                                </Grid>
                            )}
                            {errorDllal && (
                                <Grid item xs={12}>
                                    <Divider />
                                    <HandleError errorData={errorDllal} />
                                </Grid>
                            )}
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
                                                loading={loadingDllal}
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
                                                تحديث الإعلان
                                            </LoadingButton>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <AnimateButton>
                                            <ButtonCancel ButtonText="الغاء التحديث" Cancel={CancelAdd} disabled={loadingDllal} />
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Grid>
            <ConfirmationDialogRaw
                title="تأكيد إلغاء التحديث"
                content="هل تريد بالتأكيد إلغاء تحديث هذا الإعلان والعودة إليه؟"
                cancel="إلغاء"
                ok="العودة إلى الإعلان"
                _onOk={handleClickOk}
                _onCancel={handleClose}
                open={open}
                keepMounted
            />
        </Grid>
    );
};

EditDllalForms.propTypes = {
    id: PropTypes.string
};

export default memo(EditDllalForms);
