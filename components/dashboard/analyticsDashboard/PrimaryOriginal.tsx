import { Autocomplete, Box, Card, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import StyledPaginationAnalytics from 'src/components/dashboard/analytics/StyledPaginationAnalytics'
import { useCustomPagination } from 'src/hooks/usePagination'
import { PaginateFunction } from 'src/utils/autoPagination'
import { SpanGridItem } from '../generalComponents/customTable/SpanGridItem'
import CustomTable from '../moversTable/CustomTable'

export default function PrimaryOriginalPrices({
    primaryAnalyticsItem,
    map,
    venueName,
}: {
    primaryAnalyticsItem: any
    map: string
    venueName: string
}) {
    const { page, perPage, handleChangePage, handleChangePerPage, totalPages, setAllEntries } = useCustomPagination()
    const [searchValue, setSearchValue] = useState<string[]>([])
    const [paginatedArray, setPaginatedArray] = useState<any[]>([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sortBy, setSortBy] = useState<number>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [sections, setSections] = useState<string[]>([])
    const [placeholder, setPlaceholder] = useState('Filter by Section (ex: 101, 102, 103)')
    // To use the same sort order on another component, you need to write a unique handleSort function for component.
    const handleSort = (headerIndex: number) => {
        setSortBy(headerIndex)
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'))

        if (!primaryAnalyticsItem) {
            return
        }

        const data = [...primaryAnalyticsItem]
        const sortedData = [...data].sort((a, b) => {
            switch (headerIndex) {
                case 1:
                    return sortOrder === 'asc' ? a.maxPrice - b.maxPrice : b.maxPrice - a.maxPrice
                case 2:
                    return sortOrder === 'asc' ? a.minPrice - b.minPrice : b.minPrice - a.minPrice
                default:
                    return sortOrder === 'asc' ? a.section.localeCompare(b.section) : b.section.localeCompare(a.section)
            }
        })
        setPaginatedArray(PaginateFunction(sortedData, perPage))
    }

    const handleFocus = () => {
        if (searchValue.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }

    const handleBlur = () => {
        if (searchValue.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }

    useEffect(() => {
        if (!primaryAnalyticsItem) {
            return
        }

        const filteredData = primaryAnalyticsItem.filter((item: any) => {
            return searchValue.some((value) => item.section.toLowerCase().includes(value.toLowerCase()))
        })

        if (filteredData.length === 0) {
            setPaginatedArray(PaginateFunction(primaryAnalyticsItem, perPage))
            setAllEntries(primaryAnalyticsItem.length)
        } else {
            setPaginatedArray(PaginateFunction(filteredData, perPage))
            setAllEntries(filteredData.length)
            handleChangePage(1)
        }
    }, [primaryAnalyticsItem, perPage, searchValue, setAllEntries, handleChangePage])

    const handleChangeAutoComplete = (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
        setSearchValue(values)
    }

    useEffect(() => {
        if (primaryAnalyticsItem) {
            setPaginatedArray(PaginateFunction(primaryAnalyticsItem, perPage))
            setSections(primaryAnalyticsItem?.map((item: any) => item.section) || [])
        }
    }, [primaryAnalyticsItem, perPage])

    useEffect(() => {
        if (primaryAnalyticsItem) {
            const sortedData = primaryAnalyticsItem.sort((a, b) => {
                switch (sortBy) {
                    case 1:
                        return sortOrder === 'asc' ? a.maxPrice - b.maxPrice : b.maxPrice - a.maxPrice
                    case 2:
                        return sortOrder === 'asc' ? a.minPrice - b.minPrice : b.minPrice - a.minPrice
                    default:
                        return sortOrder === 'asc'
                            ? a.section.localeCompare(b.section)
                            : b.section.localeCompare(a.section)
                }
            })
            setPaginatedArray(PaginateFunction(sortedData, perPage))
            setSections(sortedData.map((item: any) => item.section))
        }
    }, [primaryAnalyticsItem, perPage, sortOrder, sortBy])

    useEffect(() => {
        if (searchValue.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }, [placeholder, searchValue.length])

    return (
        <Card sx={{ padding: '28px 14px 6px 14px' }}>
            <Box
                sx={{
                    backgroundColor: 'background.white',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    minHeight: '50px',
                    paddingY: '20px',
                }}
            >
                <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Original Primary Price</Typography>
                <Box
                    sx={{
                        marginRight: '1.3rem',
                        alignSelf: 'flex-end',
                        minWidth: '321px',
                        height: '42px',
                        cursor: 'text',
                        fontSize: '16px',
                        fontWeight: '500',
                        paddingLeft: '10px',
                        '::placeholder': { color: '#9f9f9f9' },
                    }}
                >
                    <Autocomplete
                        multiple
                        options={sections}
                        value={searchValue}
                        onChange={handleChangeAutoComplete}
                        sx={{ width: '321px' }}
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
            </Box>
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Box>
                    <img src={map} style={{ width: '500px' }} alt={venueName} />
                </Box>
                <CustomTable
                    center
                    headers={[
                        { text: 'Section' },
                        { text: 'Min Price', isSwitchIcon: true },
                        { text: 'Max Price', isSwitchIcon: true },
                    ]}
                    isCustomChildren={true}
                    layoutGrid={'1fr 1fr 1fr'}
                    dontShowPagination={true}
                    handleSort={handleSort}
                    pageType="primary"
                    canFilter={false}
                >
                    {paginatedArray.length > 0 ?
                        paginatedArray[page - 1]?.map((item: any, index: number) => (
                            <Grid
                                key={index}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    alignItems: 'center',
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
                                <SpanGridItem center spanLabel={item?.section} />
                                <SpanGridItem center spanLabel={`$${item?.minPrice}`} />
                                <SpanGridItem center spanLabel={`$${item?.maxPrice}`} />
                            </Grid>
                        ))
                    : (
                        <Box
                        sx={{
                            textAlign: 'center',
                        }}
                    >
                        No results found
                    </Box>
                    )
                    }
                </CustomTable>
            </Box>
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
