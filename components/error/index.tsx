import { Box, Button, Link, Typography } from '@mui/material'

export const FallbackRender = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100dvh',
                backgroundColor: 'background.paper',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                }}
            >
                <Typography align="center" color="textPrimary" variant={'h2'}>
                    Something went wrong...
                </Typography>
                <Typography align="center" color="textPrimary" variant="subtitle2">
                    We apologize for the inconvenience, but our site is currently down for maintenance. We will be back
                    very soon. Thank you for your patience!
                </Typography>
                <Link href="/">
                    <Button>Go home</Button>
                </Link>
                <img
                    style={{ width: '90%', margin: 'auto' }}
                    alt="Under development"
                    src={`/static/error/error500_dark.svg`}
                />
            </Box>
        </Box>
    )
}
