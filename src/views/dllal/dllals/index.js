import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Loader from '../../../ui-component/Loader';
import { gridSpacing } from '../../../store/constant';
import { useDispatch, useSelector } from '../../../store';
import Category from '../category';
import DllalsItem from './DllalsItem';
import { getDllals } from '../../../store/slices/dllal';
import City from '../city';
import Filter from '../../component/Filter';
import useConfig from '../../../hooks/useConfig';
import DllalPagination from '../../component/DllalPagination';

const Dllals = () => {
    const dispatch = useDispatch();
    const [dllalPageNum, setDllalPageNum] = useState(0);
    const { category, city, onChangeCategory } = useConfig();

    // fetch categories data
    const { loading: loadingDllal, dllals, dllalPagination, error: errorDllal } = useSelector((state) => state.dllal);

    useEffect(() => {
        dispatch(getDllals(dllalPageNum));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, city, dllalPageNum]);

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
                <Typography>خطأ في تحميل الإعلانات</Typography>
            </Grid>
        );
    } else if (dllals && dllals.length > 0) {
        resultDllals = (
            <Grid item xs={12}>
                <DllalsItem dllals={dllals} />
            </Grid>
        );
    }
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12}>
                <Category />
            </Grid>
            <Grid item xs={12}>
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

export default Dllals;
