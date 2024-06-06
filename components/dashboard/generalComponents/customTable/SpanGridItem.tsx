import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import CircleDown from 'src/icons/CircleDown'
import CircleUp from 'src/icons/CircleUp'

import { convertDate } from 'src/utils/dataFormatters'

export const SpanGridItem = ({
    spanLabel,
    secondSpanLabel,
    date = false,
    inputTimeZone,
    overflow,
    center = false,
    id,
    diffPercentage,
    isModal = false,
}: {
    spanLabel: string | undefined
    secondSpanLabel?: string | undefined
    date?: boolean
    overflow?: boolean
    inputTimeZone?: string
    center?: boolean
    id?: string
    diffPercentage?: string | undefined
    isModal?: boolean
}) => {
    const [percent, setPercent] = useState<any>()

    useEffect(() => {
        if (diffPercentage !== undefined && !isNaN(parseFloat(diffPercentage))) {
            setPercent(parseFloat(diffPercentage).toFixed(2))
        } else {
            setPercent('')
        }
    }, [diffPercentage])

    let content = (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {secondSpanLabel && 'Limit '}
            {date ? convertDate(spanLabel, inputTimeZone) : spanLabel}
            {percent && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {percent < 0 ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CircleDown />
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: '500',
                                }}
                            >
                                {percent}%
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CircleUp />
                            <Typography
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: '500',
                                }}
                            >
                                +{percent}%
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    )

    return (
        <Grid
            item
            sx={{
                fontSize: '14px',
                fontWeight: '400',
                color: '#000000',
                textAlign: center ? 'center' : 'start',
                textOverflow: overflow ? 'ellipsis' : 'initial',
                overflow: overflow ? 'hidden' : 'visible',
                textAlignLast: 'center',
                textTransform: 'capitalize',
                py: isModal ? '0.5rem' : 'unset',
            }}
        >
            {content}
            {secondSpanLabel && (
                <Typography
                    sx={{
                        fontSize: '14px',
                        fontWeight: '400',
                        color: 'text.contrast',
                        textOverflow: overflow ? 'ellipsis' : 'initial',
                        textAlign: center ? 'center' : 'start',
                        textTransform: 'capitalize',
                    }}
                >
                    {secondSpanLabel}
                </Typography>
            )}
        </Grid>
    )
}
