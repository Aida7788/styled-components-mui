import { Box, Button, IconButton, MenuItem, Select, Typography } from '@mui/material'
import { ModalHeader } from '../../generalComponents/ModalHeader'
import React, { SetStateAction, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import TrashIcon from 'src/icons/TrashIcon'
import { pullFrequency } from 'src/types/local/primaryFavourite'

export function PullTicketModal({
                                    label,
                                    setOpen,
                                    eventId,
                                    selectedDrop,
                                    addPullFreq,
                                    deletePullFreq,
                                    deletePull = false,
                                }: {
    label: string;
    eventId?: string;
    deletePull?: boolean;
    selectedDrop?: pullFrequency[];
    addPullFreq?: (id: string, dropCheck: pullFrequency) => void;
    deletePullFreq?: (id: string) => void;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
    const [showCalendar, setShowCalendar] = useState(false)
    const [valueDate, setValueDate] = useState<[Date, Date]>([new Date(), new Date()])
    useEffect(() => {
        const selectedValue = selectedDrop?.[0]
        setValueDate(selectedValue?.dateValue ? selectedValue?.dateValue : [new Date(), new Date()])
    }, [selectedDrop])
    const handleSetDate = (value: [Date, Date], event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const [date_1, date_2] = value
        date_1.setDate(date_1.getDate() + 1)
        setValueDate([date_1, date_2])
        setShowCalendar(false)
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',

                flexDirection: 'column',
                width: '650px',
                gap: '20px',
                zIndex: '1500',

                display: 'flex',
            }}>
            <ModalHeader label={label} type="header" setOpen={setOpen}></ModalHeader>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <Typography>By Default ipsum dolor sit amet consectetur</Typography>
                <Typography>Corem ipsum dolor sit</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '10px',
                    paddingBlock: '15px',
                    alignItems: 'center',
                }}>
                <Box sx={{ paddingInline: '8px', width: '100%', flex: 1 }}>
                    <Box
                        onClick={() => setShowCalendar(!showCalendar)}
                        sx={{
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'row',

                            width: '100%',
                            borderRadius: '4px',
                            justifyContent: 'center',
                            border: 1,
                            borderColor: 'grey.400',
                            height: '100%',
                            backgroundColor: 'background.default',
                            alignItems: 'center',
                            gap: '10px',

                            padding: '8px 10px',
                        }}>
                        <Typography sx={{ cursor: 'pointer' }}>
                            {valueDate[0]?.toISOString()?.split('T')[0]} / {valueDate[1]?.toISOString()?.split('T')[0]}
                        </Typography>
                    </Box>
                    {showCalendar && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                position: 'absolute',
                                zIndex: '4',
                                left: '25%',
                            }}>
                            <Calendar value={valueDate} onChange={handleSetDate} selectRange={true}
                                      showDoubleView={true} />
                        </Box>
                    )}
                </Box>
                <Box>
                    <Select
                        size="small"
                        sx={{
                            border: 1,
                            backgroundColor: 'background.default',
                            borderColor: 'grey.400',
                            borderRadius: '4px',
                            padding: '0',
                            height: '100%',
                        }}
                        defaultValue={10}>
                        <MenuItem value={10}>Every 30s</MenuItem>
                        <MenuItem value={20}>Every 30s</MenuItem>
                        <MenuItem value={30}>Every 30s</MenuItem>
                    </Select>
                </Box>
                <IconButton sx={{ padding: '0', width: '40px', height: '40px' }}>
                    <TrashIcon fontSize="large" />
                </IconButton>
            </Box>
            <Box
                sx={{
                    alignSelf: 'center',
                    color: 'text.default',
                    borderRadius: '5px',
                    gap: '15px',
                    display: 'flex',
                }}>
                {deletePull && (
                    <Button
                        onClick={() => {
                            deletePullFreq(eventId)
                            setOpen(false)
                        }}
                        sx={{
                            border: 1,
                            borderColor: 'background.black',
                            color: 'text.primary',
                        }}>
                        Delete
                    </Button>
                )}
                <Button
                    onClick={() => {
                        addPullFreq(eventId, { _id: eventId, dateValue: valueDate })
                        setOpen(false)
                    }}
                    sx={{
                        border: 1,
                        borderColor: 'background.black',
                        color: 'text.primary',
                    }}>
                    Save
                </Button>
                <Button
                    sx={{
                        border: 1,
                        borderColor: 'background.black',
                        color: 'text.primary',
                    }}>
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}
