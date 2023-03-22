import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../store';
import { useEffect, useState } from 'react';
import { getDllalByCityName } from '../../../store/slices/dllal';
import Loader from '../../../ui-component/Loader';
import DllalsItem from '../dllals/DllalsItem';
import { gridSpacing } from '../../../store/constant';
import Category from '../category';
import City from './index';
import Filter from '../../component/Filter';
import useConfig from '../../../hooks/useConfig';
import DllalPagination from '../../component/DllalPagination';

const CitiesDllals = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const [dllalPageNum, setDllalPageNum] = useState(0);
    const { category, city, onChangeCategory } = useConfig();

    // fetch categories data
    const { loading: loadingDllal, dllals, dllalPagination, error: errorDllal } = useSelector((state) => state.dllal);

    useEffect(() => {
        dispatch(getDllalByCityName(name, dllalPageNum));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, city, dllalPageNum, name]);

    let resultDllals;
    if (loadingDllal) {
        resultDllals = (
            <Grid item xs={12}>
                <Loader />
                <Typography>يتم التحميل يرجى الإنتظار...</Typography>
            </Grid>
        );
    } else if (errorDllal) {
        resultDllals = (
            <Grid item xs={12}>
                <Typography>خطأ في تحميل قائمة المدن</Typography>
            </Grid>
        );
    } else if (dllals && dllals.length > 0) {
        resultDllals = (
            <Grid item xs={12}>
                <DllalsItem dllals={dllals} />
            </Grid>
        );
    } else if (dllals && dllals.length === 0) {
        resultDllals = (
            <Grid item xs={12}>
                <Typography variant="caption">ﻻ توجد إعلانات في هذه المدينة.</Typography>
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
            <Grid item xs={12}>
                <Filter category={category} city={city} onChangeCategory={onChangeCategory} />
            </Grid>
            {resultDllals}
            {dllalPagination.total > 6 ? (
                <DllalPagination setDllalPageNum={setDllalPageNum} pageCount={dllalPagination?.pageCount} />
            ) : null}
        </Grid>
    );
};

export default CitiesDllals;
