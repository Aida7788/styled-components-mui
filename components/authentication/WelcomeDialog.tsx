import { useState } from 'react'
import { Dialog, Button, Box, Typography } from '@mui/material'
import { API } from 'src/services/userApi'

export const WelcomeDialog = () => {
    const [open, setOpen] = useState(true)

    const handleClose = async () => {
        await API.updateUser({ notFirstSeen: true })
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="welcome-dialog-title"
            aria-describedby="welcome-dialog-description"
        >
            <Box
                sx={{
                    bgcolor: 'background.white',
                    p: '25px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '550px',
                    gap: '20px',
                }}
            >
                <Box>
                    <Typography sx={{ mx: 'auto', fontSize: '20px', fontWeight: '500', textAlign: 'center' }}>
                        Welcome to Ticketmetric!
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
                            To ensure the best viewing experience, our platform is optimized for monitor displays. If
                            you're using a laptop, you can adjust your screen size by pressing "Ctrl -" to zoom out. We
                            recommend setting your zoom level to 75% or 80% for optimal display on a laptop. Feel free
                            to adjust it to fit your screen perfectly!
                        </Typography>
                    </Box>
                </Box>

                <Button
                    type="submit"
                    onClick={handleClose}
                    sx={{ width: '80px', bgcolor: 'black', ':hover': { bgcolor: 'black' } }}
                >
                    Close
                </Button>
            </Box>
        </Dialog>
    )
}
