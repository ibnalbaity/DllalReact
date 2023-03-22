import PropTypes from 'prop-types';
import Chip from '../../ui-component/extended/Chip';
import PersonPinCircleRoundedIcon from '@mui/icons-material/PersonPinCircleRounded';
import { Link } from 'react-router-dom';

const City = ({ city }) => (
    <Chip
        component={Link}
        to={`/city/${city?.data?.attributes?.name}`}
        clickable
        label={city?.data?.attributes?.name}
        size="small"
        color="primary"
        variant="outlined"
        icon={<PersonPinCircleRoundedIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />}
    />
);

City.propTypes = {
    city: PropTypes.object
};

export default City;
