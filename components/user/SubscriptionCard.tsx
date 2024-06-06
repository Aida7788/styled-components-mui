import { Box, Button, Typography } from '@mui/material'
import CrossIcon from 'src/icons/Cross'
import TickIcon from 'src/icons/Tick'

const SubscriptionCard = ({
    name,
    description,
    price,
    accessibilities,
    plan,
}: {
    name: string
    description: string
    price: any
    accessibilities: Array<any>
    plan: string
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                borderRadius: '18px',
                border: '3px solid #1d2471',
                maxWidth: {
                    xs: '100%',
                    sm: '100%',
                    md: '290px',
                    lg: '370px',
                },
                '@media (max-width: 1368px)': {
                    maxWidth: '290px',
                },
                padding: '2rem',
                height: 'fit-content',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                <Box
                    sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}
                >
                    <Typography
                        sx={{
                            backgroundColor: '#f1f1f1',
                            color: '#000d32',
                            fontWeight: '600',
                            fontSize: '14.77px',
                            width: 'fit-content',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                        }}
                    >
                        {name.toUpperCase()}
                    </Typography>
                    {name === 'professional' && (
                        <Typography
                            sx={{
                                backgroundColor: '#a9b4fc',
                                color: '#001268',
                                fontSize: '14.77px',
                                fontWeight: '500',
                                width: 'fit-content',
                                height: 'min-content',
                                borderRadius: '6px',
                                padding: '0rem 1rem',
                            }}
                        >
                            Popular
                        </Typography>
                    )}
                </Box>
                <Typography
                    sx={{
                        fontSize: '20px',
                        fontWeight: '400',
                    }}
                >
                    {description}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderBottom: '1px solid #adb7d5',
                    borderTop: '1px solid #adb7d5',
                    padding: '0.5rem 0rem',
                }}
            >
                <Typography sx={{ fontSize: '66px', fontWeight: '700' }}>${price}</Typography>
                {plan === 'yearly' ? (
                    <Typography sx={{ opacity: '0.5' }}>*Billed annually at ${price * 12}</Typography>
                ) : (
                    <Typography sx={{ fontSize: '14px', fontWeight: '600', color: '#303131' }}>
                        Per member, Per month
                    </Typography>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                }}
            >
                {accessibilities.map((accessibility: { haveAccess: boolean; name: string }) => {
                    return (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.3rem', alignItems: 'center' }}>
                            {accessibility.haveAccess ? <TickIcon /> : <CrossIcon />}
                            <Typography>{accessibility.name}</Typography>
                        </Box>
                    )
                })}
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
                <Button
                    sx={{
                        px: '15px',
                        py: '7px',
                        borderRadius: '3px',
                        bgcolor: '#f1f1f1',
                        color: '#000',
                        ':hover': { color: '#FFF', backgroundColor: '#1d2471' },
                    }}
                >
                    Upgrade
                </Button>
            </Box>
        </Box>
    )
}

export default SubscriptionCard
