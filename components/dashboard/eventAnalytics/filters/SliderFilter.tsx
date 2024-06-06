import { Box, Slider, SliderProps, Switch, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { CustomSwitch } from 'src/components/general/CustomSwitch'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

interface StyledSliderProps {
    colordefault?: string
}

export const StyledSlider = styled(Slider)<StyledSliderProps>(({ colordefault = '#000000', theme, disabled }) => ({
    color: colordefault,
    height: 8,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 18,
        width: 18,
        backgroundColor: 'white',
        border: `solid ${disabled ? 'rgb(181, 181, 195)' : colordefault}`,
        boxShadow: '0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A',
    },

    '& .MuiSlider-valueLabel': {
        zIndex: '0',
        top: 57,
        backgroundColor: disabled ? '#EAECF0' : '#FFFFFF',
        color: 'black',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '18px',
        padding: '8px 12px',
        boxShadow: '0px 12px 16px -4px #10182814, 0px 4px 6px -2px #10182808',
        border: 'solid #EAECF0',
        borderColor: disabled ? 'rgb(220, 220, 230)' : '#EAECF0',
        borderRadius: '8px',
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 1,
        backgroundColor: '#EAECF0',
    },
}))

const formatStartingValueForScaling = (defaultSliderValue: number[], scalingStart: number, scalingStrength: number) => {
    return defaultSliderValue.map((elem) => {
        if (elem < scalingStart) return elem
        else return (elem - scalingStart) / scalingStrength + scalingStart
    })
}

const SliderFilter = ({
    id,
    scalingStart,
    scalingStrength,
    label,
    handleChangeGlobal,
    onSwitchChange,
    disableSwap,
    disabled = false,
    colordefault,
    onClick,
    switcher,
    valueLabelFormat = (value, index) => value,
    max,
    defaultSliderValue,
    note,
}: SliderProps & {
    handleChangeGlobal: (event: any, newValue: number | number[], name: string) => void
    scalingStart?: number
    switcher?: boolean
    scalingStrength?: number
    label: string
    switchValue?: boolean
    colordefault?: string
    defaultSliderValue: {}
    note?: string
    onSwitchChange?: (event: any, checked: boolean) => void
}) => {
    const [localValue, setLocalValue] = React.useState<number[]>([0, 0])
    const [isHover, setIsHover] = useState(false)

    useEffect(() => {
        setLocalValue(
            scalingStart
                ? formatStartingValueForScaling(defaultSliderValue[id], scalingStart, scalingStrength)
                : defaultSliderValue[id]
        )
    }, [switcher])

    const scaleItem = (item: number) => {
        if (item > scalingStart) {
            let newItem = item - scalingStart
            return scalingStart + newItem * scalingStrength
        } else {
            return item
        }
    }

    const handleScalingChange = (event: Event, newValue: number[]) => {
        setLocalValue(newValue as number[])

        /*debouncedOnChange(
            event,
            newValue.map((item, index) => {
                if (item === localValue[index]) {
                    return item
                } else {
                    return scaleItem(item)
                }
            })
        )*/
    }

    const valueLabelFormatting = () => {
        if (typeof valueLabelFormat === 'string') return valueLabelFormat
        if (scalingStart) return (value, index) => valueLabelFormat(scaleItem(value), index)
        else return (value, index) => valueLabelFormat(value, index)
    }

    React.useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            handleChangeGlobal(
                {},
                localValue.map((elem) => scaleItem(elem)),
                id
            )
        }, 300)
        return () => clearTimeout(delayInputTimeoutId)
    }, [localValue])

    const handleSliderChange = (event: Event, newValue: number[], activeThumb: number) => {
        setLocalValue(newValue) // Immediate local state update for responsive UI
    }
    return (
        <Box
            sx={{
                width: '100%',
                paddingTop: '10px',
            }}
            onClick={onClick}
        >
            <Box flexDirection="row" display="flex">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>{label}</Typography>
                    {onSwitchChange && (
                        <CustomSwitch checked={!disabled} checkedcolor={colordefault} onChange={onSwitchChange} />
                    )}
                </Box>
                {note && (
                    <Box sx={{ position: 'relative', display:'flex', justifyContent:'center' }}>
                        <InfoOutlinedIcon
                            onMouseLeave={() => setIsHover(false)}
                            onMouseEnter={() => setIsHover(true)}
                            sx={{ height: '26px', width: '26px', padding: '5px' }}
                        />
                        <Box
                            sx={{
                                display: isHover ? 'block' : 'none',
                                position: 'absolute',
                                bgcolor: 'rgba(30,30,30,.8)',
                                width: '300px',
                                zIndex: '1600',
                                p: '10px',
                                right: '-300px',
                                top: '0px',
                                borderRadius: '4px',
                                color: 'white',
                            }}
                        >
                            <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>{note}</Typography>
                        </Box>
                    </Box>
                )}
            </Box>

            <StyledSlider
                colordefault={colordefault}
                disabled={disabled}
                value={localValue}
                onChange={scalingStart ? handleScalingChange : handleSliderChange}
                valueLabelDisplay={'auto'}
                valueLabelFormat={valueLabelFormatting()}
                max={max}
                disableSwap={disableSwap}
            />
        </Box>
    )
}

export default SliderFilter
