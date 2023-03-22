// material-ui
import { useTheme } from '@mui/material/styles';

import logoLight from 'assets/images/DllallogoLight.svg';
import logoDark from 'assets/images/DllalLogoDark.svg';

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return <img src={theme.palette.mode === 'dark' ? logoLight : logoDark} alt="موقع دلّال" width="30" />;
};

export default Logo;
