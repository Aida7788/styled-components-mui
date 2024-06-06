// @ts-nocheck
import {
    Backdrop,
    Box,
    Card,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material'
import Autocomplete, { AutocompleteChangeReason } from '@mui/material/Autocomplete'
import { ClearIcon } from '@mui/x-date-pickers'
import type { ApexOptions } from 'apexcharts'
import type { FC } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import { renderToString } from 'react-dom/server'
import { CustomSwitch } from 'src/components/general/CustomSwitch'
import { StyledSelect } from 'src/components/general/StyledSelect'
import useModal from 'src/hooks/useModal'
import ShowMapIcon from 'src/icons/ShowMap'
import { convertDate } from 'src/utils/dataFormatters'
import { formatNumber } from '../generalComponents/customTable/StatsItem'
import { LoaderComponent } from '../loaderComponent/loaderComp'
import { MapModal } from './modals/mapModal'

const palette = ['#008FFB', '#00E396', '#FEB019', '	#FF4560', '#775DD0']
interface Props {
    data: any
    maps: string
    sectionValue: string[]
    venueName: string
    onChangeSections: (value: string[]) => void
    isExcludedSingle: boolean
    setIsExcludedSingle: any
    pageType: string
}

function findObjectWithLongestData(data) {
    if (!data || data.length === 0) {
        return null
    }

    let longestDataIndex = 0

    for (let i = 1; i < data.length; i++) {
        if (data[i].data.length > data[longestDataIndex].data.length) {
            longestDataIndex = i
        }
    }

    return data[longestDataIndex]
}

const InventoryOverview: FC<Props> = ({
    data,
    maps,
    sectionValue,
    venueName,
    onChangeSections,
    isExcludedSingle,
    setIsExcludedSingle,
    pageType,
}) => {
    const { changeModal, isModalOpen, handleChangeModal } = useModal()
    const [fromDate, setFromDate] = useState('')
    const [thruDate, setThruDate] = useState('')
    const [quickFilter, setQuickFilter] = useState('alltime')
    const [isDataAvailable, setIsDataAvailable] = useState<boolean>(false)
    const [pricesFilter, setPricesFilter] = useState<string>(
        pageType === 'secondary' && isExcludedSingle
            ? 'entrancePrice'
            : pageType === 'secondary' && !isExcludedSingle
              ? 'avgPrice'
              : 'totalTickets'
    )
    const [placeholder, setPlaceholder] = useState('Filter by Section (ex: 101, 102, 103)')
    const [sortBySingles, setSortBySingles] = useState<boolean>(false)
    const [isEntranceSelected, setIsEntranceSelected] = useState<boolean>(false)

    const handleSinglesToggleChange = (checked: boolean) => {
        setSortBySingles(checked)
        if (checked) {
            setIsExcludedSingle(true)
        } else {
            setIsExcludedSingle(false)
        }
    }

    const handleUnSelect = (bool) => {
        setIsEntranceSelected(bool)
        setSortBySingles(bool)
        setIsExcludedSingle(bool)
    }

    const handleFocus = () => {
        if (sectionValue.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }

    const handleBlur = () => {
        if (sectionValue.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }

    const calculateDatesFromQuickFilter = () => {
        const today = new Date()
        const startDate = new Date(today)

        switch (quickFilter) {
            case 'alltime':
                return {
                    fromDate: '',
                    thruDate: '',
                }
            case '1 Week':
                startDate.setDate(today.getDate() - 7)
                break
            case '2 Weeks':
                startDate.setDate(today.getDate() - 14)
                break
            case '1 Month':
                startDate.setMonth(today.getMonth() - 1)
                break
            case '3 Months':
                startDate.setMonth(today.getMonth() - 3)
                break
            default:
                break
        }

        return {
            fromDate: startDate.toISOString().split('T')[0],
            thruDate: today.toISOString().split('T')[0],
        }
    }

    const ChartWrapper = (data: { name: string; data: number[]; time: string[] }[], pricesFilter: string) => {
        const chartOptions: ApexOptions = {
            chart: {
                background: 'transparent',
                stacked: false,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                animations: {
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000,
                    },
                },
            },
            tooltip: {
                enabled: true,
                followCursor: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return renderToString(
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingInline: '5px',
                                paddingBlock: '20px',
                            }}
                        >
                            <span style={{ fontWeight: '600', fontSize: '18px' }}>
                                {convertDate(data[seriesIndex].time[dataPointIndex])}
                            </span>
                            {pricesFilter === 'avgPrice' ? (
                                <span style={{ fontWeight: '600' }}>
                                    Average price: ${data[seriesIndex].data[dataPointIndex].toFixed(2)}
                                </span>
                            ) : pricesFilter === 'medianPrice' ? (
                                <span style={{ fontWeight: '600' }}>
                                    Median price: ${data[seriesIndex].data[dataPointIndex].toFixed(2)}
                                </span>
                            ) : pricesFilter === 'entrancePrice' ? (
                                <span style={{ fontWeight: '600' }}>
                                    Entrance price: ${data[seriesIndex].data[dataPointIndex].toFixed(2)}
                                </span>
                            ) : pricesFilter === 'totalListings' ? (
                                <span style={{ fontWeight: '600' }}>
                                    Total listings: {data[seriesIndex].data[dataPointIndex]}
                                </span>
                            ) : pricesFilter === 'totalTickets' ? (
                                <span style={{ fontWeight: '600' }}>
                                    Total tickets: {data[seriesIndex].data[dataPointIndex]}
                                </span>
                            ) : (
                                <h3>Data Not Found</h3>
                            )}

                            <span style={{ fontSize: '16px', fontWeight: '800' }}>
                                Section:{' '}
                                <span style={{ color: palette[seriesIndex % 5] }}>{data[seriesIndex].name}</span>
                            </span>
                        </div>
                    )
                },
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                strokeDashArray: 2,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
            },
            // markers: {
            //     shape: 'circle',
            //     size: 3,
            //     radius: 3,
            //     colors: ['#FFFFFF'],
            //     strokeWidth: 3,
            //     strokeColors: chartColors,
            //     fillOpacity: 5,
            //     hover: {
            //         size: 4,
            //     },
            // },
            stroke: {
                curve: 'straight',
                width: 2,
                // colors: chartColors,
            },
            legend: {
                position: 'top',
                labels: {
                    // colors: chartColors,
                    useSeriesColors: true,
                },
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    // fillColors: chartColors,
                    radius: 12,
                },
            },
            xaxis: {
                type: 'category',
                categories: findObjectWithLongestData(data)?.time?.map((item) => {
                    const date = new Date(item)
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        // year: 'numeric',
                    }).format(date)
                    return formattedDate.replace(/\//g, '/')
                }),
                axisBorder: {
                    show: true,
                },
                axisTicks: {
                    show: true,
                },
                labels: {
                    offsetY: 4,
                    hideOverlappingLabels: true,
                    style: {
                        colors: '#696969',
                        fontSize: '11px',
                        fontWeight: '600',
                    },
                },
                crosshairs: {
                    show: false,
                },
                tickAmount: 10,
                stepSize: 1,
            },
            yaxis: {
                tickAmount: 9,
                decimalsInFloat: 1,
                axisBorder: {
                    show: true,
                },
                axisTicks: {
                    show: true,
                    width: 10,
                },
                labels: {
                    offsetX: -10,
                    style: {
                        colors: '#2e2f31',
                        fontSize: '14px',
                    },
                    formatter: function (value: string) {
                        return `${formatNumber(parseInt(value))}`
                    },
                },
                crosshairs: {
                    show: false,
                },
                min: 0,
            },
            noData: {
                text: 'Please select the section(s) to view the stats.',
            },
        }

        return chartOptions as ApexOptions
    }

    const currentDate = new Date()
    const currentDayIndex = data
        ? data.data.findIndex((item) => {
              const itemDate = new Date(item.current_date_time)
              return (
                  itemDate.getFullYear() === currentDate.getFullYear() &&
                  itemDate.getMonth() === currentDate.getMonth() &&
                  itemDate.getDate() === currentDate.getDate()
              )
          })
        : -1

    const seriesData = useMemo(() => {
        const parseTimestamp = (current_date_time: string) => new Date(current_date_time).getTime()

        const filteredData = data?.data.filter(
            (item) =>
                (!fromDate || parseTimestamp(item.current_date_time) >= parseTimestamp(fromDate)) &&
                (!thruDate || parseTimestamp(item.current_date_time) <= parseTimestamp(thruDate))
        )

        const daysToShow = 9999
        const startIndex = Math.max(0, currentDayIndex - daysToShow)
        const endIndex = Math.min(filteredData?.length - 1, currentDayIndex + daysToShow)

        const aggregatedData = filteredData?.slice(startIndex, endIndex + 1)
        return aggregatedData
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentDayIndex, data?.data, fromDate, thruDate, isExcludedSingle])

    useEffect(() => {
        const { fromDate, thruDate } = calculateDatesFromQuickFilter()
        setFromDate(fromDate)
        setThruDate(thruDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quickFilter, setFromDate, setThruDate])

    const handleChangeAutoComplete = (
        event: React.SyntheticEvent<Element, Event>,
        value: string[],
        reason: AutocompleteChangeReason
    ) => {
        onChangeSections(value)
    }

    useEffect(() => {
        if (pricesFilter === 'entrancePrice') {
            setIsEntranceSelected(true)
            setSortBySingles(true)
            setIsExcludedSingle(true)
        } else {
            setIsEntranceSelected(false)
            setSortBySingles(false)
            setIsExcludedSingle(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (data !== undefined) {
            setIsDataAvailable(true)
        }
    }, [data])

    useEffect(() => {
        if (sectionValue.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }, [placeholder, sectionValue.length])

    const [mapSrc, setMapSrc] = useState(null)

    useEffect(() => {
        const checkMapSrc = async () => {
            for (const otherPlatform of maps) {
                const fileUrl = otherPlatform.staticMapImage

                if (!fileUrl) {
                    continue
                }

                const exists = await new Promise((res) => {
                    const http = new XMLHttpRequest()
                    http.open('HEAD', fileUrl, true)
                    http.send()
                    http.onload = () => {
                        res(http.status !== 404 && http.status !== 204)
                    }
                    http.onerror = () => {
                        res(false)
                    }
                })

                if (exists) {
                    setMapSrc(fileUrl)
                    break
                }
            }
        }

        checkMapSrc()
    }, [maps])

    return (
        <>
            {data?.data ? (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                    }}
                >
                    <Card sx={{ padding: '28px 14px 6px 14px' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '22px', fontWeight: '600' }}>
                            Section Tracker
                        </Typography>
                        <Grid container sx={{ position: 'relative' }}>
                            <Grid item xs={12} mb={2} display="flex" alignItems="center">
                                {/* Filters */}
                                {pageType === 'secondary' ? (
                                    // Secondary Filters
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'end',
                                            gap: '1rem',
                                            margin: '1rem 1rem 0 1rem',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                justifyContent: 'flex-start',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <Typography>From Date</Typography>
                                            <TextField
                                                type="date"
                                                value={fromDate}
                                                onChange={(event) => setFromDate(event.target.value)}
                                                sx={{
                                                    border: '1px solid #d0d5dd',
                                                    borderRadius: '10px',
                                                    width: '321px',
                                                    cursor: 'pointer',
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        input: 'custom-input',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {fromDate && (
                                                                <IconButton
                                                                    edge="end"
                                                                    onClick={() => setFromDate('')}
                                                                    size="small"
                                                                    sx={{ marginRight: '4px' }}
                                                                >
                                                                    <ClearIcon sx={{ cursor: 'pointer' }} />
                                                                </IconButton>
                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                justifyContent: 'flex-start',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <Typography>To Date</Typography>
                                            <TextField
                                                type="date"
                                                value={thruDate}
                                                onChange={(event) => setThruDate(event.target.value)}
                                                sx={{
                                                    border: '1px solid #d0d5dd',
                                                    borderRadius: '10px',
                                                    width: '321px',
                                                    cursor: 'pointer',
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        input: 'custom-input',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {thruDate && (
                                                                <IconButton
                                                                    edge="end"
                                                                    onClick={() => setThruDate('')}
                                                                    size="small"
                                                                    sx={{ marginRight: '4px' }}
                                                                >
                                                                    <ClearIcon sx={{ cursor: 'pointer' }} />
                                                                </IconButton>
                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <Typography>Quick Filter</Typography>
                                                <FormControl sx={{ width: '170px' }}>
                                                    <StyledSelect
                                                        id="filter-graph-by-date-select"
                                                        value={quickFilter}
                                                        onChange={(e) => setQuickFilter(e.target.value as string)}
                                                        sx={{
                                                            border: '1px solid #d0d5dd',
                                                            borderRadius: '10px',
                                                            color: '#333333',
                                                            height: '40px',
                                                        }}
                                                    >
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="alltime"
                                                        >
                                                            All Time
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="1 Week"
                                                        >
                                                            1 Week
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="2 Weeks"
                                                        >
                                                            2 Weeks
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="1 Month"
                                                        >
                                                            1 Month
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="3 Months"
                                                        >
                                                            3 Months
                                                        </MenuItem>
                                                    </StyledSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <Box sx={{ minWidth: '321px' }}>
                                            <Autocomplete
                                                multiple
                                                options={data?.sections}
                                                value={sectionValue}
                                                onChange={handleChangeAutoComplete}
                                                sx={{
                                                    width: '321px',
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        InputProps={{
                                                            classes: {
                                                                input: 'custom-input',
                                                            },
                                                        }}
                                                        sx={{
                                                            border: '1px solid #d0d5dd',
                                                            borderRadius: '10px',
                                                        }}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        placeholder={placeholder}
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Box>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex' }}>
                                                <FormControl sx={{ width: '321px' }}>
                                                    <StyledSelect
                                                        id="prices-per-section-over-time-select"
                                                        value={pricesFilter}
                                                        onChange={(e) => setPricesFilter(e.target.value as string)}
                                                        sx={{
                                                            border: '1px solid #d0d5dd',
                                                            borderRadius: '10px',
                                                            color: '#333333',
                                                            height: '40px',
                                                        }}
                                                    >
                                                        <MenuItem
                                                            value="avgPrice"
                                                            onClick={() => handleUnSelect(false)}
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                        >
                                                            Average price per a section over time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="medianPrice"
                                                            onClick={() => handleUnSelect(false)}
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                        >
                                                            Median price per a section over time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="entrancePrice"
                                                            onClick={() => setIsEntranceSelected(true)}
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                        >
                                                            Entrance price per a section over time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="totalTickets"
                                                            onClick={() => handleUnSelect(false)}
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                        >
                                                            Total tickets per a section over time
                                                        </MenuItem>
                                                        <MenuItem
                                                            value="totalListings"
                                                            onClick={() => handleUnSelect(false)}
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                        >
                                                            Total listings per a section over time
                                                        </MenuItem>
                                                    </StyledSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: '1rem',
                                                alignItems: 'center',
                                                height: '40px',
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: isEntranceSelected ? 'flex' : 'none',
                                                    gap: '1rem',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <Typography>Exclude Singles</Typography>
                                                <CustomSwitch
                                                    checked={sortBySingles}
                                                    onChange={(e) => handleSinglesToggleChange(e.target.checked)}
                                                />
                                            </Box>
                                        </div>
                                    </Box>
                                ) : (
                                    // Primary Filters
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            width: '70%',
                                            alignItems: 'end',
                                            gap: '1rem',
                                            margin: '1rem 1rem 0 1rem',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                justifyContent: 'flex-start',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <Typography>From Date</Typography>
                                            <TextField
                                                type="date"
                                                value={fromDate}
                                                onChange={(event) => setFromDate(event.target.value)}
                                                sx={{
                                                    border: '1px solid #d0d5dd',
                                                    borderRadius: '10px',
                                                    width: '321px',
                                                    cursor: 'pointer',
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        input: 'custom-input',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {fromDate && (
                                                                <IconButton
                                                                    edge="end"
                                                                    onClick={() => setFromDate('')}
                                                                    size="small"
                                                                    sx={{ marginRight: '4px' }}
                                                                >
                                                                    <ClearIcon sx={{ cursor: 'pointer' }} />
                                                                </IconButton>
                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                justifyContent: 'flex-start',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <Typography>To Date</Typography>
                                            <TextField
                                                type="date"
                                                value={thruDate}
                                                onChange={(event) => setThruDate(event.target.value)}
                                                sx={{
                                                    border: '1px solid #d0d5dd',
                                                    borderRadius: '10px',
                                                    width: '321px',
                                                    cursor: 'pointer',
                                                }}
                                                InputProps={{
                                                    classes: {
                                                        input: 'custom-input',
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {thruDate && (
                                                                <IconButton
                                                                    edge="end"
                                                                    onClick={() => setThruDate('')}
                                                                    size="small"
                                                                    sx={{ marginRight: '4px' }}
                                                                >
                                                                    <ClearIcon sx={{ cursor: 'pointer' }} />
                                                                </IconButton>
                                                            )}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                alignItems: 'start',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                                <Typography>Quick Filter</Typography>
                                                <FormControl sx={{ width: '170px' }}>
                                                    <StyledSelect
                                                        id="filter-graph-by-date-select"
                                                        value={quickFilter}
                                                        onChange={(e) => setQuickFilter(e.target.value as string)}
                                                        sx={{
                                                            border: '1px solid #d0d5dd',
                                                            borderRadius: '10px',
                                                            color: '#333333',
                                                            height: '40px',
                                                        }}
                                                    >
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="alltime"
                                                        >
                                                            All Time
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="1 Week"
                                                        >
                                                            1 Week
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="2 Weeks"
                                                        >
                                                            2 Weeks
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="1 Month"
                                                        >
                                                            1 Month
                                                        </MenuItem>
                                                        <MenuItem
                                                            sx={{
                                                                transition: 'all 0.2s ease-in-out',
                                                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                            }}
                                                            value="3 Months"
                                                        >
                                                            3 Months
                                                        </MenuItem>
                                                    </StyledSelect>
                                                </FormControl>
                                            </Box>
                                        </div>
                                        <Box sx={{ minWidth: '321px' }}>
                                            <Autocomplete
                                                multiple
                                                options={data?.sections}
                                                value={sectionValue}
                                                onChange={handleChangeAutoComplete}
                                                sx={{
                                                    width: '321px',
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        InputProps={{
                                                            classes: {
                                                                input: 'custom-input',
                                                            },
                                                        }}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        placeholder={placeholder}
                                                        {...params}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Grid>
                            {/* Chart */}
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: '1rem',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexWrap: 'nowrap',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                cursor: 'pointer',
                                                border: '1px solid #d0d5dd',
                                                borderRadius: '10px',
                                                width: 'fit-content',
                                                mx: 'auto',
                                                px: '0.5rem',
                                                py: '0.5rem',
                                            }}
                                            onClick={() => changeModal('mapModal')}
                                        >
                                            <ShowMapIcon sx={{ width: '30px', height: '30px' }} />
                                            <Typography sx={{ fontSize: '16px', fontWeight: '500', color: '#E4933D' }}>
                                                Show Map
                                            </Typography>
                                        </Box>
                                        <img src={mapSrc} style={{ width: '500px' }} alt={venueName} />
                                    </Box>
                                    <Box width="80%">
                                        {data.categories[0] !== 'None' ? (
                                            <Chart
                                                type="line"
                                                height={'450px'}
                                                options={ChartWrapper(
                                                    sectionValue.map((selectedSection) => {
                                                        const sectionObjects = seriesData?.filter(
                                                            (obj) => obj.section === selectedSection
                                                        )
                                                        const avgPrices = sectionObjects.map((obj) => obj.avgPrice)
                                                        const medianPrices = sectionObjects.map(
                                                            (obj) => obj.medianPrice
                                                        )
                                                        const entrancePrices = sectionObjects.map((obj) => obj.minPrice)
                                                        const totalListings = sectionObjects.map(
                                                            (obj) => obj.totalListings
                                                        )
                                                        const totalTickets = sectionObjects.map(
                                                            (obj) => obj.availableTickets
                                                        )
                                                        const time = sectionObjects.map((obj) => obj.current_date_time)
                                                        return {
                                                            name: selectedSection,
                                                            data:
                                                                pricesFilter === 'avgPrice'
                                                                    ? avgPrices
                                                                    : pricesFilter === 'medianPrice'
                                                                      ? medianPrices
                                                                      : pricesFilter === 'entrancePrice'
                                                                        ? entrancePrices
                                                                        : pricesFilter === 'totalListings'
                                                                          ? totalListings
                                                                          : pricesFilter === 'totalTickets'
                                                                            ? totalTickets
                                                                            : 0,
                                                            time: time,
                                                        }
                                                    }),
                                                    pricesFilter
                                                )}
                                                series={sectionValue.map((item) => {
                                                    const sectionObjects = seriesData.filter(
                                                        (obj) => obj.section === item
                                                    )
                                                    const avgPrices = sectionObjects.map((obj) => obj.avgPrice)
                                                    const medianPrices = sectionObjects.map((obj) => obj.medianPrice)
                                                    const entrancePrices = sectionObjects.map((obj) => obj.minPrice)
                                                    const totalListings = sectionObjects.map((obj) => obj.totalListings)
                                                    const totalTickets = sectionObjects.map(
                                                        (obj) => obj.availableTickets
                                                    )
                                                    return {
                                                        name: item,
                                                        data:
                                                            pricesFilter === 'avgPrice'
                                                                ? avgPrices
                                                                : pricesFilter === 'medianPrice'
                                                                  ? medianPrices
                                                                  : pricesFilter === 'entrancePrice'
                                                                    ? entrancePrices
                                                                    : pricesFilter === 'totalListings'
                                                                      ? totalListings
                                                                      : pricesFilter === 'totalTickets'
                                                                        ? totalTickets
                                                                        : 0,
                                                    }
                                                })}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    flex: 1,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    display: 'flex',
                                                }}
                                            >
                                                <Typography>No data for this Event</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            ) : (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                    }}
                >
                    <Card sx={{ padding: '28px 14px 6px 14px', height: '700px' }}>
                        {isDataAvailable ? (
                            <LoaderComponent />
                        ) : (
                            <Box
                                sx={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    display: 'flex',
                                }}
                            >
                                <Typography>Data not found</Typography>
                            </Box>
                        )}
                    </Card>
                </Box>
            )}
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('mapModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'mapModal')}
            >
                <MapModal setOpen={() => changeModal('mapModal')} name={venueName} map={maps} />
            </Backdrop>
        </>
    )
}

export default InventoryOverview
