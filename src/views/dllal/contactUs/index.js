import * as Yup from 'yup';
import { openSnackbar } from '../../../store/slices/snackbar';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import AnimateButton from '../../../ui-component/extended/AnimateButton';
import { Formik } from 'formik';
import { useTheme } from '@mui/material/styles';
import useScriptRef from '../../../hooks/useScriptRef';
import { useDispatch } from '../../../store';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ContactUs = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { forgotPassword } = useAuth();
    return (
        <Formik
            initialValues={{
                fName: '',
                email: '',
                subject: '',
                message: '',
                submit: null
            }}
            validationSchema={Yup.object().shape({
                fName: Yup.string().required('يجب كتابة إسمك الكامل'),
                email: Yup.string().email('تأكد من صحة البريد الإلكتروني').max(24).required('يجب كتابة البريد الإلكتروني'),
                subject: Yup.string().required('يجب كتابة عنوان الرسالة'),
                message: Yup.string().required('يجب كتابة محتوى الرسالة')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await forgotPassword(values.email);

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: 'تم الإرسال يرجى التحقق من بريدك الإلكتروني.',
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                },
                                close: true
                            })
                        );
                        setTimeout(() => {
                            navigate('/login', { replace: true });
                        }, 1500);
                    }
                } catch (err) {
                    console.error(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.fName && errors.fName)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-fName-contactUs">اسمك كاملا</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-fName-contactUs"
                            type="text"
                            value={values.fName}
                            name="fName"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="اسمك كاملا"
                            inputProps={{}}
                        />
                        {touched.fName && errors.fName && (
                            <FormHelperText error id="standard-weight-helper-text-fName-contactUs">
                                {errors.fName}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-email-contactUs">البريد الإلكتروني</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-contactUs"
                            type="email"
                            value={values.email}
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="البريد الإلكتروني"
                            inputProps={{}}
                        />
                        {touched.email && errors.email && (
                            <FormHelperText error id="standard-weight-helper-text-email-contactUs">
                                {errors.email}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <FormControl fullWidth error={Boolean(touched.subject && errors.subject)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-subject-contactUs">عنوان الرسالة</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-subject-contactUs"
                            type="text"
                            value={values.subject}
                            name="subject"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="عنوان الرسالة"
                            inputProps={{}}
                        />
                        {touched.subject && errors.subject && (
                            <FormHelperText error id="standard-weight-helper-text-subject-contactUs">
                                {errors.subject}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}
                    <FormControl fullWidth error={Boolean(touched.message && errors.message)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-message-contactUs">رسالتك</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-message-contactUs"
                            type="text"
                            multiline
                            rows={6}
                            value={values.message}
                            name="message"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="رسالتك"
                            inputProps={{}}
                        />
                        {touched.message && errors.message && (
                            <FormHelperText error id="standard-weight-helper-text-message-contactUs">
                                {errors.message}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                إرسال
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default ContactUs;
