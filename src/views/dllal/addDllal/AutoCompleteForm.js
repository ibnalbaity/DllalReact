import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import { Autocomplete, CircularProgress, FormControl, FormHelperText, TextField } from '@mui/material';
import { useDispatch } from '../../../store';

const AutoCompleteForm = ({ id, label, getData, data, loading, setFieldValue, touched, errors, filterBy, defaultValue }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    return (
        <>
            <FormControl fullWidth>
                <Autocomplete
                    id={id}
                    open={open}
                    onOpen={() => {
                        if (filterBy) {
                            dispatch(getData(filterBy));
                        } else if (!filterBy && data && data.length === 0) {
                            dispatch(getData());
                        }
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    defaultValue={defaultValue || null}
                    options={data}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={(option) => option.attributes?.name}
                    loading={loading}
                    onChange={(event, value) => (value ? setFieldValue(id, value.id) : setFieldValue(id, ''))}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
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
            </FormControl>
            {touched && errors && (
                <FormHelperText error id={`standard-label-${id}`}>
                    {errors}
                </FormHelperText>
            )}
        </>
    );
};

AutoCompleteForm.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    getData: PropTypes.func,
    data: PropTypes.array,
    loading: PropTypes.bool,
    setFieldValue: PropTypes.func,
    touched: PropTypes.bool,
    errors: PropTypes.string,
    filterBy: PropTypes.string,
    defaultValue: PropTypes.object
};

export default memo(AutoCompleteForm);
