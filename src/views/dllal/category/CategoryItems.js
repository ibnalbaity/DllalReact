import PropTypes from 'prop-types';
import { memo } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, ListItem, Paper, useMediaQuery } from '@mui/material';
// project import
import Chip from '../../../ui-component/extended/Chip';
import useConfig from '../../../hooks/useConfig';
// third-party
import Slider from 'react-slick';
import { useLocation, useNavigate } from 'react-router-dom';

// assets
// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const CategoryItems = ({ categories }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { category, onChangeCategory } = useConfig();
    const lastSegment = location.pathname.split('/').pop();

    const theme = useTheme();
    const matchDownXG = useMediaQuery(theme.breakpoints.up('lg'));
    const matchDownLG = useMediaQuery(theme.breakpoints.up('md'));
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));

    let slidesToShowNo;
    if (matchDownXG) {
        slidesToShowNo = 5;
    } else if (matchDownLG) {
        slidesToShowNo = 3;
    } else if (matchDownMD) {
        slidesToShowNo = 3;
    } else {
        slidesToShowNo = 2;
    }

    const settings = {
        rtl: false,
        speed: 1000,
        infinite: false,
        centerPadding: '20px',
        slidesToShow: categories.length > 1 ? slidesToShowNo : categories.length,
        slidesToScroll: categories.length > 1 ? slidesToShowNo : categories.length
    };

    const handleClickCategory = (item) => {
        onChangeCategory(item);
        navigate(`/category/${item.attributes.name}`);
    };

    return (
        <Grid item xs={12}>
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0
                }}
                component="ul"
            >
                <Grid item xs={11}>
                    <Slider {...settings}>
                        {categories.map((item) => {
                            let variant = 'outlined';

                            if (item.attributes.name === decodeURI(lastSegment)) {
                                variant = 'filled';
                            }
                            if (item.attributes.name === category?.attributes?.name) {
                                variant = 'filled';
                            }
                            return (
                                <ListItem dir="rtl" key={item.id}>
                                    <Chip
                                        label={item.attributes.name}
                                        clickable
                                        onClick={() => handleClickCategory(item)}
                                        color="primary"
                                        sx={{ width: 132, height: 32 }}
                                        variant={variant}
                                    />
                                </ListItem>
                            );
                        })}
                    </Slider>
                </Grid>
            </Paper>
        </Grid>
    );
};

CategoryItems.propTypes = {
    categories: PropTypes.array
};

export default memo(CategoryItems);
