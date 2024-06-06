import { Box, CardHeader, Divider, MenuItem, Select, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { ApexOptions } from 'apexcharts'
import { useMemo, useState, type FC } from 'react'
import Chart from 'react-apexcharts'
import { formatNumber } from 'src/components/dashboard/generalComponents/customTable/StatsItem'

const data = {
    series: [{ data: [10, 5, 11, 20, 13, 28] }],
    categories: ['Sep 29, 23', 'Sep 29, 23', 'Sep 29, 23', 'Sep 29, 23', 'Sep 29, 23', 'Sep 29, 23'],
}

interface Props {
    color?: string
    icon?: JSX.Element
    heading?: string
    subHeading?: string
    data:{
        series:{data:number[]}[]
        categories:string[]
        type: string
    }
}

const Chart4: FC<Props> = ({ color, icon, heading, subHeading, data }) => {
    const [selectValue, setSelectValue] = useState<any>(3)
    const inputData = useMemo(()=>{
        if (data.series.length>0){
            return {
                series: [{data:data.series[0].data.slice(data.series[0].data.length - selectValue, data.series[0].data.length), name:data.type}],
                categories: data.categories.slice(data.series[0].data.length - selectValue, data.series[0].data.length)
            }
        }
        else return {
            series: [],
            categories:[],
        }
        
    }, [data, selectValue])
    const theme = useTheme()
    const chartOptions: ApexOptions = {
        chart: {
            background: '#FFFFFF',
            stacked: false,
            toolbar: { show: false },
            width: '99%',
            height: '300px',
        },
        colors: [color || '#1ED760'],
        dataLabels: { enabled: false },
        fill: {
            gradient: {
                opacityFrom: 0.6,
                opacityTo: 0.4,
                shadeIntensity: 1,
                stops: [0, 100],
                type: 'vertical',
            },
            type: 'gradient',
        },
        grid: { borderColor: theme.palette.divider, strokeDashArray: 2 },
        markers: {
            size: 6,
            strokeColors: theme.palette.background.default,
            strokeWidth: 3,
        },
        stroke: { curve: 'smooth' },
        theme: { mode: theme.palette.mode },
        xaxis: {
            axisBorder: { color: theme.palette.divider, show: true },
            axisTicks: { color: theme.palette.divider, show: true },
            categories: inputData.categories,
            labels: { offsetY: 2, style: { colors: theme.palette.text.secondary } },
        },
        yaxis: {
            labels: {
                // @ts-ignore
                formatter: (value)=> formatNumber(value),
                offsetX: -10,
                style: { colors: theme.palette.text.secondary },
            },
        },
    }
    return (
        <Box sx={{ boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);', borderRadius: '6px', width: 'auto', height: '400px' }}>
            <CardHeader
                action={
                    <Select
                        sx={{
                            bgcolor: 'background.white',
                            width: '120px',
                            height: '40px',
                            border: '1px solid #CCCCCC',
                            borderRadius: '6px',
                        }}
                        value={selectValue}
                        onChange={(e)=>{setSelectValue(e.target.value)}}
                    >
                        <MenuItem value={3}>3 months</MenuItem>
                        <MenuItem value={6}>6 months</MenuItem>
                        <MenuItem value={12}>1 year</MenuItem>
                    </Select>
                }
                title={
                    <Box display={'flex'} alignContent={'center'} alignItems={'center'} alignSelf={'center'} gap={0.4}>
                        {icon}
                        <Box>
                            <Typography color={'#3F4254'} fontSize={17} fontWeight={600}>
                                {heading || ''}
                            </Typography>
                        </Box>
                    </Box>
                }
            />
            <Divider />
            <Chart
                width={chartOptions.chart.width}
                height={chartOptions.chart.height}
                options={chartOptions}
                series={inputData.series}
                type="area"
            />
        </Box>
    )
}
export default Chart4
