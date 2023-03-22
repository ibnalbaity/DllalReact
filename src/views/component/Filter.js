import PropTypes from 'prop-types';
import { memo } from 'react';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant';
import Chip from '../../ui-component/extended/Chip';

const Filter = ({ category, city, onChangeCategory }) => {
    const handleDelete = () => {
        onChangeCategory(null);
    };
    let result;
    if (category || city) {
        result = (
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="start" spacing={1}>
                        <Grid item>
                            <Typography>إعلانات في</Typography>
                        </Grid>
                        {city && (
                            <>
                                <Grid item>
                                    <Typography>مدينة</Typography>
                                </Grid>
                                <Grid item>
                                    <Chip label={city.attributes?.name} variant="outlined" size="small" />
                                </Grid>
                            </>
                        )}
                        {category && (
                            <>
                                <Grid item>
                                    <Typography>قسم</Typography>
                                </Grid>
                                <Grid item>
                                    <Chip label={category.attributes?.name} onDelete={handleDelete} variant="outlined" size="small" />
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
    return result;
};

Filter.propTypes = {
    category: PropTypes.object,
    city: PropTypes.object,
    onChangeCategory: PropTypes.func
};

export default memo(Filter);
