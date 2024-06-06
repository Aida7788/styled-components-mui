import { Box, Typography } from '@mui/material'
import { ComponentType, createElement } from 'react'

interface Props {
    socialName?: string
    icon?: ComponentType<any>
    fontSizeCustom?: number
    counts?: {
        text: string
        count: string
    }[]
    customBackgroundLine: string
}

const StatisticsBox = ({ icon, socialName, counts, fontSizeCustom = 10, customBackgroundLine }: Props) => {
    return (
        <Box
            sx={{
                border: '1px solid #C3CACF',
                borderRadius: '10px',
                height: '20vh',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    borderBottom: '1px solid #C3CACF',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: '600',
                    py: '0.5rem',
                }}
            >
                {icon && createElement(icon)}
                <Typography fontSize={fontSizeCustom} fontWeight={600}>
                    {socialName}
                </Typography>
            </Box>

            {counts &&
                counts.map((countData, index) => (
                    <Box key={index}>
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '97%',
                                height: '2px',
                                background: customBackgroundLine,
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', py: '0.2rem', px: '1rem' }}>
                            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>{countData.text}</Typography>
                                <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
                                    {countData.count ? countData.count : 0}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ))}
        </Box>
    )
}

export default StatisticsBox
