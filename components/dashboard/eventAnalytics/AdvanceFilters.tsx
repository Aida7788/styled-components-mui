import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Typography,
    styled,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { SliderActiveProps, SliderValueProps } from 'src/types/local/slidervalueprops'
import SliderFilter from './filters/SliderFilter'
import { StyledDatePicker } from 'src/components/general/StyledDatePicker'
import { StyledSelectWithBorder } from 'src/components/general/StyledSelect'
import { StyledCheckBox, StyledMenuItem } from '../generalComponents/TableCoponents'
import { useState } from 'react'
import { defaultSliderValue } from 'src/hooks/useEventAnalytics'

export function AdvanceFiltersEvent({
    dataCategories,
    startDate,
    category,
    setCategory,
    setSwitcher,
    endDate,
    handleDisableAll,
    handleSetStartDate,
    handleSetEndDate,
    handleChangeSlider,
}: {
    dataCategories
    setCategory
    setSwitcher
    category: string[]
    startDate: Date
    endDate: Date
    handleDisableAll: () => void
    handleSetEndDate: (value, context) => void
    handleSetStartDate: (value, context) => void
    handleChangeSlider: (event: Event, newValue: number | number[], name: string) => void
}) {
    const [resetSwitcher, setResetSwitcher] = useState(false)
    const handleCategoryChange = (event: any) => {
        const selectedOptions = event.target.value
        if (selectedOptions.includes('All')) {
            setCategory([...(dataCategories?.data.data ? dataCategories?.data.data : selectedOptions)])
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setCategory([])
            return
        }
        setCategory(selectedOptions)
    }

    return (
        <>
            <Box
                sx={{
                    mt: '72px',
                    display: 'flex',
                    alignItems: 'flex-end',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        mr: '24px',
                        gap: '8px',
                    }}
                >
                    <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>From Date</Typography>
                    <StyledDatePicker maxDate={endDate} date={startDate} handleSetDate={handleSetStartDate} />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        mr: '32px',
                        gap: '8px',
                    }}
                >
                    <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>To Date</Typography>
                    <StyledDatePicker minDate={startDate} date={endDate} handleSetDate={handleSetEndDate} />
                </Box>
                <FormControl sx={{ mr: '12px', minWidth: '141px', borderRadius: '8px' }}>
                    <Typography sx={{ fontWeight: '500', mb: '5px', fontSize: '16px' }}>Category</Typography>
                    <StyledSelectWithBorder
                        sx={{ height: '44px', maxWidth: '139px' }}
                        multiple
                        value={category}
                        onChange={handleCategoryChange}
                        renderValue={(selected: Array<any>) => selected?.join(', ').replace('_', ' ')}
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        {category.length == dataCategories?.data.data.length ? (
                            <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={category.length == dataCategories?.data.data.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'Unselect All'} />
                            </StyledMenuItem>
                        ) : (
                            <StyledMenuItem key={'All'} value={'All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={category.length == dataCategories?.data.data.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'All'} />
                            </StyledMenuItem>
                        )}
                        {dataCategories?.data.data.map((cat) => (
                            <StyledMenuItem key={cat} value={cat}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={category.indexOf(cat) > -1}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <Typography sx={{ fontSize: '15px' }}>{cat}</Typography>
                            </StyledMenuItem>
                        ))}
                    </StyledSelectWithBorder>
                </FormControl>
                <Button
                    sx={{
                        backgroundColor: '#F7F6F4',
                        minWidth: '81px',
                        height: '44px',
                        borderRadius: '8px',
                        '&:hover': {
                            backgroundColor: '#F7F6F4',
                            boxShadow: 'none',
                        },
                    }}
                    onClick={() => {
                        handleDisableAll()
                        setSwitcher((e) => !e)
                        setResetSwitcher((e)=>!e)
                    }}
                    variant="contained"
                >
                    <Typography noWrap={true} sx={{ fontWeight: '500' }}>
                        Reset
                    </Typography>
                </Button>
                <Button
                    sx={{
                        backgroundColor: '#204391',
                        
                        minWidth: '81px',
                        height: '44px',
                        borderRadius: '8px',
                        ml: '10px',
                        '&:hover': {
                            backgroundColor: '#204391',
                            boxShadow: 'none',
                        },
                    }}
                    onClick={() => {
                        setSwitcher((e) => !e)
                    }}
                    variant="contained"
                >
                    <Typography noWrap={true} sx={{ color: '#FFFFFF', fontWeight: '500' }}>
                        Apply
                    </Typography>
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: '1fr 1fr',
                    gap: '20px',
                    mt: '34px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '109px',
                        paddingBottom: '20px',
                    }}
                >
                    <SliderFilter
                        switcher={resetSwitcher}
                        defaultSliderValue={defaultSliderValue}
                        label={'Spotify Rank'}
                        id={'spotifyRankValue'}
                        colordefault={'#49C993'}
                        handleChangeGlobal={handleChangeSlider}
                        max={100}
                        disableSwap
                    ></SliderFilter>
                    <SliderFilter
                        switcher={resetSwitcher}
                        defaultSliderValue={defaultSliderValue}
                        label={'Capacity'}
                        id={'capacityValue'}
                        colordefault="#204391"
                        step={100}
                        handleChangeGlobal={handleChangeSlider}
                        max={100000}
                        disableSwap
                    ></SliderFilter>
                    <SliderFilter
                        switcher={resetSwitcher}
                        defaultSliderValue={defaultSliderValue}
                        label={'Get in Price'}
                        id={'priceValue'}
                        colordefault="#4F7DCB"
                        handleChangeGlobal={handleChangeSlider}
                        scalingStart={100}
                        scalingStrength={50}
                        max={198}
                        disableSwap
                        note='Note: Adjusting the “get in price" filter will exclude all events for which we do not have get in price data'
                    ></SliderFilter>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '109px',
                        paddingBottom: '20px',
                        position: 'relative',
                    }}
                >
                    <SliderFilter
                        switcher={resetSwitcher}
                        defaultSliderValue={defaultSliderValue}
                        label={'Primary Availability'}
                        id={'primaryValue'}
                        scalingStart={100}
                        scalingStrength={100}
                        colordefault="#F2994A"
                        handleChangeGlobal={handleChangeSlider}
                        max={399}
                        note='Note: Adjusting the “primary availability” filter will exclude all events without primary data and affect secondary events that match those without primary data. '
                        disableSwap
                    ></SliderFilter>

                    <SliderFilter
                        switcher={resetSwitcher}
                        defaultSliderValue={defaultSliderValue}
                        label={'Secondary Availability'}
                        id={'secondaryValue'}
                        colordefault="#F2994A"
                        scalingStart={100}
                        scalingStrength={100}
                        handleChangeGlobal={handleChangeSlider}
                        max={399}
                        disableSwap
                        note='Note: Adjusting the “secondary availability” filter will exclude all primary events that we did not manage to match'
                    ></SliderFilter>
                    <SliderFilter
                        switcher={resetSwitcher}
                        defaultSliderValue={defaultSliderValue}
                        label={'Primary Percentage Sold'}
                        id={'sellouts'}
                        colordefault="#4F7DCB"
                        handleChangeGlobal={handleChangeSlider}
                        valueLabelFormat={(value, index) => value + '%'}
                        max={100}
                        disableSwap
                    ></SliderFilter>
                </Box>
            </Box>
        </>
    )
}

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    '&.Mui-focused': {
        color: 'black',
    },
}))
