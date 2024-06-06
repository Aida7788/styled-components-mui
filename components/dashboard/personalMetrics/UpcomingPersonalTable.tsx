import {
    Avatar,
    Box,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useState } from 'react'
import { PMheaders } from 'src/common/constants/personalMetric'
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'
import FilterDesc from 'src/icons/FilterDesc'
import LinkingIcon from 'src/icons/LinkingIcon'
import { MetricDataINT } from 'src/types/local/artistMetricResponce'
import { FormatDate, applyTimeZone, checkingDate, findMaxByStartDateTime } from 'src/utils/dataFormatters'
import numberWithCommas from 'src/utils/numberWithCommas'
import { AvailableItems, PriceDisplay, StyledTableCell, getEventWarning } from '../generalComponents/TableCoponents'

export function ListTable({
    tableEventData,
    setSelectedElem,
    setIsModalOpen,
}: {
    tableEventData?: MetricDataINT[]
    setSelectedElem
    setIsModalOpen
}) {
    const [hoveredLinksToTheEventId, setHoveredLinksToTheEventId] = useState<any>()
    const [hoveredAvatarId, setHoveredAvatarId] = useState<any>()
    const [hoveredSpotifyRankId, setHoveredSpotifyRankId] = useState<any>()
    return (
        <>
            {tableEventData && (
                <TableContainer sx={{ backgroundColor: 'white' }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#0B1B3F' }}>
                            <TableRow>
                                <StyledTableCell sx={{ minWidth: '5px', p: 0 }} />
                                {PMheaders.map((elem, index) => {
                                    return (
                                        <StyledTableCell key={index}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        maxWidth: '83px',
                                                        textAlign: 'start',
                                                        color: 'white',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                    }}
                                                >
                                                    {elem.name.toLocaleUpperCase()}
                                                </Typography>
                                                {elem.filterable && (
                                                    <IconButton
                                                        onClick={() => {
                                                            //setSelectedFiltration(elem.key)
                                                        }}
                                                        sx={{
                                                            width: '24px',
                                                            height: '24px',
                                                            backgroundColor: 'white',
                                                            padding: '4px',
                                                            border: '1px solid #D0D5DD',
                                                            borderRadius: '6px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            ':hover': {
                                                                backgroundColor: 'white',
                                                            },
                                                            color: '#E4933D',
                                                        }}
                                                    >
                                                        <FilterDesc style={{ fontSize: '18px', stroke: '#E4933D' }} />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </StyledTableCell>
                                    )
                                })}
                                <StyledTableCell sx={{ width: '5px', p: 0 }} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableEventData?.map((infoChunk, index) => {
                                const elem = infoChunk.eventDetails
                                const primaryMetaPlatform =
                                    elem.meta.otherPlatforms.find(({ type }) => type === 'Primary') ||
                                    elem.meta.otherPlatforms.find(({ type }) => type === 'Primary Others')

                                const secondaryMetaPlatform = elem.meta.otherPlatforms.find(
                                    ({ type }) => type === 'Secondary' || type?.at(0) === 'Secondary'
                                )
                                return (
                                    <TableRow key={index}>
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
                                                <Box sx={{ position: 'relative' }}>
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
                                                            // setSelectedId(elem._id)
                                                            // setSelectedArtist(elem)
                                                            // changeModal('avatarModal')
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
                                                    {elem?.meta?.otherPlatforms[0].marketPlace && (
                                                        <Typography
                                                            sx={{ fontSize: '11px', fontWeight: 400, color: '#6C757D' }}
                                                        >
                                                            {elem?.meta?.otherPlatforms[0]?.marketPlace[0].toUpperCase() +
                                                                elem?.meta?.otherPlatforms[0]?.marketPlace.slice(1)}
                                                        </Typography>
                                                    )}
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
                                                                    setSelectedElem(elem)
                                                                    setIsModalOpen(true)
                                                                }}
                                                                sx={{
                                                                    width: '22px',
                                                                    height: '22px',
                                                                    padding: '2px',
                                                                    ml: '2px    ',
                                                                }}
                                                                onMouseEnter={() =>
                                                                    setHoveredLinksToTheEventId(elem?._id)
                                                                }
                                                                onMouseLeave={() => setHoveredLinksToTheEventId(null)}
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
                                                        sx={{
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{ fontSize: '12px', fontWeight: 400, color: '#6C757D' }}
                                                        >
                                                            {elem?.subCategory === 'Undefined'
                                                                ? 'Other'
                                                                : elem?.subCategory}
                                                        </Typography>
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
                                                    onMouseEnter={() => setHoveredSpotifyRankId(elem._id)}
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
                                                    {format(
                                                        new Date(applyTimeZone(elem.dateTime, elem.timezone)),
                                                        'EEE, ',
                                                        {
                                                            locale: enUS,
                                                        }
                                                    ).toUpperCase() +
                                                        format(
                                                            new Date(applyTimeZone(elem.dateTime, elem.timezone)),
                                                            'MMM d',
                                                            {
                                                                locale: enUS,
                                                            }
                                                        ).toUpperCase()}
                                                </Typography>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Typography noWrap sx={{ fontSize: '13.13px', color: '#595454' }}>
                                                        {format(
                                                            new Date(applyTimeZone(elem.dateTime, elem.timezone)),
                                                            'yyyy',
                                                            {
                                                                locale: enUS,
                                                            }
                                                        )}
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
                                            <Typography
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    fontSize: '15px',
                                                    fontWeight: '500',
                                                }}
                                            >
                                                {numberWithCommas(elem.meta.otherPlatforms[0]?.totalPlaces?.toString())}
                                                
                                            </Typography>
                                            {getEventWarning(elem)}
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
                                                elem={elem}
                                                availableCount={
                                                    primaryMetaPlatform &&
                                                    typeof elem.last_fetched_details?.primary_tickets_count !==
                                                        'undefined'
                                                        ? elem.last_fetched_details?.primary_tickets_count
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
                                            />
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
                                            <AvailableItems
                                                platform={['stubhub']}
                                                link={'/dashboard/secondary-analytics'}
                                                marketPlaceName={'stubhub'}
                                                availableCount={
                                                    secondaryMetaPlatform &&
                                                    typeof elem.last_fetched_details?.secondary_tickets_count !==
                                                        'undefined'
                                                        ? elem.last_fetched_details?.secondary_tickets_count?.toString()
                                                        : false
                                                }
                                                elem={elem}
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
                                            />
                                        </TableCell>
                                        <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top', width: '80px' }}>
                                            <PriceDisplay
                                                value={
                                                    elem.last_fetched_details?.secondary_minimum_price
                                                        ? '$' + elem.last_fetched_details?.secondary_minimum_price
                                                        : 'N/A '
                                                }
                                                secondValue={
                                                    elem.last_fetched_details?.secondary_get_in_price2
                                                        ? '$' + elem.last_fetched_details?.secondary_get_in_price2
                                                        : 'N/A '
                                                }
                                                lastFetched={elem.stubhub_last_fetched_at}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {checkingDate(
                                                FormatDate(findMaxByStartDateTime(elem), elem?.timezone),
                                                FormatDate(elem?.saleEndDate, elem?.timezone),
                                                FormatDate(elem?.saleStartDate, elem?.timezone)
                                            ) ? (
                                                <Box
                                                    sx={{
                                                        bgcolor: '#FFE5E5',
                                                        color: '#FF0000',
                                                        width: '100%',
                                                        textAlign: 'center',
                                                        borderRadius: '10px',
                                                        padding: '4px 4px',
                                                        fontSize: '14px',
                                                        border: 'solid 1px #E4933D',
                                                    }}
                                                >
                                                    <Typography noWrap={true} sx={{ fontWeight: '500' }}>
                                                        Presale
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        bgcolor: '#DCFFDC',
                                                        color: '#008000',
                                                        width: '100%',
                                                        textAlign: 'center',
                                                        borderRadius: '10px',
                                                        padding: '4px 4px',
                                                        fontSize: '14px',
                                                        border: 'solid 1px #067647',
                                                    }}
                                                >
                                                    <Typography noWrap={true} sx={{ fontWeight: '500' }}>
                                                        On Sale
                                                    </Typography>
                                                </Box>
                                            )}
                                        </TableCell>
                                        <TableCell sx={{ p: 0 }} />
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    )
}
