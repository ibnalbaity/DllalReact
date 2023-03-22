import PropTypes from 'prop-types';
import { memo } from 'react';
import { FormControl, FormHelperText, TextField } from '@mui/material';

const TextForm = ({ id, type, label, multiline, rows, value, handleChange, disabled, touched, errors }) => (
    <>
        <FormControl fullWidth>
            <TextField
                id={id}
                name={id}
                type={type}
                label={label}
                value={value || ''}
                onChange={handleChange}
                fullWidth
                disabled={disabled}
                multiline={multiline}
                rows={rows}
                inputProps={{
                    'aria-label': label,
                    inputMode: type === 'number' ? 'numeric' : null,
                    pattern: type === 'number' ? '[0-9]' : null
                }}
            />
        </FormControl>
        {touched && errors && (
            <FormHelperText error id={`standard-label-${id}`}>
                {errors}
            </FormHelperText>
        )}
    </>
);

TextForm.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    value: PropTypes.any,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    touched: PropTypes.bool,
    errors: PropTypes.string
};

export default memo(TextForm);
