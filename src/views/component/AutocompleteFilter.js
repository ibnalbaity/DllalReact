import { memo, useState } from 'react';
import { getCities } from '../../store/slices/city';
import { Autocomplete, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from '../../store';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AutocompleteFilter = ({ cities, loading, defaultValue, onChangeCity }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    return (
        <Autocomplete
            id="cities"
            size="small"
            open={open}
            onOpen={() => {
                if (cities && cities.length === 0) {
                    dispatch(getCities());
                }
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.attributes?.name}
            options={cities}
            loading={loading}
            defaultValue={defaultValue}
            onChange={(event, value) => {
                if (value) {
                    navigate(`/city/${value?.attributes?.name}`);
                }
                onChangeCity(value);
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="المدن"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        )
                    }}
                />
            )}
        />
    );
};

AutocompleteFilter.propTypes = {
    cities: PropTypes.array,
    loading: PropTypes.bool,
    defaultValue: PropTypes.any,
    onChangeCity: PropTypes.func
};

export default memo(AutocompleteFilter);
