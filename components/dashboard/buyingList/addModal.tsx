import { Box, Typography, IconButton } from '@mui/material'
import { SetStateAction } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import React from 'react'

export function AddModal({
                             open,
                             setOpen,
                             label,
                             text,
                         }: {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    label: string;
    text: string;
}) {
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',

                flexDirection: 'column',
                width: '550px',
                gap: '20px',
                zIndex: '1500',

                display: 'flex',
            }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}>
                <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>{label}</Typography>
                <IconButton
                    sx={{
                        position: 'absolute',
                        right: '0%',
                        bgcolor: 'grey.600',
                        borderRadius: '14px',
                        width: '35px',
                        height: '35px',
                    }}
                    onClick={() => setOpen(false)}>
                    <CloseIcon sx={{ fontSize: '25px', fontWeight: '800' }} />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                }}>
                <CheckCircleOutlineIcon />
                <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>{text}</Typography>
            </Box>
        </Box>
    )
}
