import { Box, IconButton, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { SetStateAction, useState } from 'react'
import { GET_SCRAP_SECTION_INFORMATION_QUERY_KEY } from 'src/common/constants/queryKeys'
import { useUserLimits } from 'src/hooks/useLimitsContext'
import CalendarIcon from 'src/icons/CalendarIcon'
import HeartIcon from 'src/icons/HeartIcon'
import NoteIcon from 'src/icons/NoteIcon'
import RestockIcon from 'src/icons/RestockIcon'
import { EventAPI } from 'src/services/eventAnalyticsAPI'

export function ActionsBox({
    setOpenNoteModal,
    event_id,
    setSelectedEvent,
    setOpenFilterModal,
    setOpenSaveModal,
    setLoading,
}: {
    setOpenNoteModal: React.Dispatch<SetStateAction<boolean>>
    event_id: string
    setSelectedEvent: React.Dispatch<SetStateAction<string>>
    setOpenSaveModal: React.Dispatch<SetStateAction<boolean>>
    setLoading: React.Dispatch<
        React.SetStateAction<{
            loading: boolean
            id: string
        }>
    >
    setOpenFilterModal: React.Dispatch<SetStateAction<boolean>>
}) {
    const [showPopUp, setShowPopUp] = useState<'refetch' | null>(null)
    const { fetchCount, wasteFetch } = useUserLimits()

    const { refetch: refetchEvent } = useQuery({
        queryKey: [GET_SCRAP_SECTION_INFORMATION_QUERY_KEY],
        queryFn: () =>
            EventAPI.getEventsScrapSectionInformation({
                eventId: event_id,
            }),
        enabled: false,
    })
    const handleOpenNote = () => {
        setSelectedEvent(event_id)
        setOpenNoteModal(true)
    }
    const handleOpenSaveToFavs = () => {
        setSelectedEvent(event_id)
        setOpenSaveModal(true)
    }
    const handleOpenAlerts = () => {
        setSelectedEvent(event_id)
        setOpenFilterModal(true)
    }
    const handleClickRefresh = async () => {
        if (fetchCount > 0) {
            setLoading({ loading: true, id: event_id })
            setSelectedEvent(event_id)
            wasteFetch()
            await refetchEvent()
            setLoading({ loading: false, id: event_id })
            // fetchPrimary(event_id)
            // fetchSecondary(event_id)
        }
    }
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
                gap: '14px',
            }}
        >
            <IconButton
                onClick={handleOpenAlerts}
                size="small"
                sx={{ borderRadius: '6px', bgcolor: 'grey.700', aspectRatio: '1/1' }}
            >
                <CalendarIcon />
            </IconButton>
            <IconButton onClick={handleOpenNote} size="small" sx={{ borderRadius: '6px', bgcolor: 'grey.700' }}>
                <NoteIcon />
            </IconButton>
            <IconButton onClick={handleOpenSaveToFavs} size="small" sx={{ borderRadius: '6px', bgcolor: 'grey.700' }}>
                <HeartIcon />
            </IconButton>
            <IconButton
                onMouseEnter={() => setShowPopUp('refetch')}
                onMouseLeave={() => setShowPopUp(null)}
                onClick={() => handleClickRefresh()}
                size="small"
                sx={{ borderRadius: '6px', bgcolor: 'grey.700' }}
            >
                <RestockIcon />
                <Box
                    sx={{
                        display: showPopUp === 'refetch' ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'background.default',
                        height: '40px',
                        width: '100px',
                        textAlign: 'center',
                        p: '10px',
                        top: '30px',
                        borderRadius: '5px',
                        color: 'black',
                    }}
                >
                    <Typography sx={{ fontSize: '10px' }}>You have {fetchCount ? fetchCount : 0} fetches.</Typography>
                </Box>
            </IconButton>
        </Box>
    )
}
