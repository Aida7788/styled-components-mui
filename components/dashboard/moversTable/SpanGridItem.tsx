import { Grid, Typography } from '@mui/material'

export const SpanGridItem = ({
    center,
    spanLabel,
    secondSpanLabel,
    hasInfoIcon,
    path,
    hasMargin,
    hasMoreMargin,
    givenColor,
}: {
    center?: boolean
    spanLabel: string
    secondSpanLabel?: string
    hasInfoIcon?: boolean
    path?: string
    hasMargin?: boolean
    hasMoreMargin?: boolean
    givenColor?: string
}) => {
    return (
        <Grid
            item
            sx={{
                fontSize: '14px',
                fontWeight: '400',
                color: givenColor ? givenColor : '#000000',
                textAlign: 'center',
                ml: hasMargin ? -4 : hasMoreMargin ? -8 : 0,
            }}
        >
            {path && (
                <img
                    style={{
                        marginRight: 8,
                        marginBottom: -6,
                        height: '21px',
                        width: '27px',
                        borderRadius: '32px',
                    }}
                    src={path}
                    alt={path ? path : 'grid item'}
                />
            )}
            {spanLabel}
            {secondSpanLabel && (
                <Typography
                    sx={{
                        fontSize: '14px',
                        fontWeight: '400',
                        color: 'text.contrast',
                        textAlign: secondSpanLabel ? 'center' : 'start',
                    }}
                >
                    {secondSpanLabel}
                </Typography>
            )}
            {hasInfoIcon && <img style={{ marginLeft: 8, marginBottom: -4 }} src="/static/Group.svg" alt="info icon" />}
        </Grid>
    )
}
