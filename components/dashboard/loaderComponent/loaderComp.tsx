import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export function LoaderComponent() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
            <CircularProgress sx={{ color: 'background.layout' }} />
        </Box>
    )
}
