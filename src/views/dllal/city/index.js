import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Paper, Typography } from '@mui/material';
import { useSelector } from '../../../store';
import useConfig from '../../../hooks/useConfig';
import AutocompleteFilter from '../../component/AutocompleteFilter';

const City = () => {
    const location = useLocation();

    const { city, onChangeCity } = useConfig();
    const [defaultValue, setDefaultValue] = useState(city);
    const lastSegment = location.pathname.split('/').pop();
    // fetch cities data
    const { cities, loading, error } = useSelector((state) => state.city);

    useEffect(() => {
        if (city && lastSegment !== city?.attributes?.name) {
            setDefaultValue(city);
        }
    }, [city, lastSegment]);

    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 1.5,
                m: 0
            }}
            component="ul"
        >
            <Grid item xs={6} md={2}>
                {!error ? (
                    <AutocompleteFilter cities={cities} loading={loading} onChangeCity={onChangeCity} defaultValue={defaultValue} />
                ) : (
                    <Typography>خطأ في تحميل المدن</Typography>
                )}
            </Grid>
        </Paper>
    );
};

export default memo(City);
