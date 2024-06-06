import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'
import {
    GET_SCRAP_SECTION_INFORMATION_QUERY_KEY,
    GET_SCRAP_SECTION_INFORMATION_STUBHUB_QUERY_KEY,
} from 'src/common/constants/queryKeys'
import useAuth from 'src/hooks/useAuth'
import { useUserLimits } from 'src/hooks/useLimitsContext'
import NoteIcon from 'src/icons/NoteIcon'
import RestockIcon from 'src/icons/RestockIcon'
import { EventAPI } from 'src/services/eventAnalyticsAPI'
import { StyledTableIconButton } from '../../general/StyledTableIconButton'

export function StyledActionBox({
    setSelectedId,
    event_id,
    changeModal,
    setSelectedEvent,
    setRefetchingId,
    hasPrimary,
    hasSecondary,
    updateEventLastFetchDetails,
    isAXS,
}: {
    event_id: string
    changeModal
    setSelectedId
    setSelectedEvent: (eventId: string) => void
    setRefetchingId: (eventId: string) => void
    hasPrimary: boolean
    hasSecondary: boolean
    updateEventLastFetchDetails: (eventId: string, update: any) => void
    isAXS?: boolean
}) {
    const [showPopUp, setShowPopUp] = useState(false)
    const [hoveredAddAlertId, setHoveredAddAlertId] = useState<any>()
    const [hoveredToFavoritesId, setHoveredToFavoritesId] = useState<any>()
    const [hoveredAddNotesId, setHoveredAddNotesId] = useState<any>()
    const [hoveredDeleteEventId, setHoveredDeleteEventId] = useState<any>()
    const { fetchCount, wasteFetch, maxFetchCount } = useUserLimits()
    const [loading, setLoading] = useState(false)
    const [refetchingMessage, setRefetchingMessage] = useState(
        `You have used ${fetchCount ? fetchCount : 0}/${maxFetchCount} fetches.`
    )
    const [isOpenedDeleteConfirm, setIsOpenedDeleteConfirm] = useState(false)

    const {
        user: { permissions },
    } = useAuth()

    const {
        refetch: refetchPrimary,
        data: primaryData,
        isError: primaryError,
    } = useQuery({
        queryKey: [GET_SCRAP_SECTION_INFORMATION_QUERY_KEY],
        queryFn: () => EventAPI.getEventsScrapSectionInformation({ eventId: event_id }),
        enabled: false,
    })

    const {
        refetch: refetchSecondary,
        data: secondaryData,
        isError: secondaryError,
    } = useQuery({
        queryKey: [GET_SCRAP_SECTION_INFORMATION_STUBHUB_QUERY_KEY],
        queryFn: () => EventAPI.getEventsScrapSectionInformationStubhub({ eventId: event_id }),
        enabled: false,
    })

    useEffect(() => {
        if (primaryData?.data?.data) {
            updateEventLastFetchDetails(event_id, primaryData.data.data)
        }
        if (secondaryData?.data?.data) {
            updateEventLastFetchDetails(event_id, secondaryData.data.data)
        }
    }, [event_id, primaryData, secondaryData, updateEventLastFetchDetails])

    const handleOpenNote = () => {
        setSelectedId(event_id)
        changeModal('noteModal')
    }
    const handleOpenAddToFavs = () => {
        setSelectedId(event_id)
        changeModal('saveModal')
    }
    const handleOpenAlert = () => {
        setSelectedId(event_id)
        setSelectedEvent(event_id)
        changeModal('mainModal')
    }
    const handleClickRefresh = async () => {
        if (fetchCount > 0) {
            setLoading(true)
            setRefetchingMessage('Refetching')
            setRefetchingId(event_id)
            setSelectedId(event_id)
            if (hasPrimary) {
                await refetchPrimary()
                if (primaryError) {
                    toast(`Error when scrape primary`)
                }
            }
            if (hasSecondary) {
                await refetchSecondary()
                if (secondaryError) {
                    toast(`Error when scrape secondary`)
                }
            }
            setTimeout(() => {
                wasteFetch()
                setLoading(false)
                setRefetchingMessage('Successfully fetched')
                setRefetchingId(null)
            }, 5000)
            setTimeout(() => {
                setRefetchingMessage(`You have used ${fetchCount ? fetchCount : 0}/${maxFetchCount} fetches.`)
            }, 8000)
        }
    }
    const handleClickDelete = () => {
        setIsOpenedDeleteConfirm(true)
    }
    const handleCloseDialog = () => {
        setIsOpenedDeleteConfirm(false)
    }
    const handleConfirmDelete = async () => {
        //await someApi.deleteEvent({eventId: event_id})
        handleCloseDialog()
    }

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    gap: '14px',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <StyledTableIconButton
                        onClick={handleOpenAlert}
                        size="small"
                        onMouseEnter={() => setHoveredAddAlertId(event_id)}
                        onMouseLeave={() => setHoveredAddAlertId(null)}
                    >
                        <AddAlertOutlinedIcon sx={{ color: '#E4933D', width: '19px' }} />
                    </StyledTableIconButton>
                    <Box
                        sx={{
                            display: hoveredAddAlertId === event_id ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            width: '80px',
                            zIndex: '1600',
                            p: '10px',
                            right: '20px',
                            bottom: '25px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '500',
                        }}
                    >
                        Set Alerts
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <StyledTableIconButton
                        onClick={handleOpenNote}
                        size="small"
                        onMouseEnter={() => setHoveredAddNotesId(event_id)}
                        onMouseLeave={() => setHoveredAddNotesId(null)}
                    >
                        <NoteIcon color="#E4933D" />
                    </StyledTableIconButton>
                    <Box
                        sx={{
                            display: hoveredAddNotesId === event_id ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            width: '80px',
                            zIndex: '1600',
                            p: '10px',
                            bottom: '25px',
                            right: '20px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '500',
                        }}
                    >
                        Add Notes
                    </Box>
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <StyledTableIconButton
                        onClick={handleOpenAddToFavs}
                        size="small"
                        onMouseEnter={() => setHoveredToFavoritesId(event_id)}
                        onMouseLeave={() => setHoveredToFavoritesId(null)}
                    >
                        <AddBoxOutlinedIcon sx={{ color: '#E4933D', width: '19px' }} />
                    </StyledTableIconButton>
                    <Box
                        sx={{
                            display: hoveredToFavoritesId === event_id ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            width: '140px',
                            zIndex: '1600',
                            p: '10px',
                            bottom: '25px',
                            right: '20px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '500',
                        }}
                    >
                        Add to "My Favorites"
                    </Box>
                </Box>
                <Box
                    sx={{ position: 'relative' }}
                    onMouseLeave={() => setShowPopUp(false)}
                    onMouseEnter={() => setShowPopUp(true)}
                >
                    <StyledTableIconButton disabled onClick={() => handleClickRefresh()} size="small">
                        <RestockIcon
                            sx={{
                                width: '20px',
                                height: '20px',
                                stroke: '#E4933D',
                                animation: loading ? 'spin 3000ms infinite linear' : null,
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
                        <Box
                            sx={{
                                display: showPopUp || loading ? 'block' : 'none',
                                position: 'absolute',
                                bgcolor: 'rgba(30,30,30,.8)',
                                width: '120px',
                                zIndex: '1600',
                                p: '10px',
                                right: '10px',
                                bottom: '25px',
                                borderRadius: '4px',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: '500',
                            }}
                        >
                            {/* {!isAXS ? ( */}
                                {/* <> */}
                                    {/* {!loading && <Typography sx={{ fontSize: '12px' }}>Refetch Live Data</Typography>} */}
                                    {/* <Typography sx={{ fontSize: '12px' }}>{refetchingMessage}</Typography> */}
                                {/* </> */}
                            {/* ) : ( */}
                                <Typography sx={{ fontSize: '12px' }}>
                                    We do not support this action at this time.
                                </Typography>
                            {/* )} */}
                        </Box>
                    </StyledTableIconButton>
                </Box>
            </Box>
            {permissions?.includes(USER_PERMISSIONS.MANAGE_DELETE_EVENT) && (
                <Box>
                    <Dialog open={isOpenedDeleteConfirm} onClose={handleCloseDialog}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>Are you sure you want to delete this event?</DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="warning">
                                Cancel
                            </Button>
                            <Button onClick={handleConfirmDelete} color="error">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Box sx={{ position: 'relative' }}>
                        <StyledTableIconButton
                            onClick={handleClickDelete}
                            size="small"
                            sx={{ width: '100%', mt: 1 }}
                            onMouseEnter={() => setHoveredDeleteEventId(event_id)}
                            onMouseLeave={() => setHoveredDeleteEventId(null)}
                        >
                            <DeleteOutlineIcon sx={{ color: 'red', width: '26px' }} />
                        </StyledTableIconButton>
                        <Box
                            sx={{
                                display: hoveredDeleteEventId === event_id ? 'block' : 'none',
                                position: 'absolute',
                                bgcolor: 'rgba(30,30,30,.8)',
                                width: '90px',
                                zIndex: '1600',
                                p: '10px',
                                right: '20px',
                                borderRadius: '4px',
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: '500',
                            }}
                        >
                            Delete Event
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    )
}
