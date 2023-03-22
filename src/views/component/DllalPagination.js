import PropTypes from 'prop-types';
import { memo } from 'react';
import { Grid, Pagination } from '@mui/material';

const DllalPagination = ({ setDllalPageNum, pageCount }) => {
    const handleDllalPageNum = (event, value) => {
        setDllalPageNum(value);
    };

    return (
        <Grid item xs={12}>
            <Pagination
                count={pageCount}
                onChange={handleDllalPageNum}
                color="secondary"
                variant="outlined"
                showFirstButton
                showLastButton
            />
        </Grid>
    );
};

DllalPagination.propTypes = {
    setDllalPageNum: PropTypes.func,
    pageCount: PropTypes.number
};

export default memo(DllalPagination);
