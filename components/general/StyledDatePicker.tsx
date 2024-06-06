import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import { Box, Button, IconButton, Typography, styled } from '@mui/material'
import { PickersDay } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader'
import { useUtils } from '@mui/x-date-pickers/internals/hooks/useUtils'
import { format } from 'date-fns'
import { useState } from 'react'

export const StyledDatePicker = ({ date, handleSetDate, maxDate, minDate }: { date: Date; handleSetDate: (value, context) => void, minDate?: Date, maxDate?: Date }) => {
    const [open, setOpen] = useState(false)
    const handleReset = () => {
        handleSetDate(null, null)
    }
    return (
        <StyledDatePickerRaw
            showDaysOutsideCurrentMonth
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                width: '100%',
            }}
            minDate={minDate}
            maxDate={maxDate}
            fixedWeekNumber={6}
            dayOfWeekFormatter={(_day: string, weekday: Date) => `${format(weekday, 'EEEEEE')}`}
            slots={{
                day: StyledPickersDay,
                calendarHeader: StyledCalendarHeader,
                clearButton: () => (
                    <Button
                        onClick={handleReset}
                        sx={{
                            px: '0',
                            minWidth: '43px',
                            mr: '7px',
                            zIndex: '1',
                            borderWidth: '0.5px',
                            borderRadius: '8px',
                            height: '44px',
                            color: 'black',
                            order: 1,
                        }}
                    >
                        <Typography sx={{ color: '#6C757D', fontSize: '24px', mt: '-2px' }}>x</Typography>
                    </Button>
                ),
            }}
            slotProps={{
                desktopPaper: {
                    sx: {
                        maxHeight: '360px',
                        height: '360px',
                        '& .MuiDateCalendar-root': {
                            minHeight: '360px',
                        },
                    },
                },
                field: { clearable: true },
                textField: {
                    onClick: () => setOpen(true),
                    focused: true,
                    sx: {
                        '& *': {
                            cursor: 'pointer',
                        },
                    },
                },
                inputAdornment: {
                    sx: { order: 3 },
                },
            }}
            value={date}
            onChange={handleSetDate}
        />
    )
}

const StyledCalendarHeader = (props: PickersCalendarHeaderProps<any>) => {
    const utils = useUtils()
    const {
        slots,
        slotProps,
        currentMonth: month,
        disabled,
        disableFuture,
        disablePast,
        maxDate,
        minDate,
        onMonthChange,
        onViewChange,
        view,
        reduceAnimations,
        views,
        labelId,
        className,
        timezone,
        ...other
    } = props

    const label = utils.formatByString(month, 'MMMM yyyy')

    const handleGoForwardMonth = () => onMonthChange(utils.addMonths(month, 1), 'left')
    const handleGoBackMonth = () => onMonthChange(utils.addMonths(month, -1), 'right')
    const handleGoForwardYear = () => onMonthChange(utils.addMonths(month, 12), 'left')
    const handleGoBackYear = () => onMonthChange(utils.addMonths(month, -12), 'right')

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                p: '10px',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around',
                    pv: '5px',
                    alignItems: 'center',
                }}
            >
                <StyledIconButton onClick={handleGoBackYear}>
                    <KeyboardDoubleArrowLeftIcon />
                </StyledIconButton>
                <StyledIconButton onClick={handleGoBackMonth}>
                    <KeyboardArrowLeftIcon />
                </StyledIconButton>
                <StyledIconButton onClick={handleGoForwardMonth}>
                    <KeyboardArrowRightIcon />
                </StyledIconButton>
                <StyledIconButton onClick={handleGoForwardYear}>
                    <KeyboardDoubleArrowRightIcon />
                </StyledIconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mt: '5px',
                    mb: '-10px',
                    alignItems: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '16px',
                        fontWeight: 700,
                    }}
                >
                    {label}
                </Typography>
            </Box>
        </Box>
    )
}

const StyledDatePickerRaw = styled(DatePicker)(({ theme }) => ({
    '& .MuiInputBase-root': {
        flexDirection: 'row-reverse',
        border: 'solid',
        borderWidth: '1px',
        borderColor: '#D0D5DD',
        borderRadius: '8px',
        '&.Mui-error': {
            borderWidth: '1px',
            borderColor: '#D0D5DD',
            borderRadius: '8px',
        },
    },
    '& .MuiInputBase-input': {
        padding: '9.5px 0px',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '20px',
        order: 3,
    },
    '& .MuiIconButton-root': {
        padding: '0',
        marginRight: '15px',
        marginLeft: '8px',
    },
    '&  .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    '&.MuiIconButton-root': {
        width: '25%',
        borderRadius: '8px',
    },
}))

const StyledPickersDay = styled(PickersDay)(({ theme }) => ({
    '&.MuiPickersDay-root': {
        fontSize: '14px',
        fontWeight: 700,
    },
    '&.Mui-disabled:not(.Mui-selected)': {color:'#D0D5DD'},
    '&.Mui-selected': {
        backgroundColor: '#0C111D',
        color: '#FFFFFF',
        opacity: 1,
        ':hover': {
            backgroundColor: '#0C111D',
            opacity: 1,
        },
        ':focus': {
            backgroundColor: '#0C111D',
            opacity: 1,
        },
    },
}))
