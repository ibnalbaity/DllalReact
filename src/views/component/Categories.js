import PropTypes from 'prop-types';
import Chip from '../../ui-component/extended/Chip';
import { Link } from 'react-router-dom';

const Categories = ({ category }) => (
    <Chip
        component={Link}
        to={`/category/${category?.data?.attributes?.name}`}
        clickable
        label={category?.data?.attributes?.name}
        size="small"
        color="primary"
        variant="outlined"
    />
);

Categories.propTypes = {
    category: PropTypes.object
};

export default Categories;
