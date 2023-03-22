import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../store';
import { Grid, Typography } from '@mui/material';
import Loader from '../../../ui-component/Loader';
import { gridSpacing } from '../../../store/constant';
import Category from '../category';
import { useParams } from 'react-router-dom';
import DllalsItem from '../dllals/DllalsItem';
import { getDllalResults } from '../../../store/slices/dllal';

// const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));

const SearchResults = () => {
    const { searchWord } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDllalResults(searchWord));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // fetch search data
    const { loading, results, error } = useSelector((state) => state.dllal);

    let resultDllals;
    if (loading) {
        resultDllals = (
            <Grid item xs={12}>
                <Loader />
                <Typography>يتم تحميل نتائج البحث يرجى الإنتظار...</Typography>
            </Grid>
        );
    } else if (error) {
        resultDllals = (
            <Grid item xs={12}>
                <Typography>خطأ في تحميل نتائج البحث</Typography>
            </Grid>
        );
    } else if (searchWord && searchWord.length > 2 && results && results.length > 0) {
        resultDllals = <DllalsItem dllals={results} />;
    } else if (searchWord && searchWord.length < 3) {
        resultDllals = (
            <Grid item xs={12}>
                <Typography>يجب أن تكون عبارة البحث أكثر من 3 أحرف.</Typography>
            </Grid>
        );
    } else if (searchWord && searchWord.length > 2 && results && results.length === 0) {
        resultDllals = (
            <Grid item xs={12}>
                <Typography>ﻻ توجد نتائج بحث.</Typography>
            </Grid>
        );
    }
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
                <Category />
            </Grid>
            <Grid item xs={12} md={12}>
                <Typography>نتائج بحثك عن: {searchWord}</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
                {resultDllals}
            </Grid>
        </Grid>
    );
};

export default memo(SearchResults);
