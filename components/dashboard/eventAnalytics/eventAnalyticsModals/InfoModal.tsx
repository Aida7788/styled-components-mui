import { Box, Button, Typography } from '@mui/material'

export const InfoModal = ({ changeModal }) => {
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '550px',
                gap: '20px',
                zIndex: '2500',
            }}
        >
            <Box>
                <Typography sx={{ mx: 'auto', fontSize: '20px', fontWeight: '500', textAlign: 'center' }}>
                    Search Tips
                </Typography>
                <Box
                    sx={{
                        boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                        p: '10px',
                        mt: '6px',
                        bgcolor: '#ECF0F1',
                        borderRadius: '10px',
                    }}
                >
                    <Typography sx={{ mx: 'auto', fontSize: '15px', textAlign: 'start' }}>
                        For the most accurate search,
                        we recommend using event or venue URLs from Ticketmaster/Live Nation, AXS, or StubHub. (Artist
                        URL search is coming soon.)
                    </Typography>
                    <Typography sx={{ mx: 'auto', fontSize: '15px', textAlign: 'start' }}>
                        You can also search by the name of the event, tour, artist, team, or venue.
                    </Typography>
                </Box>
            </Box>

            <Button
                type="submit"
                onClick={() => {
                    changeModal('infoModal')
                }}
                sx={{ width: '80px', bgcolor: 'black', ':hover': { bgcolor: 'black' } }}
            >
                Close
            </Button>
        </Box>
    )
}
