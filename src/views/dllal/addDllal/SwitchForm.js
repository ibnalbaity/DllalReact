import PropTypes from 'prop-types';
import { FormControl, FormControlLabel, FormGroup, FormHelperText, Switch } from '@mui/material';
import Loader from '../../../ui-component/Loader';
import { memo } from 'react';

const SwitchForm = ({ id, label, labelPlacement, loading, value, handleChange, touched, errors }) => (
    <>
        {!loading ? (
            <FormControl>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value={id}
                        control={<Switch name={id} id={id} value={value} checked={value} onChange={handleChange} color="primary" />}
                        label={label}
                        labelPlacement={labelPlacement}
                    />
                </FormGroup>
            </FormControl>
        ) : (
            <Loader />
        )}
        {touched && errors && (
            <FormHelperText error id={`standard-label-${id}`}>
                {errors}
            </FormHelperText>
        )}
    </>
);

SwitchForm.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    labelPlacement: PropTypes.string,
    loading: PropTypes.bool,
    value: PropTypes.bool,
    handleChange: PropTypes.func,
    touched: PropTypes.bool,
    errors: PropTypes.string
};

export default memo(SwitchForm);
