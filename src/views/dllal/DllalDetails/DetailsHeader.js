import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { Avatar, ButtonBase, Grid, Menu, MenuItem, Typography, useMediaQuery } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import moment from 'moment/moment';
import UserName from '../../component/UserName';
import City from '../../component/City';
import Categories from '../../component/Categories';
import ConfirmationDialogRaw from '../deleteDllal/ConfirmationDialog';
import { useDispatch } from '../../../store';
import { removeDllal } from '../../../store/slices/dllal';

const avatarImage = require.context('assets/images/profile', true);

const DetailsHeader = ({ id, attributes }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));

    const [imagesIDs, setImagesIDs] = useState([]);
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const { user: userLogIn, isLoggedIn, checkLoggedIn } = useAuth();

    const { category, city, images, title, user, updatedAt } = attributes;

    useEffect(() => {
        setUpdated(moment(updatedAt).fromNow());
    }, [updatedAt]);

    useEffect(() => {
        let ids = [];
        if (images.data && images.data?.length > 0) {
            const imagesID = images.data.map((imageID) => imageID.id);
            ids = [...imagesID];
            setImagesIDs(ids);
        }
    }, [images.data]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickEdit = async () => {
        navigate(`/edit/${id}`);
    };

    const handleClickDelete = () => {
        checkLoggedIn();
        if (isLoggedIn) {
            setOpen(true);
        }
    };

    const handleClickDeleteOk = async () => {
        checkLoggedIn();
        if (isLoggedIn) {
            await dispatch(removeDllal(id, imagesIDs));
        }
        navigate('/', { replace: true });
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    let headerView;
    if (matchDownMD) {
        headerView = (
            <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                <Grid item>
                    <Avatar alt={user?.attributes?.name} src={user?.avatar && avatarImage(`./${user?.avatar}`)} />
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography variant="h3">{title}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="left" variant="caption">
                                <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} /> {updated}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} zeroMinWidth>
                            <Grid container spacing={1}>
                                {city && city?.data && (
                                    <Grid item>
                                        <City city={city} />
                                    </Grid>
                                )}
                                {user && user?.data && (
                                    <Grid item>
                                        <UserName user={user} />
                                    </Grid>
                                )}
                                {category && category?.data && (
                                    <Grid item>
                                        <Categories category={category} />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {userLogIn?.id === user?.data?.id && (
                    <Grid item>
                        <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.smallAvatar,
                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                                    color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.dark,
                                    zIndex: 1,
                                    transition: 'all .2s ease-in-out',
                                    '&[aria-controls="menu-list-grow"],&:hover': {
                                        background: theme.palette.secondary.main,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                aria-controls="menu-post"
                                aria-haspopup="true"
                            >
                                <MoreVertTwoToneIcon fontSize="inherit" />
                            </Avatar>
                        </ButtonBase>
                        <Menu
                            id="menu-post"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={handleClickEdit}>تعديل</MenuItem>
                            <MenuItem onClick={handleClickDelete}>حذف</MenuItem>
                        </Menu>
                    </Grid>
                )}
            </Grid>
        );
    } else {
        headerView = (
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <Typography variantMapping={{ h1: 'h1' }} variant="h4">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography align="left" variant="caption">
                                <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} /> {updated}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item>
                            <Avatar alt={user?.attributes?.name} src={user?.avatar && avatarImage(`./${user?.avatar}`)} />
                        </Grid>
                        {user && user?.data && (
                            <Grid item>
                                <UserName user={user} />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={12} zeroMinWidth>
                            <Grid container spacing={1}>
                                {city && city?.data && (
                                    <Grid item>
                                        <City city={city} />
                                    </Grid>
                                )}
                                {category && category?.data && (
                                    <Grid item>
                                        <Categories category={category} />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {userLogIn?.id === user?.data?.id && (
                    <Grid item>
                        <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.smallAvatar,
                                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                                    color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.dark,
                                    zIndex: 1,
                                    transition: 'all .2s ease-in-out',
                                    '&[aria-controls="menu-list-grow"],&:hover': {
                                        background: theme.palette.secondary.main,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                aria-controls="menu-post"
                                aria-haspopup="true"
                            >
                                <MoreVertTwoToneIcon fontSize="inherit" />
                            </Avatar>
                        </ButtonBase>
                        <Menu
                            id="menu-post"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            variant="selectedMenu"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={handleClickEdit}>تعديل</MenuItem>
                            <MenuItem onClick={handleClickDelete}>حذف</MenuItem>
                        </Menu>
                    </Grid>
                )}
            </Grid>
        );
    }

    return (
        <Grid item xs={12}>
            {headerView}
            <ConfirmationDialogRaw
                title="تأكيد الحذف"
                content={`هل تريد بالتأكيد حذف الإعلان: ${title}`}
                cancel="إلغاء"
                ok="حذف"
                _onOk={handleClickDeleteOk}
                _onCancel={handleClose}
                open={open}
                keepMounted
            />
        </Grid>
    );
};

DetailsHeader.propTypes = {
    id: PropTypes.number,
    attributes: PropTypes.object
};

export default DetailsHeader;
