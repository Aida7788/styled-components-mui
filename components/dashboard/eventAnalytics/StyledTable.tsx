import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
} from '@mui/material'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useState } from 'react'
import { headers } from 'src/common/constants/eventAnalytics'
import useAuth from 'src/hooks/useAuth'
import { EventType } from 'src/types/local/customTableTypes'
import { applyTimeZone } from 'src/utils/dataFormatters'
import numberWithCommas from 'src/utils/numberWithCommas'
import {
    AvailableItems,
    EventName,
    PriceDisplay,
    StyledTableCell,
    getEventWarning,
} from '../generalComponents/TableCoponents'
import { StyledActionBox } from './StyledActionBox'
import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'

const StyledTableRaw = styled(Table)(({ theme }) => ({}))

export const StyledTable = ({
    data,
    setData,
    changeModal,
    setSelectedId,
    setSelectedFiltration,
    setSelectedArtist,
    setSelectedMeta,
    setSelectedEvent,
}: {
    data: EventType[]
    setData: (data: EventType[]) => void
    changeModal
    setSelectedId
    setSelectedFiltration
    setSelectedArtist
    setSelectedMeta
    setSelectedEvent
}) => {
    const {
        user: { permissions },
    } = useAuth()

    const [refetchingId, setRefetchingId] = useState<string | null>(null)
    const [hoveredSpotifyRankId, setHoveredSpotifyRankId] = useState<any>()
    const [hoveredInfoIcon, setHoveredInfoIcon] = useState<any>()

    const updateEventLastFetchDetails = (eventId, update) => {
        setData(
            data.map((event) => {
                if (event._id === eventId) {
                    return {
                        ...event,
                        last_fetched_details: {
                            ...event.last_fetched_details,
                            ...update,
                        },
                    }
                }
                return event
            })
        )
    }

    return (
        <TableContainer sx={{ backgroundColor: 'white' }}>
            <StyledTableRaw>
                <TableHead sx={{ backgroundColor: '#0B1B3F' }}>
                    <TableRow sx={{ position: 'relative' }}>
                        <StyledTableCell sx={{ minWidth: '5px', p: 0 }} />
                        {headers.map((event, index) => {
                            return (
                                <StyledTableCell key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            gap: event.infoIcon ? '0rem' : '0.7rem',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                maxWidth: event.infoIcon ? '50px' : '83px',
                                                textAlign: 'start',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {event.name.toLocaleUpperCase()}
                                        </Typography>
                                        {event.infoIcon && (
                                            <IconButton
                                                sx={{
                                                    width: '20px',
                                                    height: '20px',
                                                    backgroundColor: 'white',
                                                    padding: '4px',
                                                    border: '1px solid #D0D5DD',
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    ':hover': {
                                                        backgroundColor: 'white',
                                                    },
                                                    color: '#E4933D',
                                                }}
                                                onMouseEnter={() => setHoveredInfoIcon(true)}
                                                onMouseLeave={() => setHoveredInfoIcon(false)}
                                            >
                                                <InfoOutlinedIcon />
                                            </IconButton>
                                        )}
                                    </Box>
                                </StyledTableCell>
                            )
                        })}
                        <Box
                            sx={{
                                display: hoveredInfoIcon ? 'block' : 'none',
                                position: 'absolute',
                                bgcolor: 'rgba(30,30,30,.8)',
                                width: '450px',
                                zIndex: '1600',
                                p: '10px',
                                top: '60px',
                                right: '140px',
                                borderRadius: '4px',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: '500',
                                textAlign: 'center',
                            }}
                        >
                            <b>First Line: </b>Displays the cheapest single ticket price on StubHub.
                            <tr />
                            <b>Second Line: </b>Displays the cheapest price for a pair or more of tickets.
                        </Box>
                        <StyledTableCell sx={{ width: '5px', p: 0 }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((event, index) => {
                        const primaryMetaPlatform =
                            event.meta.otherPlatforms.find(({ type }) => type === 'Primary') ||
                            event.meta.otherPlatforms.find(({ type }) => type === 'Primary Others')
                        const isAXS = event.meta.otherPlatforms.some((platform) => platform.marketPlace === 'axs')
                        const secondaryMetaPlatform = event.meta.otherPlatforms.find(
                            ({ type }) => type === 'Secondary' || type?.at(0) === 'Secondary'
                        )

                        return (
                            <TableRow sx={{ ':hover': { bgcolor: '#F0F0F0' } }} key={index}>
                                <TableCell sx={{ p: '0' }} />
                                <EventName
                                    elem={event}
                                    setSelectedId={setSelectedId}
                                    setSelectedItem={setSelectedArtist}
                                    setSelectedMeta={setSelectedMeta}
                                    changeModal={changeModal}
                                    infoChunk={event.artistsStat[0]}
                                    setSelectedEvent={setSelectedEvent}
                                />
                                <TableCell sx={{ paddingTop: '26px', verticalAlign: 'top' }}>
                                    <Box
                                        sx={{
                                            backgroundColor: '#ECFDF3',
                                            border: '1px solid #067647',
                                            height: '44px',
                                            width: '44px',
                                            borderRadius: 9999,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                cursor: 'default',
                                            }}
                                            onMouseEnter={() => setHoveredSpotifyRankId(event._id)}
                                            onMouseLeave={() => setHoveredSpotifyRankId(null)}
                                        >
                                            {event?.popularity ? event?.popularity?.toString() : '??'}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: hoveredSpotifyRankId === event._id ? 'block' : 'none',
                                                position: 'absolute',
                                                bgcolor: 'rgba(30,30,30,.8)',
                                                width: '90px',
                                                zIndex: '1600',
                                                p: '10px',
                                                top: '45px',
                                                left: '5px',
                                                borderRadius: '4px',
                                                color: 'white',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            Spotify Rank
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography noWrap sx={{ fontSize: '15px', fontWeight: '500' }}>
                                            {format(new Date(applyTimeZone(event.dateTime, event.timezone)), 'EEE, ', {
                                                locale: enUS,
                                            }).toUpperCase() +
                                                format(
                                                    new Date(applyTimeZone(event.dateTime, event.timezone)),
                                                    'MMM d',
                                                    {
                                                        locale: enUS,
                                                    }
                                                ).toUpperCase()}
                                        </Typography>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography noWrap sx={{ fontSize: '13.13px', color: '#595454' }}>
                                                {format(
                                                    new Date(applyTimeZone(event.dateTime, event.timezone)),
                                                    'yyyy',
                                                    {
                                                        locale: enUS,
                                                    }
                                                )}
                                            </Typography>
                                            <Typography noWrap sx={{ fontSize: '13.13px' }}>
                                                {format(
                                                    new Date(applyTimeZone(event.dateTime, event.timezone)),
                                                    '‎ / p',
                                                    { locale: enUS }
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                                            {event.venueName}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', minHeight: '100%' }}>
                                        <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                                            {`${event?.city ? event.city : 'N/A'}, ${event?.venueStateCode ? event.venueStateCode : 'N/A'}`}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            fontSize: '15px',
                                            fontWeight: '500',
                                        }}
                                        onClick={() => {
                                            if (permissions?.includes(USER_PERMISSIONS.MANAGE_CAPACITY)) {
                                                setSelectedId(event?._id)
                                                changeModal('adminModal')
                                            }
                                        }}
                                    >
                                        {numberWithCommas(
                                            (() => {
                                                if (
                                                    primaryMetaPlatform &&
                                                    primaryMetaPlatform.type === 'Primary' &&
                                                    primaryMetaPlatform.totalPlaces &&
                                                    primaryMetaPlatform.platform === 'ticketmaster' &&
                                                    primaryMetaPlatform.totalPlaces > 99
                                                ) {
                                                    return primaryMetaPlatform.totalPlaces
                                                } else {
                                                    if (secondaryMetaPlatform && secondaryMetaPlatform.totalPlaces) {
                                                        return secondaryMetaPlatform.totalPlaces
                                                    } else {
                                                        if (
                                                            primaryMetaPlatform &&
                                                            primaryMetaPlatform.type === 'Primary Others' &&
                                                            primaryMetaPlatform.totalPlaces
                                                        ) {
                                                            return primaryMetaPlatform.totalPlaces
                                                        } else {
                                                            return ''
                                                        }
                                                    }
                                                }
                                            })()
                                        )}
                                    </Typography>
                                    {getEventWarning(event)}
                                </TableCell>
                                <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
                                    <AvailableItems
                                        platform={
                                            primaryMetaPlatform && primaryMetaPlatform.platform
                                                ? [primaryMetaPlatform.platform]
                                                : []
                                        }
                                        link={'/dashboard/primary-analytics'}
                                        marketPlaceName={'ticketmaster'}
                                        elem={event}
                                        availableCount={
                                            primaryMetaPlatform &&
                                            typeof event.last_fetched_details?.primary_tickets_count !== 'undefined'
                                                ? event.last_fetched_details?.primary_tickets_count
                                                : false
                                        }
                                        Icon={
                                            <img
                                                style={{ width: 24, height: 24, borderRadius: '50%' }}
                                                src={`/static/icons/platforms/${primaryMetaPlatform?.marketPlace}.png`}
                                                alt=""
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null
                                                    currentTarget.src = '/static/logo.jpg'
                                                }}
                                            />
                                        }
                                        refetchingId={refetchingId}
                                    />
                                </TableCell>
                                <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
                                    <AvailableItems
                                        platform={['stubhub']}
                                        link={'/dashboard/secondary-analytics'}
                                        marketPlaceName={'stubhub'}
                                        availableCount={
                                            secondaryMetaPlatform &&
                                            typeof event.last_fetched_details?.secondary_tickets_count !== 'undefined'
                                                ? event.last_fetched_details?.secondary_tickets_count?.toString()
                                                : false
                                        }
                                        elem={event}
                                        Icon={
                                            <img
                                                style={{ width: 24, height: 24, borderRadius: '50%' }}
                                                src={`/static/icons/platforms/stubhub.png`}
                                                alt=""
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null
                                                    currentTarget.src = '/static/logo.jpg'
                                                }}
                                            />
                                        }
                                        isUserCanAddMatchUrl={permissions?.includes(
                                            USER_PERMISSIONS.MANAGE_ADD_MATCH_URL
                                        )}
                                        changeModal={changeModal}
                                        setSelected={setSelectedId}
                                        setSelectedMeta={setSelectedMeta}
                                        refetchingId={refetchingId}
                                    />
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top', width: '80px' }}>
                                    <PriceDisplay
                                        value={
                                            typeof event.last_fetched_details?.secondary_minimum_price === 'number'
                                                ? '$' + event.last_fetched_details?.secondary_minimum_price
                                                : null
                                        }
                                        secondValue={
                                            typeof event.last_fetched_details?.secondary_get_in_price2 === 'number'
                                                ? '$' + event.last_fetched_details?.secondary_get_in_price2
                                                : null
                                        }
                                        lastFetched={event.stubhub_last_fetched_at}
                                    />
                                </TableCell>
                                <TableCell>
                                    <StyledActionBox
                                        setSelectedId={setSelectedId}
                                        changeModal={changeModal}
                                        event_id={event?._id}
                                        setSelectedEvent={(eventId) => {
                                            setSelectedEvent(data.find(({ _id }) => eventId === _id))
                                        }}
                                        setRefetchingId={setRefetchingId}
                                        hasPrimary={Boolean(primaryMetaPlatform)}
                                        hasSecondary={Boolean(secondaryMetaPlatform)}
                                        updateEventLastFetchDetails={updateEventLastFetchDetails}
                                        isAXS={isAXS}
                                    />
                                </TableCell>
                                <TableCell sx={{ p: 0 }} />
                            </TableRow>
                        )
                    })}
                </TableBody>
            </StyledTableRaw>
        </TableContainer>
    )
}
