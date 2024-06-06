import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
    heading?: string
    subHeading?: string
    flag?: React.ReactNode
}

const ArtistBox = ({ heading, subHeading, flag }: Props) => {
    return (
        <Box bgcolor="#fafafa" border="1px dashed #B2B4BD" borderRadius="6.2px" p={2} width="100%">
            <Typography color={'#3F4254'} fontSize={18} fontWeight={600} mb={2}>
                {heading}
            </Typography>

            <Box display={'flex'} gap={2} alignContent={'center'} alignItems={'center'}>
                <Typography color={'#8F8F8F'} fontSize={14} fontWeight={600}>
                    {subHeading}
                </Typography>

                {flag}
            </Box>
        </Box>
    )
}

export default ArtistBox
