import {
    Link,
    Skeleton,
    SxProps,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography,
} from '@mui/material'
import { useEffect, useState, type FC } from 'react'

import { API } from 'src/services/adminApi'
import { IUser } from 'src/types/local/user'

const EVENT_TYPES = {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY',
    PRICE_DROP_ALERTS: 'PRICE_DROP_ALERTS',
    DROP_CHECKER_ALERTS: 'DROP_CHECKER_ALERTS',
    LOW_INVENTORY_ALERTS: 'LOW_INVENTORY_ALERTS',
}

type TEventsTableProps = {
    user: IUser
}

const EventsTable: FC<TEventsTableProps> = ({ user }) => {
    const [isLoading, setIsLoading] = useState(true)

    const [events, setEvents] = useState([])
    const [currentTab, setCurrentTab] = useState(EVENT_TYPES.PRIMARY)

    useEffect(() => {
        if (user) {
            getEvents()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, currentTab])

    const getEvents = async () => {
        setIsLoading(true)

        let events = []

        switch (currentTab) {
            case EVENT_TYPES.PRIMARY:
                events = await API.getUserPrimaryFavorites(user._id)
                break
            case EVENT_TYPES.SECONDARY:
                events = await API.getUserSecondaryFavorites(user._id)
                break
            case EVENT_TYPES.PRICE_DROP_ALERTS:
                events = await API.getUserPriceDropAlerts(user._id)
                break
            case EVENT_TYPES.DROP_CHECKER_ALERTS:
                events = await API.getUserDropCheckerAlerts(user._id)
                break
            case EVENT_TYPES.LOW_INVENTORY_ALERTS:
                events = await API.GetUserLowInventoryAlerts(user._id)
                break
            default:
                break
        }
        setIsLoading(false)
        setEvents(events)
    }

    const tabSx: SxProps = {
        height: '40px',
        fontSize: '14px',
        backgroundColor: '#FFFFFF',
        color: '#1D2939',
        textTransform: 'none',
        '&.Mui-selected': {
            color: '#1D2939',
            backgroundColor: '#EFF0F1',
        },
    }

    return (
        <>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>{`Fetch Count ${user.fetch_count || 0}/50`}</Typography>
            <Tabs
                value={currentTab}
                variant="fullWidth"
                sx={{
                    borderBottom: 1,
                    borderRadius: '12px',
                    borderColor: 'divider',
                    '.MuiTabs-indicator': {
                        backgroundColor: 'transparent',
                    },

                    '.MuiTabs-flexContainer': {
                        justifyContent: 'left',
                    },
                    '.MuiTabs-scroller': {
                        overflow: 'hidden',
                    },
                    marginBottom: '30px',
                }}
            >
                <Tab
                    value={EVENT_TYPES.PRIMARY}
                    label="Primary events"
                    onClick={() => {
                        setCurrentTab(EVENT_TYPES.PRIMARY)
                    }}
                    sx={tabSx}
                />
                <Tab
                    value={EVENT_TYPES.SECONDARY}
                    label="Secondary events"
                    onClick={() => {
                        setCurrentTab(EVENT_TYPES.SECONDARY)
                    }}
                    sx={tabSx}
                />
                <Tab
                    value={EVENT_TYPES.PRICE_DROP_ALERTS}
                    label="Price drop alerts"
                    onClick={() => {
                        setCurrentTab(EVENT_TYPES.PRICE_DROP_ALERTS)
                    }}
                    sx={tabSx}
                />
                <Tab
                    value={EVENT_TYPES.DROP_CHECKER_ALERTS}
                    label="Drop checker alerts"
                    onClick={() => {
                        setCurrentTab(EVENT_TYPES.DROP_CHECKER_ALERTS)
                    }}
                    sx={tabSx}
                />
                <Tab
                    value={EVENT_TYPES.LOW_INVENTORY_ALERTS}
                    label="Low inventory alerts"
                    onClick={() => {
                        setCurrentTab(EVENT_TYPES.LOW_INVENTORY_ALERTS)
                    }}
                    sx={tabSx}
                />
            </Tabs>
            <TableContainer sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                        <TableRow>
                            <TableCell>Event name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: '#FFFFFF' }}>
                        {isLoading ? (
                            <SkeletonTableBody />
                        ) : (
                            events.map((event) => {
                                const platformToShow =
                                    event?.meta?.otherPlatforms.find(({ type }) => type === 'Primary') ||
                                    event?.meta?.otherPlatforms.find(({ type }) => type === 'Primary Others') ||
                                    event?.meta?.otherPlatforms.find(({ type }) => type && type.includes('Secondary'))
                                return (
                                    <TableRow key={event._id}>
                                        <TableCell align="left">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Link
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                    href={(platformToShow && platformToShow.url) || '#'}
                                                    sx={{
                                                        color: 'black',
                                                        textDecoration: 'none',
                                                        fontSize: '15px',
                                                        fontWeight: 500,
                                                        ':hover': { color: 'blue' },
                                                    }}
                                                >
                                                    {event.name}
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default EventsTable

const SkeletonTableBody: FC = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
