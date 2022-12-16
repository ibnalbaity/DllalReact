import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';

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
    const anchorRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const handleToggle = () => {
        if (location.pathname !== '/add') {
            navigate('/add');
        }
    };

    return (
        <>
            <HeaderAvatarStyle variant="rounded" ref={anchorRef} onClick={handleToggle}>
                <IconSquareRoundedPlus stroke={1.5} size="20px" />
            </HeaderAvatarStyle>
        </>
    );
};

export default AddSection;
