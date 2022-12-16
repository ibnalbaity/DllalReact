import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Chip, Grid, useMediaQuery } from '@mui/material';

// project import

// third-party
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// assets

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const CategoryItems = ({ categories }) => {
    const theme = useTheme();

    const matchDownLG = useMediaQuery(theme.breakpoints.up('md'));

    const lgNo = matchDownLG ? 4 : 3;

    const settings = {
        dots: false,
        centerMode: false,
        swipeToSlide: false,
        focusOnSelect: false,
        centerPadding: '0px',
        slidesToShow: categories.length > 3 ? lgNo : categories.length
    };

    return (
        <Grid item xs={12}>
            <Slider {...settings}>
                {categories.map((item) => (
                    <Grid item key={item.id}>
                        <Grid container alignItems="start" justifyContent="center">
                            <Grid item>
                                <Chip
                                    key={item.id}
                                    component={Link}
                                    to={`/category/${item.attributes.name}`}
                                    label={item.attributes.name}
                                    color="primary"
                                    variant="rounded"
                                    sx={{ m: '0 auto', cursor: 'pointer', p: 1, textAlign: 'center' }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Slider>
        </Grid>
    );
};

CategoryItems.propTypes = {
    categories: PropTypes.array
};

export default CategoryItems;
