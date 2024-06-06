import React from 'react'
import { Grid } from '@mui/material'

export const CustomHeaders = ({ headers, icons }: { headers: string[]; icons: React.ReactNode[] }) => {
    return (
        <>
            {headers.map((item, index) => (
                <Grid
                    sx={{
                        color: index === 0 ? 'text.contrast' : 'grey.600',
                        pl: index === 0 ? '20px' : '0px',
                        textAlign: 'left',
                        fontWeight: '600',
                        fontSize: '12px',
                        '&:last-child': {
                            textAlign: 'center',
                        },
                        textTransform: 'uppercase',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '5px',
                        alignItems: 'top',
                    }}
                    key={index}
                    item>
                    {icons[index] && icons[index]} {item}
                </Grid>
            ))}
        </>
    )
}
