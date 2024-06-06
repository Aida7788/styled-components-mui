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
import { WatchlistActionBox } from './actionBox'
import { headers } from 'src/common/constants/watchlist'
import { applyTimeZone, findMaxByStartDateTime, FormatDate } from 'src/utils/dataFormatters'
import React, { SetStateAction, useMemo, useState } from 'react'
import { Datum, otherPlatforms } from 'src/types/local/upSalesResp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ReactCountryFlag from 'react-country-flag'
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'
import LinkingIcon from 'src/icons/LinkingIcon'
import { addWeeks, format, isAfter } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { StyledTableCell } from '../generalComponents/TableCoponents'
import numberWithCommas from 'src/utils/numberWithCommas'
import { WatchlistResponse } from 'src/types/local/watchlistResponse'

export function WatchlistTable({
    watchlistTableData,
    setOpenDirectLinks,
    setOpenPresale,
    setSelectedMeta,
    setSelectedItem,
    handleDelete,
    setOpenAvatar,
    setOpenSaveModal,
    handleAddToBuying,
    setSelectedNote,
    setNoteModal,
}: {
    watchlistTableData: WatchlistResponse
    setOpenDirectLinks: React.Dispatch<SetStateAction<boolean>>
    setOpenPresale: React.Dispatch<SetStateAction<boolean>>
    setSelectedMeta: React.Dispatch<SetStateAction<otherPlatforms[]>>
    setSelectedItem: React.Dispatch<SetStateAction<Datum>>
    handleDelete: (eventId: string) => void
    setOpenAvatar: React.Dispatch<SetStateAction<boolean>>
    setOpenSaveModal: React.Dispatch<SetStateAction<boolean>>
    handleAddToBuying: (eventId: string, note?: string) => void
    setSelectedNote: React.Dispatch<SetStateAction<string>>
    setNoteModal: React.Dispatch<SetStateAction<boolean>>
}) {
    const onChange = (itemId) => {
        const item = watchlistTableData.data.find((item) => item.eventDetails[0]._id === itemId)
        if (!item) {
            return
        }
        setSelectedItem(item?.eventDetails[0])
        setSelectedNote(item?.notes)
        setNoteModal(true)
    }

    const onDelete = (item) => {
        handleDelete(item?._id)
    }

    const [deletionInfoChunk, setDeletionInfoChunk] = useState(null)

    const separatedByDayAndHour: Map<string, Map<number, Array<any>>> = useMemo(() => {
        const daysSet = new Map<string, Map<number, Array<any>>>()

        watchlistTableData.data
            .sort(
                (a, b) =>
                    new Date(applyTimeZone(findMaxByStartDateTime(a.eventDetails[0]), 'America/New_York')).getTime() -
                    new Date(applyTimeZone(findMaxByStartDateTime(b.eventDetails[0]), 'America/New_York')).getTime()
            )
            .forEach((item) => {
                item.eventDetails.forEach((event) => {
                    const withTimeZone = new Date(applyTimeZone(findMaxByStartDateTime(event), 'America/New_York'))

                    const date = `${withTimeZone.getFullYear()}-${withTimeZone.getMonth() + 1}-${withTimeZone.getDate()}`
                    const hour = withTimeZone.getHours()

                    let currentDay = daysSet.get(date)
                    if (!currentDay) {
                        currentDay = new Map<number, Array<any>>()
                        daysSet.set(date, currentDay)
                    }

                    const dayMap = daysSet.get(date)

                    if (!dayMap.has(hour)) {
                        dayMap.set(hour, [event])
                    } else {
                        dayMap.set(hour, [...dayMap.get(hour), event])
                    }
                })
            })
        return daysSet
    }, [watchlistTableData])

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: '#0B1B3F' }}>
                        <TableRow>
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
                        </TableRow>
                    </TableHead>
                    {[...separatedByDayAndHour.keys()].map((dayOfWeekNumber) => {
                        const dayData = separatedByDayAndHour.get(dayOfWeekNumber)
                        return (
                            <TableBody
                                sx={{
                                    padding: '20px !important',
                                    margin: '20px !important',
                                    '.MuiTableCell-root': {
                                        backgroundColor: 'white',
                                        border: 'unset',
                                        padding: '10px !important',
                                    },
                                }}
                            >
                                <TableRow
                                    sx={{
                                        '.MuiTableRow-root': {
                                            margin: '10px !important',
                                        },
                                    }}
                                >
                                    <TableCell
                                        colSpan={10}
                                        sx={{
                                            backgroundColor: 'transparent !important',
                                        }}
                                    ></TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{
                                        '.MuiTableRow-root': {
                                            margin: '10px !important',
                                        },
                                    }}
                                >
                                    <TableCell
                                        colSpan={10}
                                        sx={{
                                            borderTopLeftRadius: '18px !important',
                                            borderTopRightRadius: '18px !important',
                                        }}
                                    >
                                        <Typography variant="h5" align="center" color={'#E4933D'}>
                                            {format(new Date(dayOfWeekNumber), 'EEEE MMM d')}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                {[...dayData.keys()].map((hour) => {
                                    const hourData = dayData.get(hour)
                                    return hourData.map((infoChunk, index) => {
                                        const elem = infoChunk
                                        return [
                                            ...(index === 0
                                                ? [
                                                      <TableRow>
                                                          <TableCell colSpan={10}>
                                                              <Typography variant="h6" align="center" color="#0D2459">
                                                                  {format(
                                                                      new Date(`${dayOfWeekNumber} ${hour}:00`),
                                                                      "h:mm aaaaa'm'"
                                                                  )}{' '}
                                                                  EST
                                                              </Typography>
                                                          </TableCell>
                                                      </TableRow>,
                                                  ]
                                                : []),
                                            <TableRow
                                                key={infoChunk._id}
                                                sx={{
                                                    '.MuiTableCell-root': {
                                                        backgroundColor: 'white',
                                                        border: 'unset',
                                                        verticalAlign: 'top',
                                                        alignContent: 'center',
                                                    },
                                                }}
                                            >
                                                <TableCell
                                                    sx={{
                                                        verticalAlign: 'top',
                                                        paddingTop: '20px',
                                                        width: '350px',
                                                        maxWidth: '400px',
                                                        pv: '0',
                                                        ...(index === hourData.length - 1
                                                            ? { borderBottomLeftRadius: '18px !important' }
                                                            : {}),
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        <Avatar
                                                            sx={{
                                                                width: '56px',
                                                                height: '56px',
                                                                mr: '12px',
                                                                cursor: 'pointer',
                                                                ':hover': {
                                                                    border: '1px #E4933D solid',
                                                                },
                                                            }}
                                                            src={elem?.images[0]}
                                                            onClick={() => {
                                                                setSelectedItem(elem)
                                                                setOpenAvatar(true)
                                                            }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                width: '100%',
                                                            }}
                                                        >
                                                            {elem?.meta?.otherPlatforms[0].marketPlace && (
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '11px',
                                                                        fontWeight: 400,
                                                                        color: '#6C757D',
                                                                    }}
                                                                >
                                                                    {elem?.meta?.otherPlatforms[0]?.marketPlace[0].toUpperCase() +
                                                                        elem?.meta?.otherPlatforms[0]?.marketPlace.slice(
                                                                            1
                                                                        )}
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
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                        }}
                                                    >
                                                        <Typography noWrap sx={{ fontSize: '15px', fontWeight: '500' }}>
                                                            {format(
                                                                new Date(
                                                                    applyTimeZone(elem.dateTime, 'America/New_York')
                                                                ),
                                                                'EEE, ',
                                                                {
                                                                    locale: enUS,
                                                                }
                                                            ).toUpperCase() +
                                                                format(
                                                                    new Date(
                                                                        applyTimeZone(elem.dateTime, 'America/New_York')
                                                                    ),
                                                                    'MMM d',
                                                                    {
                                                                        locale: enUS,
                                                                    }
                                                                ).toUpperCase()}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex' }}>
                                                            <Typography
                                                                noWrap
                                                                sx={{
                                                                    fontSize: '13.13px',
                                                                    color: '#595454',
                                                                }}
                                                            >
                                                                {format(
                                                                    new Date(
                                                                        applyTimeZone(elem.dateTime, 'America/New_York')
                                                                    ),
                                                                    'yyyy',
                                                                    {
                                                                        locale: enUS,
                                                                    }
                                                                )}
                                                            </Typography>
                                                            <Typography noWrap sx={{ fontSize: '13.13px' }}>
                                                                {format(
                                                                    new Date(
                                                                        applyTimeZone(elem.dateTime, 'America/New_York')
                                                                    ),
                                                                    '‎ / p',
                                                                    { locale: enUS }
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                        }}
                                                    >
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
                                                        {elem.meta.otherPlatforms[0]?.totalPlaces
                                                            ? numberWithCommas(
                                                                  elem.meta.otherPlatforms[0]?.totalPlaces?.toString()
                                                              )
                                                            : 'empty'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        paddingTop: '30px',
                                                        verticalAlign: 'top',
                                                        pt: '25px',
                                                    }}
                                                >
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
                                                                maxWidth: '100px',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                gap: '11px',
                                                            }}
                                                        >
                                                            <Button
                                                                sx={{
                                                                    fontSize: '10px',
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
                                                            >
                                                                {FormatDate(
                                                                    findMaxByStartDateTime(elem),
                                                                    'America/New_York'
                                                                )}
                                                            </Button>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell
                                                    sx={{
                                                        paddingTop: '30px',
                                                        verticalAlign: 'top',
                                                        width: '150px',
                                                    }}
                                                >
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
                                                <TableCell
                                                    sx={{
                                                        ...(index === hourData.length - 1
                                                            ? { borderBottomRightRadius: '18px !important' }
                                                            : {}),
                                                    }}
                                                >
                                                    <WatchlistActionBox
                                                        eventId={elem?._id}
                                                        handleAddToBuying={() => {
                                                            handleAddToBuying(elem?._id)
                                                        }}
                                                        handleChange={onChange}
                                                        handleDelete={() => {
                                                            handleDelete(elem?._id)
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>,
                                        ]
                                    })
                                })}
                            </TableBody>
                        )
                    })}
                </Table>
            </TableContainer>
            <Dialog
                open={!!deletionInfoChunk}
                onClose={() => {
                    setDeletionInfoChunk(null)
                }}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this event from Hot Watchlist?</DialogContent>
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
