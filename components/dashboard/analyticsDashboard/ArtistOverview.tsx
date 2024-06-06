import AddAlertOutlined from '@mui/icons-material/AddAlertOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { Avatar, Box, Button, Card, IconButton, Link as MaterialLink, Slide, Snackbar, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Flag from 'react-world-flags'
import useEventAnalytics from 'src/hooks/useEventAnalytics'
import { convertDate } from 'src/utils/dataFormatters'
import numberWithCommas from 'src/utils/numberWithCommas'
import { EventModalGroup } from '../eventAnalytics/eventAnalyticsModalGroup'
import { formatNumber } from '../generalComponents/customTable/StatsItem'

const ArtistOverview = ({
    eventId,
    changeModal,
    isModalOpen,
    handleChangeModal,
    event,
    handleRefetchAll,
    isRefetching,
    refetchingMessage,
    isAXS,
    pageType,
}: {
    eventId: any
    changeModal: any
    isModalOpen: any
    handleChangeModal: any
    event: any
    isRefetching: any
    handleRefetchAll: any
    refetchingMessage: any
    isAXS?: any
    pageType: any
}) => {
    const { selectedArtist, setSelectedArtist, setSelectedId, selectedMeta, setSelectedMeta, popupText, setPopupText } =
        useEventAnalytics()
    const [showPrimaryPopUp, setShowPrimaryPopUp] = useState<boolean>(false)
    const [showStubhubPopUp, setShowStubhubPopUp] = useState<boolean>(false)
    const [showFirstLinkPopup, setShowFirstLinkPopUp] = useState<boolean>(false)
    const [showSecondLinkPopup, setShowSecondLinkPopUp] = useState<boolean>(false)
    const [showThirdLinkPopup, setShowThirdLinkPopUp] = useState<boolean>(false)
    const [showFourthLinkPopup, setShowFourthLinkPopUp] = useState<boolean>(false)
    const [showFifthLinkPopup, setShowFifthLinkPopUp] = useState<boolean>(false)
    const [showSixthLinkPopup, setShowSixthLinkPopUp] = useState<boolean>(false)
    const [selectedArtistId, setSelectedArtistId] = useState<string>()

    const { primaryMetaPlatform, secondaryMetaPlatform } = useMemo(() => {
        const primaryMetaPlatform =
            event?.meta.otherPlatforms.find(({ type }) => type === 'Primary') ||
            event.meta.otherPlatforms.find(({ type }) => type === 'Primary Others')
        const secondaryMetaPlatform = event?.meta.otherPlatforms.find(
            ({ type }) => type === 'Secondary' || type?.at(0) === 'Secondary'
        )
        return { primaryMetaPlatform, secondaryMetaPlatform }
    }, [event])

    useEffect(() => {
        setSelectedMeta(event?.meta?.otherPlatforms)
        setSelectedArtist(event?.artistsStat[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Card
                sx={{
                    marginLeft: '1.5rem',
                    marginRight: '1.5rem',
                    marginBottom: '2rem',
                    paddingTop: '1rem',
                }}
            >
                {/* Page name */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: '54px' }}>
                    {pageType === 'secondary' ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
                            <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>Secondary Analytics</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem' }}>
                            <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>Primary Analytics</Typography>
                        </Box>
                    )}
                    {/* Modal Icons */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {pageType === 'secondary' ? (
                            <Box
                                sx={{ position: 'relative' }}
                                onMouseLeave={() => setShowFirstLinkPopUp(false)}
                                onMouseEnter={() => setShowFirstLinkPopUp(true)}
                            >
                                <MaterialLink
                                    href={`/dashboard/primary-analytics/${eventId}`}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '6px',
                                        border: '2px solid #D0D5DD',
                                        padding: '0px 10px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '5px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all ease-in-out 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#eaecf0',
                                        },
                                    }}
                                >
                                    <Typography sx={{ color: '#E4933D', textDecoration: 'none' }}>
                                        Primary Analytics
                                    </Typography>
                                </MaterialLink>
                                <Box
                                    sx={{
                                        display: showFirstLinkPopup ? 'block' : 'none',
                                        position: 'absolute',
                                        bgcolor: 'rgba(30,30,30,.8)',
                                        height: '40px',
                                        width: 'max-content',
                                        zIndex: '100',
                                        p: '10px',
                                        left: '3px',
                                        top: '40px',
                                        borderRadius: '4px',
                                        color: 'white',
                                        textAlign: 'center',
                                    }}
                                >
                                    Primary Analytics
                                </Box>
                            </Box>
                        ) : (
                            <Box
                                sx={{ position: 'relative' }}
                                onMouseLeave={() => setShowFirstLinkPopUp(false)}
                                onMouseEnter={() => setShowFirstLinkPopUp(true)}
                            >
                                <MaterialLink
                                    href={`/dashboard/secondary-analytics/${eventId}`}
                                    sx={{
                                        cursor: 'pointer',
                                        backgroundColor: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '6px',
                                        border: '2px solid #D0D5DD',
                                        padding: '0px 10px',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        gap: '5px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all ease-in-out 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#eaecf0',
                                        },
                                    }}
                                >
                                    <Typography sx={{ color: '#E4933D', textDecoration: 'none' }}>
                                        Secondary Analytics
                                    </Typography>
                                </MaterialLink>
                                <Box
                                    sx={{
                                        display: showFirstLinkPopup ? 'block' : 'none',
                                        position: 'absolute',
                                        bgcolor: 'rgba(30,30,30,.8)',
                                        height: '40px',
                                        width: 'max-content',
                                        zIndex: '100',
                                        p: '10px',
                                        left: '3px',
                                        top: '40px',
                                        borderRadius: '4px',
                                        color: 'white',
                                        textAlign: 'center',
                                    }}
                                >
                                    Secondary Analytics
                                </Box>
                            </Box>
                        )}
                        <Box sx={{ borderLeft: '2px solid #E4933D', height: '60%' }}></Box>
                        <Box
                            sx={{ position: 'relative' }}
                            onMouseLeave={() => setShowSecondLinkPopUp(false)}
                            onMouseEnter={() => setShowSecondLinkPopUp(true)}
                        >
                            <IconButton
                                onClick={() => changeModal('directModal')}
                                size="small"
                                sx={{
                                    borderRadius: '6px',
                                    border: '2px solid #D0D5DD',
                                    width: '28px',
                                    height: '28px',
                                    transition: 'all ease-in-out 0.3s',
                                }}
                            >
                                <InsertLinkOutlinedIcon sx={{ color: '#E4933D', width: '20px', height: '20px' }} />
                            </IconButton>
                            <Box
                                sx={{
                                    display: showSecondLinkPopup ? 'block' : 'none',
                                    position: 'absolute',
                                    bgcolor: 'rgba(30,30,30,.8)',
                                    height: '40px',
                                    width: 'max-content',
                                    zIndex: '100',
                                    p: '10px',
                                    left: '-30px',
                                    top: '40px',
                                    borderRadius: '4px',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                Event Links
                            </Box>
                        </Box>
                        <Box sx={{ borderLeft: '2px solid #E4933D', height: '60%' }}></Box>
                        <Box
                            sx={{ position: 'relative' }}
                            onMouseLeave={() => setShowThirdLinkPopUp(false)}
                            onMouseEnter={() => setShowThirdLinkPopUp(true)}
                        >
                            <IconButton
                                onClick={() => {
                                    // pageType === 'primary'
                                    //     ? changeModal('mainModal')
                                    //     : pageType === 'secondary'
                                    //       ? changeModal('priceModal')
                                    //       : console.log(pageType)
                                    changeModal('mainModal')
                                }}
                                size="small"
                                sx={{
                                    borderRadius: '6px',
                                    border: '2px solid #D0D5DD',
                                    width: '28px',
                                    height: '28px',
                                    transition: 'all ease-in-out 0.3s',
                                }}
                            >
                                <AddAlertOutlined sx={{ color: '#E4933D', width: '20px', height: '20px' }} />
                            </IconButton>
                            <Box
                                sx={{
                                    display: showThirdLinkPopup ? 'block' : 'none',
                                    position: 'absolute',
                                    bgcolor: 'rgba(30,30,30,.8)',
                                    height: '40px',
                                    width: 'max-content',
                                    zIndex: '100',
                                    p: '10px',
                                    left: '-15px',
                                    top: '40px',
                                    borderRadius: '4px',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                Alerts
                            </Box>
                        </Box>
                        <Box sx={{ borderLeft: '2px solid #E4933D', height: '60%' }}></Box>
                        <Box
                            sx={{ position: 'relative' }}
                            onMouseLeave={() => setShowFourthLinkPopUp(false)}
                            onMouseEnter={() => setShowFourthLinkPopUp(true)}
                        >
                            <IconButton
                                onClick={() => changeModal('noteModal')}
                                size="small"
                                sx={{
                                    borderRadius: '6px',
                                    border: '2px solid #D0D5DD',
                                    width: '28px',
                                    height: '28px',
                                }}
                            >
                                <EditNoteOutlinedIcon sx={{ color: '#E4933D', width: '20px', height: '20px' }} />
                            </IconButton>
                            <Box
                                sx={{
                                    display: showFourthLinkPopup ? 'block' : 'none',
                                    position: 'absolute',
                                    bgcolor: 'rgba(30,30,30,.8)',
                                    height: '40px',
                                    width: 'max-content',
                                    zIndex: '100',
                                    p: '10px',
                                    left: '-10px',
                                    top: '40px',
                                    borderRadius: '4px',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                Note
                            </Box>
                        </Box>
                        <Box sx={{ borderLeft: '2px solid #E4933D', height: '60%' }}></Box>
                        <Box
                            sx={{ position: 'relative' }}
                            onMouseLeave={() => setShowFifthLinkPopUp(false)}
                            onMouseEnter={() => setShowFifthLinkPopUp(true)}
                        >
                            <IconButton
                                disabled={isAXS}
                                onClick={handleRefetchAll}
                                size="small"
                                sx={{
                                    borderRadius: '6px',
                                    border: '2px solid #D0D5DD',
                                    width: '28px',
                                    height: '28px',
                                    transition: 'all ease-in-out 0.3s',
                                }}
                            >
                                <CachedOutlinedIcon
                                    sx={{
                                        color: '#E4933D',
                                        width: '20px',
                                        height: '20px',
                                        animation: isRefetching ? 'spin 2000ms infinite linear' : null,
                                        '@keyframes spin': {
                                            '0%': {
                                                transform: 'rotate(360deg)',
                                            },
                                            '100%': {
                                                transform: 'rotate(0deg)',
                                            },
                                        },
                                    }}
                                />
                            </IconButton>
                            <Box
                                sx={{
                                    display: showFifthLinkPopup || isRefetching ? 'block' : 'none',
                                    position: 'absolute',
                                    bgcolor: 'rgba(30,30,30,.8)',
                                    height: '40px',
                                    width: 'max-content',
                                    zIndex: '100',
                                    p: '10px',
                                    right: '5px',
                                    top: '40px',
                                    borderRadius: '4px',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                {refetchingMessage}
                            </Box>
                        </Box>
                        <Box sx={{ borderLeft: '2px solid #E4933D', height: '60%' }}></Box>
                        <Box
                            sx={{ position: 'relative' }}
                            onMouseLeave={() => setShowSixthLinkPopUp(false)}
                            onMouseEnter={() => setShowSixthLinkPopUp(true)}
                        >
                            <IconButton
                                onClick={() => changeModal('saveModal')}
                                size="small"
                                sx={{
                                    borderRadius: '6px',
                                    border: '2px solid #D0D5DD',
                                    width: '28px',
                                    height: '28px',
                                    transition: 'all ease-in-out 0.3s',
                                }}
                            >
                                <AddBoxOutlinedIcon sx={{ color: '#E4933D', width: '20px', height: '20px' }} />
                            </IconButton>
                            <Box
                                sx={{
                                    display: showSixthLinkPopup ? 'block' : 'none',
                                    position: 'absolute',
                                    bgcolor: 'rgba(30,30,30,.8)',
                                    height: '40px',
                                    width: 'max-content',
                                    zIndex: '100',
                                    p: '10px',
                                    left: '-15px',
                                    top: '40px',
                                    borderRadius: '4px',
                                    color: 'white',
                                    textAlign: 'center',
                                }}
                            >
                                Add to
                            </Box>
                        </Box>
                    </Box>
                </Box>
                {/* Event Section */}
                <Box
                    sx={{
                        // display: 'flex',
                        // flexWrap: 'wrap',
                        justifyContent: 'center',
                        display: 'grid',
                        gridTemplateColumns: { lg: '1.5fr 1fr', md: 'repeat(1fr,2)' },
                        gap: '10px',
                        px: '10px',
                        mx: 'auto',
                        paddingTop: '31px',
                        paddingBottom: '16px',
                    }}
                >
                    {/* Event */}
                    <Box
                        sx={{
                            // width: '59%',
                            // width:'100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            border: '1px solid #e6e6e6',
                            minHeight: '410px',
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Box sx={{ height: '181px', width: '321px' }}>
                                    <img
                                        src={event?.images[0]}
                                        alt={event?.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        gap: '2px',
                                        px: '2rem',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <Typography
                                            sx={{
                                                fontWeight: '700',
                                                fontSize: '20px',
                                                color: '#333333',
                                                width: '80%',
                                                lineHeight: '1.3',
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            {event?.name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: '700',
                                                fontSize: '16px',
                                                color: '#333333',
                                                width: '7rem',
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            {new Date(event?.dateTime).toLocaleString('en-US', {
                                                weekday: 'short',
                                                timeZone: event?.timezone || 'UTC',
                                            })}
                                            ,{' '}
                                            <span style={{ textTransform: 'uppercase' }}>
                                                {new Date(event?.dateTime).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: '2-digit',
                                                    timeZone: event?.timezone || 'UTC',
                                                })}
                                            </span>
                                            <br />
                                            <span style={{ fontSize: '15px' }}>
                                                {new Date(event?.dateTime).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    timeZone: event?.timezone || 'UTC',
                                                })}
                                                {'/ '}
                                            </span>
                                            <span style={{ fontSize: '15px' }}>
                                                {new Date(event?.dateTime).toLocaleString('en-US', {
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    timeZone: event?.timezone || 'UTC',
                                                    hour12: true,
                                                })}
                                            </span>
                                        </Typography>
                                    </Box>
                                    {event?.dateTime && typeof event?.dateTime === 'string' && (
                                        <Typography
                                            sx={{ color: '#E4933D', fontWeight: '700', wordWrap: 'break-word' }}
                                        >
                                            {(() => {
                                                const eventDate = new Date(event?.dateTime)
                                                const currentDate = new Date()
                                                const millisecondsInDay = 1000 * 60 * 60 * 24
                                                const daysDifference = Math.floor(
                                                    (eventDate.getTime() - currentDate.getTime()) / millisecondsInDay
                                                )
                                                if (daysDifference === 1) {
                                                    return '1 Day to the event'
                                                } else if (daysDifference === 0) {
                                                    return 'The event is today'
                                                } else if (daysDifference < 0) {
                                                    return 'The event has already happened'
                                                } else {
                                                    return `${daysDifference} Days to the event`
                                                }
                                            })()}
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box sx={{ width: 'auto' }}></Box>
                                <Box
                                    sx={{
                                        width: '70%',
                                    }}
                                >
                                    <Typography sx={{ width: 'minContent' }}>
                                        <MaterialLink
                                            href={
                                                pageType === 'secondary' && event?.venue[0].stubhubUrl
                                                    ? event?.venue[0].stubhubUrl
                                                    : event?.venue[0].url
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            sx={{
                                                color: 'black',
                                                fontWeight: '700',
                                                textDecoration: 'none',
                                                wordWrap: 'break-word',
                                                '&:hover': {
                                                    color: 'blue',
                                                },
                                            }}
                                        >
                                            {event?.venue[0].name}, {event?.city},{' '}
                                            <span>{event?.venue[0].stateCode}</span>
                                        </MaterialLink>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                                mt: '3.3rem',
                                mx: '2rem',
                            }}
                        >
                            <Box
                                sx={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#333333',
                                    gap: '5px',
                                    width: '145px',
                                    height: '84px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    cursor: 'default',
                                }}
                            >
                                <Typography sx={{ fontWeight: '700', fontSize: '20px' }}>
                                    {(() => {
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
                                    })()}
                                </Typography>
                                <Typography sx={{ fontWeight: '700', fontSize: '14px', wordWrap: 'break-word' }}>
                                    Capacity
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#333333',
                                    gap: '5px',
                                    width: '145px',
                                    height: '84px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}
                                onMouseLeave={() => setShowPrimaryPopUp(false)}
                                onMouseEnter={() => setShowPrimaryPopUp(true)}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                    <Typography sx={{ fontWeight: '700', fontSize: '20px', ml: '1rem' }}>
                                        {event?.last_fetched_details?.primary_tickets_count
                                            ? numberWithCommas(event?.last_fetched_details.primary_tickets_count)
                                            : 'N/A'}
                                    </Typography>
                                    <IconButton size="small">
                                        <InfoOutlinedIcon sx={{ color: '#0f754a', width: '16px', height: '16px' }} />
                                    </IconButton>
                                    <Box
                                        sx={{
                                            // display: showPrimaryPopUp ? 'block' : 'none',
                                            // position: 'absolute',
                                            // backgroundColor: 'background.layout',
                                            // height: '60px',
                                            // width: '220px',
                                            // zIndex: '100',
                                            // p: '10px',
                                            // top: '70px',
                                            // borderRadius: '4px',
                                            // color: 'white',
                                            display: showPrimaryPopUp ? 'block' : 'none',
                                            position: 'absolute',
                                            bgcolor: 'rgba(30,30,30,.8)',
                                            height: '60px',
                                            width: '220px',
                                            zIndex: '100',
                                            p: '10px',
                                            left: '-70px',
                                            top: '-60px',
                                            borderRadius: '4px',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
                                            Last Fetched
                                        </Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
                                            {event?.last_fetched_at ? convertDate(event?.last_fetched_at) : 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ fontWeight: '700', fontSize: '14px', wordWrap: 'break-word' }}>
                                    Primary availability
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#333333',
                                    gap: '5px',
                                    width: '145px',
                                    height: '84px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }}
                                onMouseLeave={() => setShowStubhubPopUp(false)}
                                onMouseEnter={() => setShowStubhubPopUp(true)}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                    <Typography sx={{ fontWeight: '700', fontSize: '20px', ml: '1rem' }}>
                                        {event?.last_fetched_details?.secondary_tickets_count
                                            ? numberWithCommas(event?.last_fetched_details.secondary_tickets_count)
                                            : 'N/A'}
                                    </Typography>
                                    <IconButton size="small">
                                        <InfoOutlinedIcon sx={{ color: '#0f754a', width: '16px', height: '16px' }} />
                                    </IconButton>
                                    <Box
                                        sx={{
                                            // display: showStubhubPopUp ? 'block' : 'none',
                                            // position: 'absolute',
                                            // backgroundColor: 'background.layout',
                                            // height: '60px',
                                            // width: '220px',
                                            // zIndex: '100',
                                            // p: '10px',
                                            // top: '70px',
                                            // borderRadius: '4px',
                                            // color: 'white',
                                            display: showStubhubPopUp ? 'block' : 'none',
                                            position: 'absolute',
                                            bgcolor: 'rgba(30,30,30,.8)',
                                            height: '60px',
                                            width: '220px',
                                            zIndex: '100',
                                            p: '10px',
                                            left: '-70px',
                                            top: '-60px',
                                            borderRadius: '4px',
                                            color: 'white',
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
                                            Last Fetched
                                        </Typography>
                                        <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
                                            {event?.stubhub_last_fetched_at
                                                ? convertDate(event?.stubhub_last_fetched_at)
                                                : 'N/A'}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography sx={{ fontWeight: '700', fontSize: '14px', wordWrap: 'break-word' }}>
                                    Stubhub availability
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    color: '#333333',
                                    gap: '5px',
                                    width: '145px',
                                    height: '84px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    cursor: 'default',
                                }}
                            >
                                <Typography sx={{ fontWeight: '700', fontSize: '20px' }}>
                                    {event?.presales.length > 0
                                        ? new Date(event?.presales[0]?.startDateTime).toLocaleString('en-US', {
                                              weekday: 'short',
                                              month: 'short',
                                              day: 'numeric',
                                          })
                                        : 'N/A'}
                                </Typography>
                                <Typography sx={{ fontWeight: '700', fontSize: '14px', wordWrap: 'break-word' }}>
                                    First presale
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    {/* Event LineUp */}
                    <Box
                        sx={{
                            backgroundColor: '#EDF0EA',
                            border: '1px solid #e6e6e6',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly !important',
                            alignItems: 'center',
                            minHeight: '410px',
                            padding: '2rem',
                        }}
                    >
                        <Typography sx={{ fontSize: '22px', fontWeight: 'bold', color: '#333333' }}>
                            Event LineUp
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            {/* Artists */}
                            {event?.artistsStat.length > 4 ? (
                                <Box
                                    sx={{
                                        width: '300px',
                                        textAlign: 'center',
                                    }}
                                >
                                    <Slider
                                        adaptiveHeight={true}
                                        infinite={false}
                                        autoplay={false}
                                        slidesToShow={2}
                                        slidesToScroll={2}
                                        lazyLoad="ondemand"
                                    >
                                        {event?.artistsStat.map((artist: any, index: number) => (
                                            <Box sx={{ display: 'flex', gap: '0.1rem' }} key={index}>
                                                <Button
                                                    sx={{
                                                        backgroundColor:
                                                            selectedArtist === artist ? '#101828' : 'white',
                                                        color: selectedArtist === artist ? 'white' : '#101828',
                                                        border: '1px solid #6C757D',
                                                        borderRadius: '8px',
                                                        px: '8px',
                                                        py: '8px',
                                                        fontSize: '13px',
                                                        marginTop: '15px',
                                                        '&:hover': {
                                                            backgroundColor: 'white',
                                                            color: 'black',
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setSelectedArtist(artist)
                                                    }}
                                                >
                                                    {artist.name}
                                                </Button>
                                            </Box>
                                        ))}
                                    </Slider>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                    }}
                                >
                                    {event?.artistsStat.map((artist: any, index: number) => (
                                        <Button
                                            key={index}
                                            sx={{
                                                backgroundColor: selectedArtist === artist ? '#101828' : 'white',
                                                color: selectedArtist === artist ? 'white' : '#101828',
                                                border: '1px solid #6C757D',
                                                borderRadius: '8px',
                                                px: '8px',
                                                py: '8px',
                                                fontSize: '13px',
                                                marginBottom: '15px',
                                                marginTop: '15px',
                                                '&:hover': {
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                },
                                            }}
                                            onClick={() => setSelectedArtist(artist)}
                                        >
                                            {artist.name}
                                        </Button>
                                    ))}
                                </Box>
                            )}
                            {selectedArtist && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '2.3rem',
                                        marginTop: '10px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            gap: '2rem',
                                        }}
                                    >
                                        <Avatar
                                            src={selectedArtist.meta?.image}
                                            sx={{
                                                width: '110px',
                                                height: '110px',
                                                cursor: 'pointer',
                                                transition: 'all ease-in-out .3s',
                                                '&:hover': { scale: '0.9' },
                                                '&:hover:not()': { scale: '1' },
                                            }}
                                            onClick={() => {
                                                setSelectedArtistId(selectedArtist?._id.$oid)
                                                setSelectedId(event._id)
                                                setSelectedArtist(selectedArtist)
                                                changeModal('avatarModal')
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                gap: '1rem',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                                                <Flag
                                                    width="38"
                                                    height="21"
                                                    color="black"
                                                    code={
                                                        selectedArtist.meta?.origin !== null
                                                            ? selectedArtist.meta?.origin
                                                            : ' '
                                                    }
                                                />
                                                <Typography sx={{ fontWeight: 'bold' }}>
                                                    {/* CityName,StateName */}
                                                </Typography>
                                            </Box>
                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                {
                                                    //@ts-ignore
                                                    selectedArtist.meta?.genre
                                                        ? typeof selectedArtist.meta?.genre === 'object'
                                                            ? selectedArtist.meta?.genre
                                                                  ?.map(
                                                                      (elem) =>
                                                                          elem.root[0].toUpperCase() +
                                                                          elem.root.slice(1)
                                                                  )
                                                                  .join(', ')
                                                            : selectedArtist.meta?.genre
                                                        : ' '
                                                }
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {/* Spotify */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: '2rem',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Link to={selectedArtist.meta_data?.spotify} style={{ textDecoration: 'none' }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    backgroundColor: 'white',
                                                    color: '#101828',
                                                    border: '1px solid #e6e6e6',
                                                    borderRadius: '8px',
                                                    padding: '8px',
                                                    width: '145px',
                                                    height: '84px',
                                                    transition: 'all ease-in-out .3s',
                                                    '&:hover': { scale: '0.9' },
                                                    '&:hover:not()': { scale: '1' },
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontSize: '21px', color: '#067647', fontWeight: 'bold' }}
                                                >
                                                    {formatNumber(
                                                        selectedArtist?.spotify_audience?.follower_count
                                                            ? selectedArtist?.spotify_audience?.follower_count
                                                            : 0
                                                    )}
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: '15px', color: '#067647', fontWeight: 'bold' }}
                                                >
                                                    Spotify Followers
                                                </Typography>
                                            </Box>
                                        </Link>
                                        <Link
                                            to={selectedArtist?.meta_data?.spotify}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    backgroundColor: 'white',
                                                    color: '#101828',
                                                    border: '1px solid #e6e6e6',
                                                    borderRadius: '8px',
                                                    padding: '8px',
                                                    width: '145px',
                                                    height: '84px',
                                                    transition: 'all ease-in-out .3s',
                                                    '&:hover': { scale: '0.9' },
                                                    '&:hover:not()': { scale: '1' },
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontSize: '21px', color: '#067647', fontWeight: 'bold' }}
                                                >
                                                    {selectedArtist.spotifyAPI?.popularity
                                                        ? selectedArtist.spotifyAPI?.popularity
                                                        : 'N/A'}
                                                </Typography>
                                                <Typography
                                                    sx={{ fontSize: '15px', color: '#067647', fontWeight: 'bold' }}
                                                >
                                                    Spotify Rank
                                                </Typography>
                                            </Box>
                                        </Link>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Card>
            <EventModalGroup
                hidePriceDrop
                handleChangeModal={handleChangeModal}
                changeModal={changeModal}
                isModalOpen={isModalOpen}
                selectedEvent={event}
                eventArtists={event?.artistsStat}
                selectedId={eventId}
                selectedArtistId={selectedArtistId}
                selectedMeta={selectedMeta}
                setPopupText={setPopupText}
                pageType={pageType}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={popupText !== ''}
                autoHideDuration={3000}
                TransitionComponent={Slide}
                onClose={() => {
                    setPopupText('')
                }}
                sx={{ '& .MuiSnackbarContent-root': { minWidth: '100px' } }}
                message={popupText}
            />
        </>
    )
}

export default ArtistOverview
