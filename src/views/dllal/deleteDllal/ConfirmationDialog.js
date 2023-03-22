import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// ===============================|| SELECTION ROW ||=============================== //

export default function ConfirmationDialogRaw({ title, content, cancel, ok, _onOk, param, _onCancel, open, ...other }) {
    const theme = useTheme();
    const radioGroupRef = React.useRef(null);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current?.focus();
        }
    };

    const handleCancel = () => {
        _onCancel();
    };

    const handleOk = (param = null) => {
        _onOk(param);
    };

    return (
        <Dialog TransitionProps={{ onEntering: handleEntering }} aria-labelledby="confirmation-dialog-title" open={open} {...other}>
            {open && (
                <>
                    <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
                    <DialogContent dividers>{content}</DialogContent>
                    <DialogActions sx={{ pr: 2.5, pt: 2.5 }}>
                        <Button sx={{ color: theme.palette.error.dark }} autoFocus color="secondary" onClick={handleCancel}>
                            {cancel}
                        </Button>
                        <Button variant="contained" size="small" onClick={() => handleOk(param)}>
                            {ok}
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired,
    cancel: PropTypes.string.isRequired,
    ok: PropTypes.string.isRequired,
    _onOk: PropTypes.func.isRequired,
    param: PropTypes.any,
    _onCancel: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};
