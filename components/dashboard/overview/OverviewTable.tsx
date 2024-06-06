import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import {
    Avatar,
    Box,
    Button,
    Grid,
    Link,
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
import { SetStateAction, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { headers } from 'src/common/constants/overview'
import useAuth from 'src/hooks/useAuth'
import LinkingIcon from 'src/icons/LinkingIcon'
import { EventType } from 'src/types/local/customTableTypes'
import { Datum } from 'src/types/local/upSalesResp'
import { FormatDate, applyTimeZone, checkingDate, findMaxByStartDateTime } from 'src/utils/dataFormatters'
import numberWithCommas from 'src/utils/numberWithCommas'
import { StyledTableIconButton } from '../../general/StyledTableIconButton'
import { StatsGridItem } from '../generalComponents/customTable/StatsGridItems'
import { StyledActionBox } from './StyledActionBox'
import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'
import { getEventWarning } from '../generalComponents/TableCoponents'

const StyledTableRaw = styled(Table)(({ theme }) => ({}))

// eslint-disable-next-line no-empty-pattern
const StyledTableCell = styled(TableCell)(({}) => ({
    '& .MuiStyledTableCell-root': {
        color: '#000000',
    },
}))

export const OverviewTable = ({
    data,
    changeModal,
    valueDate,
    setSelectedId,
    handleAddToBuying,
    handleAddToWatchlist,
    setSelectedArtist,
    setSelectedMeta,
    setSelectedItem,
}: {
    data: EventType[]
    changeModal
    valueDate: Date
    setSelectedId
    handleAddToBuying: (eventId: string, note?: string) => void
    handleAddToWatchlist: (eventId: string) => void
    setSelectedArtist?
    setSelectedMeta?
    setSelectedItem: React.Dispatch<SetStateAction<Datum>>
}) => {
    const {
        user: { permissions },
    } = useAuth()
    const [hoveredAvatarId, setHoveredAvatarId] = useState<any>()
    const [hoveredLinksToTheEventId, setHoveredLinksToTheEventId] = useState<any>()
    const [hoveredArtistOriginId, setHoveredArtistOriginId] = useState<any>()
    const [hoveredPresaleDnTId, setHoveredPresaleDnTId] = useState<any>()
    const [hoveredSpotifyRankId, setHoveredSpotifyRankId] = useState<any>()
    const handleClick = (item: any) => {
        setSelectedItem(item)
        changeModal('noteModal')
    }

    const formatCustomDate = (dateTime: string, timezone: string) => {
        const date = new Date(applyTimeZone(dateTime, timezone))
        const timezoneAbbreviation = new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'short' })
            .formatToParts(date)
            .find((part) => part.type === 'timeZoneName')?.value
        // return format(date, 'EEE, MMM d h:mm a', { locale: enUS }).toUpperCase() + ' ' + (timezoneAbbreviation || '')
        return (
            <Box>
                <Typography sx={{ color: 'black', fontSize: 15, fontWeight: '500' }}>
                    {format(date, 'EEE, MMM d', { locale: enUS }).toUpperCase()}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.3rem' }}>
                    <Typography sx={{ color: '#595454', fontSize: '13.13px', fontWeight: 'normal' }}>
                        {format(date, 'h:mm a', { locale: enUS }).toUpperCase()}
                    </Typography>
                    <Typography sx={{ color: '#595454', fontSize: '13.13px', fontWeight: 'normal' }}>
                        {timezoneAbbreviation || ''}
                    </Typography>
                </Box>
            </Box>
        )
    }

    return (
        <TableContainer sx={{ backgroundColor: 'white' }}>
            <StyledTableRaw>
                <TableHead sx={{ backgroundColor: '#0B1B3F' }}>
                    <TableRow>
                        <StyledTableCell sx={{ minWidth: '5px', p: 0 }} />
                        {headers.map((elem, index) => {
                            return (
                                <StyledTableCell key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                textAlign: 'center',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {elem.toLocaleUpperCase()}
                                        </Typography>
                                    </Box>
                                </StyledTableCell>
                            )
                        })}
                        <StyledTableCell sx={{ width: '5px', p: 0 }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((elem) => {
                        const primaryMetaPlatform =
                            elem.meta.otherPlatforms.find(({ type }) => type === 'Primary') ||
                            elem.meta.otherPlatforms.find(({ type }) => type === 'Primary Others')

                        const secondaryMetaPlatform = elem.meta.otherPlatforms.find(
                            ({ type }) => type === 'Secondary' || type?.at(0) === 'Secondary'
                        )
                        return (
                            <TableRow sx={{ ':hover': { bgcolor: '#F0F0F0' } }} key={elem._id}>
                                <TableCell sx={{ p: '0' }} />
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
                                        <Box
                                            sx={{
                                                position: 'relative',
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    width: '56px',
                                                    height: '56px',
                                                    mr: '12px',
                                                    cursor: 'pointer',
                                                    ':hover': { border: '1px #E4933D solid' },
                                                }}
                                                src={elem?.images[0]}
                                                onClick={() => {
                                                    setSelectedItem(elem)
                                                    setSelectedId(elem._id)
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
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            {(() => {
                                                const platformToShow =
                                                    elem?.meta?.otherPlatforms.find(({ type }) => type === 'Primary') ||
                                                    elem?.meta?.otherPlatforms.find(
                                                        ({ type }) => type === 'Primary Others'
                                                    ) ||
                                                    elem?.meta?.otherPlatforms.find(({ type }) => type === 'Secondary')
                                                return (
                                                    platformToShow && (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '11px',
                                                                fontWeight: 400,
                                                                color: '#6C757D',
                                                            }}
                                                        >
                                                            {platformToShow.marketPlace[0].toUpperCase() +
                                                                platformToShow.marketPlace.slice(1)}
                                                        </Typography>
                                                    )
                                                )
                                            })()}
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
                                                    href={
                                                        (
                                                            elem?.meta?.otherPlatforms.find(
                                                                ({ type }) => type === 'Primary'
                                                            ) ||
                                                            elem?.meta?.otherPlatforms.find(
                                                                ({ type }) => type === 'Primary Others'
                                                            ) ||
                                                            elem?.meta?.otherPlatforms.find(
                                                                ({ type }) => type === 'Secondary'
                                                            )
                                                        ).url || '#'
                                                    }
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
                                                            ml: '2px',
                                                        }}
                                                    >
                                                        <LinkingIcon color="#E4933D" />
                                                    </StyledTableIconButton>
                                                    <Box
                                                        sx={{
                                                            display:
                                                                hoveredLinksToTheEventId === elem._id
                                                                    ? 'block'
                                                                    : 'none',
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
                                                sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
                                            >
                                                <Typography
                                                    sx={{ fontSize: '12px', fontWeight: 500, color: '#6C757D' }}
                                                >
                                                    {elem?.subCategory === 'Undefined' ? 'Other' : elem?.subCategory}
                                                </Typography>
                                                {elem?.artistsStat && (
                                                    <Box
                                                        sx={{
                                                            position: 'relative',
                                                        }}
                                                    >
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
                                                                display:
                                                                    hoveredArtistOriginId === elem._id
                                                                        ? 'block'
                                                                        : 'none',
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
                                            onMouseEnter={() => setHoveredSpotifyRankId(elem?._id)}
                                            onMouseLeave={() => setHoveredSpotifyRankId(null)}
                                        >
                                            {elem?.popularity ? elem?.popularity?.toString() : '??'}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: hoveredSpotifyRankId === elem._id ? 'block' : 'none',
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
                                            {format(new Date(applyTimeZone(elem.dateTime, elem.timezone)), 'EEE, ', {
                                                locale: enUS,
                                            }).toUpperCase() +
                                                format(new Date(applyTimeZone(elem.dateTime, elem.timezone)), 'MMM d', {
                                                    locale: enUS,
                                                }).toUpperCase()}
                                        </Typography>
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography noWrap sx={{ fontSize: '13.13px', color: '#595454' }}>
                                                {format(new Date(applyTimeZone(elem.dateTime, elem.timezone)), 'yyyy', {
                                                    locale: enUS,
                                                })}
                                            </Typography>
                                            <Typography noWrap sx={{ fontSize: '13.13px' }}>
                                                {format(
                                                    new Date(applyTimeZone(elem.dateTime, elem.timezone)),
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
                                            {elem.venueName}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
                                    <Box sx={{ display: 'flex', minHeight: '100%' }}>
                                        <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                                            {`${elem?.city ? elem.city : 'N/A'}, ${elem?.venueStateCode ? elem.venueStateCode : 'N/A'}`}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.2rem',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                            }}
                                            onClick={() => {
                                                if (permissions?.includes(USER_PERMISSIONS.MANAGE_CAPACITY)) {
                                                    setSelectedId(elem?._id)
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
                                                        primaryMetaPlatform.totalPlaces > 99
                                                    ) {
                                                        return primaryMetaPlatform.totalPlaces
                                                    } else {
                                                        if (
                                                            secondaryMetaPlatform &&
                                                            secondaryMetaPlatform.totalPlaces
                                                        ) {
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
                                        {getEventWarning(elem)}
                                        {checkingDate(
                                            FormatDate(findMaxByStartDateTime(elem), elem?.timezone),
                                            FormatDate(elem?.saleStartDate, elem?.timezone),
                                            valueDate
                                        ) && (
                                            <Box
                                                sx={{
                                                    bgcolor: 'white',
                                                    color: '#E4933D',
                                                    textAlign: 'center',
                                                    border: '1px solid #D0D5DD',
                                                    borderRadius: '8px',
                                                    fontSize: '16px',
                                                    paddingInline: '0.5rem',
                                                }}
                                            >
                                                First
                                            </Box>
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top', pt: '25px' }}>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                maxWidth: '150px',
                                                position: 'relative',
                                            }}
                                        >
                                            <Button
                                                sx={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    fontSize: '15px',
                                                    fontWeight: '600',
                                                    color: 'text.contrast',
                                                    backgroundColor: 'white',
                                                    border: '1px solid #D0D5DD',
                                                }}
                                                endIcon={<KeyboardArrowDownIcon />}
                                                onClick={() => {
                                                    changeModal('presaleInformationModal')
                                                    setSelectedItem(elem)
                                                }}
                                                onMouseEnter={() => setHoveredPresaleDnTId(elem?._id)}
                                                onMouseLeave={() => setHoveredPresaleDnTId(null)}
                                            >
                                                {elem?.presales?.length > 0
                                                    ? formatCustomDate(findMaxByStartDateTime(elem), elem?.timezone)
                                                    : formatCustomDate(elem?.saleStartDate, elem?.timezone)}
                                            </Button>
                                            <Box
                                                sx={{
                                                    display: hoveredPresaleDnTId === elem._id ? 'block' : 'none',
                                                    position: 'absolute',
                                                    bgcolor: 'rgba(30,30,30,.8)',
                                                    width: '160px',
                                                    zIndex: '1600',
                                                    left: '-20px',
                                                    top: '-40px',
                                                    p: '10px',
                                                    borderRadius: '4px',
                                                    color: 'white',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                Presale Date and Times
                                            </Box>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
                                    <StatsGridItem countRankDate={elem.artistsStat} />
                                </TableCell>
                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top', width: '150px' }}>
                                    <Grid
                                        item
                                        sx={{
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            color: 'text.contrast',
                                            textAlign: 'center',
                                            textOverflow: 'ellipsis',
                                            overflow: 'visible',
                                            textAlignLast: 'center',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {elem.ticketLimit.toString() !== 'N/A' &&
                                            'Limit ' + elem.ticketLimit.toString()}
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: 'text.contrast',
                                                textAlign: 'center',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {elem?.priceRange.length > 0 &&
                                                `$${elem?.priceRange[0]?.min} - $${elem?.priceRange[0]?.max}`}
                                        </Typography>
                                    </Grid>
                                </TableCell>
                                <TableCell>
                                    <StyledActionBox
                                        eventId={elem._id}
                                        handleAddToBuying={() => handleAddToBuying(elem._id)}
                                        handleClick={() => handleClick(elem)}
                                        handleAddToWatchlist={() => handleAddToWatchlist(elem._id)}
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
