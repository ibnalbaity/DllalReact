import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

import { Card, CardActions, CardContent, CardMedia, Divider, Grid, Typography, useMediaQuery } from '@mui/material';
// project imports
import Avatar from 'ui-component/extended/Avatar';
import { gridSpacing } from 'store/constant';

import LinesEllipsis from 'react-lines-ellipsis';
// assets
import { Link } from 'react-router-dom';
import moment from 'moment';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import UserName from '../../views/component/UserName';
import City from '../../views/component/City';
import Categories from '../../views/component/Categories';
import avatar from 'assets/images/dllalLogo.svg';

// ==============================|| SOCIAL PROFILE - GALLERY CARD ||============================== //

const DllalCard = ({ id, attributes }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.up('sm'));

    const { category, city, desc, images, title, user, updatedAt } = attributes;
    const updateAt = moment(updatedAt).fromNow();

    let cardView;
    if (matchDownMD) {
        cardView = (
            <Card
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                    borderColor: theme.palette.grey[100]
                }}
            >
                <CardContent sx={{ padding: { md: 2 } }}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                                <Grid item>
                                    <Avatar
                                        component={Link}
                                        to={`/dllal/${id}`}
                                        sx={{ width: 120, height: 90 }}
                                        alt={title}
                                        src={images?.data ? `${images?.data[0]?.attributes?.formats?.thumbnail?.url}` : avatar}
                                        variant="rounded"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={gridSpacing}>
                                        <Grid item>
                                            <Typography component={Link} to={`/dllal/${id}`} align="left" variant="h5">
                                                {title}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" spacing={0.5}>
                                                <Grid item>
                                                    <AccessTimeRoundedIcon sx={{ width: '12px', height: '12px', opacity: 0.8 }} />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="caption">{updateAt}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="caption" alignItems="center">
                                                <LinesEllipsis
                                                    text={desc.slice(0, 500)}
                                                    maxLine="2"
                                                    ellipsis="..."
                                                    trimRight
                                                    basedOn="letters"
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                        {city?.data && (
                                            <Grid item>
                                                <City city={city} />
                                            </Grid>
                                        )}
                                        {user?.data && (
                                            <Grid item>
                                                <UserName user={user} />
                                            </Grid>
                                        )}
                                        {category?.data && (
                                            <Grid item>
                                                <Categories category={category} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    } else {
        cardView = (
            <Card
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                    borderColor: theme.palette.grey[100]
                }}
            >
                <CardMedia
                    component={Link}
                    to={`/dllal/${id}`}
                    sx={{ height: 140 }}
                    image={images?.data ? `${images?.data[0]?.attributes?.formats?.thumbnail?.url}` : avatar}
                    title={title}
                />
                <CardContent>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={1}>
                                        <Grid item>
                                            <Typography component={Link} to={`/dllal/${id}`} align="left" variant="h5">
                                                {title}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems="center" spacing={0.5}>
                                                <Grid item>
                                                    <AccessTimeRoundedIcon sx={{ width: '12px', height: '12px', opacity: 0.8 }} />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="caption">{updateAt}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <LinesEllipsis text={desc.slice(0, 500)} maxLine="2" ellipsis="..." trimRight basedOn="letters" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        {city?.data && (
                            <Grid item>
                                <City city={city} />
                            </Grid>
                        )}
                        {user?.data && (
                            <Grid item>
                                <UserName user={user} />
                            </Grid>
                        )}
                        {category?.data && (
                            <Grid item>
                                <Categories category={category} />
                            </Grid>
                        )}
                    </Grid>
                </CardActions>
            </Card>
        );
    }
    return cardView;
};

DllalCard.propTypes = {
    id: PropTypes.number,
    attributes: PropTypes.object
};

export default memo(DllalCard);
