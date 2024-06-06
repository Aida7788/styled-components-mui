import { Grid, Typography } from '@mui/material';

const UserProfileBox = ({ heading, value, planLimit }: { heading; value; planLimit }) => {
    return (
        <Grid
            item
            xs={4}
            sx={{
                width:'230px',
                p:'14px 20px',
                borderRadius:'17px',
                backgroundColor:'#E4933D24'
            }}
        >
            <Typography fontFamily={'Inter'} color="#495057" fontSize={14} fontWeight={400} marginBottom={'10px'}>
                {heading}
            </Typography>
            <Typography fontFamily={'Inter'} color="#495057" fontSize={20} fontWeight={700}>
                {`${value} / ${planLimit || 0}`}
            </Typography>
            
        </Grid>
    )
}

export default UserProfileBox
