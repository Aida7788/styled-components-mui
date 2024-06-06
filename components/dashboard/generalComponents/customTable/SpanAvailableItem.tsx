import { Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Box } from '@mui/material'
import { convertDate } from 'src/utils/dataFormatters'
import { Link } from '@mui/material'

export const SpanAvailableItem = ({
                                      spanLabel,
                                      leftIcon,
                                      rightIcon,
                                      link,
                                      lastFetched,
                                      center = false,
                                      id,
                                  }: {
    spanLabel: string | undefined;
    lastFetched?: string;
    center?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    link?: string;
    id?: string;
}) => {
    const [showPopUp, setShowPopUp] = useState(false)
    let content

    if (leftIcon || rightIcon) {
        content = (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#AAAAAA',
                    position: 'relative',
                }}>
                {leftIcon}
                <Link sx={{ color: 'blue' }} href={`${link}/${id}`}>
                    {spanLabel}
                </Link>
                <Box onMouseLeave={() => setShowPopUp(false)} onMouseEnter={() => setShowPopUp(true)}>
                    {rightIcon}
                </Box>
                <Box
                    sx={{
                        display: showPopUp ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'background.layout',
                        height: '60px',
                        width: '220px',
                        zIndex: '100',
                        p: '10px',
                        top: '35px',
                        borderRadius: '4px',
                        color: 'white',
                    }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>Last Fetched</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>{convertDate(lastFetched)}</Typography>
                </Box>
            </Box>
        )
    }
    return (
        <Grid
            item
            sx={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'text.contrast',
                textAlign: center ? 'center' : 'start',
            }}>
            {content}
        </Grid>
    )
}
