import CloseIcon from '@mui/icons-material/Close'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import React, { SetStateAction, useMemo, useState } from 'react'
import { EventType } from 'src/types/local/customTableTypes'
import { useUserLimits } from 'src/hooks/useLimitsContext'

export default function FilterMainModal({
    isShowPriceDrop,
    setState,
    setModalDrop,
    setModalInv,
    setModalPrice,
    pageType,
    setPopupText,
    selectedEvent,
}: {
    isShowPriceDrop?: boolean
    setState?: React.Dispatch<SetStateAction<boolean>>
    setModalDrop?: React.Dispatch<SetStateAction<boolean>>
    setModalInv?: React.Dispatch<SetStateAction<boolean>>
    setModalPrice?: React.Dispatch<SetStateAction<boolean>>
    pageType?: string
    setPopupText?: (value: string) => void
    selectedEvent?: EventType
}) {
    const {
        tmDropCheckerCount,
        maxTmDropCheckerCount,
        tmLowInventoryCount,
        maxTmLowInventoryCount,
        priceDropCount,
        maxPriceDropCount,
    } = useUserLimits()

    const boxStyle = (bgcolor: string) => {
        return {
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            alignItems: 'center',
            bgcolor: bgcolor,
            color: 'white',
            px: '20px',
            py: '15px',
            borderRadius: '3px',
            cursor: 'pointer',
        }
    }
    const [showPopup, setShowPopUp] = useState(false)

    const handleOnClick = (setOpenNew: React.Dispatch<SetStateAction<boolean>>) => {
        setOpenNew(true)
        setState(false)
    }

    const isSupported = useMemo(() => {
        return (
            (selectedEvent && typeof selectedEvent?.last_fetched_details?.primary_tickets_count !== 'undefined') ||
            Boolean(
                selectedEvent?.meta?.otherPlatforms?.find((platform) => platform.marketPlace === 'ticketmaster')?.url
            )
        )
    }, [selectedEvent])

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'white',
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
                        position: 'relative',
                    }}
                >
                    <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>Alerts</Typography>
                    <IconButton
                        sx={{
                            position: 'absolute',
                            right: '-15px',
                            top: '-15px',
                            width: '35px',
                            height: '35px',
                            bgcolor: 'white',
                            borderRadius: '4px',
                            ':hover': {
                                bgcolor: 'white',
                            },
                        }}
                        onClick={() => setState(false)}
                    >
                        <CloseIcon sx={{ fontSize: '25px' }} />
                    </IconButton>
                </Box>
                {pageType === 'secondary' ? (
                    <Box
                        sx={{ position: 'relative' }}
                        onMouseLeave={() => setShowPopUp(false)}
                        onMouseEnter={() => setShowPopUp(true)}
                    >
                        <button
                            disabled
                            onClick={() => handleOnClick(setModalPrice)}
                            style={{
                                backgroundColor: '#07325F',
                                border: 'none',
                                borderRadius: '3px',
                                padding: '15px 20px',
                                width: '100%',
                                display: 'flex',
                                gap: '15px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Typography sx={{ fontSize: '24px', fontWeight: '600', color: 'white' }}>
                                Price Drop Alerts
                            </Typography>
                            <InfoOutlinedIcon sx={{ color: 'white' }} />
                        </button>
                        <Box
                            sx={{
                                display: showPopup ? 'block' : 'none',
                                position: 'absolute',
                                bgcolor: 'rgba(30,30,30,.8)',
                                height: '40px',
                                width: 'max-content',
                                zIndex: '100',
                                p: '10px',
                                right: '5px',
                                top: '-40px',
                                borderRadius: '4px',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            We do not support this action at this time.
                        </Box>
                    </Box>
                ) : pageType === 'primary' ? (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateRows: isShowPriceDrop ? '1fr 1fr 1fr' : '1fr 1fr',
                            gap: '30px',
                        }}
                    >
                        <Box
                            onClick={() => handleOnClick(setModalDrop)}
                            sx={boxStyle(isSupported ? 'background.blue' : 'grey')}
                        >
                            <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>Add Dropchecker Alert</Typography>
                        </Box>
                        <Box onClick={() => handleOnClick(setModalInv)} sx={boxStyle('#0D59AB')}>
                            <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>Low Inventory Alert</Typography>
                        </Box>
                        {isShowPriceDrop && (
                            <Box onClick={() => handleOnClick(setModalPrice)} sx={boxStyle('#07325F')}>
                                <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>Price Drop Alerts</Typography>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateRows: isShowPriceDrop ? '1fr 1fr 1fr' : '1fr 1fr',
                            gap: '15px',
                        }}
                    >
                        <Tooltip
                            title={
                                <Typography variant="h6" color={'black'}>
                                    {!isSupported
                                        ? 'Not supported'
                                        : `You have used ${tmDropCheckerCount} / ${maxTmDropCheckerCount} dropchecker alerts.`}
                                </Typography>
                            }
                            placement="top"
                            hidden={!isSupported || tmDropCheckerCount >= maxTmDropCheckerCount}
                        >
                            <Box
                                sx={{
                                    ...(!isSupported || tmDropCheckerCount >= maxTmDropCheckerCount
                                        ? { ...boxStyle('grey'), cursor: 'not-allowed' }
                                        : { ...boxStyle('background.blue') }),
                                }}
                                onClick={() => handleOnClick(setModalDrop)}
                            >
                                <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                                    Add Dropchecker Alert
                                </Typography>
                            </Box>
                        </Tooltip>
                        <Tooltip
                            title={
                                <Typography variant="h6" color={'black'}>
                                    {!isSupported
                                        ? 'Not supported'
                                        : `You have used ${tmLowInventoryCount} / ${maxTmLowInventoryCount} low inventory alerts.`}
                                </Typography>
                            }
                            placement="top"
                            hidden={!isSupported || tmLowInventoryCount >= maxTmLowInventoryCount}
                        >
                            <Box
                                sx={{
                                    ...(!isSupported || tmLowInventoryCount >= maxTmLowInventoryCount
                                        ? { ...boxStyle('grey'), cursor: 'not-allowed' }
                                        : { ...boxStyle('#0D59AB') }),
                                }}
                                onClick={() => handleOnClick(setModalInv)}
                            >
                                <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>
                                    Low Inventory Alert
                                </Typography>
                            </Box>
                        </Tooltip>
                        {isShowPriceDrop && (
                            <Tooltip
                                title={
                                    <Typography variant="h6" color={'black'}>
                                        {/* {`You have used ${priceDropCount} / ${maxPriceDropCount} price drop alerts.`} */}
                                        We do not support this action at this time
                                    </Typography>
                                }
                                placement="top"
                                hidden={priceDropCount >= maxPriceDropCount}
                            >
                                <button
                                    disabled
                                    onClick={() => handleOnClick(setModalPrice)}
                                    style={{
                                        backgroundColor: '#07325F',
                                        border: 'none',
                                        borderRadius: '3px',
                                        padding: '15px 20px',
                                        width: '100%',
                                        display: 'flex',
                                        gap: '15px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography sx={{ fontSize: '24px', color: 'white', fontWeight: '600' }}>
                                        Price Drop Alerts
                                    </Typography>
                                </button>
                            </Tooltip>
                        )}
                    </Box>
                )}
            </Box>
        </>
    )
}
