import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Menu,
    MenuItem,
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
import React, { SetStateAction, useState } from 'react'
import { PFheaders, SFheaders } from 'src/common/constants/primaryFavouritesConst'
import { StudhubIcon } from 'src/icons/StudhubIcon'
import { ApiDeleteNoteItemRequest } from 'src/types/api/apiEventAnalyticsTypes'
import { dropCheckInt, primaryFavouriteDataInterface } from 'src/types/local/primaryFavourite'
import { otherPlatforms } from 'src/types/local/upSalesResp'
import { applyTimeZone } from 'src/utils/dataFormatters'
import numberWithCommas from 'src/utils/numberWithCommas'
import { AvailableItems, EventName, PriceDisplay, getEventWarning } from '../generalComponents/TableCoponents'
import { ActionBoxPrimaryFavourite } from './actionBoxPrimaryFavourite'
// import Refresh from 'src/icons/Refresh'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
// import NewNoteIcon from 'src/icons/NewNoteIcon'
// import TrashIcon from 'src/icons/TrashIcon'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import NoteIcon from 'src/icons/NoteIcon'
import RestockIcon from 'src/icons/RestockIcon'

export function PrimaryFavouritesTable({
    data,
    selectedId,
    setSelectedDrop,
    deleteNote,
    setSelectedId,
    changeModal,
    setSelectedItem,
    setSelectedMeta,
    isSecondary = false,
    refetchRequest,
}: {
    data?: primaryFavouriteDataInterface[]
    selectedId: string
    setSelectedItem: React.Dispatch<SetStateAction<primaryFavouriteDataInterface>>
    setSelectedDrop: React.Dispatch<SetStateAction<dropCheckInt[]>>
    deleteNote: (params: ApiDeleteNoteItemRequest) => void
    setSelectedId: React.Dispatch<SetStateAction<string>>
    changeModal: (val: string) => void
    handleChangeModal: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        modalId: string,
        secondModalId?: string
    ) => void
    setSelectedMeta: React.Dispatch<SetStateAction<otherPlatforms[]>>
    isModalOpen: (val: string) => boolean
    isSecondary?: boolean
    refetchRequest: () => void
}) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedEventId, setSelectedEventId] = useState(null)
    const open = Boolean(anchorEl)
    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        id: string,
        item: primaryFavouriteDataInterface
    ) => {
        setAnchorEl(event.currentTarget)
        setSelectedId(id)
        setSelectedDrop([])
        setSelectedItem(item)
        setSelectedEventId(item._id)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    // const { mutate: mutateDeleteNote } = useMutation({
    //     mutationFn: () => EventAPI.deleteNoteItem({ eventId: selectedEventId }),
    //     onSuccess: async () => {
    //         await queryClient.invalidateQueries({ queryKey: [GET_NOTES_QUERY_KEY] })
    //     },
    // })
    const [isOpenedDeleteConfirm, setIsOpenedDeleteConfirm] = useState(false)
    const [hoveredSpotifyRankId, setHoveredSpotifyRankId] = useState<any>()

    // const queryClient = useQueryClient()

    return (
        <>
            {data && (
                <>
                    <TableContainer sx={{ width: '100%', backgroundColor: 'white' }}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#0B1B3F' }}>
                                <TableRow>
                                    <StyledTableCell sx={{ minWidth: '5px', p: 0 }} />
                                    {(isSecondary ? SFheaders : PFheaders).map((elem, index) => {
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
                                {data?.map((infoChunk, index) => {
                                    const elem = infoChunk.event
                                    const primaryMetaPlatform =
                                        elem.meta.otherPlatforms.find(({ type }) => type === 'Primary') ||
                                        elem.meta.otherPlatforms.find(({ type }) => type === 'Primary Others')

                                    const secondaryMetaPlatform = elem.meta.otherPlatforms.find(
                                        ({ type }) => type === 'Secondary' || type?.at(0) === 'Secondary'
                                    )
                                    return (
                                        <TableRow sx={{ ':hover': { bgcolor: '#F0F0F0' } }} key={index}>
                                            <TableCell sx={{ p: '0' }} />
                                            <EventName
                                                elem={elem}
                                                setSelectedItem={setSelectedItem}
                                                infoChunk={infoChunk}
                                                changeModal={changeModal}
                                                setSelectedMeta={setSelectedMeta}
                                                setSelectedId={setSelectedId}
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
                                                        onMouseEnter={() => setHoveredSpotifyRankId(elem._id)}
                                                        onMouseLeave={() => setHoveredSpotifyRankId(null)}
                                                    >
                                                        {elem?.popularity ? elem?.popularity?.toString() : '??'}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display:
                                                                hoveredSpotifyRankId === elem._id ? 'block' : 'none',
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
                                                        <Typography
                                                            noWrap
                                                            sx={{ fontSize: '13.13px', color: '#595454' }}
                                                        >
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
                                                        elem?.meta?.otherPlatforms[0]?.totalPlaces?.toString()
                                                    )}
                                                </Typography>
                                                {getEventWarning(elem)}
                                            </TableCell>
                                            <TableCell
                                                sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}
                                            >
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
                                            {isSecondary ? (
                                                <>
                                                    <TableCell
                                                        sx={{
                                                            maxWidth: '60px',
                                                            paddingTop: '30px',
                                                            verticalAlign: 'top',
                                                        }}
                                                    >
                                                        <AvailableItems
                                                            platform={['stubhub']}
                                                            link={'/dashboard/secondary-analytics'}
                                                            marketPlaceName={'stubhub'}
                                                            availableCount={
                                                                secondaryMetaPlatform &&
                                                                typeof elem.last_fetched_details
                                                                    ?.secondary_tickets_count !== 'undefined'
                                                                    ? elem.last_fetched_details?.secondary_tickets_count?.toString()
                                                                    : false
                                                            }
                                                            elem={elem}
                                                            Icon={
                                                                <img
                                                                    style={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        borderRadius: '50%',
                                                                    }}
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
                                                    <NumberChangeSecondaryCell infoChunk={infoChunk} elem={elem} />
                                                    <PercentChangeSecondaryCell infoChunk={infoChunk} elem={elem} />
                                                </>
                                            ) : (
                                                <>
                                                    <NumberChangePrimaryCell infoChunk={infoChunk} elem={elem} />
                                                    <PercentChangePrimaryCell infoChunk={infoChunk} elem={elem} />
                                                    <TableCell
                                                        sx={{
                                                            maxWidth: '60px',
                                                            paddingTop: '30px',
                                                            verticalAlign: 'top',
                                                        }}
                                                    >
                                                        <AvailableItems
                                                            platform={['stubhub']}
                                                            link={'/dashboard/secondary-analytics'}
                                                            marketPlaceName={'stubhub'}
                                                            availableCount={
                                                                secondaryMetaPlatform &&
                                                                typeof elem.last_fetched_details
                                                                    ?.secondary_tickets_count !== 'undefined'
                                                                    ? elem.last_fetched_details?.secondary_tickets_count?.toString()
                                                                    : false
                                                            }
                                                            elem={elem}
                                                            Icon={
                                                                <img
                                                                    style={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        borderRadius: '50%',
                                                                    }}
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
                                                </>
                                            )}
                                            <TableCell>
                                                <ActionBoxPrimaryFavourite
                                                    isSecondary={isSecondary}
                                                    setSelectedId={setSelectedId}
                                                    changeModal={changeModal}
                                                    item={infoChunk}
                                                    setSelectedDrop={setSelectedDrop}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    onClick={() => {
                                                        changeModal('noteModal')
                                                        setSelectedItem(infoChunk)
                                                        setSelectedId(elem?._id)
                                                    }}
                                                    sx={{
                                                        fontWeight: '500',
                                                        maxWidth: '1000px',
                                                        fontSize: '15px',
                                                        cursor: 'pointer',
                                                        wordBreak: 'break-all',
                                                    }}
                                                >
                                                    {infoChunk.text}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ p: 0 }}>
                                                <IconButton
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                        handleMenuClick(event, elem?._id, infoChunk)
                                                    }}
                                                    sx={{ aspectRatio: '1/1', width: '30px', height: '30px' }}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        sx={{ zIndex: 4 }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                setIsOpenedDeleteConfirm(true)
                                setAnchorEl(null)
                            }}
                        >
                            <DeleteOutlineIcon />
                            <Typography sx={{ ml: '8px', fontWeight: '500' }}>Delete</Typography>
                        </MenuItem>
                        <Divider variant="middle" />
                        <MenuItem
                            sx={{ pl: '18px' }}
                            onClick={() => {
                                changeModal('noteModal')
                                setAnchorEl(null)
                            }}
                        >
                            <NoteIcon color="black" />
                            <Typography sx={{ ml: '8px', fontWeight: '500' }}>Notes</Typography>
                        </MenuItem>
                        <Divider variant="middle" />
                        <MenuItem
                            onClick={() => {
                                changeModal('dropModal')
                                setAnchorEl(null)
                            }}
                        >
                            <NotificationAddOutlinedIcon />
                            <Typography sx={{ ml: '8px', fontWeight: '500' }}>Dropchecker</Typography>
                        </MenuItem>
                        <Divider variant="middle" />
                        {isSecondary ? (
                            <>
                                <MenuItem
                                    onClick={() => {
                                        changeModal('priceModal')
                                        setAnchorEl(null)
                                    }}
                                >
                                    <AddTaskOutlinedIcon />
                                    <Typography sx={{ ml: '8px', fontWeight: '500' }}>Price Drop</Typography>
                                </MenuItem>
                                <Divider variant="middle" />
                                <MenuItem
                                    onClick={() => {
                                        changeModal('invModal')
                                        setAnchorEl(null)
                                    }}
                                >
                                    <ReportOutlinedIcon />
                                    <Typography sx={{ ml: '8px', fontWeight: '500' }}>Low Inventory</Typography>
                                </MenuItem>
                            </>
                        ) : (
                            <MenuItem
                                onClick={() => {
                                    changeModal('invModal')
                                    setAnchorEl(null)
                                }}
                            >
                                <ReportOutlinedIcon />
                                <Typography sx={{ ml: '8px', fontWeight: '500' }}>Low Inventory</Typography>
                            </MenuItem>
                        )}

                        <Divider variant="middle" />
                        <MenuItem
                            sx={{ pl: '18px' }}
                            onClick={() => {
                                refetchRequest()
                            }}
                        >
                            <RestockIcon
                                sx={{
                                    width: '20px',
                                    height: '20px',
                                    stroke: 'black',
                                }}
                            />
                            <Typography sx={{ ml: '8px', fontWeight: '500' }}>Refresh Data</Typography>
                        </MenuItem>
                    </Menu>
                    <Dialog
                        open={isOpenedDeleteConfirm}
                        onClose={() => {
                            setIsOpenedDeleteConfirm(false)
                        }}
                    >
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>Are you sure you want to delete this event?</DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => {
                                    setIsOpenedDeleteConfirm(false)
                                }}
                                color="warning"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    deleteNote({ eventId: selectedEventId })
                                    setIsOpenedDeleteConfirm(false)
                                }}
                                color="error"
                            >
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </>
    )
}

const StyledTableCell = styled(TableCell)(({}) => ({
    '& .MuiStyledTableCell-root': {
        color: '#000000',
    },
}))

const NumberChangePrimaryCell = ({ elem, infoChunk }) => {
    const calculation =
         elem?.last_fetched_details?.primary_tickets_count - infoChunk?.last_fetched_details?.primary_tickets_count
    return (
        <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
            <PriceDisplay
                color={calculation > 0 ? 'green' : calculation < 0 ? 'red' : null}
                value={
                    typeof calculation === 'number'
                        ? calculation > 0
                            ? '+' + calculation
                            : calculation.toString()
                        : '0'
                }
                header="Since Added"
                lastFetched={infoChunk.last_fetched_details?.current_date_time}
            />
        </TableCell>
    )
}

const PercentChangePrimaryCell = ({ elem, infoChunk }) => {
    let calculation

    if (infoChunk?.last_fetched_details?.primary_tickets_count > 0) {
        calculation =
            ((elem?.last_fetched_details?.primary_tickets_count -
                infoChunk?.last_fetched_details?.primary_tickets_count) /
                infoChunk?.last_fetched_details?.primary_tickets_count) *
            100
    } else {
        calculation = elem?.last_fetched_details?.primary_tickets_count > 0 ? 100 : 0
    }
    return (
        <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
            <PriceDisplay
                color={calculation > 0 ? 'green' : calculation < 0 ? 'red' : null}
                header="Since Added"
                value={
                    calculation
                        ? calculation > 0
                            ? '+' + calculation.toFixed(0).toString() + '%'
                            : calculation?.toFixed(0).toString() + '%'
                        : '0%'
                }
                lastFetched={infoChunk.last_fetched_details?.current_date_time}
            />
        </TableCell>
    )
}

const NumberChangeSecondaryCell = ({ elem, infoChunk }) => {
    const calculation =
         elem?.last_fetched_details?.secondary_tickets_count - infoChunk?.last_fetched_details?.secondary_tickets_count

    return (
        <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
            <PriceDisplay
                color={calculation > 0 ? 'green' : calculation < 0 ? 'red' : null}
                value={
                    typeof calculation === 'number'
                        ? calculation > 0
                            ? '+' + calculation
                            : calculation.toString()
                        : '0'
                }
                lastFetched={infoChunk.last_fetched_details?.current_date_time}
                header="Since Added"
            />
        </TableCell>
    )
}

const PercentChangeSecondaryCell = ({ elem, infoChunk }) => {
    let calculation
    if (infoChunk?.last_fetched_details?.secondary_tickets_count > 0) {
        calculation =
            ((elem?.last_fetched_details?.secondary_tickets_count -
                infoChunk?.last_fetched_details?.secondary_tickets_count) /
                infoChunk?.last_fetched_details?.secondary_tickets_count) *
            100
    } else {
        calculation = elem?.last_fetched_details?.secondary_tickets_count > 0 ? 100 : 0
    }
    return (
        <TableCell sx={{ maxWidth: '60px', paddingTop: '30px', verticalAlign: 'top' }}>
            <PriceDisplay
                color={calculation > 0 ? 'green' : calculation < 0 ? 'red' : null}
                value={
                    elem?.last_fetched_details?.secondary_tickets_count
                        ? calculation > 0
                            ? '+' + calculation.toFixed(0).toString() + '%'
                            : calculation?.toFixed(0).toString() + '%'
                        : '0%'
                }
                lastFetched={infoChunk.last_fetched_details?.current_date_time}
                header="Since Added"
            />
        </TableCell>
    )
}
