import PropTypes from 'prop-types';
import { CardMedia, Grid, Typography } from '@mui/material';
import { memo } from 'react';

const ImageItem = ({ image, errors }) => (
    <>
        <Grid item xs={12}>
            <CardMedia component="img" image={image.preview} title={image.path} sx={{ height: '90px' }} />
        </Grid>
        {errors &&
            errors.length > 0 &&
            errors.map((error, index) => {
                switch (error.message) {
                    case 'File type must be image/*,.jpeg,.png,.jpg':
                        return (
                            <Grid key={index} item xs={12}>
                                <Typography>غير مسموح بهذا الإمتداد.</Typography>
                            </Grid>
                        );
                    case 'File is smaller than 6400 bytes':
                        return (
                            <Grid item key={index} xs={12}>
                                <Typography>يجب أن يكون حجم الصورة أكبر من من 5 كيلوبت.</Typography>
                            </Grid>
                        );
                    case 'File is larger than 1048576 bytes':
                        return (
                            <Grid item key={index} xs={12}>
                                <Typography>حجم الصورة أكبر من 1 ميقا</Typography>
                            </Grid>
                        );
                    case 'File is smaller than 5120 bytes':
                        return (
                            <Grid item key={index} xs={12}>
                                <Typography>حجم الصورة أصغر من 5 كيلوبت</Typography>
                            </Grid>
                        );
                    case 'Too many files':
                        return (
                            <Grid item key={index} xs={12}>
                                <Typography>لا يسمح بتحميل أكثر من 10 صور.</Typography>
                            </Grid>
                        );
                    default:
                        return (
                            <Grid key={index} item xs={12}>
                                <Typography>{error.message}</Typography>
                            </Grid>
                        );
                }
            })}
    </>
);

ImageItem.propTypes = {
    image: PropTypes.object,
    errors: PropTypes.array
};

export default memo(ImageItem);
