import { Box } from '@mui/material'
import React, { SetStateAction } from 'react'
import { ModalHeader } from '../../generalComponents/ModalHeader'

export function MapModal({
    map,
    name,
    setOpen,
}: {
    map: string
    name: string
    setOpen: React.Dispatch<SetStateAction<boolean>>
}) {
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                paddingInline: '50px',
                paddingBlock: '20px',
                borderRadius: '50px',
                maxHeight: '90vh',
                marginTop: '30px',
                flexDirection: 'column',
                alignItems: 'center',
                width: '70vw',
                gap: '15px',
                zIndex: '1500',
                display: 'flex',
            }}
        >
            <ModalHeader setOpen={setOpen} type="all" label={name} />
            <img src={map} alt={name} style={{ width: '50vw' }} />
        </Box>
    )
}
