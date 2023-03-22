import { Link } from 'react-router-dom';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Chip from '../../ui-component/extended/Chip';
import PropTypes from 'prop-types';

const UserName = ({ user }) => (
    <Chip
        component={Link}
        to={`/user/${user?.data?.id}`}
        clickable
        label={user?.data?.attributes?.username}
        size="small"
        color="primary"
        variant="outlined"
        icon={<PersonRoundedIcon sx={{ height: 16, width: 16, mr: 1, verticalAlign: 'text-bottom' }} />}
    />
);

UserName.propTypes = {
    user: PropTypes.object
};

export default UserName;
