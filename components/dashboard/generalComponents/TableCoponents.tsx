import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Avatar, Box, Checkbox, CircularProgress, Link, MenuItem, TableCell, Typography, styled } from '@mui/material'
import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'
import LinkingIcon from 'src/icons/LinkingIcon'
import { EventType } from 'src/types/local/customTableTypes'
import { convertDate } from 'src/utils/dataFormatters'
import numberWithCommas from 'src/utils/numberWithCommas'

// eslint-disable-next-line no-empty-pattern
export const StyledTableCell = styled(TableCell)(({}) => ({
    '& .MuiStyledTableCell-root': {
        color: '#000000',
    },
}))

export const AvailableItems = ({
    elem,
    Icon,
    availableCount,
    link,
    isUserCanAddMatchUrl,
    setSelected,
    marketPlaceName,
    setSelectedMeta,
    changeModal,
    platform,
    refetchingId,
}: {
    elem: any
    Icon: any
    availableCount: any
    link: any
    marketPlaceName: any
    isUserCanAddMatchUrl?: boolean
    setSelected?
    setSelectedMeta?
    changeModal?
    platform?: string[]
    refetchingId?: string | null
}) => {
    const [showFirstPopUp, setShowFirstPopUp] = useState(false)
    const [showSecondPopUp, setShowSecondPopUp] = useState(false)
    if (
        platform
            ? elem.meta.otherPlatforms?.filter((elem) => platform.includes(elem.platform)).length > 0
            : elem.meta.otherPlatforms.length > 0
    ) {
        return (
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'flex-start',
                }}
            >
                <Box
                    sx={{
                        minWidth: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: '10px',
                    }}
                >
                    {Icon}
                </Box>

                {refetchingId === elem._id ? (
                    <CircularProgress color="inherit" size={20} />
                ) : (
                    <>
                        {typeof availableCount === 'number' || typeof availableCount === 'string' ? (
                            <Link
                                target={'_blank'}
                                href={`${link}/${elem._id}`}
                                sx={{
                                    color: 'black',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    ':hover': {
                                        color: 'blue',
                                        textDecoration: 'none',
                                    },
                                }}
                                onMouseLeave={() => setShowFirstPopUp(false)}
                                onMouseEnter={() => setShowFirstPopUp(true)}
                            >
                                {numberWithCommas(availableCount)}
                            </Link>
                        ) : (
                            <Typography
                                sx={{
                                    color: 'black',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                }}
                                onMouseLeave={() => setShowFirstPopUp(false)}
                                onMouseEnter={() => setShowFirstPopUp(true)}
                            >
                                N/A
                            </Typography>
                        )}
                        <InfoOutlinedIcon
                            sx={{ height: '15px' }}
                            onMouseLeave={() => setShowSecondPopUp(false)}
                            onMouseEnter={() => setShowSecondPopUp(true)}
                        />
                        <Box
                            sx={{
                                display: showFirstPopUp ? 'block' : 'none',
                                position: 'absolute',
                                bgcolor: 'rgba(30,30,30,.8)',
                                width: 'fit-content',
                                zIndex: '1600',
                                p: '10px',
                                left: '-70px',
                                top: '-50px',
                                borderRadius: '4px',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: '400',
                            }}
                        >
                            {marketPlaceName === 'ticketmaster' ? 'View Primary Analytics' : 'View Secondary Analytics'}
                        </Box>
                        <Box
                            sx={{
                                display: showSecondPopUp ? 'block' : 'none',
                                position: 'absolute',
                                bgcolor: 'rgba(30,30,30,.8)',
                                height: '55px',
                                width: '220px',
                                zIndex: '1600',
                                p: '10px',
                                left: '-70px',
                                top: '-60px',
                                borderRadius: '4px',
                                color: 'white',
                            }}
                        >
                            {(typeof availableCount === 'number' || typeof availableCount === 'string') && (
                                <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>Last Fetched</Typography>
                            )}
                            <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
                                {typeof availableCount === 'number' || typeof availableCount === 'string'
                                    ? platform[0] === 'stubhub'
                                        ? convertDate(elem.stubhub_last_fetched_at)
                                        : convertDate(elem.last_fetched_at)
                                    : 'N/A - Data is currently not available for this event.'}
                            </Typography>
                        </Box>
                    </>
                )}
            </Box>
        )
    } else {
        return (
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'flex-start',
                }}
                onMouseLeave={() => setShowFirstPopUp(false)}
                onMouseEnter={() => setShowFirstPopUp(true)}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: '10px',
                    }}
                >
                    {Icon}
                </Box>
                {isUserCanAddMatchUrl ? (
                    <AddIcon
                        onClick={() => {
                            setSelected(elem._id)
                            setSelectedMeta(elem?.meta.otherPlatforms)
                            changeModal('addMatchUrlModal')
                        }}
                    />
                ) : (
                    <Typography
                        sx={{
                            color: 'black',
                            fontSize: '15px',
                            fontWeight: '500',
                        }}
                        onMouseLeave={() => setShowFirstPopUp(false)}
                        onMouseEnter={() => setShowFirstPopUp(true)}
                    >
                        N/F
                    </Typography>
                )}
                <InfoOutlinedIcon
                    sx={{ height: '15px' }}
                    onMouseLeave={() => setShowSecondPopUp(false)}
                    onMouseEnter={() => setShowSecondPopUp(true)}
                />
                <Box
                    sx={{
                        display: showFirstPopUp ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'rgba(30,30,30,.8)',
                        width: 'fit-content',
                        zIndex: '1600',
                        p: '10px',
                        left: '-70px',
                        top: '-50px',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '400',
                    }}
                >
                    {marketPlaceName === 'ticketmaster' ? 'View Primary Analytics' : 'View Secondary Analytics'}
                </Box>
                <Box
                    sx={{
                        display: showSecondPopUp ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'rgba(30,30,30,.8)',
                        height: '75px',
                        width: '240px',
                        zIndex: '1600',
                        p: '10px',
                        left: '-80px',
                        top: '-80px',
                        borderRadius: '4px',
                        color: 'white',
                    }}
                >
                    <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>N/F - Event was not found.</Typography>
                    <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
                        Note: You can add it by using the "Add Missing Events" button.
                    </Typography>
                </Box>
            </Box>
        )
    }
}

export const PriceDisplay = ({
    value,
    secondValue,
    lastFetched,
    header = 'Last Fetched',
    color
}: {
    value: string
    secondValue?: string
    header?:string
    lastFetched,
    color?:string
}) => {
    const [showPopUp, setShowPopUp] = useState(false)
    return (
        <Box
            onMouseLeave={() => setShowPopUp(false)}
            onMouseEnter={() => setShowPopUp(true)}
            sx={{ position: 'relative', display: 'flex', width: '100%', alignItems: 'center' }}
        >
            <Box>
                <Typography
                    noWrap
                    sx={{
                        textAlign: 'center',
                        fontSize: '15px',
                        fontWeight: '500',
                        color: color ? color : 'inherit'
                    }}
                >
                    {value ? value : 'N/A'}
                </Typography>
                <Typography
                    noWrap
                    sx={{
                        textAlign: 'center',
                        fontSize: '15px',
                        fontWeight: '500',
                        color: color ? color : 'inherit'
                    }}
                >
                    {secondValue ? secondValue : null}
                </Typography>
            </Box>
            <InfoOutlinedIcon sx={{ height: '25px', padding: '5px' }} />
            <Box
                sx={{
                    display: showPopUp ? 'block' : 'none',
                    position: 'absolute',
                    bgcolor: 'rgba(30,30,30,.8)',
                    height: '55px',
                    width: '220px',
                    zIndex: '1600',
                    p: '10px',
                    left: '-70px',
                    top: '-60px',
                    borderRadius: '4px',
                    color: 'white',
                }}
            >
                {value && <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>{header}</Typography>}
                <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>
                    {value ? convertDate(lastFetched) : 'The information about the price is currently unavailable.'}
                </Typography>
            </Box>
        </Box>
    )
}

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: 0,
    paddingRight: '12px',
    paddingLeft: '4px',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s ease-in-out',
    '&:hover': { backgroundColor: '#e6e6e6 !important' },
}))

export const StyledCheckBox = styled(Checkbox)(({ theme }) => ({
    padding: '8px',
    paddingRight: '4px',
}))

export const EventName = ({
    elem,
    setSelectedItem,
    infoChunk,
    changeModal,
    setSelectedMeta,
    setSelectedId,
    setSelectedEvent,
}: {
    elem: EventType
    setSelectedItem?
    infoChunk?
    changeModal?
    setSelectedMeta?
    setSelectedId
    setSelectedEvent?
}) => {
    const [hoveredLinksToTheEventId, setHoveredLinksToTheEventId] = useState<any>()
    const [hoveredAvatarId, setHoveredAvatarId] = useState<any>()
    const [hoveredArtistOriginId, setHoveredArtistOriginId] = useState<any>()

    const mainPlatform =
        elem?.meta?.otherPlatforms.find(({ type }) => type === 'Primary') ||
        elem?.meta?.otherPlatforms.find(({ type }) => type === 'Primary Others') ||
        elem?.meta?.otherPlatforms.find(({ type }) => type === 'Secondary')

    return (
        <TableCell
            sx={{
                verticalAlign: 'top',
                paddingTop: '20px',
                width: '350px',
                maxWidth: '400px',
                pv: '0',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ position: 'relative' }}>
                    <Avatar
                        sx={{
                            width: '56px',
                            height: '56px',
                            mr: '12px',
                            cursor: 'pointer',
                            ':hover': { border: '1px #E4933D solid' },
                        }}
                        src={elem?.images ? elem.images[0] : null}
                        onClick={() => {
                            setSelectedItem(infoChunk)
                            setSelectedId(elem._id)
                            setSelectedEvent && setSelectedEvent(elem)
                            changeModal('avatarModal')
                        }}
                        onMouseEnter={() => setHoveredAvatarId(elem?._id)}
                        onMouseLeave={() => setHoveredAvatarId(null)}
                    />
                    <Box
                        sx={{
                            display: hoveredAvatarId === elem._id ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            width: '120px',
                            zIndex: '1600',
                            p: '10px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '500',
                        }}
                    >
                        Artist Quick Stats
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        {mainPlatform && (
                            <Typography
                                sx={{
                                    fontSize: '11px',
                                    fontWeight: 400,
                                    color: '#6C757D',
                                }}
                            >
                                {mainPlatform.marketPlace[0].toUpperCase() + mainPlatform.marketPlace.slice(1)}
                            </Typography>
                        )}
                        {elem?.meta?.otherPlatforms[0].status === 'cancelled' && (
                            <Typography
                                sx={{
                                    backgroundColor: 'red',
                                    ml: '5px',
                                    px: '5px',
                                    borderRadius: '10px',
                                    color: 'white',
                                    fontSize: '11px',
                                }}
                            >
                                Cancelled
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            mb: '6px',
                            alignItems: 'center',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Link
                            rel="noopener noreferrer"
                            target="_blank"
                            href={mainPlatform?.url || '#'}
                            sx={{
                                color: 'black',
                                textDecoration: 'none',
                                fontSize: '15px',
                                fontWeight: 500,
                                ':hover': { color: 'blue' },
                            }}
                        >
                            {elem.name}
                        </Link>
                        <Box
                            sx={{
                                position: 'relative',
                            }}
                        >
                            <StyledTableIconButton
                                onClick={() => {
                                    setSelectedMeta(elem?.meta.otherPlatforms)
                                    setSelectedId(elem?._id)
                                    changeModal('directModal')
                                }}
                                onMouseEnter={() => setHoveredLinksToTheEventId(elem?._id)}
                                onMouseLeave={() => setHoveredLinksToTheEventId(null)}
                                sx={{
                                    width: '22px',
                                    height: '22px',
                                    padding: '2px',
                                    ml: '2px    ',
                                }}
                            >
                                <LinkingIcon color="#E4933D" />
                            </StyledTableIconButton>
                            <Box
                                sx={{
                                    display: hoveredLinksToTheEventId === elem._id ? 'block' : 'none',
                                    position: 'absolute',
                                    bgcolor: 'rgba(30,30,30,.8)',
                                    width: '120px',
                                    zIndex: '1600',
                                    p: '10px',
                                    borderRadius: '4px',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                }}
                            >
                                Links to the event
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '12px',
                                fontWeight: 400,
                                color: '#6C757D',
                            }}
                        >
                            {elem?.subCategory === 'Undefined' ? 'Other' : elem?.subCategory}
                        </Typography>
                        {elem?.artistsStat && (
                            <Box sx={{ position: 'relative' }}>
                                <ReactCountryFlag
                                    svg
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        fontSize: '20px',
                                        marginRight: '1px',
                                    }}
                                    onMouseEnter={() => setHoveredArtistOriginId(elem?._id)}
                                    onMouseLeave={() => setHoveredArtistOriginId(null)}
                                    countryCode={elem?.artistsStat[0]?.meta?.origin}
                                />
                                <Box
                                    sx={{
                                        display: hoveredArtistOriginId === elem._id ? 'block' : 'none',
                                        position: 'absolute',
                                        bgcolor: 'rgba(30,30,30,.8)',
                                        width: '90px',
                                        zIndex: '1600',
                                        p: '10px',
                                        borderRadius: '4px',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                    }}
                                >
                                    Artist Origin
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </TableCell>
    )
}

export const getEventWarning = (event: EventType) => {
    if (event?.currentStatus === 'cancelled') {
        return (
            <Box
                sx={{
                    bgcolor: 'red',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontSize: '12px',
                    paddingInline: '0.5rem',
                }}
            >
                Cancelled
            </Box>
        )
    }
    if (Date.parse(event?.dateTime) - Date.now() < 0) {
        return (
            <Box
                sx={{
                    bgcolor: 'red',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontSize: '12px',
                    paddingInline: '0.5rem',
                }}
            >
                Ended
            </Box>
        )
    }
    if (event?.currentStatus === 'rescheduled') {
        return (
            <Box
                sx={{
                    bgcolor: '#E4933D',
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '8px',
                    fontSize: '12px',
                    paddingInline: '0.5rem',
                }}
            >
                Rescheduled
            </Box>
        )
    }
    return <></>
}