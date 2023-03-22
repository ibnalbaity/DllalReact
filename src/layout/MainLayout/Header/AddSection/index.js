import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box } from '@mui/material';

// project imports
// assets
import { IconSquareRoundedPlus } from '@tabler/icons';

const HeaderAvatarStyle = styled(Avatar)(({ theme }) => ({
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
    color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
    '&:hover': {
        background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
        color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
    }
}));

// ==============================|| SEARCH INPUT - MEGA MENu||============================== //

const AddSection = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const anchorRef = useRef(null);
    const handleToggle = () => {
        if (location.pathname !== '/add') {
            navigate('/add');
        }
    };

    return (
        <Box
            sx={{
                ml: 2,
                mr: 3,
                [theme.breakpoints.down('md')]: {
                    mr: 2
                }
            }}
        >
            <HeaderAvatarStyle variant="rounded" ref={anchorRef} onClick={handleToggle}>
                <IconSquareRoundedPlus stroke={1.5} size="20px" />
            </HeaderAvatarStyle>
        </Box>
    );
};

export default AddSection;
