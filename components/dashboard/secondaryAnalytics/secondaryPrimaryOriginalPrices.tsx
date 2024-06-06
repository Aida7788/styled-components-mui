import { Autocomplete, Box, Card, Grid, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import StyledPaginationAnalytics from 'src/components/dashboard/analytics/StyledPaginationAnalytics'
import { useCustomPagination } from 'src/hooks/usePagination'
import { PaginateFunction } from 'src/utils/autoPagination'
import { SpanGridItem } from '../generalComponents/customTable/SpanGridItem'
import CustomTable from '../moversTable/CustomTable'

export default function SecondaryPrimaryOriginalPrices({
    secondaryAnalyticsItem,
    maps,
    venueName,
}: {
    secondaryAnalyticsItem: any
    maps: any
    venueName: string
}) {
    const { page, perPage, handleChangePage, handleChangePerPage, totalPages, setAllEntries } = useCustomPagination()
    const [searchValue, setSearchValue] = useState<string[]>([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [sortBy, setSortBy] = useState<number>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [paginatedArray, setPaginatedArray] = useState<any[]>([])
    const [sections, setSections] = useState<string[]>([])
    const [placeholder, setPlaceholder] = useState('Filter by Section (ex: 101, 102, 103)')
    // To use the same sort order on another component, you need to write a unique handleSort function for component.
    const handleSort = (headerIndex: number) => {
        setSortBy(headerIndex)
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'))
        if (!secondaryAnalyticsItem) {
            return
        }

        const data = [...paginatedArray[page - 1]]
        const sortedData = [...data].sort((a, b) => {
            switch (headerIndex) {
                case 1:
                    return sortOrder === 'asc'
                        ? a.prim_min_price - b.prim_min_price
                        : b.prim_min_price - a.prim_min_price
                case 2:
                    return sortOrder === 'asc' ? a.sec_min_price - b.sec_min_price : b.sec_min_price - a.sec_min_price
                default:
                    return sortOrder === 'asc' ? a.section.localeCompare(b.section) : b.section.localeCompare(a.section)
            }
        })
        const updatedPaginatedArray = [...paginatedArray]
        updatedPaginatedArray[page - 1] = sortedData
        setPaginatedArray(updatedPaginatedArray)
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
        if (!secondaryAnalyticsItem) {
            return
        }

        const filteredData = secondaryAnalyticsItem.filter((item: any) => {
            return searchValue.some((value) => item.section.toLowerCase().includes(value.toLowerCase()))
        })

        if (filteredData.length === 0) {
            setPaginatedArray(PaginateFunction(secondaryAnalyticsItem, perPage))
            setAllEntries(secondaryAnalyticsItem.length)
        } else {
            setPaginatedArray(PaginateFunction(filteredData, perPage))
            setAllEntries(filteredData.length)
            handleChangePage(1)
        }
    }, [secondaryAnalyticsItem, perPage, searchValue, setAllEntries, handleChangePage])

    const handleChangeAutoComplete = (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
        setSearchValue(values)
    }

    useEffect(() => {
        if (secondaryAnalyticsItem) {
            setPaginatedArray(PaginateFunction(secondaryAnalyticsItem, perPage))
            setSections(secondaryAnalyticsItem.map((item: any) => item.section) || [])
        }
    }, [secondaryAnalyticsItem, perPage])

    useEffect(() => {
        if (searchValue.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }, [placeholder, searchValue.length])

    useEffect(() => {
        if (secondaryAnalyticsItem) {
            const sortedData = secondaryAnalyticsItem.sort((a, b) => {
                switch (sortBy) {
                    case 1:
                        return sortOrder === 'asc'
                            ? a.prim_min_price - b.prim_min_price
                            : b.prim_min_price - a.prim_min_price
                    case 2:
                        return sortOrder === 'asc'
                            ? a.sec_min_price - b.sec_min_price
                            : b.sec_min_price - a.sec_min_price
                    default:
                        return sortOrder === 'asc'
                            ? a.section.localeCompare(b.section)
                            : b.section.localeCompare(a.section)
                }
            })
            setPaginatedArray(PaginateFunction(sortedData, perPage))
            setSections(sortedData.map((item: any) => item.section))
        }
    }, [secondaryAnalyticsItem, perPage, sortOrder, sortBy])

    const [mapSrc, setMapSrc] = useState(null)

    useEffect(() => {
        const checkMapSrc = async () => {
            for (const otherPlatform of maps) {
                const fileUrl = otherPlatform.staticMapImage

                if (!fileUrl) {
                    continue
                }

                const exists = await new Promise((res) => {
                    const http = new XMLHttpRequest()
                    http.open('HEAD', fileUrl, true)
                    http.send()
                    http.onload = () => {
                        res(http.status !== 404 && http.status !== 204)
                    }
                    http.onerror = () => {
                        res(false)
                    }
                })

                if (exists) {
                    setMapSrc(fileUrl)
                    break
                }
            }
        }

        checkMapSrc()
    }, [maps])

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
                <Typography sx={{ fontSize: '22px', fontWeight: '600' }}>Price Tracker</Typography>
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
                    <img src={mapSrc} style={{ width: '500px' }} alt={venueName} />
                </Box>
                <CustomTable
                    center
                    headers={[
                        { text: 'Section' },
                        { text: 'Original Primary Enter Price', isSwitchIcon: true },
                        { text: 'Current Secondary Price', isSwitchIcon: true },
                    ]}
                    isCustomChildren={true}
                    layoutGrid={'1fr 1fr 1fr'}
                    handleSort={handleSort}
                    dontShowPagination={true}
                    canFilter={false}
                    pageType="secondary"
                >
                    {paginatedArray.length > 0 ? (
                        paginatedArray[page - 1]?.map((item: any, index: number) => {
                            return (
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
                                    <SpanGridItem center spanLabel={`$${item?.prim_min_price}`} />
                                    <SpanGridItem
                                        center
                                        spanLabel={`$${item?.sec_min_price}`}
                                        diffPercentage={`${item?.min_price_diff}`}
                                    />
                                </Grid>
                            )
                        })
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
