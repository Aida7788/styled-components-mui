import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Box, Button, FormControl, InputLabel, ListItemText, MenuItem, Typography, styled } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { SetStateAction, useEffect, useState } from 'react'
import { SetURLSearchParams } from 'react-router-dom'
import {
    EventSelectArray,
    countries,
    defaultSliderValue,
    platformSelectArray,
    timeSelectArray,
} from 'src/common/constants/overview'
import { GET_CATEGORIES_QUERY_KEY } from 'src/common/constants/queryKeys'
import { StyledDatePicker } from 'src/components/general/StyledDatePicker'
import { StyledSelectWithBorder } from 'src/components/general/StyledSelect'
import { PresalesAPI } from 'src/services/presalesAPI'
import { FilterPresaleInterface } from 'src/types/local/overViewTypes'
import SliderFilter from '../eventAnalytics/filters/SliderFilter'
import { StyledCheckBox, StyledMenuItem } from '../generalComponents/TableCoponents'

export function AdvanceFilters({
    country,
    category,
    eventSelect,
    platform,
    valueDate,
    timeSelect,
    handleChangeSlider,
    setSwitcher,
    setSearchParams,
    setFiltringState,
}: {
    country: string[]
    category: string[]
    eventSelect: string[]
    platform: string[]
    valueDate: Date
    timeSelect: string
    handleChangeSlider
    setSwitcher
    setFiltringState: React.Dispatch<SetStateAction<FilterPresaleInterface>>
    setSearchParams: SetURLSearchParams
}) {
    const { data: dataCategories } = useQuery({
        queryKey: [GET_CATEGORIES_QUERY_KEY],
        queryFn: PresalesAPI.getCategories,
    })

    const [resetSwitcher, setResetSwitcher] = useState(true)

    useEffect(() => {
        if (dataCategories?.data?.data) {
            setFiltringState((prev) => ({
                ...prev,
                categories: [...dataCategories?.data.data],
            }))
        }
    }, [dataCategories])

    const handleDisableAll = () => {
        setFiltringState({
            categories: dataCategories?.data.data,
            countries: countries,
            platformSelect: platformSelectArray.map((e) => e.name),
            eventSelect: ['all_presales', 'all_public_sale'],
            timeSelect: '0:00:00-23:59:59',
            valueDate: new Date(),
        })
        setResetSwitcher((e) => !e)
    }

    const handleCategoryChange = (event: any) => {
        const selectedOptions = event.target.value as string[]
        if (selectedOptions.includes('All')) {
            setFiltringState((prev) => ({
                ...prev,
                categories: [...(dataCategories?.data.data ? dataCategories?.data.data : selectedOptions)],
            }))
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setFiltringState((prev) => ({
                ...prev,
                categories: [],
            }))
            return
        }
        setFiltringState((prev) => ({ ...prev, categories: selectedOptions }))
    }

    const handleCountryChange = (event: any) => {
        const selectedOptions = event.target.value as string[]
        if (selectedOptions.includes('All')) {
            setFiltringState((prev) => ({
                ...prev,
                countries: countries,
            }))
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setFiltringState((prev) => ({
                ...prev,
                countries: [],
            }))
            return
        }

        setFiltringState((prev) => ({ ...prev, countries: selectedOptions }))
    }

    const handlePlatformChange = (event: any) => {
        const selectedOptions = event.target.value as string[]
        if (selectedOptions.includes('All')) {
            setFiltringState((prev) => ({
                ...prev,
                platformSelect: platformSelectArray.map((elem) => elem.name),
            }))
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setFiltringState((prev) => ({
                ...prev,
                platformSelect: [],
            }))
            return
        }
        setFiltringState((prev) => ({ ...prev, platformSelect: selectedOptions }))
    }
    const handleEventChange = (event: any) => {
        const selectedOptions = event.target.value as string[]
        if (selectedOptions.includes('All')) {
            setFiltringState((prev) => ({
                ...prev,
                eventSelect: ['all_presales', 'all_public_sale'],
            }))
            return
        }
        if (selectedOptions.includes('Unselect_All')) {
            setFiltringState((prev) => ({
                ...prev,
                eventSelect: [],
            }))
            return
        }
        setFiltringState((prev) => ({ ...prev, eventSelect: selectedOptions }))
        setSearchParams('')
    }
    const handleChangeTime = (event: any) => {
        setFiltringState((prev) => ({
            ...prev,
            timeSelect: event.target.value as string,
        }))
        setSearchParams('')
    }

    const handleSetDate = (value: Date, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setFiltringState((prev) => ({
            ...prev,
            valueDate: value,
        }))

        setSearchParams('')
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '15px',
                    justifyContent: 'end',
                    mt: '76px',
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}> Date</Typography>
                    <StyledDatePicker date={valueDate} handleSetDate={handleSetDate} />
                </Box>
                <FormControl sx={{ minWidth: '141px', borderRadius: '8px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}> Platform</Typography>
                    <StyledSelectWithBorder
                        label="Platform"
                        multiple
                        value={platform}
                        onChange={handlePlatformChange}
                        renderValue={(selected: Array<any>) =>
                            selected.map((elem) => elem[0].toUpperCase() + elem.slice(1)).join(', ')
                        }
                    >
                        {platform.length === platformSelectArray.length ? (
                            <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={platform.length === platformSelectArray.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'Unselect All'} />
                            </StyledMenuItem>
                        ) : (
                            <StyledMenuItem key={'All'} value={'All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={platform.length === platformSelectArray.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'All'} />
                            </StyledMenuItem>
                        )}
                        {platformSelectArray.map(({ name, tag }) => (
                            <StyledMenuItem key={name} value={name}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={platform.indexOf(name) > -1}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={tag} />
                            </StyledMenuItem>
                        ))}
                    </StyledSelectWithBorder>
                </FormControl>

                <FormControl sx={{ minWidth: '200px', maxWidth: '200px', borderRadius: '8px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}> Sale</Typography>
                    <StyledSelectWithBorder
                        label="Sale"
                        multiple
                        value={eventSelect}
                        onChange={handleEventChange}
                        renderValue={(selected: Array<any>) =>
                            selected
                                .map((elem) => elem[0].toUpperCase() + elem.slice(1))
                                .join(', ')
                                .replace(/_/g, ' ')
                        }
                    >
                        {eventSelect.join().includes(['all_presales', 'all_public_sale'].join()) ? (
                            <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={eventSelect.join().includes(['all_presales', 'all_public_sale'].join())}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'Unselect All'} />
                            </StyledMenuItem>
                        ) : (
                            <StyledMenuItem key={'All'} value={'All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={eventSelect.join().includes(['all_presales', 'all_public_sale'].join())}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'All'} />
                            </StyledMenuItem>
                        )}
                        {EventSelectArray.map((item) => (
                            <StyledMenuItem
                                sx={{ whiteSpace: 'normal', width: '200px' }}
                                key={item.tag}
                                value={item.name}
                            >
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={eventSelect.indexOf(item.name) > -1}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={item.tag} />
                            </StyledMenuItem>
                        ))}
                    </StyledSelectWithBorder>
                </FormControl>

                <FormControl sx={{ minWidth: '200px', maxWidth: '200px', borderRadius: '8px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}> Time</Typography>
                    <StyledSelectWithBorder label="Time" value={timeSelect} onChange={handleChangeTime}>
                        {timeSelectArray.map((item) => (
                            <MenuItem
                                sx={{
                                    whiteSpace: 'normal',
                                    ':hover': {
                                        backgroundColor: 'lightgray',
                                    },
                                    '&.Mui-selected': {
                                        ':hover': {
                                            backgroundColor: 'lightgray',
                                        },
                                    },
                                }}
                                key={item.tag}
                                value={item.name}
                            >
                                <p style={{ width: '180px', fontSize: '14px', wordWrap: 'break-word' }}>{item.tag}</p>
                            </MenuItem>
                        ))}
                    </StyledSelectWithBorder>
                </FormControl>

                <FormControl sx={{ minWidth: '141px', maxWidth: '141px', borderRadius: '8px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}> Category</Typography>
                    <StyledSelectWithBorder
                        label="Platform"
                        multiple
                        value={category}
                        onChange={handleCategoryChange}
                        renderValue={(selected: Array<any>) => selected.join(', ')}
                    >
                        {category.length === dataCategories?.data.data.length ? (
                            <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={category.length === dataCategories?.data.data.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'Unselect All'} />
                            </StyledMenuItem>
                        ) : (
                            <StyledMenuItem key={'All'} value={'All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={category.length === dataCategories?.data.data.length}
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
                                <ListItemText primary={cat} />
                            </StyledMenuItem>
                        ))}
                    </StyledSelectWithBorder>
                </FormControl>
                <FormControl sx={{ minWidth: '141px', maxWidth: '141px', borderRadius: '8px' }}>
                    <Typography sx={{ fontSize: '16px', fontWeight: '500' }}> Country</Typography>
                    <StyledSelectWithBorder
                        label="Platform"
                        multiple
                        value={country}
                        onChange={handleCountryChange}
                        renderValue={(selected: Array<any>) => selected.join(', ')}
                    >
                        {country.length === countries.length ? (
                            <StyledMenuItem key={'Unselect_All'} value={'Unselect_All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={country.length === countries.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'Unselect All'} />
                            </StyledMenuItem>
                        ) : (
                            <StyledMenuItem key={'All'} value={'All'}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checked={country.length === countries.length}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                />
                                <ListItemText primary={'All'} />
                            </StyledMenuItem>
                        )}
                        {countries.map((cat) => (
                            <StyledMenuItem key={cat} value={cat}>
                                <StyledCheckBox
                                    sx={{ color: '#000000' }}
                                    checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                                    checked={country.indexOf(cat) > -1}
                                />
                                <ListItemText primary={cat} />
                            </StyledMenuItem>
                        ))}
                    </StyledSelectWithBorder>
                </FormControl>
                <Button
                    sx={{
                        mt: '24px',
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
                        mt: '24px',
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
                    gridTemplateRows: '1fr',
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
                </Box>
            </Box>
        </Box>
    )
}

const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    '&.Mui-focused': {
        color: 'black',
    },
}))
