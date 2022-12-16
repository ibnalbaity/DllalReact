import { useEffect } from 'react';
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

    let result;
    if (loading) {
        result = (
            <Grid item>
                <Loader />
                <Typography>Loading</Typography>
            </Grid>
        );
    } else if (error) {
        result = (
            <Grid item>
                <Typography>Error</Typography>
            </Grid>
        );
    } else if (categories && categories.length > 0) {
        result = (
            <Grid item xs={12} md={8}>
                <Grid container spacing={gridSpacing}>
                    <CategoryItems categories={categories} />
                </Grid>
            </Grid>
        );
    }
    return (
        <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
            {result}
        </Grid>
    );
};

export default Category;
