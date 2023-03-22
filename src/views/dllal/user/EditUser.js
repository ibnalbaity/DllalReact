import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import SubCard from '../../../ui-component/cards/SubCard';
import avatar from '../../../assets/images/DllalLogoDark.svg';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import * as Yup from 'yup';
import useAuth from '../../../hooks/useAuth';
import { useDispatch } from '../../../store';
import { Form, FormikProvider, useFormik } from 'formik';
import { openSnackbar } from '../../../store/slices/snackbar';
import { updateUser } from '../../../store/slices/user';
import { useNavigate } from 'react-router-dom';
import TextForm from '../addDllal/TextForm';

const validationSchema = Yup.object({
    username: Yup.string().required('يرجى كتابة إسم المستخدم كاملا.'),
    email: Yup.string().email('الإيميل غير صحيح').max(255).required('يرجى كتابة الإيميل.')
});

const EditUser = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user: userInfo, isLoggedIn, checkLoggedIn } = useAuth();
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
    }, [isLoggedIn]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: user?.username,
            email: user?.email,
            userID: user?.id
        },
        validationSchema,
        onSubmit: async (values) => {
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'جاري تحديث الإعلان..',
                    variant: 'alert',
                    alert: {
                        color: 'info'
                    },
                    close: false
                })
            );
            await dispatch(updateUser(values.userID, values.username, values.email));
        }
    });

    const { values, errors, handleSubmit, handleChange, touched } = formik;

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <SubCard title="الصورة" contentSX={{ textAlign: 'center' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Avatar
                                variant="rounded"
                                alt={user?.username}
                                src={avatar}
                                sx={{ width: 140, height: 140, margin: '0 auto' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" align="center">
                                صورة الملف الشخصي
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={12}>
                                <AnimateButton>
                                    <Button variant="contained" size="small">
                                        رفع
                                    </Button>
                                </AnimateButton>
                            </Grid> */}
                    </Grid>
                </SubCard>
            </Grid>
            <Grid item sm={6} md={8}>
                <SubCard title="معلومات الحساب">
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6}>
                                    <TextForm
                                        id="username"
                                        type="text"
                                        label="الاسم"
                                        handleChange={handleChange}
                                        value={values.username}
                                        touched={touched.username}
                                        errors={errors.username}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextForm
                                        id="email"
                                        type="text"
                                        label="البريد الإلكتروني"
                                        disabled
                                        handleChange={handleChange}
                                        value={values.email}
                                        touched={touched.email}
                                        errors={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                                        <Grid item xs={8} sm={4}>
                                            <AnimateButton>
                                                <Button type="submit" size="large" fullWidth variant="contained">
                                                    تحديث
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>
                    </FormikProvider>
                </SubCard>
            </Grid>
        </>
    );
};

EditUser.propTypes = {
    user: PropTypes.object
};

export default memo(EditUser);
