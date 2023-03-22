import { useDispatch } from '../store';
import { useEffect, useState } from 'react';
import { openSnackbar } from '../store/slices/snackbar';

const CheckIsOnline = () => {
    const dispatch = useDispatch();
    // Online state
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        // Update network status
        const handleStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        // Listen to the online status
        window.addEventListener('online', handleStatusChange);

        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange);

        // Specify how to clean up after this effect for performance improvement
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline]);

    useEffect(() => {
        if (isOnline) {
            dispatch(
                openSnackbar({
                    open: true,
                    autoHideDuration: 6000,
                    message: `متصل بالانترنت.`,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                    close: true
                })
            );
        } else {
            dispatch(
                openSnackbar({
                    open: true,
                    message: `غير متصل بالإنترنت.`,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center'
                    },
                    close: true
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOnline]);
};

export default CheckIsOnline;
