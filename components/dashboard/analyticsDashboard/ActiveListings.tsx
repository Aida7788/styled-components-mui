import { Box, Card, FormControl, MenuItem, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { ApexOptions } from 'apexcharts'
import { useMemo, useState } from 'react'
import Chart from 'react-apexcharts'
import { renderToString } from 'react-dom/server'
import ScrollBar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { StyledSelect } from 'src/components/general/StyledSelect'
import { formatNumber } from '../generalComponents/customTable/StatsItem'

export default function ActiveListings({ data }: { data: any }) {
    const [listingFilter, setListingFilter] = useState('desc') // Default filter value

    const sections = useMemo(() => {
        return (
            data?.categories?.map((item: any) => {
                const sectionObjects = data.data?.filter((obj: { section: any }) => obj.section === item)
                const objectWithLatestDate = sectionObjects?.reduce(
                    (
                        prev: { current_date_time: string | number | Date },
                        current: { current_date_time: string | number | Date }
                    ) => {
                        const prevDate = new Date(prev.current_date_time)
                        const currentDate = new Date(current.current_date_time)
                        return currentDate > prevDate ? current : prev
                    }
                )
                return objectWithLatestDate
            }) || []
        )
    }, [data])

    const sortedSections = useMemo(() => {
        if (listingFilter === 'default') {
            return sections
        } else {
            const sorted = [...sections].sort((a, b) => {
                if (listingFilter === 'asc') {
                    return a.availableTickets - b.availableTickets
                } else {
                    return b.availableTickets - a.availableTickets
                }
            })
            return sorted
        }
    }, [sections, listingFilter])

    const ChartWrapper = (sections: any[]) => {
        const theme = useTheme()
        const chartOptions: ApexOptions = {
            chart: {
                background: 'transparent',
                stacked: false,
                toolbar: {
                    show: false,
                },
                animations: {
                    enabled: true,
                    dynamicAnimation: {
                        enabled: true,
                    },
                },
            },
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                    return renderToString(
                        <div
                            style={{
                                zIndex: '100',
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingInline: '10px',
                                paddingBlock: '10px',
                                border: '2px solid #c2c2c2',
                                borderRadius: '13px',
                            }}
                        >
                            <span style={{ fontWeight: '600', color: '#3F4254' }}>
                                {sections[dataPointIndex].availableTickets} Tickets Left
                            </span>
                        </div>
                    )
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '30px',
                    borderRadius: 10,
                    borderRadiusApplication: 'end',
                },
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                borderColor: '#dcdcdc',
                strokeDashArray: 1,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
            },
            states: {
                active: {
                    filter: {
                        type: 'none',
                    },
                },
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            legend: {
                show: false,
            },
            stroke: {
                colors: ['transparent'],
                show: true,
            },
            theme: {
                mode: theme.palette.mode,
            },
            xaxis: {
                categories: sections.map((item: { section: any }) => item.section),
                axisBorder: {
                    color: theme.palette.divider,
                    show: true,
                },
                axisTicks: {
                    color: theme.palette.divider,
                    show: true,
                },
                labels: {
                    offsetY: 2,
                    rotate: -45,
                    rotateAlways: true,
                    style: {
                        colors: '#2e2f31',
                        fontWeight: '600',
                    },
                },
            },
            yaxis: {
                labels: {
                    offsetX: -5,
                    style: {
                        colors: '#2e2f31',
                        fontWeight: '600',
                    },
                    formatter: function (value: any) {
                        return `${formatNumber(parseInt(value))}`
                    },
                },
            },
            noData: {
                text: 'Data not found',
                style: {
                    color: '#000000',
                },
            },
            colors: ['#026CDF'],
        }

        return chartOptions as ApexOptions
    }

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                width: '100%',
            }}
        >
            <Card sx={{ padding: '28px 14px 6px 14px' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '22px', fontWeight: '600' }}>
                    Active Listings
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        margin: '1rem',
                        overflow: 'hidden',
                        gap: '1rem',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >
                    <Typography>Sort by:</Typography>
                    <FormControl>
                        <StyledSelect
                            id="listing-select"
                            value={listingFilter}
                            onChange={(e) => setListingFilter(e.target.value as any)}
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
                                value="default"
                            >
                                Default
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                }}
                                value="asc"
                            >
                                Ascending
                            </MenuItem>
                            <MenuItem
                                sx={{
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                }}
                                value="desc"
                            >
                                Descending
                            </MenuItem>
                        </StyledSelect>
                    </FormControl>
                </Box>
                <ScrollBar options={{ suppressScrollY: true }} className="customScrollbarActiveListings">
                    <Chart
                        height="375"
                        width={sortedSections.length > 22 ? sortedSections.length * 80 : '100%'}
                        options={ChartWrapper(sortedSections)}
                        series={[
                            { data: sortedSections.map((item: { availableTickets: string }) => item.availableTickets) },
                        ]}
                        type="bar"
                    />
                </ScrollBar>
            </Card>
        </Box>
    )
}
