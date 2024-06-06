import { Box, Typography, Button, Tooltip } from '@mui/material'
import React, { SetStateAction, useState } from 'react'
import { useUserLimits } from 'src/hooks/useLimitsContext'
import { instance } from 'src/utils/axios'
import { FrontEndError } from 'src/utils/error'

interface SaveModalProps {
    setState: React.Dispatch<SetStateAction<boolean>>
    event_id: string
    setPopupText: (value: string) => void
}

export function SavingModal({ setState, event_id, setPopupText }: SaveModalProps) {
    const {
        primaryFavCount,
        maxPrimaryFavCount,
        secondaryFavCount,
        maxSecondaryFavCount,
        wastePrimaryFav,
        wasteSecondaryFav,
    } = useUserLimits()

    const [textArea, setTextArea] = useState(' ')
    const backgroundStylesButton = (bgcolor: string) => {
        return {
            bgcolor: bgcolor,
            color: 'text.default',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: '600',
            py: '10px',
            '&:hover': {
                bgcolor: bgcolor,
            },
        }
    }

    const handleFetchNote = (type: string) => {
        instance
            .post('/api/events/notes/save', {
                event_id: event_id,
                text: textArea,
                type: type,
            })
            .catch((err) => FrontEndError(err))
            .finally(() => {
                switch (type) {
                    case 'all':
                        wastePrimaryFav()
                        wasteSecondaryFav()
                        break
                    case 'my_primary':
                        wastePrimaryFav()
                        break
                    case 'my_secondary':
                        wasteSecondaryFav()
                        break
                }
                setPopupText('Event Saved')
                setState(false)
                setTextArea('')
            })
    }
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                width: '550px',
                gap: '20px',
                zIndex: '2500',
            }}
        >
            <Typography sx={{ mx: 'auto', fontSize: '18px', fontWeight: '600' }}>Save To</Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gridTemplateRows: '1fr 1fr',
                    gap: '25px',
                    color: '#FFFFFF',
                }}
            >
                <Tooltip
                    title={
                        <Typography variant="h6" color={'black'}>
                            {`You have used ${primaryFavCount} / ${maxPrimaryFavCount} add to primary favorites.`}
                        </Typography>
                    }
                    placement="top"
                >
                    <Button
                        onClick={() => handleFetchNote('my_primary')}
                        sx={{
                            ...(primaryFavCount >= maxPrimaryFavCount
                                ? { ...backgroundStylesButton('grey'), cursor: 'not-allowed' }
                                : { ...backgroundStylesButton('background.blue') }),
                        }}
                    >
                        My Primary Favorites
                    </Button>
                </Tooltip>
                <Tooltip
                    title={
                        <Typography variant="h6" color={'black'}>
                            {`You have used ${secondaryFavCount} / ${maxSecondaryFavCount} add to primary favorites.`}
                        </Typography>
                    }
                    placement="top"
                >
                    <Button
                        onClick={() => handleFetchNote('my_secondary')}
                        sx={{
                            ...(secondaryFavCount >= maxSecondaryFavCount
                                ? { ...backgroundStylesButton('grey'), cursor: 'not-allowed' }
                                : { ...backgroundStylesButton('#0D59AB') }),
                        }}
                    >
                        My Secondary Favorites
                    </Button>
                </Tooltip>
                <Button
                    onClick={() => handleFetchNote('all')}
                    sx={{
                        ...(primaryFavCount >= maxPrimaryFavCount || secondaryFavCount >= maxSecondaryFavCount
                            ? { ...backgroundStylesButton('grey'), cursor: 'not-allowed' }
                            : { ...backgroundStylesButton('#07325F') }),
                    }}
                >
                    All
                </Button>
                <Button
                    onClick={() => setState(false)}
                    sx={{ border: '1px black solid', ...backgroundStylesButton('white') }}
                >
                    <Typography sx={{ color: 'black', fontWeight: '700' }}>Cancel</Typography>
                </Button>
            </Box>
        </Box>
    )
}
