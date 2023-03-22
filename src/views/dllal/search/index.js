import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import Category from '../category';

const Search = () => (
    <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
        <Grid item xs={12} md={12}>
            <Category />
        </Grid>
        <Grid item xs={12} md={12}>
            <Typography>ستظهر نتائج البحث هنا...</Typography>
        </Grid>
    </Grid>
);

export default Search;
