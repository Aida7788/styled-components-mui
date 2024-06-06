import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { BuyingAcionBox } from './actionBox'
import { headers } from 'src/common/constants/buyingList'
import { BuyingListResponce } from 'src/types/local/buyingListResponce'
import { applyTimeZone, checkingDate, findMaxByStartDateTime, FormatDate } from 'src/utils/dataFormatters'
import React, { SetStateAction, useState } from 'react'
import { Datum, otherPlatforms } from 'src/types/local/upSalesResp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReactCountryFlag from 'react-country-flag'
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'
import LinkingIcon from 'src/icons/LinkingIcon'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { StyledTableCell, getEventWarning } from '../generalComponents/TableCoponents'
import numberWithCommas from 'src/utils/numberWithCommas'
import useAuth from 'src/hooks/useAuth'

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

export function BuyingListTable({
    buyingTableData,
    valueDate,
    setOpenDirectLinks,
    setOpenPresale,
    setSelectedMeta,
    setSelectedItem,
    setNoteModal,
    handleDelete,
    setOpenAvatar,
    setSelectedNote,
    setOpenSaveModal,
}: {
    valueDate: Date
    buyingTableData: BuyingListResponce
    setOpenDirectLinks: React.Dispatch<SetStateAction<boolean>>
    setOpenPresale: React.Dispatch<SetStateAction<boolean>>
    setSelectedMeta: React.Dispatch<SetStateAction<otherPlatforms[]>>
    setSelectedItem: React.Dispatch<SetStateAction<Datum>>
    setNoteModal: React.Dispatch<SetStateAction<boolean>>
    handleDelete: (eventId: string) => void
    setOpenAvatar: React.Dispatch<SetStateAction<boolean>>
    setSelectedNote: React.Dispatch<SetStateAction<string>>
    setOpenSaveModal: React.Dispatch<SetStateAction<boolean>>
}) {
    const [hoveredPresaleDnTId, setHoveredPresaleDnTId] = useState<any>()

    // Get better name
    const onChange = (item) => {
        setSelectedItem(item?.eventDetails[0])
        setSelectedNote(item?.notes)
        setNoteModal(true)
    }

    const onDelete = (item) => {
        handleDelete(item?._id)
    }

    const [deletionInfoChunk, setDeletionInfoChunk] = useState(null)
    const {
        user: { permissions },
    } = useAuth()

    return (
        <>
            {buyingTableData && (
                <TableContainer sx={{ backgroundColor: 'white' }}>
                    <Table>
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
                            {buyingTableData?.data?.map((infoChunk) => {
                                const elem = infoChunk.eventDetails[0]
                                const primaryMetaPlatform =
                                    elem.meta.otherPlatforms.find(({ type }) => type === 'Primary') ||
                                    elem.meta.otherPlatforms.find(({ type }) => type === 'Primary Others')

                                const secondaryMetaPlatform = elem.meta.otherPlatforms.find(
                                    ({ type }) => type === 'Secondary' || type?.at(0) === 'Secondary'
                                )

                                return (
                                    <TableRow key={infoChunk._id}>
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
                                                        setOpenAvatar(true)
                                                    }}
                                                />
                                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    {elem?.meta?.otherPlatforms[0].marketPlace && (
                                                        <Typography
                                                            sx={{
                                                                fontSize: '11px',
                                                                fontWeight: 400,
                                                                color: '#6C757D',
                                                            }}
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
                                                        <StyledTableIconButton
                                                            onClick={() => {
                                                                setSelectedMeta(elem?.meta.otherPlatforms)
                                                                setSelectedItem(elem)
                                                                setOpenDirectLinks(true)
                                                            }}
                                                            sx={{
                                                                width: '22px',
                                                                height: '22px',
                                                                padding: '2px',
                                                                ml: '2px',
                                                            }}
                                                        >
                                                            <LinkingIcon color="#E4933D" />
                                                        </StyledTableIconButton>
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
                                                                fontWeight: 500,
                                                                color: '#6C757D',
                                                            }}
                                                        >
                                                            {elem?.subCategory === 'Undefined'
                                                                ? 'Other'
                                                                : elem?.subCategory}
                                                        </Typography>
                                                        {elem?.artistsStat && (
                                                            <ReactCountryFlag
                                                                svg
                                                                style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    fontSize: '20px',
                                                                    marginRight: '1px',
                                                                }}
                                                                countryCode={elem?.artistsStat[0]?.meta?.origin}
                                                            />
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
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                    }}
                                                >
                                                    {elem?.popularity ? elem?.popularity?.toString() : '??'}
                                                </Typography>
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
                                                            setOpenPresale(true)
                                                            setSelectedItem(elem)
                                                        }}
                                                        onMouseEnter={() => setHoveredPresaleDnTId(elem?._id)}
                                                        onMouseLeave={() => setHoveredPresaleDnTId(null)}
                                                    >
                                                        {elem?.presales?.length > 0
                                                            ? formatCustomDate(
                                                                  findMaxByStartDateTime(elem),
                                                                  elem?.timezone
                                                              )
                                                            : formatCustomDate(elem?.saleStartDate, elem?.timezone)}
                                                    </Button>
                                                    <Box
                                                        sx={{
                                                            display:
                                                                hoveredPresaleDnTId === elem._id ? 'block' : 'none',
                                                            position: 'absolute',
                                                            bgcolor: 'rgba(30,30,30,.8)',
                                                            width: '160px',
                                                            zIndex: '1600',
                                                            left: '-20px',
                                                            top:'-40px',
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
                                                {'Limit ' + elem.ticketLimit.toString()}
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        fontWeight: '500',
                                                        color: 'text.contrast',
                                                        textAlign: 'center',
                                                        textTransform: 'capitalize',
                                                    }}
                                                >
                                                    {`$${elem?.priceRange[0]?.min} - $${elem.priceRange[0]?.max}`}
                                                </Typography>
                                            </Grid>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                onClick={() => onChange(infoChunk)}
                                                sx={{
                                                    fontWeight: '500',
                                                    maxWidth: '1000px',
                                                    fontSize: '15px',
                                                    cursor: 'pointer',
                                                    wordBreak: 'break-all',
                                                }}
                                            >
                                                {infoChunk.notes}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <BuyingAcionBox
                                                handleChange={() => onChange(infoChunk)}
                                                handleDelete={() => setDeletionInfoChunk(infoChunk)}
                                                handleSave={() => {
                                                    setOpenSaveModal(true)
                                                    setSelectedItem(elem)
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ p: 0 }} />
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Dialog
                open={!!deletionInfoChunk}
                onClose={() => {
                    setDeletionInfoChunk(null)
                }}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this event?</DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setDeletionInfoChunk(null)
                        }}
                        color="warning"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            onDelete(deletionInfoChunk)
                            setDeletionInfoChunk(null)
                        }}
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
