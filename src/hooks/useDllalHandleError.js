import { useState, useEffect } from 'react';

// ==============================|| CONFIG - LOCAL STORAGE ||============================== //

const useDllalHandleError = (errorData) => {
    const [variant, setVariant] = useState('alert');
    const [color, setColor] = useState('error');
    const [message, setMessage] = useState('');
    const [dllalErrors, setDllalErrors] = useState([]);
    const [dllalError, setDllalError] = useState('');

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
        if (errorData?.message?.length > 0) {
            errorData.message.forEach((item) => {
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
                    setColor('warning');
                    break;
                case 'Method Not Allowed':
                    setDllalError('قيمة غير موجودة، يرجى التواصل مع إدارة الموقع.');
                    setColor('info');
                    break;
                case 'Wrong Services':
                    setDllalError('خطأ في الاتصال بالسيرفر...');
                    setColor('info');
                    break;
                default:
                    setDllalError('');
            }
        }
    }, [errorData?.error?.details, message]);

    return [dllalError, dllalErrors];
};

export default useDllalHandleError;
