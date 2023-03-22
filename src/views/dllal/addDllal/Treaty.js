import { memo, useEffect } from 'react';
import { Alert, Grid, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from '../../../ui-component/cards/SubCard';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../../store';
import { getTreaties } from '../../../store/slices/treaty';
import Loader from '../../../ui-component/Loader';
// assets
import BlurOnIcon from '@mui/icons-material/BlurOn';
import SwitchForm from './SwitchForm';
import PropTypes from 'prop-types';

const Treaty = ({ switchID, switchLabel, switchLabelPlacement, switchValue, handleChange, touched, errors }) => {
    const dispatch = useDispatch();

    const { loading, treaties, error } = useSelector((state) => state.treaty);

    useEffect(() => {
        if (treaties && treaties.length === 0) {
            dispatch(getTreaties());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let result;
    if (loading) {
        result = <Loader />;
    } else if (error) {
        result = (
            <Grid item>
                <Typography>Error...</Typography>
            </Grid>
        );
    } else if (treaties.length > 0) {
        result = (
            <List>
                {treaties.map((treaty) => (
                    <Grid key={treaty.id} item xs={12}>
                        <ListItem>
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                <BlurOnIcon sx={{ fontSize: '1.1rem' }} />
                            </ListItemIcon>
                            <MuiTypography variant="overline" display="block" gutterBottom>
                                {treaty.attributes?.desc}
                            </MuiTypography>
                        </ListItem>
                    </Grid>
                ))}
            </List>
        );
    }
    return (
        <SubCard
            title="المعاهدة"
            secondary={
                <SwitchForm
                    id={switchID}
                    label={switchLabel}
                    labelPlacement={switchLabelPlacement}
                    loading={loading}
                    value={switchValue}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                />
            }
        >
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                    <MuiTypography variant="overline" display="block" gutterBottom>
                        بسم الله الرحمن الرحيم قال الله تعالى:( وَأَوْفُواْ بِعَهْدِ اللهِ إِذَا عَاهَدتُّمْ وَلاَ تَنقُضُواْ الأَيْمَانَ
                        بَعْدَ تَوْكِيدِهَا وَقَدْ جَعَلْتُمُ اللهَ عَلَيْكُمْ كَفِيلاً )صدق الله العظيم
                    </MuiTypography>
                </Grid>
                <Grid item xs={12}>
                    <Alert variant="filled" severity={switchValue ? 'success' : 'error'}>
                        {result}
                    </Alert>
                </Grid>
            </Grid>
        </SubCard>
    );
};

Treaty.propTypes = {
    switchID: PropTypes.string,
    switchLabel: PropTypes.string,
    switchLabelPlacement: PropTypes.string,
    switchValue: PropTypes.bool,
    handleChange: PropTypes.func,
    touched: PropTypes.bool,
    errors: PropTypes.string
};

export default memo(Treaty);
