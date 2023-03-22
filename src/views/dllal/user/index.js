import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../store';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import Profile from './Profile';
import { getUser } from '../../../store/slices/user';
import useAuth from '../../../hooks/useAuth';
import { getDllalByUserID } from '../../../store/slices/dllal';

// tabs
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// ==============================|| PROFILE 3 ||============================== //

const User = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const { user: userLoggedIn, isLoggedIn, checkLoggedIn } = useAuth();
    useEffect(() => {
        const handleIsLogIn = async () => {
            try {
                await checkLoggedIn();
            } catch (err) {
                console.error(err);
            }
        };
        handleIsLogIn();
        if (isLoggedIn) {
            dispatch(getUser(id));
            dispatch(getDllalByUserID(id));
        } else {
            handleIsLogIn();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isLoggedIn]);

    // fetch categories data
    const { loading, user, error } = useSelector((state) => state.user);
    const { loading: loadingDllal, dllals, error: errorDllal } = useSelector((state) => state.dllal);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs
                value={value}
                indicatorColor="primary"
                onChange={handleChange}
                sx={{
                    mb: 3,
                    minHeight: 'auto',
                    '& button': {
                        minWidth: 100
                    },
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        py: 1.5,
                        px: 1,
                        mr: 2.25,
                        color: 'grey.600'
                    },
                    '& a.Mui-selected': {
                        color: 'primary.main'
                    }
                }}
                aria-label="simple tabs example"
                variant="scrollable"
            >
                <Tab component={Link} to="#" label="الملف الشخصي" {...a11yProps(0)} />
                {/* <Tab component={Link} to="#" label="Billing" {...a11yProps(1)} />
                    <Tab component={Link} to="#" label="Security" {...a11yProps(2)} />
                    <Tab component={Link} to="#" label="Notifications" {...a11yProps(3)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
                <Profile
                    userInfo={user}
                    dllals={dllals}
                    userLoggedIn={userLoggedIn}
                    loading={loading || loadingDllal}
                    error={error || errorDllal}
                />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
                    <Billing />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Security />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Notifications />
                </TabPanel> */}
        </div>
    );
};

export default User;
