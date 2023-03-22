import { useParams } from 'react-router-dom';
// material-ui
import { Grid } from '@mui/material';
import EditDllalForms from './EditDllalForms';
// project imports

const EditDllal = () => {
    const { id } = useParams();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <EditDllalForms id={id} />
            </Grid>
        </Grid>
    );
};

export default EditDllal;
