import PropTypes from 'prop-types';

const CallTo = ({ phone, children }) => <a href={`tel:${phone}`}>{children}</a>;

CallTo.propTypes = {
    phone: PropTypes.string,
    children: PropTypes.any
};

export default CallTo;
