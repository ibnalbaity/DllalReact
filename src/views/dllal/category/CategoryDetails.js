import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import Category from './index';
import { gridSpacing } from '../../../store/constant';

const CategoryDetails = () => {
    const { name } = useParams();
    return (
        <>
            <Category />
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Typography>{name}</Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default CategoryDetails;
