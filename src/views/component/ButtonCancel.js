import PropTypes from 'prop-types';
import { memo } from 'react';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';

const ButtonCancel = ({ ButtonText, Cancel, disabled }) => {
    const theme = useTheme();

    return (
        <Button
            fullWidth
            size="large"
            variant="outlined"
            color="error"
            startIcon={<CancelScheduleSendIcon />}
            onClick={Cancel}
            disabled={disabled}
            sx={{
                boxShadow: theme.customShadows.error,
                ':hover': {
                    boxShadow: 'none'
                }
            }}
        >
            {ButtonText}
        </Button>
    );
};

ButtonCancel.propTypes = {
    ButtonText: PropTypes.string.isRequired,
    Cancel: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default memo(ButtonCancel);
