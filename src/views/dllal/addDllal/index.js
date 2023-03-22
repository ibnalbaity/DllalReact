// material-ui
import { Grid, Typography } from '@mui/material';
import AddDllalForms from './AddDllalForms';
import { useSelector } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import { useEffect } from 'react';
import { getDateForLastPost } from '../../../store/slices/dllal';
import { useDispatch } from '../../../store';
// project imports

const AddDllal = () => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    useEffect(() => {
        dispatch(getDateForLastPost(user?.id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { loading: loadingDllal, lastDllal, error: errorDllal } = useSelector((state) => state.dllal);

    let result;
    if (lastDllal.length < 4) {
        result = <AddDllalForms />;
    } else {
        result = <Typography>يمكنك فقط إضافة 4 إعلانات كل ثلاثة أيام.</Typography>;
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {result}
            </Grid>
        </Grid>
    );
};

export default AddDllal;
