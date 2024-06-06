import {
    Box,
    Card,
    CardContent,
    FormControl,
    IconButton,
    InputAdornment,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material'
import { ClearIcon } from '@mui/x-date-pickers'
import type { ApexOptions } from 'apexcharts'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import { renderToString } from 'react-dom/server'
import { StyledSelect } from 'src/components/general/StyledSelect'
import { convertDate } from 'src/utils/dataFormatters'

const ListingsChart = ({ data }): JSX.Element => {
    const [fromDate, setFromDate] = useState('')
    const [thruDate, setThruDate] = useState('')
    const [quickFilter, setQuickFilter] = useState('alltime')
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

    useEffect(() => {
        const { fromDate, thruDate } = calculateDatesFromQuickFilter()
        setFromDate(fromDate)
        setThruDate(thruDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quickFilter, setFromDate, setThruDate])

    const FormatDate = (timestamp: string, format?: string) => {
        const date = new Date(timestamp)
        return `${date.getMonth() + 1}/${date.getDate()}`
    }

    const currentDate = new Date()
    const currentDayIndex = data
        ? data.findIndex((item) => {
              const itemDate = new Date(item.timestamp)
              return (
                  itemDate.getFullYear() === currentDate.getFullYear() &&
                  itemDate.getMonth() === currentDate.getMonth() &&
                  itemDate.getDate() === currentDate.getDate()
              )
          })
        : -1

    const aggregatedData = useMemo(() => {
        const parseTimestamp = (timestamp: string) => new Date(timestamp).getTime()

        const filteredData = data?.filter(
            (item) =>
                (!fromDate || parseTimestamp(item.timestamp) >= parseTimestamp(fromDate)) &&
                (!thruDate || parseTimestamp(item.timestamp) <= parseTimestamp(thruDate))
        )

        const daysToShow = 9999
        const startIndex = Math.max(0, currentDayIndex - daysToShow)
        const endIndex = Math.min(filteredData?.length - 1, currentDayIndex + daysToShow)

        const slicedData = filteredData?.slice(startIndex, endIndex + 1)

        const initData: {
            availableTickets: number[]
            totalListing: number[]

            avgPrice: number[]
            minPrice: number[]
            medianPrice: number[]

            timestamp: string[]
        } = {
            availableTickets: [],
            totalListing: [],

            avgPrice: [],
            minPrice: [],
            medianPrice: [],

            timestamp: [],
        }

        const aggregatedData = slicedData?.reduce((acc, data) => {
            acc.availableTickets.push(data.availableTickets !== null ? data.availableTickets : 0)
            acc.timestamp.push(data.timestamp)
            return acc
        }, initData)

        return aggregatedData
    }, [data, fromDate, thruDate, currentDayIndex])

    const ChartComponent = ({ aggregatedData }) => {
        const seriesData = useMemo(() => {
            if (aggregatedData) {
                return [{ data: aggregatedData.availableTickets, time: aggregatedData.timestamp }]
            }
            return []
        }, [aggregatedData])

        const sortedAvailable = useMemo(() => {
            return seriesData && seriesData[0].data?.toSorted((a, b) => b - a)
        }, [seriesData])

        const ChartOptions: ApexOptions = useMemo(() => {
            return {
                chart: {
                    id: 'available',
                    background: 'transparent',
                    stacked: false,
                    height: '350px',
                    animations: {
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000,
                        },
                    },
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                xaxis: {
                    categories: seriesData && seriesData[0].time?.map((item) => FormatDate(item, undefined)),
                    axisBorder: {
                        show: true,
                    },
                    axisTicks: {
                        show: true,
                    },
                    labels: {
                        style: {
                            colors: '#b3b3b3',
                            fontSize: '14px',
                        },
                    },
                    tickAmount: 10,
                    // stepSize: seriesData[0].time.length > 8 ? 20 : 1,
                    stepSize: 1,
                    forceNiceScale: true,
                },
                yaxis: {
                    labels: {
                        offsetX: -10,
                        style: {
                            colors: '#b3b3b3',
                            fontSize: '14px',
                        },
                    },
                    min: 0,
                    max: sortedAvailable && sortedAvailable[0],
                    tickAmount: 10,
                    // stepSize: sortedAvailable.length > 25 ? 5 : 3,
                    forceNiceScale: true,
                },
                tooltip: {
                    enabled: true,
                    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                        return renderToString(
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px',
                                    backgroundColor: '#FFFFFF00',
                                    color: '#000000',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingInline: '5px',
                                    paddingBlock: '20px',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                    }}
                                >
                                    {convertDate(seriesData[0].time[dataPointIndex])}
                                </span>
                                <span style={{ fontWeight: '600' }}>
                                    Available Tickets: {seriesData[0].data[dataPointIndex]}
                                </span>
                            </div>
                        )
                    },
                },
                // markers: {
                //     size: 3,
                //     radius: 3,
                //     shape: 'circle',
                //     strokeWidth: 3,
                //     fillOpacity: 5,
                //     colors: ['#FFFFFF'],
                //     strokeColors: '#0485FA',
                //     hover: {
                //         size: 4,
                //     },
                // },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    gradient: {
                        opacityFrom: 0.6,
                        opacityTo: 0.4,
                        shadeIntensity: 0,
                        stops: [0, 100],
                        type: 'vertical',
                    },
                    type: 'gradient',
                },
                grid: {
                    strokeDashArray: 2,
                },
                stroke: {
                    curve: 'straight',
                },
                noData: {
                    text: 'Data not found',
                },
                colors: ['#0081FF'],
            }
        }, [seriesData, sortedAvailable])

        return <Chart height="350px" options={ChartOptions} series={seriesData} type="area" />
    }

    return (
        <>
            {!!data && (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                    }}
                >
                    <Card sx={{ padding: '28px 14px 6px 14px' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '22px', fontWeight: '600' }}>
                            Active Tickets Over Time
                        </Typography>
                        <Box
                            sx={{
                                margin: '1rem 1rem 0 1rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            {/* From date, Thru date */}
                            <Box sx={{ display: 'flex' }}>
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
                                            marginRight: 2,
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
                                            marginRight: 2,
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
                            </Box>
                            {/* Quick filter */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Typography>Quick Filter</Typography>
                                <FormControl sx={{ width: '170px' }}>
                                    <StyledSelect
                                        id="quick-filter-select"
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
                        </Box>
                        <CardContent>
                            <ChartComponent aggregatedData={aggregatedData} />
                        </CardContent>
                    </Card>
                </Box>
            )}
        </>
    )
}

export default ListingsChart
