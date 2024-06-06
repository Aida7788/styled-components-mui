import { Box, Button, InputBase, ListItemText, Typography } from '@mui/material'
import React, { SetStateAction, useState } from 'react'
import { instance } from 'src/utils/axios'
// import CheckIcon from '../../../../icons/Check'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { StyledCheckBox, StyledMenuItem } from '../../generalComponents/TableCoponents'
import ModalSelect from '../ModalSelect'
import { FrontEndError } from 'src/utils/error'
import { useUserLimits } from 'src/hooks/useLimitsContext'

export default function FilterPriceModal({
    setFilterModal = () => {},
    setPriceModal,
    eventId,
    handleAddPriceFilter = () => {},
    setPopupText,
}: {
    eventId: string
    setFilterModal?: React.Dispatch<SetStateAction<boolean>>
    setPriceModal: React.Dispatch<SetStateAction<boolean>>
    handleAddPriceFilter?: () => void
    setPopupText?: (value: string) => void
}) {
    const { wastePriceDrop } = useUserLimits()

    const [area, setArea] = useState<string[]>(['Any'])
    const [minimumPrice, setMinimumPrice] = useState<string>('0')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [maximumPrice, setMaximumPrice] = useState<string>('0')
    const [quantity, setQuantity] = useState('1')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [marketPlace, setMarketPlaces] = useState('Stubhub')

    const handleChangeArea = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedOptions = event.target.value as string[]
        if (selectedOptions.includes('All')) {
            setArea([...(areaBase ? areaBase : selectedOptions)])
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setArea(['Any'])
            return
        }
        setArea(selectedOptions)
    }

    const handleCancel = () => {
        setFilterModal(true)
        setPriceModal(false)
    }
    const handleChangeQuantity = (event: React.ChangeEvent<{ value: unknown }>) => {
        setQuantity(Math.max(Number(event.target.value), 0).toString())
    }
    // const handleChangeMarket = (event: React.ChangeEvent<{ value: unknown }>) => {
    //     setMarketPlaces(event.target.value as string)
    // }

    const handleChangeMinimumPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinimumPrice(event.target.value)
    }

    // const handleChangeMaximumPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setMaximumPrice(event.target.value)
    // }

    const handleFetchChanges = () => {
        const numberArray = area.map((str) => parseInt(str, 10))
        const minPrice = parseFloat(minimumPrice)
        const maxPrice = parseFloat(maximumPrice)
        const numberQuantity = parseInt(quantity, 10)
        instance
            .post('/api/events/add-price-drop-alert', {
                event_id: eventId,
                areas: numberArray,
                minimum_quantity: numberQuantity,
                price_lt: maxPrice,
                price_gt: minPrice,
                market_place: marketPlace,
            })
            .then(() => {
                wastePriceDrop()
                setPriceModal(false)
                setFilterModal(true)
                setPopupText('Added Price Drop Alert')
                handleAddPriceFilter()
            })
            .catch((err) => FrontEndError(err))
    }

    const areaBase = ['Any', '101', '102', '103', '104', '105']
    // const quantityBase = ['1', '2', '3', '4', '5', '6+']
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
                    Price Drop Alerts
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <ModalSelect handleChange={handleChangeArea} multiple={true} value={area} label="Area">
                    {area.length === areaBase.length ? (
                        <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={area.length === areaBase.length}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'Unselect All'} />
                        </StyledMenuItem>
                    ) : (
                        <StyledMenuItem key={'All'} value={'All'}>
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={area.length === areaBase.length}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'All'} />
                        </StyledMenuItem>
                    )}
                    {areaBase.map((ticket) => (
                        <StyledMenuItem key={ticket} value={ticket}>
                            <StyledCheckBox
                                sx={{ color: 'background.black' }}
                                checked={area.indexOf(ticket) > -1}
                                checkedIcon={<CheckBoxIcon sx={{ color: 'background.black' }} />}
                            />
                            <ListItemText primary={ticket} />
                        </StyledMenuItem>
                    ))}
                </ModalSelect>{' '}
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
                        value={String(quantity)}
                        onChange={handleChangeQuantity}
                    ></InputBase>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Minimum Price:</Typography>
                    <InputBase
                        inputProps={{ min: 0 }}
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
                        value={minimumPrice}
                        onChange={handleChangeMinimumPrice}
                    ></InputBase>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: '600' }}>Marketplace</Typography>
                        <Box
                            sx={{
                                bgcolor: 'white',
                                border: 1,
                                borderColor: 'grey.200',
                                width: '100%',
                                borderRadius: '6px',
                                height: '45px',
                                padding: '10px',
                                color: 'gray',
                            }}
                        >
                            Stubhub
                        </Box>
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
                        onClick={handleFetchChanges}
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
                        CLOSE
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
