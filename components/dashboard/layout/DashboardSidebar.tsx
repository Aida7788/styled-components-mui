import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'
import ListAltIcon from '@mui/icons-material/ListAlt'
import type { Theme } from '@mui/material'
import { Avatar, Box, Button, Drawer, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import PropTypes from 'prop-types'
import type { FC, ReactNode, SetStateAction } from 'react'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import useAuth from 'src/hooks/useAuth'
import DefaultAvatar from 'src/icons/DefaultAvatar'
import NavSection from '../../general/NavSection'
import Scrollbar from '../../general/Scrollbar'

interface DashboardSidebarProps {
    onMobileClose: () => void
    openMobile: boolean
    collapsed: boolean
    setCollapsed: React.Dispatch<SetStateAction<boolean>>
}

const pathsFilters = {
    firstPresale: `/dashboard/upcoming?event_presale=first_presale&date=${new Date().toISOString()}`,
    presaleToday: `/dashboard/upcoming?event_presale=all_presales&date=${new Date().toISOString()}`,
    firstTomorrow: `/dashboard/upcoming?event_presale=first_presale&date=${new Date(
        new Date().setDate(new Date().getDate() + 1)
    ).toISOString()}`,
    presaleTomorrow: `/dashboard/upcoming?event_presale=all_presale&date=${new Date(
        new Date().setDate(new Date().getDate() + 1)
    ).toISOString()}`,
    onSaleToday: `/dashboard/upcoming?event_presale=public_without_presale,sale_after_presale&date=${new Date().toISOString()}`,
    onSaleTomorrow: `/dashboard/upcoming?event_presale=public_without_presale,sale_after_presale&date=${new Date(
        new Date().setDate(new Date().getDate() + 1)
    ).toISOString()}`,
    specialPresale: `/dashboard/upcoming?event_presale=presale_after_sale&date=${new Date().toISOString()}`,
    specialPromotion: `/dashboard/upcoming?event_presale=presale_after_sale&date=`,
}
const sectionsUpcoming = [
    {
        title: '',
        items: [
            {
                icon: <ListAltIcon />,
                title: 'General',
                path: '/dashboard',
                children: [
                    { title: 'Watch List', path: '/dashboard/upcoming/watchlist' },
                    { title: 'My Buying List', path: '/dashboard/upcoming/buying_list' },
                    // { title: 'VF Signups', path: '/dashboard/upcoming/vf_signups' },
                ],
            },
            // {
            //     icon: <EditCalendarIcon />,
            //     title: 'Upcoming - Quick Filter',
            //     path: '/dashboard',
            //     tooltip: 'Quick Filter',
            //     children: [
            //         { title: 'First Presale Today', path: pathsFilters.firstPresale },
            //         { title: 'Presale Today', path: pathsFilters.presaleToday },
            //         { title: 'First Presale Tomorrow', path: pathsFilters.firstTomorrow },
            //         { title: 'Presale Tomorrow', path: pathsFilters.presaleTomorrow },
            //         { title: 'Onsale Today', path: pathsFilters.onSaleToday },
            //         { title: 'Onsale Tomorrow', path: pathsFilters.onSaleTomorrow },
            //         // { title: 'Special Presale', path: pathsFilters.specialPresale },
            //         { title: 'Special Promotion', path: pathsFilters.specialPromotion },
            //     ],
            // },
        ],
    },
]
const sectionsAnalytics = [
    {
        title: '',
        items: [
            // {
            //     icon: <BarChartOutlinedIcon />,
            //     title: 'Primary Analytics',
            //     path: '/dashboard/analytics',
            //     children: [
            //         {
            //             title: 'All Sellouts',
            //             path: '/dashboard/primary-sellout',
            //             hover: 'View all events that are at least 95% sold out on the primary market.',
            //         },
            //         {
            //             title: 'Weekly Sellouts',
            //             path: '/dashboard/primary-sellout-weekly',
            //             hover: 'Discover events that recently sold out on their first presale and grab tickets during future presales or  public sales.',
            //         },
            //         {
            //             title: 'Top Movers',
            //             path: '/dashboard/primary-top-movers',
            //             hover: 'Discover top moving events by the most tickets  sold or highest percentage change on the primary  market.',
            //         },
            //     ],
            // },
            // {
            //     icon: <ShowChartOutlinedIcon />,
            //     title: 'Secondary Analytics',
            //     path: '/dashboard/#',
            //     children: [
            //         {
            //             title: 'Top Movers',
            //             path: '/dashboard/secondary-top-movers',
            //             hover: 'Explore events with the highest ticket sales on the secondary market. Note: This does not indicate their status of being sold out on the primary market.',
            //         },
            //         {
            //             title: 'Percentage Leaders',
            //             path: '/dashboard/percentage-leader',
            //             hover: 'Discover events that are at least 95% sold out on the primary market and have the fewest tickets remaining on the secondary market.',
            //         },
            //         {
            //             title: 'Top Price Surge',
            //             path: '/dashboard/top-price-surge',
            //             hover: 'Discover events that have experienced significant price surges from their original primary prices',
            //         },
            //     ],
            // },
            {
                icon: <EventAvailableOutlinedIcon />,
                title: 'My Primary Favorites',
                path: '/dashboard/primary-favorites',
                hover: 'Save and track your favorite events on the primary market. You can also perform and view actions such as drop checkers and low inventory alerts for your favorites.',
                tooltip: 'My Primary Favorites',
                // children: [
                //     {
                //         title: 'Saves',
                //         path: '/dashboard/primary-favorites',
                //         hover: 'Save and track your favorite events on the primary market. You can also perform and view actions such as drop checkers and low inventory alerts for your favorites.',
                //     },
                //     { title: 'AXS Saved', path: '/dashboard/#' },
                //     // { title: 'Low Inventory Alerts', path: '/dashboard/#' },
                // ],
            },
            {
                icon: <EventOutlinedIcon />,
                title: 'My Secondary Favorites ',
                path: '/dashboard/secondary-favorites',
                hover: 'Save and track your favorite events on the secondary market. You can also perform and view actions such as price drop alerts for your favorites.',
                tooltip: 'My Secondary Favorites',
                // children: [
                //     {
                //         title: 'Saves',
                //         path: '/dashboard/secondary-favorites',
                //         hover: 'Save and track your favorite events on the secondary market. You can also perform and view actions such as price drop alerts for your favorites.',
                //     },
                //     { title: 'AXS Saved', path: '/dashboard/#' },
                // ],
            },
        ],
    },
]
const sectionsAdmin = [
    {
        title: '',
        items: [
            {
                icon: <ListAltIcon />,
                title: 'General',
                path: '/dashboard/#',
                children: [
                    {
                        title: 'Subscription management',
                        path: '/dashboard/admin/subscription-management',
                        hover: 'Manage users subscription',
                    },
                    {
                        title: 'Tier management',
                        path: '/dashboard/admin/tier-management',
                        hover: 'Manage tiers',
                    },
                ],
            },
        ],
    },
]

// const paths = [
//     '/dashboard/event_analytics',
//     '/dashboard/primary-analytics',
//     '/dashboard/secondary-analytics',
//     '/dashboard/primary-sellout',
//     '/dashboard/primary-sellout-weekly',
//     '/dashboard/primary-sellout-weekly',
//     '/dashboard/primary-top-movers',
//     '/dashboard/secondary-top-movers',
//     '/dashboard/percentage-leader',
//     '/dashboard/top-price-surge',
//     '/dashboard/primary-favorites',
//     '/dashboard/metric',
//     pathsFilters.firstPresale,
//     pathsFilters.presaleToday,
//     pathsFilters.firstTomorrow,
//     pathsFilters.presaleTomorrow,
//     pathsFilters.onSaleToday,
//     pathsFilters.onSaleTomorrow,
// ]

interface dashboardSections {
    title: string
    items: {
        icon: ReactNode
        title: string
        path: string
        children?: { title: string; hover?: string; path: string }[]
    }[]
}

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
    const { onMobileClose, openMobile, collapsed, setCollapsed } = props
    const { user } = useAuth()
    const [sections, setSections] = useState<dashboardSections[]>([
        {
            title: '',
            items: [{ icon: '', title: '', path: '' }],
        },
    ])
    const [hoveredProfilePicture, setHoveredProfilePicture] = useState<boolean>()
    const location = useLocation()
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
    useEffect(() => {
        if (openMobile && onMobileClose) onMobileClose()

        if (location.pathname.includes('/dashboard/upcoming')) {
            setSections(sectionsUpcoming)
        } else if (
            location.pathname.includes('/dashboard/event_analytics') ||
            location.pathname.includes('/dashboard/secondary-analytics') ||
            location.pathname.includes('/dashboard/primary-analytics') ||
            location.pathname.includes('/dashboard/primary-favorites') ||
            location.pathname.includes('/dashboard/secondary-favorites') ||
            location.pathname.includes('/dashboard/user') ||
            location.pathname.includes('/dashboard/metric')
        ) {
            setSections(sectionsAnalytics)
        } else if (location.pathname.includes('/dashboard/admin')) {
            setSections(sectionsAdmin)
        } else setSections(sectionsUpcoming)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])
    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                zIndex: '1600',
                backgroundImage: 'linear-gradient(to bottom, #0C1D42, #061536)',
                width: collapsed ? 70 : 240,
                marginTop: { xs: '64px', lg: 'unset' },
            }}
        >
            <Scrollbar>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {sections.map((section) => {
                        return (
                            <NavSection
                                key={section.title}
                                pathname={location.pathname + location.search}
                                collapsed={collapsed}
                                setCollapsed={setCollapsed}
                                {...section}
                            />
                        )
                    })}
                </Box>
            </Scrollbar>
            {lgUp && (
                <Box
                    sx={{
                        mx: 'auto',
                        pb: '5px',
                        pt: '15px',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Button
                        onClick={() => setCollapsed(!collapsed)}
                        sx={{
                            backgroundColor: '#0D2459',
                            color: '#FFFFFF',
                            ...(collapsed && { width: '50%' }),
                        }}
                    >
                        {!collapsed ? (
                            <KeyboardDoubleArrowLeftOutlinedIcon />
                        ) : (
                            <KeyboardDoubleArrowRightOutlinedIcon />
                        )}
                    </Button>
                </Box>
            )}
            <Box
                component={RouterLink}
                to="/dashboard/user"
                sx={{
                    flex: '1',
                    display: 'flex',
                    px: '8px',
                    alignItems: 'center',
                    gap: '1rem',
                    borderTop: '2px solid #475467',
                    py: '14px',
                    textDecoration: 'none',
                    ...(collapsed && { justifyContent: 'center' }),
                    '&:hover': { bgcolor: '#0D2459' },
                    position: 'relative',
                }}
                onMouseEnter={() => setHoveredProfilePicture(true)}
                onMouseLeave={() => setHoveredProfilePicture(false)}
            >
                <Box>
                    {user.avatar !== undefined && user.avatar !== '' ? (
                        <Avatar
                            src={user.avatar}
                            sx={{
                                height: 40,
                                width: 40,
                                position: 'relative',
                            }}
                        />
                    ) : (
                        <DefaultAvatar sx={{ width: 40, height: 40 }} />
                    )}
                </Box>
                {!collapsed && (
                    <Typography
                        component={'span'}
                        sx={{
                            fontSize: '13px',
                            fontWeight: '700',
                            color: 'primary.main',
                            display: 'inline',
                            wordBreak: 'break-all',
                        }}
                    >
                        {user?.username}
                    </Typography>
                )}
                <Box
                    sx={{
                        display: hoveredProfilePicture ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'rgba(30,30,30,.8)',
                        zIndex: '1600',
                        p: '10px',
                        top: '-50px',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '500',
                    }}
                >
                    User Profile
                </Box>
            </Box>
        </Box>
    )
    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'background.paper',
                        height: 'calc(100% - 64px) !important',
                        top: '64px !Important',
                        borderRight: 'unset !important',
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        )
    } else {
        setCollapsed(false)
        return (
            <Drawer
                anchor="left"
                onClose={onMobileClose}
                open={openMobile}
                PaperProps={{ sx: { backgroundColor: 'background.paper', width: 240 } }}
                variant="temporary"
            >
                {content}
            </Drawer>
        )
    }
}
DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool,
}
export default DashboardSidebar
