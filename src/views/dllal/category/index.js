import { memo, useEffect } from 'react';
// material-ui
import { Grid, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'store';

// project imports
import { gridSpacing } from '../../../store/constant';
import { getCategories } from '../../../store/slices/category';
import CategoryItems from './CategoryItems';
import Loader from '../../../ui-component/Loader';
// assets
// ==============================|| APPLICATION CATEGORY ||============================== //

const Category = () => {
    const dispatch = useDispatch();

    // fetch categories data
    const { categories, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategories());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let resultCategories;
    if (loading) {
        resultCategories = (
            <Grid item xs={12}>
                <Loader />
                <Typography>يتم التحميل يرجى الإنتظار...</Typography>
            </Grid>
        );
    } else if (error) {
        resultCategories = (
            <Grid item xs={12}>
                <Typography>خطأ في تحميل الأقسام</Typography>
            </Grid>
        );
    } else if (categories && categories.length > 0) {
        resultCategories = (
            <Grid container alignItems="center" alignContent="center" spacing={gridSpacing}>
                <CategoryItems categories={categories} />
            </Grid>
        );
    }

    return resultCategories;
};

export default memo(Category);
