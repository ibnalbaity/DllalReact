import PropTypes from 'prop-types';

// material-ui
import { Divider, Grid, Stack, Tooltip } from '@mui/material';

// third-party
import ReactMarkdown from 'react-markdown';
import {
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';
import { useLocation } from 'react-router-dom';
import { BASE_SITE } from '../../../config';

// project imports

// assets

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const DllalInfo = ({ attributes }) => {
    const location = useLocation();
    const { pathname } = location;
    const { desc, title } = attributes;
    const shareUrl = `${BASE_SITE}${pathname}`;
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="end" spacing={1}>
                    <Tooltip title="مشاركة الإعلان على واتساب">
                        <>
                            <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                        </>
                    </Tooltip>
                    <Tooltip title="مشاركة الإعلان على تيلجرام">
                        <>
                            <TelegramShareButton url={shareUrl} title={title}>
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>
                        </>
                    </Tooltip>
                    <Tooltip title="مشاركة الإعلان على فيسبوك">
                        <>
                            <FacebookShareButton url={shareUrl} quote={title}>
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                        </>
                    </Tooltip>
                    <Tooltip title="مشاركة الإعلان على تويتر">
                        <>
                            <TwitterShareButton url={shareUrl} title={title}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </>
                    </Tooltip>
                    {/* <Avatar variant="rounded" sx={{ bgcolor: 'grey.200', color: 'grey.800' }}>
                    <FavoriteBorderIcon />
                    </Avatar> */}
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <ReactMarkdown>{desc}</ReactMarkdown>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
    );
};

DllalInfo.propTypes = {
    attributes: PropTypes.object
};

export default DllalInfo;
