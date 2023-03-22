import { memo } from 'react';
// material-ui
import { Grid, Typography } from '@mui/material';
// project imports
import { gridSpacing } from 'store/constant';
import EditUser from './EditUser';
// assets
import PropTypes from 'prop-types';
import Loader from '../../../ui-component/Loader';
import DllalsItem from '../dllals/DllalsItem';

// ==============================|| PROFILE 3 - PROFILE ||============================== //

const Profile = ({ userInfo, dllals, userLoggedIn, loading, error }) => {
    let resultUser;
    if (loading) {
        resultUser = (
            <Grid item xs={12}>
                <Loader />
                <Typography>يتم التحميل يرجى الإنتظار...</Typography>
            </Grid>
        );
    } else if (error) {
        resultUser = (
            <Grid item xs={12}>
                <Typography>خطأ في تحميل معلومات المستخدم</Typography>
            </Grid>
        );
    } else if (userInfo && Object.keys(userInfo).length > 0 && userLoggedIn?.id === userInfo?.id) {
        resultUser = <EditUser user={userInfo} />;
    }

    return (
        <Grid container spacing={gridSpacing}>
            {resultUser}
            {!loading && (
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h4">الإعلانات</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DllalsItem dllals={dllals} />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

Profile.propTypes = {
    userInfo: PropTypes.object,
    dllals: PropTypes.array,
    userLoggedIn: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.any
};

export default memo(Profile);
