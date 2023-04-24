import { memo, useEffect, useState } from 'react';
import { Autocomplete, Grid, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from '../../../store';
import useConfig from '../../../hooks/useConfig';
import CircularProgress from '@mui/material/CircularProgress';
import { getGvernorates } from '../../../store/slices/gvernorate';
import { filterCities } from '../../../store/slices/city';
import { useNavigate } from 'react-router-dom';

const City = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [valueGve, setValueGve] = useState(null);
    const [valueCity, setValueCity] = useState(null);
    const [openGve, setOpenGve] = useState(false);
    const [openCity, setOpenCity] = useState(false);
    const [isChangeGve, setIsChangeGve] = useState(false);

    const { onChangeCity, city, onChangeGvernorate, gvernorate } = useConfig();

    const { cities, loading: LoadingCity, error } = useSelector((state) => state.city);
    const { gvernorates, loading: loadingGve, error: errorGve } = useSelector((state) => state.gvernorate);

    const getCities = (gveID) => dispatch(filterCities(`filters[gvernorate][id][$eq]=${gveID}`));

    useEffect(() => {
        if (gvernorate && valueGve === null) {
            setValueGve(gvernorate);
        }
    }, [gvernorate, valueGve]);

    useEffect(() => {
        if (isChangeGve) {
            onChangeCity(null);
            setValueCity(null);
            setIsChangeGve(false);
        }
    }, [isChangeGve, onChangeCity]);

    useEffect(() => {
        if (city && valueCity === null) {
            setValueCity(city);
        }
    }, [city, valueCity]);

    const handleAutocompleteChangeGve = async (event, newValue) => {
        setIsChangeGve(true);
        if (newValue) {
            await setValueGve(newValue); // 2- تحديث الحالة عندما يتم تغيير قيمة Autocomplete.
            await onChangeGvernorate(newValue);
            await getCities(newValue?.id);
        }
    };

    const handleAutocompleteChangeCity = async (event, newValue) => {
        if (newValue) {
            await setValueCity(newValue);
            await onChangeCity(newValue);
            await navigate(`/city/${newValue?.attributes?.name}`);
        } else {
            await onChangeCity(null);
            await navigate(`/home`);
        }
    };

    let resultCity;
    if (!isChangeGve) {
        resultCity = (
            <Grid item xs={6} md={2}>
                <Autocomplete
                    id="cities"
                    size="small"
                    value={valueCity}
                    open={openCity}
                    onOpen={() => {
                        if (gvernorate && Object.keys(gvernorate).length) {
                            getCities(gvernorate?.id);
                        }
                        setOpenCity(true);
                    }}
                    onClose={() => {
                        setOpenCity(false);
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.attributes?.name}
                    options={cities}
                    loading={LoadingCity}
                    defaultValue={valueCity}
                    noOptionsText={<Typography>ﻻ توجد مدن</Typography>}
                    loadingText={<Typography>جاري تحميل المدن...</Typography>}
                    onChange={handleAutocompleteChangeCity}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="المدن"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {LoadingCity ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                )
                            }}
                        />
                    )}
                />
            </Grid>
        );
    } else if (error) {
        resultCity = <Typography>خطأ في تحميل المدن</Typography>;
    } else {
        resultCity = (
            <Grid item xs={6} md={2}>
                <Autocomplete
                    size="small"
                    options={[]}
                    open={openCity}
                    value={null}
                    defaultValue={null}
                    loading
                    noOptionsText={<Typography>ﻻ توجد نتائج</Typography>}
                    loadingText={<Typography>جاري تحميل المدن...</Typography>}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="تحميل المدن"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        <CircularProgress color="inherit" size={20} />
                                        {params.InputProps.endAdornment}
                                    </>
                                )
                            }}
                        />
                    )}
                />
            </Grid>
        );
    }

    let resultGve;
    if (errorGve) {
        resultGve = <Typography>خطأ في تحميل المحافظات</Typography>;
    } else {
        resultGve = (
            <Grid item xs={6} md={2}>
                <Autocomplete
                    id="gvernorate"
                    value={valueGve}
                    defaultValue={valueGve}
                    size="small"
                    open={openGve}
                    onOpen={() => {
                        if (gvernorates && gvernorates.length === 0) {
                            dispatch(getGvernorates());
                        }
                        setOpenGve(true);
                    }}
                    onClose={() => {
                        setOpenGve(false);
                    }}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.attributes?.name}
                    options={gvernorates}
                    loading={loadingGve}
                    noOptionsText={<Typography>ﻻ توجد نتائج</Typography>}
                    loadingText={<Typography>جاري تحميل المحافظات...</Typography>}
                    onChange={handleAutocompleteChangeGve}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="المحافظة"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingGve ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                )
                            }}
                        />
                    )}
                />
            </Grid>
        );
    }
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
            <Grid container alignItems="center" spacing={2}>
                {resultGve}
                {resultCity}
            </Grid>
        </Paper>
    );
};

export default memo(City);
