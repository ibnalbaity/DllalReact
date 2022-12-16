import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Alert, FormHelperText, Grid, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

const DllalHandleError = ({ errorData, textError }) => {
    const { logout } = useAuth();
    const [englishMessage, setEnglishMessage] = useState('');
    const [message, setMessage] = useState('');
    const [dllalErrors, setDllalErrors] = useState([]);
    const [dllalError, setDllalError] = useState('');

    console.log(typeof textError);
    useEffect(() => {
        if (typeof errorData === 'object' && errorData?.error?.message) {
            setMessage(errorData?.error?.message);
        }
    }, [errorData]);

    useEffect(() => {
        if (typeof errorData === 'string') {
            setMessage(errorData);
        }
    }, [errorData]);

    useEffect(() => {
        if (typeof textError.submit === 'string') {
            setEnglishMessage(textError.submit);
        }
    }, [textError]);

    useEffect(() => {
        if (errorData?.message?.length > 0) {
            errorData.message.forEach((item) => {
                console.log(item);
                item.messages.forEach((message) => {
                    setMessage(message.message);
                });
            });
        }
    }, [errorData?.message]);

    useEffect(() => {
        const errors = [];
        if (errorData?.error?.details?.errors?.length > 0) {
            errorData?.error?.details?.errors.forEach((item) => {
                switch (item.message) {
                    case 'email must be a valid email':
                        errors.push(...['يرجى كتابة البريد الالكتروني بشكل صحيح.']);
                        break;
                    case 'username is a required field':
                        errors.push(...['يرجى التأكد من كتابة الاسم بشكل صحيح.']);
                        break;
                    case 'password is a required field':
                        errors.push(...['يرجى التأكد من كتابة كلمة المرور بشكل صحيح.']);
                        break;
                    default:
                        setDllalError('');
                }
            });
            setDllalErrors(errors);
        } else {
            switch (message) {
                case 'Invalid identifier or password':
                    setDllalError('خطأ في اسم المستخدم أو كلمة المرور');
                    break;
                case 'Too many attempts, please try again in a minute.':
                    setDllalError('يبدوا أنك ترسل الكثير من الطلبات، يرجى الانتظار قليلا.');
                    break;
                case 'Method Not Allowed':
                    setDllalError('قيمة غير موجودة، يرجى التواصل مع إدارة الموقع.');
                    break;
                case 'Wrong Services':
                    setDllalError('خطأ في الاتصال بالسيرفر...');
                    break;
                case 'Email or Username are already taken':
                    setDllalError('تم التسجيل مسبقا بهذا الإيميل أو بالاسم.');
                    break;
                case 'Forbidden':
                    setDllalError('إجراء غير مسموح به.. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
                    break;
                case 'Missing or invalid credentials':
                    setDllalError('غير مسموح لك بتسجيل الدخول، حاول مرة أخرى');
                    if (window.localStorage.getItem('serviceToken') !== undefined && window.localStorage.getItem('serviceToken') !== null) {
                        logout();
                    }
                    break;
                default:
                    setDllalError('');
            }
        }
    }, [errorData?.error?.details, logout, message]);

    let resultMessageError;
    let resultMessageErrors;
    if (dllalError) {
        resultMessageError = (
            <Grid item>
                <Typography color="error">{dllalError}</Typography>
            </Grid>
        );
    }
    if (dllalErrors && dllalErrors.length > 0) {
        resultMessageErrors = dllalErrors.map((error, index) => (
            <Grid key={index} item>
                <Typography color="error">{error}</Typography>
            </Grid>
        ));
    }

    return (
        textError.submit && (
            <Grid container>
                <Grid item xs={12} sx={{ mt: 3 }}>
                    <Alert variant="outlined" severity="error">
                        <FormHelperText error>{englishMessage}</FormHelperText>
                        {resultMessageError}
                        {resultMessageErrors}
                    </Alert>
                </Grid>
            </Grid>
        )
    );
};

DllalHandleError.propTypes = {
    errorData: PropTypes.any,
    textError: PropTypes.any
};

export default memo(DllalHandleError);
