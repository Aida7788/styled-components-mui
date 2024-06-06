import { Slider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { SliderProps } from '@mui/material'

interface StyledSliderProps extends SliderProps {
    colordefault?: string
}

export const SliderTable = styled(Slider)<StyledSliderProps>(({ colordefault = '#000000', theme, disabled }) => ({
    color: colordefault,
    height: 5,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 0,
        width: 0,
        backgroundColor: colordefault,
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: '0px 0px 0px 0px transparent',
        },
    },

    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        zIndex: '0',
        top: -20,
        backgroundColor: '#fff',
        color: '#aaaaaa',
        paddingInline: '4px',
        '&:before': {
            display: 'none',
        },

        '& *': {
            backgroundColor: 'transparent',
            color: '#000',
            borderRadius: '50% 0% 50% 50%',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
        color: '#000000',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#AAAAAA',
        top: '40%',
        opacity: 0.5,
        bottom: 2,
        height: 7,
        width: 2,
        '&.MuiSlider-markActive': {
            opacity: 1,

            backgroundColor: '#000000',
        },
    },
}))
