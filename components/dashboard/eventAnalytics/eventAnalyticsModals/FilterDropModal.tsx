import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Box, Button, InputBase, ListItemText, Typography } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { SetStateAction, useEffect, useMemo, useState } from 'react'
import { EventAPI } from 'src/services/eventAnalyticsAPI'
import { ApiDeleteDropCheckRequest } from 'src/types/api/apiEventAnalyticsTypes'
import { dropCheckInt } from 'src/types/local/primaryFavourite'
import axiosClient from 'src/utils/axios'
import { StyledCheckBox, StyledMenuItem } from '../../generalComponents/TableCoponents'
import ModalSelect from '../ModalSelect'

import { GET_NOTES_QUERY_KEY, GET_SECTIONS_QUERY_KEY, GET_TICKET_TYPES } from 'src/common/constants/queryKeys'
import { useUserLimits } from 'src/hooks/useLimitsContext'

const excludingOpts = ['Exclude Platinum', 'Exclude Accessibility']
const basicTicketTypeOptions = ['Standard', ...excludingOpts]

export default function FilterDropModal({
    setFilterModal = () => {},
    setDropModal,
    eventId,
    DeleteDrop,
    selectedDrop = [],
    handleDropAdd = () => {},
    setPopupText,
}: {
    eventId: string
    selectedDrop?: any[]
    handleFetch?: (id?: string) => void
    handleDropAdd?: (id?: string, dropCheck?: dropCheckInt) => void
    DeleteDrop?: (params: ApiDeleteDropCheckRequest) => void
    setFilterModal?: React.Dispatch<SetStateAction<boolean>>
    setDropModal?: React.Dispatch<SetStateAction<boolean>>
    setPopupText?: (value: string) => void
}) {
    const { wasteTmDropChecker } = useUserLimits()

    const [selectedTicketsTypes, setSelectedTicketsTypes] = useState<string[]>([])
    const [selectedQuantity, setSelectedQuantity] = useState<string>('1')

    const [localSections, setLocalSections] = useState<string[]>([])
    const [ticketTypeOptions, setTicketTypeOptions] = useState(basicTicketTypeOptions)

    const [sliderValue, setSliderValue] = useState<number[]>([0, 800])

    const queryClient = useQueryClient()

    const { data: dataSectionOptions, isLoading: sectionLoading } = useQuery({
        queryKey: [GET_SECTIONS_QUERY_KEY, eventId],
        queryFn: () => {
            return axiosClient().get(`/api/events/get-sections/${eventId}`)
        },
        enabled: !!eventId,
    })

    const { data: ticketTypesResponse, isLoading } = useQuery({
        queryKey: [GET_TICKET_TYPES, eventId],
        queryFn: () => {
            return axiosClient().get(`/api/events/get-ticket-types/${eventId}`)
        },
        enabled: !!eventId,
    })

    const sectionOptions = useMemo(() => {
        return dataSectionOptions ? [...dataSectionOptions?.data?.data] : []
    }, [dataSectionOptions])

    useEffect(() => {
        setLocalSections(sectionOptions)
    }, [sectionOptions, sectionLoading])

    useEffect(() => {
        if (selectedDrop && selectedDrop[0]?.areas?.length > 0) {
            setLocalSections(sectionOptions)
            setSelectedQuantity(selectedDrop[0]?.quantity)
            setSelectedTicketsTypes(selectedDrop[0]?.ticket_types)
            setSliderValue([selectedDrop[0]?.price_range_start, selectedDrop[0]?.price_range_end])
        } else {
            setLocalSections(sectionOptions)
            setSelectedQuantity('1')
            setSelectedTicketsTypes(ticketTypeOptions.filter((v) => !excludingOpts.includes(v)))
            setSliderValue([0, 800])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDrop[0]?.areas, selectedDrop[0]?.quantity, selectedDrop[0]?.ticket_types, sectionOptions])

    useEffect(() => {
        if (ticketTypesResponse?.data?.data) {
            const ticketsArr = ticketTypesResponse?.data?.data as string[]
            if (ticketsArr.indexOf('All') > -1) ticketsArr.splice(ticketsArr.indexOf('All'))
            // setSelectedTicketsTypes(ticketTypesResponse?.data?.data)
            setTicketTypeOptions([...basicTicketTypeOptions, ...ticketsArr])
        }
    }, [ticketTypesResponse, isLoading])

    const handleTicketChange = (event: any) => {
        const selectedOptions = event.target.value
        if (selectedOptions.includes('All')) {
            setSelectedTicketsTypes([
                ...(ticketTypeOptions
                    ? ticketTypeOptions.filter(
                          (option) => option !== 'Exclude Platinum' && option !== 'Exclude Accessibility'
                      )
                    : selectedOptions),
            ])
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setSelectedTicketsTypes([])
            return
        }
        setSelectedTicketsTypes(selectedOptions)
    }

    const handleSectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedOptions = event.target.value as string[]
        if (selectedOptions.includes('All')) {
            setLocalSections([...(sectionOptions ? sectionOptions : selectedOptions)])
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setLocalSections([])
            return
        }
        setLocalSections(selectedOptions)
    }

    const handleCancel = () => {
        setFilterModal(true)
        setDropModal(false)
    }
    const handleChangeQuantity = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedQuantity(Math.max(event.target.value as number, 1).toString())
    }

    // const handleChangeSlider = (event: Event, newValue: number | number[]) => {
    //     setSliderValue(newValue as number[])
    // }

    const onAddDropCheck = async () => {
        EventAPI.addDropCheckAlert({
            eventId,
            ticket_types: selectedTicketsTypes,
            quantity: selectedQuantity,
            areas: localSections,
            price_range_start: sliderValue[0],
            price_range_end: sliderValue[1],
        }).then(async () => {
            wasteTmDropChecker()
            setPopupText('Added Dropchecker Alert')
            setDropModal(false)
            setFilterModal(true)
            handleDropAdd()
        })
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
                <Typography sx={{ fontSize: '24px', fontWeight: '600', color: '#1A63FF' }}>
                    Add Dropchecker Event
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <ModalSelect
                    disabled={selectedTicketsTypes.length === 0}
                    handleChange={handleTicketChange}
                    multiple={true}
                    value={selectedTicketsTypes}
                    label="Ticket Type"
                >
                    {selectedTicketsTypes.length === ticketTypeOptions.length - excludingOpts.length ? (
                        <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={selectedTicketsTypes.length === ticketTypeOptions.length}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'Unselect All'} />
                        </StyledMenuItem>
                    ) : (
                        <StyledMenuItem
                            key={'All'}
                            value={'All'}
                            sx={{
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                            }}
                        >
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={selectedTicketsTypes.length === ticketTypeOptions.length}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'All'} />
                        </StyledMenuItem>
                    )}
                    {ticketTypeOptions.map((ticket) => (
                        <StyledMenuItem
                            key={ticket}
                            value={ticket}
                            sx={{
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                            }}
                        >
                            <StyledCheckBox
                                sx={{ color: 'background.black' }}
                                checked={selectedTicketsTypes.indexOf(ticket) > -1}
                                checkedIcon={<CheckBoxIcon sx={{ color: 'background.black' }} />}
                            />
                            <ListItemText primary={ticket} />
                        </StyledMenuItem>
                    ))}
                </ModalSelect>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Minimal Quantity</Typography>
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
                        value={String(selectedQuantity)}
                        onChange={handleChangeQuantity}
                    ></InputBase>
                </Box>
                {sectionOptions.length > 0 && (
                    <ModalSelect handleChange={handleSectionChange} multiple={true} value={localSections} label="Area">
                        {localSections.length === sectionOptions.length ? (
                            <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={localSections.length === sectionOptions.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'Unselect All'} />
                            </StyledMenuItem>
                        ) : (
                            <StyledMenuItem key={'All'} value={'All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={localSections.length === sectionOptions.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'All'} />
                            </StyledMenuItem>
                        )}
                        {sectionOptions.map((section) => {
                            return (
                                <StyledMenuItem key={section} value={section}>
                                    <StyledCheckBox
                                        sx={{ color: 'background.black' }}
                                        checked={localSections.indexOf(section) > -1}
                                        checkedIcon={<CheckBoxIcon sx={{ color: 'background.black' }} />}
                                    />
                                    <ListItemText primary={section} />
                                </StyledMenuItem>
                            )
                        })}
                    </ModalSelect>
                )}
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
                    onClick={onAddDropCheck}
                    sx={{
                        bgcolor: '#001A63FF',
                        color: 'text.default',
                        '&:hover': { bgcolor: '#001A63FF' },
                        px: '16px',
                        py: '8px',
                    }}
                >
                    ADD EVENT
                </Button>
                {selectedDrop?.[0]?._id && (
                    <Button
                        onClick={() => {
                            DeleteDrop({ eventId: selectedDrop?.[0]?._id })
                            setDropModal(false)
                        }}
                        sx={{
                            bgcolor: '#E72929',
                            color: 'white',
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
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        '&:hover': { bgcolor: 'background.default' },
                        px: '16px',
                        py: '8px',
                    }}
                >
                    CANCEL
                </Button>
            </Box>
        </Box>
    )
}

// const marks = [
//     { label: '0', value: 0 },
//     {
//         label: '1000',
//         value: 1000,
//     },
//     {
//         label: 'inf',
//         value: 20000,
//     },
// ]
