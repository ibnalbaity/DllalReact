// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { strengthColor, strengthIndicatorNumFunc } from '../../../../utils/password-strength';
import DllalHandleError from '../../../../utils/DllalHandleError';

// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const AuthResetPassword = ({ code }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const { resetPassword } = useAuth();

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = React.useState(false);
    const [error, setError] = useState(null);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('');
    }, []);

    return (
        <Formik
            initialValues={{
                password: '',
                passwordConfirmation: ''
            }}
            validationSchema={Yup.object().shape({
                password: Yup.string().required('يجب كتابة كلمة المرور'),
                passwordConfirmation: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'كلمة المرور غير مطابقة.')
                    .required('يجب تأكيد كلمة المرور')
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    await resetPassword(code, values.password, values.passwordConfirmation);

                    if (scriptedRef.current) {
                        setStatus({ success: true });
                        setSubmitting(false);
                        setTimeout(() => {
                            navigate('/login', { replace: true });
                        }, 3500);
                    }
                } catch (err) {
                    setError(err);
                    if (scriptedRef.current) {
                        setStatus({ success: false });
                        setErrors({ submit: err?.error?.message || err });
                        setSubmitting(false);
                    }
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-password">كلمة المرور الجديدة</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            name="password"
                            onBlur={handleBlur}
                            label="كلمة المرور الجديدة"
                            onChange={(e) => {
                                handleChange(e);
                                changePassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />
                        {touched.password && errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password">
                                {errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {strength !== 0 && (
                        <FormControl fullWidth>
                            <Box sx={{ mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                            {level?.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormControl>
                    )}

                    <FormControl
                        fullWidth
                        error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-passwordConfirmation">تأكيد كلمة المرور الجديدة</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-passwordConfirmation"
                            type={showPassword ? 'text' : 'password'}
                            value={values.passwordConfirmation}
                            name="passwordConfirmation"
                            onBlur={handleBlur}
                            label="تأكيد كلمة المرور الجديدة"
                            onChange={(e) => {
                                handleChange(e);
                                changePassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />

                        {touched.passwordConfirmation && errors.passwordConfirmation && (
                            <FormHelperText error id="standard-weight-helper-text-passwordConfirmation">
                                {errors.passwordConfirmation}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && <DllalHandleError errorData={error} textError={errors} />}

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
                                تغيير كلمة المرور
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

AuthResetPassword.propTypes = {
    code: PropTypes.string.isRequired
};

export default AuthResetPassword;
