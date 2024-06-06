import { Box, Select, Typography } from '@mui/material'
import React from 'react'

interface ModalSelectProps {
    handleChange?: (event: any, child: React.ReactNode) => void
    label: string
    children: React.ReactNode
    multiple?: boolean
    value?: any
    disabled?: boolean
}

export default function ModalSelect({
    disabled = false,
    value,
    handleChange,
    multiple,
    children,
    label,
}: ModalSelectProps) {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>{label}</Typography>
                <Select
                    disabled={disabled}
                    value={value}
                    multiple={multiple}
                    placeholder="All"
                    onChange={handleChange}
                    defaultValue={['none']}
                    renderValue={multiple ? (selected) => Array.isArray(selected) && selected.join(', ') : undefined}
                    sx={{
                        bgcolor: 'white',
                        border: 1,
                        borderColor: 'grey.400',
                        width: '100%',
                        borderRadius: '6px',
                        height: '45px',
                    }}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                maxWidth: '50%',
                            },
                        },
                    }}
                >
                    {children}
                </Select>
            </Box>
        </>
    )
}
