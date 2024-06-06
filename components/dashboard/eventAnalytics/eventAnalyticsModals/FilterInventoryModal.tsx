import { Box, Button, InputBase, ListItemText, Typography } from '@mui/material'
import ModalSelect from '../ModalSelect'
import React, { SetStateAction, useEffect, useMemo, useState } from 'react'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LocalAddLowInventoryAlertRequest } from 'src/types/local/localEventAnalyticsTypes'
import { ApiDeleteLowInventoryAlertRequest } from 'src/types/api/apiEventAnalyticsTypes'
import { GET_NOTES_QUERY_KEY, GET_SECTIONS_QUERY_KEY } from 'src/common/constants/queryKeys'
import { EventAPI } from 'src/services/eventAnalyticsAPI'
import { StyledCheckBox, StyledMenuItem } from '../../generalComponents/TableCoponents'
import { useUserLimits } from 'src/hooks/useLimitsContext'

export default function FilterInvModal({
    setFilterModal = () => {},
    handleDelete = () => {},
    setInvModal,
    deleteLow = false,
    selectedDrop = [],
    selectedItem,
    eventId,
    onAddInvAlert = () => {},
    setPopupText,
}: {
    eventId: string
    deleteLow?: boolean
    selectedItem?: any
    selectedDrop?: any[]
    setFilterModal?: React.Dispatch<SetStateAction<boolean>>
    setInvModal: React.Dispatch<SetStateAction<boolean>>
    handleDelete?: (params: ApiDeleteLowInventoryAlertRequest) => void
    onAddInvAlert?: (params: LocalAddLowInventoryAlertRequest) => void
    setPopupText?: (value: string) => void
}) {
    const [localSections, setLocalSections] = useState<any>([])
    const [count, setCount] = useState<number>(1)
    const queryClient = useQueryClient()

    const { wasteTmLowInventory } = useUserLimits()

    const { data: dataGetSectionOptions } = useQuery({
        queryKey: [GET_SECTIONS_QUERY_KEY, eventId],
        queryFn: () => EventAPI.getSections(eventId),
        enabled: !!eventId,
    })

    const serverOptions = useMemo(
        () => (dataGetSectionOptions?.data?.data ? [...dataGetSectionOptions?.data?.data] : []),
        [dataGetSectionOptions]
    )

    useEffect(() => {
        setLocalSections(serverOptions)
    }, [serverOptions])

    useEffect(() => {
        setCount(1)
    }, [eventId])

    useEffect(() => {
        if (selectedDrop && selectedDrop[0]?.sections_to_track?.length > 0) {
            setLocalSections(selectedDrop[0]?.sections_to_track)
            setCount(selectedDrop[0]?.ticket_count)
        } else {
            setLocalSections([serverOptions])
            setCount(1)
        }
    }, [selectedDrop[0]?.sections_to_track])

    const mutateAddLowInventoryItem = ({ eventId, sections_to_track, ticket_count }) => {
        EventAPI.addLowInventoryAlert({
            eventId,
            sections_to_track,
            ticket_count,
        }).then(() => {
            wasteTmLowInventory()
            setPopupText('Added Low Inventory Alert')
            setFilterModal(true)
        })
    }

    const handleChangeArea = (event: React.ChangeEvent<{ value: unknown }>) => {
        let selectedOptions = event.target.value as string[]
        if (selectedOptions.includes('Whole event')) {
            setLocalSections((prev) => {
                const result =
                    prev.length === serverOptions.length
                        ? selectedOptions.length > 1
                            ? selectedOptions.filter((v) => v !== 'Whole event')
                            : []
                        : serverOptions
                return result
            })
            return
        }

        setLocalSections(selectedOptions)
    }

    const handleCancel = () => {
        setCount(1)
        setFilterModal(true)
        setInvModal(false)
    }
    const handleDeleteLow = () => {
        setCount(1)
        handleDelete({ eventId: selectedDrop[0]?._id })
        setInvModal(false)
    }

    const handleAddAlert = async () => {
        await mutateAddLowInventoryItem({
            eventId,
            sections_to_track: localSections,
            ticket_count: count,
        })
        onAddInvAlert({
            eventId,
            sections_to_track: localSections,
            ticket_count: count,
        })
        setInvModal(false)
        setCount(1)
    }

    const handleChangeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Math.max(Number(event.target.value), 0))
    }
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',
                flexDirection: 'column',
                width: '550px',
                gap: '20px',
                zIndex: '1500',
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography sx={{ fontSize: '24px', fontWeight: '600', color: '#001A63FF' }}>
                    Low Inventory Alert
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <ModalSelect
                    handleChange={handleChangeArea}
                    multiple={true}
                    value={
                        serverOptions && localSections.length === serverOptions.length
                            ? ['Whole event']
                            : [...localSections, ...(!serverOptions.length ? ['All'] : [])]
                    }
                    label="Area"
                >
                    <StyledMenuItem key={'Whole event'} value={'Whole event'}>
                        <StyledCheckBox
                            sx={{ color: '#000000' }}
                            checked={localSections.length === serverOptions.length && serverOptions.length > 0}
                            checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                        />
                        <ListItemText primary={'Whole event'} />
                    </StyledMenuItem>
                    {serverOptions?.map((ticket) => {
                        return (
                            <StyledMenuItem key={ticket} value={ticket}>
                                <StyledCheckBox
                                    sx={{ color: 'background.black' }}
                                    checked={
                                        localSections.length !== serverOptions.length &&
                                        localSections?.indexOf(ticket) > -1
                                    }
                                    checkedIcon={<CheckBoxIcon sx={{ color: 'background.black' }} />}
                                />
                                <ListItemText primary={ticket} />
                            </StyledMenuItem>
                        )
                    })}
                </ModalSelect>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Notification count :</Typography>
                    <InputBase
                        sx={{
                            bgcolor: 'white',
                            border: 1,
                            borderColor: 'grey.400',
                            width: '100%',
                            borderRadius: '6px',
                            height: '45px',
                            px: 2,
                        }}
                        type="number"
                        value={String(count)}
                        onChange={handleChangeCount}
                    ></InputBase>
                </Box>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    width: '100%',
                    gap: '12px',
                }}
            >
                <Button
                    onClick={handleAddAlert}
                    sx={{
                        bgcolor: '#001A63FF',
                        color: 'text.default',
                        '&:hover': { bgcolor: '#001A63FF' },
                        px: '16px',
                        py: '8px',
                    }}
                >
                    SAVE SETTINGS
                </Button>
                {deleteLow && selectedDrop[0]?._id && (
                    <Button
                        onClick={handleDeleteLow}
                        sx={{
                            bgcolor: '#E72929',
                            color: 'text.default',
                            '&:hover': { bgcolor: '#E72929' },
                            px: '16px',
                            py: '8px',
                        }}
                    >
                        DELETE
                    </Button>
                )}
                <Button
                    onClick={handleCancel}
                    sx={{
                        bgcolor: 'background.primary',
                        color: 'text.primary',
                        '&:hover': { bgcolor: 'background.primary' },
                        px: '16px',
                        py: '8px',
                    }}
                >
                    CLOSE
                </Button>
            </Box>
        </Box>
    )
}
