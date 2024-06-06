import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import SubscriptionCard from './SubscriptionCard'
type PlanType = 'monthly' | 'yearly'
const Subscrition = () => {
    const [plan, setPlan] = useState<PlanType>('monthly')
    const basicAccessibilities = [
        {
            haveAccess: true,
            name: 'Upcoming Sales Dashboard',
        },
        {
            haveAccess: true,
            name: 'Presale Codes',
        },
        {
            haveAccess: true,
            name: 'Hot Event Watchlist',
        },
        {
            haveAccess: true,
            name: 'Add to Personal Buying List',
        },
        {
            haveAccess: true,
            name: 'Artist Quick Stats Popups',
        },
        {
            haveAccess: false,
            name: 'Full Artist Metrics',
        },
        {
            haveAccess: false,
            name: 'Sold Data',
        },
        {
            haveAccess: false,
            name: 'Historical Primary Analytics',
        },
        {
            haveAccess: false,
            name: 'Historical Secondary Analytics',
        },
        {
            haveAccess: true,
            name: 'Extension - Stock Checker',
        },
        {
            haveAccess: true,
            name: 'Extension - Price Map Shader',
        },
        {
            haveAccess: false,
            name: 'Extension - Historical Primary and Secondary Analytics',
        },
        {
            haveAccess: false,
            name: 'Drop, Low and Price Alerts',
        },
    ]
    const advancedAccessibilities = [
        {
            haveAccess: true,
            name: 'Upcoming Sales Dashboard',
        },
        {
            haveAccess: true,
            name: 'Presale Codes',
        },
        {
            haveAccess: true,
            name: 'Hot Event Watchlist',
        },
        {
            haveAccess: true,
            name: 'Add to Personal Buying List',
        },
        {
            haveAccess: true,
            name: 'Artist Quick Stats Popups',
        },
        {
            haveAccess: true,
            name: 'Full Artist Metrics',
        },
        {
            haveAccess: true,
            name: '100 events Sold Data',
        },
        {
            haveAccess: true,
            name: '100 Historical, Primary & Secondary Analytics',
        },
        {
            haveAccess: true,
            name: 'Extension - Stock Checker',
        },
        {
            haveAccess: true,
            name: 'Extension - Price Map Shader',
        },
        {
            haveAccess: false,
            name: 'Extension - Historical, Primary and Secondary Analytics',
        },
        {
            haveAccess: true,
            name: '100 TicketMaster Alerts',
        },
        {
            haveAccess: true,
            name: '25 AXS Alerts',
        },
        {
            haveAccess: true,
            name: '170 My Primary & Secondary Favorites',
        },
    ]
    const professionalAccessibilities = [
        {
            haveAccess: true,
            name: 'Access to All Lower Tier Features',
        },
        {
            haveAccess: true,
            name: 'All Sold Data',
        },
        {
            haveAccess: true,
            name: 'All Historical Primary & Secondary Analytics',
        },
        {
            haveAccess: true,
            name: '200 TicketMaster Drop Alerts',
        },
        {
            haveAccess: true,
            name: '300 TicketMaster Inventory Alerts',
        },
        {
            haveAccess: true,
            name: '40 AXS Alerts',
        },
        {
            haveAccess: true,
            name: '600 My Primary & Secondary Favorites',
        },
    ]
    const enterpriseAccessibilities = [
        {
            haveAccess: true,
            name: 'Access to All Lower Tier Features',
        },
        {
            haveAccess: true,
            name: 'All Sold Data',
        },
        {
            haveAccess: true,
            name: 'All Historical Primary & Secondary Analytics',
        },
        {
            haveAccess: true,
            name: 'Extension - Historical, Primary & Secondary Analytics',
        },
        {
            haveAccess: true,
            name: '400 TicketMaster Drop Alerts',
        },
        {
            haveAccess: true,
            name: '700 Low Inventory Alerts',
        },
        {
            haveAccess: true,
            name: '50 AXS Drop Alerts',
        },
        {
            haveAccess: true,
            name: '50 AXS Low Inventory Alerts',
        },
        {
            haveAccess: true,
            name: '1200 My Primary & Secondary Favorites',
        },
    ]
    return (
        <Grid width={'100%'} container my={4}>
            <Box
                mx={'auto'}
                bgcolor={'#fff'}
                py={'40px'}
                borderRadius={'12px'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Typography color={'#13263C'} textAlign={'center'} fontSize={32} fontWeight={600}>
                    Choose Your Plan
                </Typography>
                <Box
                    width={'170px'}
                    borderRadius={'8px'}
                    border={'1px solid #ccc'}
                    mx={'auto'}
                    mt={4}
                    display={'flex'}
                    justifyContent={'space-between'}
                    p={0.4}
                    mb={8}
                >
                    <Button
                        sx={{
                            px: '15px',
                            py: '7px',
                            borderRadius: '3px',
                            bgcolor: plan === 'monthly' ? '#000' : '#fff',
                            color: plan === 'monthly' ? '#fff' : '#000',
                            ':hover': { color: '#000' },
                        }}
                        onClick={() => setPlan('monthly')}
                    >
                        Monthy
                    </Button>
                    <Button
                        sx={{
                            px: '15px',
                            py: '7px',
                            borderRadius: '3px',
                            bgcolor: plan === 'yearly' ? '#000' : '#fff',
                            color: plan === 'yearly' ? '#fff' : '#000',
                            ':hover': { color: '#000' },
                        }}
                        onClick={() => setPlan('yearly')}
                    >
                        Yearly
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        gap: {
                            xs: 'unset',
                            sm: 'unset',
                            md: '1.5rem',
                            lg: '3rem',
                        },
                        '@media (max-width: 1368px)': {
                            gap: '1rem',
                        },
                    }}
                >
                    <SubscriptionCard
                        name="basic"
                        description="Ideal for newer brokers who want to start with the basics."
                        price={plan === 'yearly' ? (99 - (99 * 20) / 100).toFixed() : 99}
                        accessibilities={basicAccessibilities}
                        plan={plan}
                    />
                    <SubscriptionCard
                        name="advanced"
                        description="For all advanced brokers ready to
                            up their game through analytics"
                        price={plan === 'yearly' ? (189 - (189 * 20) / 100).toFixed() : 189}
                        accessibilities={advancedAccessibilities}
                        plan={plan}
                    />
                    <SubscriptionCard
                        name="professional"
                        description="For professionals ready to dominate the secondary market"
                        price={plan === 'yearly' ? (249 - (249 * 20) / 100).toFixed() : 249}
                        accessibilities={professionalAccessibilities}
                        plan={plan}
                    />
                    <SubscriptionCard
                        name="enterprise"
                        description="For established brokers seeking comprehensive alerts and tracking"
                        price={plan === 'yearly' ? (374 - (374 * 20) / 100).toFixed() : 374}
                        accessibilities={enterpriseAccessibilities}
                        plan={plan}
                    />
                </Box>
                <Divider color="#ccc" sx={{ my: 4 }} />
                <Typography color={'#000'} fontSize={18} fontWeight={500}>
                    Sign up for our professional plan or higher to access advanced analytics, tools, and many valuable
                    features.
                </Typography>
                <Box display={'flex'} gap={'32px'} mt={4}>
                    <Button
                        sx={{
                            px: '15px',
                            py: '7px',
                            borderRadius: '5px',
                            color: '#F5F7F6',
                            bgcolor: '#000',
                            ':hover': { color: '#000' },
                        }}
                    >
                        Upgrade Plan
                    </Button>
                    <Button
                        sx={{
                            px: '15px',
                            py: '7px',
                            borderRadius: '5px',
                            color: '#F5F7F6',
                            bgcolor: '#000',
                            ':hover': { color: '#000' },
                        }}
                    >
                        Cancel Plan
                    </Button>
                </Box>
            </Box>
        </Grid>
    )
}
export default Subscrition
