import { Grid } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import PropTypes from 'prop-types';
import DllalCard from '../../../ui-component/cards/DllalCard';

const DllalsItem = ({ dllals }) => {
    let resultItem;
    if (dllals && dllals.length > 0) {
        resultItem = dllals.map((item) => (
            <Grid key={item.id} item xs={12}>
                <DllalCard {...item} />
            </Grid>
        ));
    }

    return (
        <Grid container spacing={gridSpacing}>
            {resultItem}
        </Grid>
    );
};

DllalsItem.propTypes = {
    dllals: PropTypes.array
};

export default DllalsItem;
