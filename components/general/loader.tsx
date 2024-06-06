import { Typography } from '@mui/material'
import { Backdrop, CircularProgress } from '@mui/material'

const Loader = ({ label }: { label?: string }) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
            open>
            <CircularProgress color="inherit" />
            {label &&
                <Typography sx={{ color: 'text.default', fontWeight: '700', fontSize: '22px' }}>{label}</Typography>}
        </Backdrop>
    )
}

export default Loader
