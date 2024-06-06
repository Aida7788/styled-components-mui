import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

const Chart3 = ({ data }) => {
    const theme = useTheme()

    const chartOptions: ApexOptions = {
        
        chart: {
            background: '#FFFFFF',
            stacked: false,
            toolbar: {
                show: false,
            },
        },
        colors: ['#1752D5', '#E79DE3'],
        labels: [`Male`, `Female`],
        dataLabels:{
            enabled:false
        },
        tooltip:{
            enabled:false,
        },
        plotOptions: {
            pie:{
                donut:{
                    size:'85%',
                    labels:{
                        show:true,
                        value:{
                            color:'black',
                            formatter:(elem)=>{
                                return elem+'%'
                            }
                        },
                    }
                }
            },
            radialBar: {
                dataLabels: {
                    name: {
                        color: theme.palette.text.primary,
                    },
                    value: {
                        color: theme.palette.text.secondary,
                    },
                },
                hollow: {
                    size: '60%',
                },
                track: {
                    background: theme.palette.background.default,
                },
            },
        },
        theme: {
            mode: theme.palette.mode,
        },
    }

    const chartSeries = [Number((data.male * 100).toFixed(1)), Number((data.female * 100).toFixed(1))]

    return (
        <Box sx={{ width: '170px', height: '225px' }}>
             <Typography
                sx={{
                    border: '1px solid #DFDFDF',
                    borderRadius: '5px',
                    textAlign: 'center',
                    color: '#1752D5',
                    py: '0.5rem',
                    px: '0.1rem',
                    fontSize: '12px',
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                    <circle cx="5" cy="5.5" r="5" fill="#1752D5" />
                </svg>
                &nbsp; Male ({(data.male*100).toFixed(1)}%)
            </Typography>
            <Chart width={200} height={200} type={'donut'} options={chartOptions} series={chartSeries} />
            <Typography
                sx={{
                    border: '1px solid #DFDFDF',
                    borderRadius: '5px',
                    textAlign: 'center',
                    color: '#E79DE3',
                    py: '0.5rem',
                    px: '0.1rem',
                    fontSize: '12px',
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                    <circle cx="5" cy="5.5" r="5" fill="#E79DE3" />
                </svg>
                &nbsp; Female ({(data.female*100).toFixed(1)}%)
            </Typography>
        </Box>
    )
}

export default Chart3
