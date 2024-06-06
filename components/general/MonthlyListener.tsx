import { Box, Typography } from '@mui/material'
import { ComponentType, createElement, useEffect } from 'react'
import Flag from 'react-world-flags'
import StyledPaginationAnalytics from 'src/components/dashboard/analytics/StyledPaginationAnalytics'
import { formatNumber } from 'src/components/dashboard/generalComponents/customTable/StatsItem'
import { useCustomPagination } from 'src/hooks/usePagination'

interface Props {
    tableData?: any[]
    icon?: ComponentType<any>
    heading?: string
}

const MonthlyListener = ({ tableData, icon, heading }: Props) => {
    const { page, perPage, handleChangePage, handleChangePerPage, totalPages, setAllEntries } = useCustomPagination()

    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedData = tableData?.slice(startIndex, endIndex)

    useEffect(() => {
        setAllEntries(tableData?.length || 0)
    }, [setAllEntries, tableData])

    return (
        <Box
            sx={{
                boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                width: '96%',
                borderRadius: '6px',
                p: '1rem',
                backgroundColor: '#FFFFFF',
                mx: 'auto',
            }}
        >
            <Box display={'flex'} alignContent={'center'} alignItems={'center'} alignSelf={'center'} gap={1} m={2}>
                {icon && createElement(icon)}
                <Typography color="#3F4254" fontSize={20} fontWeight={600}>
                    {heading}
                </Typography>
            </Box>
            <Box border={'1px solid #E0E0E0'} my={1} />
            {paginatedData?.map((data, i) => (
                <Box
                    key={i}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        my: 1,
                        mx: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}
                    >
                        <Typography fontSize={18} fontWeight={400} width={'24px'}>
                            {(page - 1) * perPage + i + 1}.
                        </Typography>
                        <Flag width={26} code={data.countryCode} />
                        <Typography fontSize={17} fontWeight={400}>
                            {data.cityName ? data.cityName : data.countryName}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}
                    >
                        <Typography fontSize={17} fontWeight={400} width={'40px'} textAlign={'left'}>
                            {formatNumber(data?.value ? Number(data?.value) : 0)}
                        </Typography>
                    </Box>
                </Box>
            ))}
            <StyledPaginationAnalytics
                count={totalPages}
                setPage={handleChangePage}
                page={page}
                perPage={perPage}
                setPerPage={handleChangePerPage}
                onlyPagination={true}
            />
        </Box>
    )
}

export default MonthlyListener
