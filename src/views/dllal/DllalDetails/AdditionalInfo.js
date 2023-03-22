import { Grid, Typography, useMediaQuery } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import {
    IconBrandToyota,
    IconCalendarStats,
    IconCurrencyReal,
    IconEngine,
    IconGasStation,
    IconNumbers,
    IconPhoneCall,
    IconRoad,
    IconTopologyStarRing2
} from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

const AdditionalInfo = ({ attributes }) => {
    const theme = useTheme();

    const { adType, carModel, contactMethod, counter, double, fuelType, gearType, price, vehicleBrand, year } = attributes;

    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const blockSX = {
        p: 2.5,
        borderLeft: '1px solid ',
        borderBottom: '1px solid ',
        borderLeftColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200],
        borderBottomColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[200]
    };

    return (
        <Grid item xs={12}>
            <MainCard
                content={false}
                sx={{
                    '& svg': {
                        width: 50,
                        height: 50,
                        color: theme.palette.secondary.main,
                        borderRadius: '14px',
                        p: 1.25,
                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'primary.light'
                    }
                }}
            >
                <Grid container alignItems="center" spacing={0}>
                    {carModel.data && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconTopologyStarRing2 stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {adType.data?.attributes.name}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        الحالة
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {carModel.data && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconRoad stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {carModel.data?.attributes.name}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        موديل السيارة
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {vehicleBrand.data && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconBrandToyota stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {vehicleBrand.data?.attributes.name}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        طراز السيارة
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {year.data && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconCalendarStats stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {year.data?.attributes.name}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        سنة الصنع
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {counter && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconNumbers stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {counter.toLocaleString()}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        عداد المشي
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {double.data && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconEngine stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {double.data?.attributes.name}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        هل يوجد دبل؟
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {fuelType.data && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconGasStation stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {fuelType.data?.attributes.name}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        نوع الوقود
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {gearType.data && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconEngine stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {gearType.data?.attributes.name}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        نوع القير
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {price && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconCurrencyReal stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {price.toLocaleString()}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        السعر
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                    {contactMethod && (
                        <Grid item xs={12} sm={6} sx={blockSX}>
                            <Grid container alignItems="center" spacing={1} justifyContent={matchDownXs ? 'space-between' : 'center'}>
                                <Grid item>
                                    <IconPhoneCall stroke={1.5} />
                                </Grid>
                                <Grid item sm zeroMinWidth>
                                    <Typography variant="h5" align="center">
                                        {contactMethod}
                                    </Typography>
                                    <Typography variant="subtitle2" align="center">
                                        طريقة التواصل
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </MainCard>
        </Grid>
    );
};

AdditionalInfo.propTypes = {
    attributes: PropTypes.object
};

export default AdditionalInfo;
