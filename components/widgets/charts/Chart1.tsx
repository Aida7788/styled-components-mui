import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/system'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

const Chart1 = ({ data }) => {
    const theme = useTheme()

    const chartOptions: ApexOptions = {
        tooltip: {
            y: {
                formatter: (val) => val + '%',
            },
        },
        chart: {
            width: '440px',
            height: '290px',
            background: 'transparent',
            toolbar: {
                show: false,
            },
        },
        colors: ['#1752D5', '#E79DE3'],
        dataLabels: {
            enabled: false,
        },
        grid: {
            borderColor: theme.palette.divider,
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        legend: {
            labels: {
                colors: theme.palette.text.secondary,
            },
            show: true,
        },
        plotOptions: {
            bar: {
                columnWidth: '40%',
            },
        },
        stroke: {
            colors: ['transparent'],
            show: true,
            width: 2,
        },
        theme: {
            mode: theme.palette.mode,
        },
        xaxis: {
            axisBorder: {
                show: true,
                color: theme.palette.divider,
            },
            axisTicks: {
                show: true,
                color: theme.palette.divider,
            },
            categories: ['13-17', '18-24', '25-34', '35-44', '45-64', '65-'],
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                },
                formatter: (val) => {
                    return `Age ${val}`
                },
            },
        },
        yaxis: {
            axisBorder: {
                color: theme.palette.divider,
                show: true,
            },
            axisTicks: {
                color: theme.palette.divider,
                show: true,
            },
            labels: {
                formatter: (value) => Number(value).toFixed(2),
                style: {
                    colors: theme.palette.text.secondary,
                },
            },
        },
    }

    return (
        <Box sx={{ width: '440px', height: '290px' }}>
            <Chart
                width={chartOptions.chart.width}
                height={chartOptions.chart.height}
                options={chartOptions}
                series={data}
                type="bar"
            />
        </Box>
    )
}

export default Chart1
