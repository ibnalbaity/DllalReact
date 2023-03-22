import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../../store';
import { useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import { getDllalDetails } from '../../../store/slices/dllalDetails';
import Loader from '../../../ui-component/Loader';
import MainCard from '../../../ui-component/cards/MainCard';
import DllalDetailsImages from './DllalDetailsImages';
import DllalInfo from './DllalInfo';
import { getCategories } from '../../../store/slices/category';
import Category from '../category';
import AdditionalInfo from './AdditionalInfo';
import DetailsHeader from './DetailsHeader';
import City from '../city';

const DllalDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getDllalDetails(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { loading: loadingDllal, dllal, error: errorDllal } = useSelector((state) => state.dllalDetails);

    let resultDllalDetails;
    if (loadingDllal) {
        resultDllalDetails = (
            <Grid item xs={12}>
                <Loader />
                <Typography>يتم التحميل يرجى الإنتظار...</Typography>
            </Grid>
        );
    } else if (errorDllal) {
        resultDllalDetails = (
            <Grid item xs={12} md={12}>
                <Typography>خطأ في تحميل تفاصيل الإعلان</Typography>
            </Grid>
        );
    } else if (dllal && Object.keys(dllal).length > 0 && dllal?.id === Number(id)) {
        resultDllalDetails = (
            <Grid item xs={12} lg={12}>
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} md={12}>
                            <DetailsHeader {...dllal} />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <DllalInfo {...dllal} />
                        </Grid>
                        {dllal && (
                            <>
                                <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
                                    <Typography variant="h2">معلومات إضافية</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <AdditionalInfo {...dllal} />
                                </Grid>
                            </>
                        )}
                        {dllal?.attributes?.images?.data && (
                            <>
                                <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
                                    <Typography variant="h2">صور الإعلان</Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <DllalDetailsImages images={dllal?.attributes?.images?.data} />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </MainCard>
            </Grid>
        );
    }

    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <Category />
            </Grid>
            <Grid item xs={12} md={12}>
                <City />
            </Grid>
            {resultDllalDetails}
        </Grid>
    );
};

export default DllalDetails;
