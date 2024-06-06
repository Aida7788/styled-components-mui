import { TextField } from '@material-ui/core'
import { Box, Card, Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import { ClearIcon } from '@mui/x-date-pickers'
import { useEffect, useState } from 'react'
import StyledPaginationAnalytics from 'src/components/dashboard/analytics/StyledPaginationAnalytics'
import { useCustomPagination } from 'src/hooks/usePagination'
import { PaginateFunction } from 'src/utils/autoPagination'
import { SpanGridItem } from '../generalComponents/customTable/SpanGridItem'
import CustomTable from '../moversTable/CustomTable'

export default function SecondaryAllSales({
    secondarySoldInformation,
    setAllSalesSection,
    setAllSalesRow,
    setAllSalesQty,
    setAllSalesSoldPrice,
}: {
    secondarySoldInformation: any[]
    setAllSalesSection: any
    setAllSalesQty: any
    setAllSalesSoldPrice: any
    setAllSalesRow: any
}) {
    const [searchValues, setSearchValues] = useState<{ [key: string]: string }>({
        'Sold Date': '',
        Section: '',
        Row: '',
        Seat: '',
        'Sold Price': '',
        Quantity: '',
    })
    const [searchFilters, setSearchFilters] = useState<boolean>(false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sortBy, setSortBy] = useState<number>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>()
    const [paginatedArray, setPaginatedArray] = useState<any[]>([])
    const { page, perPage, handleChangePage, handleChangePerPage, totalPages, setAllEntries } = useCustomPagination()

    // Function to filter data based on search criteria
    const filterData = (data: any[], filters: { [key: string]: string }) => {
        return data.filter((item) => {
            for (const key in filters) {
                if (key === 'Sold Date') {
                    if (filters[key] && item.soldTime) {
                        const filterDate = new Date(filters[key]).toISOString().substring(0, 10)
                        const itemDate = new Date(item.soldTime).toISOString().substring(0, 10)
                        if (filterDate !== itemDate) {
                            return false
                        }
                    }
                } else if (filters[key] && item[key]) {
                    if (key === 'Section' || key === 'Row') {
                        if (item[key].toLowerCase() !== filters[key].toLowerCase()) {
                            return false
                        }
                    } else {
                        // Exact match for Quantity and Sold Price
                        if (item[key] !== filters[key]) {
                            return false
                        }
                    }
                }
            }
            return true
        })
    }

    // Handle search based on input key and value
    const handleSearch = (key: string, value: string) => {
        setSearchValues((prev) => ({
            ...prev,
            [key]: value,
        }))

        // Update the respective state based on the input key
        if (key === 'Section')
            setTimeout(() => {
                setAllSalesSection(value)
            }, 800)
        else if (key === 'Row')
            setTimeout(() => {
                setAllSalesRow(value)
            }, 800)
        else if (key === 'Quantity')
            setTimeout(() => {
                setAllSalesQty(value)
            }, 800)
        else if (key === 'Sold Price')
            setTimeout(() => {
                setAllSalesSoldPrice(value)
            }, 800)

        handleChangePage(1) // Reset pagination to the first page after search
    }

    useEffect(() => {
        if (secondarySoldInformation?.length > 0) {
            setAllEntries(secondarySoldInformation.length)
            const filteredData = filterData(secondarySoldInformation, searchValues)
            setPaginatedArray(PaginateFunction(filteredData, perPage))
        } else {
            setAllEntries(0)
            setPaginatedArray([])
        }
    }, [secondarySoldInformation, searchValues, perPage, setAllEntries])

    useEffect(() => {
        if (secondarySoldInformation) {
            handleSort(0)
            setSortOrder('asc')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondarySoldInformation])

    // Function to handle sorting
    const handleSort = (headerIndex: number) => {
        setSortBy(headerIndex)
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'))

        if (!secondarySoldInformation) return

        const sortedData = [...secondarySoldInformation].sort((a, b) => {
            if (headerIndex === 0) {
                const dateA = new Date(a.soldTime).getTime()
                const dateB = new Date(b.soldTime).getTime()
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
            } else {
                return sortOrder === 'asc' ? a.section.localeCompare(b.section) : b.section.localeCompare(a.section)
            }
        })

        const filteredData = filterData(sortedData, searchValues)
        setPaginatedArray(PaginateFunction(filteredData, perPage))
    }

    const formatSoldTime = (soldTime: string) => {
        const date = new Date(soldTime)
        const formattedDate = `${date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        })}`
        return formattedDate
    }

    return (
        <Card sx={{ padding: '28px 14px 6px 14px' }}>
            <Box
                sx={{
                    backgroundColor: 'background.white',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    minHeight: '50px',
                    paddingY: '20px',
                }}
            >
                <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>All Sales</Typography>
            </Box>
            <CustomTable
                center
                headers={[
                    { text: 'Sold Date', isSwitchIcon: true },
                    { text: 'Section' },
                    { text: 'Row' },
                    { text: 'Seat' },
                    { text: 'Sold Price' },
                    { text: 'Quantity' },
                ]}
                isCustomChildren={true}
                dontShowPagination={true}
                pageType="secondary"
                layoutGrid={''}
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
                handleSort={handleSort}
                canFilter={true}
            >
                {/* Search inputs */}
                {searchFilters && (
                    <Box
                        sx={{
                            marginBottom: '0.5rem',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            alignContent: 'center',
                            gap: '1rem',
                        }}
                    >
                        {Object.keys(searchValues).map((key) => (
                            <div
                                key={key}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    flexWrap: 'nowrap',
                                }}
                            >
                                {key === 'Sold Date' ? (
                                    <TextField
                                        type="date"
                                        value={searchValues[key]}
                                        onChange={(event) => handleSearch(key, event.target.value)}
                                        sx={{
                                            width: '100%',
                                            height: '30px',
                                            alignSelf: 'center',
                                            border: '1px solid #d0d5dd',
                                            borderRadius: '6px',
                                            cursor: 'text',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}
                                        InputProps={{
                                            classes: {
                                                input: 'custom-date-picker',
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {searchValues[key] && (
                                                        <IconButton
                                                            edge="end"
                                                            onClick={() => handleSearch(key, '')}
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
                                ) : (
                                    <input
                                        key={key}
                                        value={searchValues[key]}
                                        onChange={(e) => handleSearch(key, e.target.value)}
                                        placeholder={'Search ' + key}
                                        style={{
                                            width: '100%',
                                            height: '30px',
                                            alignSelf: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            border: '1px solid #d0d5dd',
                                            borderRadius: '6px',
                                            cursor: 'text',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                        }}
                                    />
                                )}
                            </div>
                        ))}
                    </Box>
                )}
                {paginatedArray?.length > 0 ? (
                    paginatedArray[page - 1]?.map((item, index) => (
                        <Grid
                            key={index}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                borderColor: 'grey.100',
                                borderBottom: '2px solid #edf0ea',
                                py: '5px',
                                '&:hover': {
                                    transition: 'all 0.2s ease-in-out',
                                    backgroundColor: '#E6E6E6',
                                },
                            }}
                            columnGap={4}
                            alignItems={'center'}
                        >
                            <SpanGridItem center spanLabel={formatSoldTime(item?.soldTime)} />
                            <SpanGridItem center spanLabel={item?.section} />
                            <SpanGridItem center spanLabel={item?.row} />
                            <SpanGridItem
                                center
                                spanLabel={
                                    item.seatSoldFrom === item.seatSoldTo
                                        ? item.seatSoldTo
                                        : `${item?.seatSoldFrom} - ${item?.seatSoldTo}`
                                }
                            />
                            <SpanGridItem center spanLabel={`$${item?.rawPrice}`} />
                            <SpanGridItem center spanLabel={item?.soldQty === 0 ? '' : item?.soldQty} />
                        </Grid>
                    ))
                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        No results found
                    </Box>
                )}
            </CustomTable>
            <StyledPaginationAnalytics
                count={totalPages}
                setPage={handleChangePage}
                page={page}
                perPage={perPage}
                setPerPage={handleChangePerPage}
            />
        </Card>
    )
}
