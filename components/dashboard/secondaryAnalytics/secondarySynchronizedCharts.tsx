// @ts-ignore
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Box, Card, FormControl, IconButton, InputAdornment, MenuItem, TextField, Typography } from '@mui/material'
import { ClearIcon } from '@mui/x-date-pickers'
import { useEffect, useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import { CustomSwitch } from 'src/components/general/CustomSwitch'
import { StyledSelect } from 'src/components/general/StyledSelect'
import { convertDate } from 'src/utils/dataFormatters'
import { formatNumber } from '../generalComponents/customTable/StatsItem'
import { LoaderComponent } from './../loaderComponent/loaderComp'

const SynchronizedCharts = ({ data, isExcludedSingle, setIsExcludedSingle }): JSX.Element => {
    const [fromDate, setFromDate] = useState('')
    const [thruDate, setThruDate] = useState('')
    const [quickFilter, setQuickFilter] = useState('alltime')
    const [sortBySingles, setSortBySingles] = useState<boolean>(false)
    const [showPopUp, setShowPopUp] = useState(false)

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

    const handleSinglesToggleChange = (checked: boolean) => {
        setSortBySingles(checked)
        if (checked) {
            setIsExcludedSingle(true)
        } else {
            setIsExcludedSingle(false)
        }
    }

    useEffect(() => {
        const { fromDate, thruDate } = calculateDatesFromQuickFilter()
        setFromDate(fromDate)
        setThruDate(thruDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quickFilter, setFromDate, setThruDate])

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

    const getFilteredAndAggregatedData = () => {
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
            acc.totalListing.push(data.totalListing !== null ? data.totalListing : 0)

            acc.avgPrice.push(data.avgPrice !== null ? data.avgPrice : 0)
            acc.minPrice.push(data.minPrice !== null ? data.minPrice : 0)
            acc.medianPrice.push(data.medianPrice !== null ? data.medianPrice : 0)

            acc.timestamp.push(data.timestamp)
            return acc
        }, initData)

        return aggregatedData
    }

    const Charts = useMemo(() => {
        interface ChartProps {
            options: any
        }
        const aggregatedData = getFilteredAndAggregatedData()

        if (aggregatedData) {
            const getCustomTooltip = (series: any, dataPointIndex: number) => {
                if (!series || series.length === 0 || dataPointIndex === undefined || !data || !data[dataPointIndex]) {
                    return `<div class="customTooltipWrapper">
                            <div class="customTooltipInfo"><p>No data. Please try again</p></div>
                        </div>`
                }

                const timestamp = aggregatedData.timestamp[dataPointIndex]
                if (!timestamp) {
                    return `<div class="customTooltipWrapper">
                            <div class="customTooltipInfo"><p>No data. Please refresh the page</p></div>
                        </div>`
                }

                const tooltipContent = `
                    <div class="customTooltipInfo">
                        <p>Available Tickets: ${
                            aggregatedData?.availableTickets[dataPointIndex] === null
                                ? 0
                                : aggregatedData?.availableTickets[dataPointIndex]
                        }</p>
                        <p>Total Listings: ${
                            aggregatedData?.totalListing[dataPointIndex] === null || undefined
                                ? 0
                                : aggregatedData?.totalListing[dataPointIndex]
                        }</p>
                        <p>Average Price: $${
                            aggregatedData?.avgPrice[dataPointIndex] === null
                                ? 0
                                : aggregatedData?.avgPrice[dataPointIndex]
                        }</p>
                        <p>Median Price: $${
                            aggregatedData?.medianPrice[dataPointIndex] === null
                                ? 0
                                : aggregatedData?.medianPrice[dataPointIndex]
                        }</p>
                        <p>Minimum Price: $${
                            aggregatedData?.minPrice[dataPointIndex] === null
                                ? 0
                                : aggregatedData?.minPrice[dataPointIndex]
                        }</p>
                    </div>`

                return `<div class="customTooltipWrapper">
                    <div class="customTooltipDate">${convertDate(timestamp)}</div>
                    ${tooltipContent}
                    </div>`
            }
            const AvailableTicketsSeriesData = [
                { data: aggregatedData?.availableTickets, timestamp: aggregatedData?.timestamp },
            ]
            const sortedAvailable = AvailableTicketsSeriesData[0]?.data?.toSorted((a, b) => b - a)
            const sortedAvailableTicketsTime = AvailableTicketsSeriesData[0].timestamp.toSorted((a, b) => b - a)

            const AvailableTicketsChartOptions: any = {
                chart: {
                    id: 'available',
                    group: 'social',
                    type: 'area',
                    height: 250,
                    width: '99%',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                    animations: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 0.1,
                        opacityFrom: 0.1,
                        opacityTo: 0.8,
                        stops: [0, 100],
                    },
                },
                xaxis: {
                    type: 'category',
                    categories: sortedAvailableTicketsTime.map((item) =>
                        new Date(item).toLocaleDateString({
                            // @ts-ignore comment
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        })
                    ),
                    labels: {
                        show: true,
                        trim: false,
                        rotate: 0,
                        minHeight: 40,
                        hideOverlappingLabels: true,
                        rotateAlways: false,
                    },
                    tickAmount: 9,
                    stepSize: 1,
                    forceNiceScale: true,
                },
                yaxis: {
                    title: {
                        text: 'Active Tickets',
                        style: { fontWeight: '500', fontSize: '15px' },
                        offsetX: -7,
                    },
                    labels: {
                        formatter: function (value: string) {
                            return `${formatNumber(parseInt(value))}`
                        },
                    },
                    min: 0,
                    max: sortedAvailable[0],
                    tickAmount: 8,
                    forceNiceScale: true,
                },
                tooltip: {
                    enabled: true,
                    shared: false,
                    followCursor: true,
                    x: {
                        show: true,
                    },
                    custom: ({ series, dataPointIndex }) => {
                        return getCustomTooltip(series, dataPointIndex)
                    },
                },
                noData: {
                    text: 'Data not found',
                },
                colors: ['#599FF2'],
            }

            const AvailableTicketsChart: React.FC<ChartProps> = () => {
                return (
                    <Chart
                        options={AvailableTicketsChartOptions}
                        series={AvailableTicketsSeriesData}
                        type={AvailableTicketsChartOptions.chart.type}
                        width={AvailableTicketsChartOptions.chart.width}
                        height={AvailableTicketsChartOptions.chart.height}
                    />
                )
            }

            const AveragePriceSeriesData = [{ data: aggregatedData.avgPrice, timestamp: aggregatedData.timestamp }]
            const sortedAveragePrice = AveragePriceSeriesData[0].data.toSorted((a, b) => b - a)
            const sortedAveragePriceTime = AveragePriceSeriesData[0].timestamp.toSorted((a, b) => b - a)

            const AverageChartOptions: any = {
                chart: {
                    id: 'average',
                    group: 'social',
                    type: 'area',
                    height: 120,
                    width: '99%',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                    animations: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    enabled: true,
                    custom: () => {
                        return ''
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 0.1,
                        opacityFrom: 0.1,
                        opacityTo: 0.8,
                        stops: [0, 100],
                    },
                },
                xaxis: {
                    type: 'category',
                    categories: sortedAveragePriceTime.map((item) =>
                        new Date(item).toLocaleDateString({
                            // @ts-ignore comment
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        })
                    ),
                    labels: {
                        show: true,
                        trim: false,
                        rotate: 0,
                        minHeight: 40,
                        hideOverlappingLabels: true,
                        rotateAlways: false,
                    },
                    tickAmount: 9,
                    stepSize: 1,
                    forceNiceScale: true,
                },
                yaxis: {
                    title: {
                        text: 'Average Price',
                        style: { fontWeight: '500', fontSize: '15px' },
                        offsetX: -7,
                    },
                    labels: {
                        align: 'left',
                        maxWidth: '10px',
                        formatter: function (value: string) {
                            return `$${formatNumber(parseInt(value))}`
                        },
                    },
                    min: 0,
                    max: sortedAveragePrice[0],
                    tickAmount: 3,
                },
                noData: {
                    text: 'Data not found',
                },
                colors: ['#F89F83'],
            }

            const AverageChart: React.FC<ChartProps> = () => {
                return (
                    <Chart
                        options={AverageChartOptions}
                        series={AveragePriceSeriesData}
                        width={AverageChartOptions.chart.width}
                        height={AverageChartOptions.chart.height}
                        type={AverageChartOptions.chart.type}
                    />
                )
            }
            const MinPriceSeriesData = [{ data: aggregatedData.minPrice, timestamp: aggregatedData.timestamp }]
            const sortedMinPrice = MinPriceSeriesData[0].data.toSorted((a, b) => b - a)
            const sortedMinPriceTime = MinPriceSeriesData[0].timestamp.toSorted((a, b) => b - a)

            const MinPriceChartOptions: any = {
                chart: {
                    id: 'min-price',
                    group: 'social',
                    type: 'area',
                    height: 120,
                    width: '99%',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                    animations: {
                        enabled: true,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    enabled: true,
                    custom: () => {
                        return ''
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 0.1,
                        opacityFrom: 0.1,
                        opacityTo: 0.8,
                        stops: [0, 100],
                    },
                },
                xaxis: {
                    type: 'category',
                    categories: sortedMinPriceTime.map((item) =>
                        new Date(item).toLocaleDateString({
                            // @ts-ignore comment
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        })
                    ),
                    labels: {
                        show: true,
                        trim: false,
                        rotate: 0,
                        minHeight: 40,
                        hideOverlappingLabels: true,
                        rotateAlways: false,
                    },
                    tickAmount: 9,
                    stepSize: 1,
                    forceNiceScale: true,
                },
                yaxis: {
                    title: {
                        text: 'Enter Price',
                        style: { fontWeight: '500', fontSize: '15px' },
                        offsetX: -7,
                    },
                    labels: {
                        formatter: function (value: string) {
                            return `$${formatNumber(parseInt(value))}`
                        },
                    },
                    min: 0,
                    max: sortedMinPrice[0],
                    tickAmount: 3,
                },
                noData: {
                    text: 'Data not found',
                },
                colors: ['#6DE0A9'],
            }

            const MinPriceChart: React.FC<ChartProps> = () => {
                return (
                    <Chart
                        options={MinPriceChartOptions}
                        series={MinPriceSeriesData}
                        width={MinPriceChartOptions.chart.width}
                        height={MinPriceChartOptions.chart.height}
                        type={MinPriceChartOptions.chart.type}
                    />
                )
            }

            return [
                { Component: AvailableTicketsChart, options: AvailableTicketsChartOptions },
                { Component: AverageChart, options: AverageChartOptions },
                { Component: MinPriceChart, options: MinPriceChartOptions },
            ]
        }
        return []
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, fromDate, thruDate])

    useEffect(() => {
        if (isExcludedSingle) {
            setSortBySingles(true)
        } else {
            setSortBySingles(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {!!data ? (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                    }}
                >
                    <Card sx={{ padding: '28px 14px 6px 14px' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '22px', fontWeight: '600' }}>
                            Active Listings Over Time
                        </Typography>
                        <Box
                            sx={{
                                margin: '3rem 1rem 0 1rem',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                        >
                            {/* From date, Thru date, Singles */}
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
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}></Box>
                                    <Box
                                        sx={{
                                            gap: '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            height: '40px',
                                        }}
                                    >
                                        <Typography>Exclude Singles</Typography>
                                        <CustomSwitch
                                            checked={sortBySingles}
                                            onChange={(e) => handleSinglesToggleChange(e.target.checked)}
                                        />
                                        <div
                                            style={{
                                                alignItems: 'center',
                                                position: 'relative',
                                            }}
                                        >
                                            <Box
                                                onMouseLeave={() => setShowPopUp(false)}
                                                onMouseEnter={() => setShowPopUp(true)}
                                            >
                                                <IconButton size="small">
                                                    <InfoOutlinedIcon sx={{ width: '18px', height: '18px' }} />
                                                </IconButton>
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: showPopUp ? 'block' : 'none',
                                                    position: 'absolute',
                                                    backgroundColor: 'background.layout',
                                                    width: '220px',
                                                    zIndex: '100',
                                                    p: '10px',
                                                    top: '40px',
                                                    borderRadius: '4px',
                                                    color: 'white',
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontSize: '12px', fontWeight: '400', wordWrap: 'break-word' }}
                                                >
                                                    On the enter price graph, exclude singles and calculate for
                                                    quantities of 2 or more.
                                                </Typography>
                                            </Box>
                                        </div>
                                    </Box>
                                </div>
                            </Box>
                            {/* Quick filter */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Typography>Quick Filter</Typography>
                                <FormControl sx={{ width: '170px' }}>
                                    <StyledSelect
                                        id="quick-filter-select"
                                        value={quickFilter}
                                        defaultValue="quickfilter"
                                        onChange={(e) => setQuickFilter(e.target.value as string)}
                                        sx={{
                                            border: '1px solid #d0d5dd',
                                            borderRadius: '10px',
                                            color: '#333333',
                                            height: '40px',
                                        }}
                                    >
                                        <MenuItem
                                            sx={{ '&:hover': { backgroundColor: '#e6e6e6 !important' } }}
                                            value="alltime"
                                        >
                                            All Time
                                        </MenuItem>
                                        <MenuItem
                                            sx={{ '&:hover': { backgroundColor: '#e6e6e6 !important' } }}
                                            value="1 Week"
                                        >
                                            1 Week
                                        </MenuItem>
                                        <MenuItem
                                            sx={{ '&:hover': { backgroundColor: '#e6e6e6 !important' } }}
                                            value="2 Weeks"
                                        >
                                            2 Weeks
                                        </MenuItem>
                                        <MenuItem
                                            sx={{ '&:hover': { backgroundColor: '#e6e6e6 !important' } }}
                                            value="1 Month"
                                        >
                                            1 Month
                                        </MenuItem>
                                        <MenuItem
                                            sx={{ '&:hover': { backgroundColor: '#e6e6e6 !important' } }}
                                            value="3 Months"
                                        >
                                            3 Months
                                        </MenuItem>
                                    </StyledSelect>
                                </FormControl>
                            </Box>
                        </Box>
                        {Charts.map(({ Component, options }, index) => (
                            <Box key={index}>
                                <Component options={options} />
                            </Box>
                        ))}
                    </Card>
                </Box>
            ) : (
                <Box
                    sx={{
                        backgroundColor: 'background.default',
                    }}
                >
                    <Card sx={{ padding: '28px 14px 6px 14px', height: '700px' }}>
                        <LoaderComponent />
                    </Card>
                </Box>
            )}
        </>
    )
}

export default SynchronizedCharts
