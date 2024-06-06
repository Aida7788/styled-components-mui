import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'
import { renderToString } from 'react-dom/server'

import { Box, Card, CardContent, CardHeader } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import dayjs from 'dayjs'
import { ListingOverTypeInterface } from 'src/types/local/primaryAvailabeTypes'
import { convertDate } from 'src/utils/dataFormatters'
import Scrollbar from '../../general/Scrollbar'

type ValuePiece = Date | null

interface Props {
    isPrimary?: boolean

    data: ListingOverTypeInterface[]
}

export default function SecondaryListingChart({
    isPrimary,

    data,
}: Props) {
    const theme = useTheme()

    const chartOptions: ApexOptions = {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false,
            },
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
                            backgroundColor: '#FFFFFF',
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
                            {convertDate(data[dataPointIndex].timestamp)}
                        </span>
                        <span style={{ fontWeight: '600' }}>
                            Available Tickets: {data[dataPointIndex].availableTickets}
                        </span>
                        <span style={{ fontWeight: '600' }}>
                            Avarage Tickets Price: ${data[dataPointIndex].avgPrice}
                        </span>
                    </div>
                )
            },
        },
        colors: ['#0081FF'],
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
            borderColor: theme.palette.divider,
            strokeDashArray: 2,
        },
        stroke: {
            curve: 'straight',
        },
        theme: {
            mode: theme.palette.mode,
        },
        xaxis: {
            categories: data?.map((item) => {
                return dayjs(item?.timestamp).format('MMM DD')
            }),
            axisBorder: {
                color: theme.palette.divider,
                show: true,
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true,
            },

            labels: {
                offsetY: 5,
                style: {
                    colors: '#b3b3b3',
                    fontSize: '14px',
                },
            },
        },
        yaxis: {
            labels: {
                offsetX: -10,
                style: {
                    colors: '#b3b3b3',
                    fontSize: '14px',
                },
            },
        },
    }

    function generateDayWiseTimeSeries(data, range) {
        let timeSeriesData = []

        for (const item of data) {
            const timestamp = new Date(item.timestamp).setHours(0, 0, 0, 0) // Set time to midnight
            const value = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min

            timeSeriesData.push([timestamp, value])
        }

        return timeSeriesData
    }

    const stackedTicketPricesChartOptions: ApexOptions = {
        series: [
            {
                name: 'Active Tickets',
                data: generateDayWiseTimeSeries(data, {
                    min: 10,
                    max: 60,
                }),
            },
            {
                name: 'Average Ticket Price',
                data: generateDayWiseTimeSeries(data, {
                    min: 10,
                    max: 20,
                }),
            },
            {
                name: 'Enter Price',
                data: generateDayWiseTimeSeries(data, {
                    min: 10,
                    max: 15,
                }),
            },
        ],
        chart: {
            type: 'area',
            height: 350,
            stacked: true,
            events: {
                selection: function (chart, e) {},
            },
        },
        colors: ['#008FFB', '#00E396', '#CED4DC'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.8,
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
        },
        xaxis: {
            type: 'datetime',
            tickAmount: 'dataPoints',
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: "MMM 'yy",
                    day: 'dd',
                },
            },
        },
    }

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
            }}
        >
            <Card>
                <CardHeader title="Active Listings Over Time" sx={{ textAlign: 'center' }} />
                <CardContent>
                    <Scrollbar>
                        <Box
                            sx={{
                                height: 375,
                                minWidth: 500,
                                position: 'relative',
                            }}
                        >
                            <Chart
                                height="350"
                                options={stackedTicketPricesChartOptions}
                                series={[
                                    {
                                        name: 'Active Tickets',
                                        data: data?.map((item) => ({ x: item.timestamp, y: item.availableTickets })),
                                    },
                                    {
                                        name: 'Average Ticket Price',
                                        data: data?.map((item) => ({ x: item.timestamp, y: item.avgPrice })),
                                    },
                                    {
                                        name: 'Enter Price',
                                        data: data?.map((item) => ({ x: item.timestamp, y: item.minPrice })),
                                    },
                                ]}
                                type="area"
                            />
                        </Box>
                    </Scrollbar>
                </CardContent>
            </Card>
        </Box>
    )
}
