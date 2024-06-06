import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Typography } from '@mui/material'
import React, { SetStateAction } from 'react'

export function ModalHeader({
    label,
    type,
    setOpen,
    isEventLineup,
}: {
    label: string
    type: 'header' | 'icon' | 'all'
    setOpen: React.Dispatch<SetStateAction<boolean>>
    isEventLineup?: boolean
}) {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundImage:
                    isEventLineup &&
                    'linear-gradient(0.25turn, rgba(147, 106, 112, 0.44), rgba(161, 96, 105, 0.85), rgba(45, 35, 36, 0.68))',
                borderTopLeftRadius: 'inherit',
                borderTopRightRadius: 'inherit',
                paddingTop: isEventLineup && '1rem',
            }}
        >
            {type === 'header' || type === 'all' ? (
                <Typography sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>{label}</Typography>
            ) : null}
            {type === 'icon' || type === 'all' ? (
                <IconButton
                    sx={{
                        position: 'absolute',
                        mr: '-20px',
                        right: '4%',
                        borderRadius: '14px',
                        width: '35px',
                        height: '35px',
                    }}
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon sx={{ fontSize: '25px', fontWeight: '800' }} />
                </IconButton>
            ) : null}
        </Box>
    )
}
