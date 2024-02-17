import PropTypes from 'prop-types';

// material-ui
import { CardMedia, Grid } from '@mui/material';

// project import
import { gridSpacing } from 'store/constant';

// third-party
import { Gallery, Item } from 'react-photoswipe-gallery';

// assets
import MainCard from '../../../ui-component/cards/MainCard';
import useConfig from '../../../hooks/useConfig';

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const DllalDetailsImages = ({ images }) => {
    const { borderRadius } = useConfig();

    return (
        <>
            <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                {images && images.length > 0 ? (
                    <Grid item xs={12}>
                        <Gallery>
                            <Grid container alignItems="center" justifyContent="center" spacing={gridSpacing}>
                                {images.map((image) => (
                                    <Grid key={image.id} item xs={6} sm={3} md={2}>
                                        <Item
                                            original={`${image.attributes?.url}`}
                                            thumbnail={`${image.attributes?.formats?.thumbnail?.url}`}
                                            width={image.attributes.width}
                                            height={image.attributes.height}
                                        >
                                            {({ ref, open }) => (
                                                <Grid item xs={12}>
                                                    <MainCard content={false} sx={{ m: '0 auto' }}>
                                                        <CardMedia
                                                            component="img"
                                                            image={`${image.attributes?.formats?.thumbnail?.url}`}
                                                            ref={ref}
                                                            onClick={open}
                                                            sx={{
                                                                borderRadius: `${borderRadius}px`,
                                                                overflow: 'hidden',
                                                                cursor: 'zoom-in',
                                                                height: { xs: 90, sm: 100, md: 120 }
                                                            }}
                                                        />
                                                    </MainCard>
                                                </Grid>
                                            )}
                                        </Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Gallery>
                    </Grid>
                ) : null}
            </Grid>
        </>
    );
};

DllalDetailsImages.propTypes = {
    images: PropTypes.array
};

export default DllalDetailsImages;
