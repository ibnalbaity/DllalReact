import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Alert, Grid, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';

const HandleError = ({ errorData }) => {
    const { logout } = useAuth();
    const [message, setMessage] = useState('');
    const [dllalError, setDllalError] = useState('');
    const [dllalErrors, setDllalErrors] = useState([]);

    useEffect(() => {
        if (typeof errorData === 'object' && errorData?.error?.message) {
            setMessage(errorData?.error?.message);
        }
    }, [errorData]);

    /* useEffect(() => {
        if (typeof errorData === 'string') {
            setMessage(errorData);
        }
    }, [errorData]); */

    useEffect(() => {
        if (errorData?.message?.length > 0) {
            errorData.message.forEach((item) => {
                item.messages.forEach((message) => {
                    setMessage(message.message);
                });
            });
        }
    }, [errorData?.message]);

    useEffect(() => {
        let errors = [];
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
                    case 'treatyApproval must be a `boolean` type, but the final value was: `null`.':
                        errors.push(...['يجب الموافقة على المعاهدة.']);
                        break;
                    case 'title must be a `string` type, but the final value was: `null`.':
                        errors.push(...['يجب كتابة عنوان الإعلان.']);
                        break;
                    case 'desc must be a `string` type, but the final value was: `null`.':
                        errors.push(...['يجب كتابة وصف الإعلان.']);
                        break;
                    case 'contactMethod must be a `string` type, but the final value was: `null`.':
                        errors.push(...['يجب إضافة وسيلة الإتصال.']);
                        break;
                    case 'Files are empty':
                        errors.push(...['يجب إضافة صور الإعلان.']);
                        break;
                    default:
                        errors.push(...[item.message]);
                        errors = [message, ...errors];
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
                case 'Incorrect code provide':
                    setDllalError('لم تنجح عملية التحقق، ربما إنتهت صلاحية الرابط.');
                    break;
                case 'Forbidden':
                    setDllalError('إجراء غير مسموح به.. يرجى تحديث الصفحة والمحاولة مرة أخرى.');
                    break;
                case 'treatyApproval must be a `boolean` type, but the final value was: `null`.':
                    setDllalError('يجب الموافقة على المعاهدة.');
                    break;
                case 'Files are empty':
                    setDllalError('يجب إضافة صور الإعلان.');
                    break;
                case 'Missing or invalid credentials':
                    setDllalError('غير مسموح لك بتسجيل الدخول، حاول مرة أخرى');
                    if (window.localStorage.getItem('serviceToken') !== undefined && window.localStorage.getItem('serviceToken') !== null) {
                        logout();
                    }
                    break;
                default:
                    setDllalError(message);
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
        <Grid container>
            <Grid item xs={12} sx={{ mt: 3 }}>
                <Alert variant="outlined" severity="error">
                    {resultMessageError}
                    {resultMessageErrors}
                </Alert>
            </Grid>
        </Grid>
    );
};

HandleError.propTypes = {
    errorData: PropTypes.any
};

export default memo(HandleError);
