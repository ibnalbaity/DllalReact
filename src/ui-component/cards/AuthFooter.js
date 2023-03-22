// material-ui
import { Link, Stack, Typography } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://dllal.net" target="_blank" underline="hover">
            dllal.net
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://dllal.net" target="_blank" underline="hover">
            &copy;دلّال
        </Typography>
    </Stack>
);

export default AuthFooter;
