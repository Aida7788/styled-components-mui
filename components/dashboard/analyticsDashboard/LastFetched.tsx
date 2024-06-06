/* eslint-disable @typescript-eslint/no-unused-vars */
import { Backdrop, Box, Button, Card, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { GET_HISTORICAL_PRICES_QUERY_KEY } from 'src/common/constants/queryKeys'
import StyledPaginationAnalytics from 'src/components/dashboard/analytics/StyledPaginationAnalytics'
import useAnalytics from 'src/hooks/useAnalytics'
import { useCustomPagination } from 'src/hooks/usePagination'
import { AnalyticsAPIs } from 'src/services/analyticsAPI'
import { PaginateFunction } from 'src/utils/autoPagination'
import { FrontEndError } from 'src/utils/error'
import { SpanGridItem } from '../generalComponents/customTable/SpanGridItem'
import { LoaderComponent } from '../loaderComponent/loaderComp'
import CustomTable from '../moversTable/CustomTable'
import { LastFetchedModal } from './modals/LastFetchedModal'

export default function LastFetchedTable({
    pageType,
    eventId,
    isAXS,
}: {
    pageType: string
    eventId: string
    isAXS?: boolean
}) {
    const [sortBy, setSortBy] = useState<number | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [paginatedArray, setPaginatedArray] = useState<any[]>([])
    const [details, setDetails] = useState()
    const { page, perPage, handleChangePage, handleChangePerPage, totalPages, setAllEntries } = useCustomPagination()
    const { isModalOpen, handleChangeModal, changeModal } = useAnalytics()
    const handleSort = (headerIndex: number) => {
        setSortBy(headerIndex)
        setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'))

        if (!historicalData?.data?.data) {
            return
        }

        switch (headerIndex) {
            case 2:
                historicalData?.data?.data.sort((a, b) =>
                    sortOrder === 'asc'
                        ? (a.min_price || 0) - (b.min_price || 0)
                        : (b.min_price || 0) - (a.min_price || 0)
                )
                break
            case 3:
                historicalData?.data?.data.sort((a, b) =>
                    sortOrder === 'asc'
                        ? (a.max_price || 0) - (b.max_price || 0)
                        : (b.max_price || 0) - (a.max_price || 0)
                )
                break
            default:
                historicalData?.data?.data.sort(
                    (a, b) => new Date(b.timestamp_utc).getTime() - new Date(a.timestamp_utc).getTime()
                )
                break
        }
    }

    const { data: historicalData } = useQuery({
        queryKey: [GET_HISTORICAL_PRICES_QUERY_KEY, eventId, perPage, page],
        queryFn: () =>
            AnalyticsAPIs.getHistoricalPrices({
                eventId,
                perPage,
                page,
                type: pageType,
            }),
    })
    const handleFetchModalDatas = async (id: string) => {
        try {
            let result = await AnalyticsAPIs.getSectionDetails({ sectionId: id })
            if (result) {
                setDetails(result?.data?.data)
            }
        } catch (err) {
            FrontEndError(err)
        } finally {
            changeModal('LastFetchedModal')
        }
    }

    useEffect(() => {
        if (historicalData?.data) {
            setAllEntries(historicalData.data.pagination.total_events)
        }
    }, [historicalData, setAllEntries])

    useEffect(() => {
        if (historicalData?.data) {
            setPaginatedArray(PaginateFunction(historicalData?.data?.data, perPage))
        }
    }, [historicalData?.data, perPage])

    return (
        <>
            <Card sx={{ padding: '28px 14px 6px 14px' }}>
                <Typography sx={{ textAlign: 'center', fontSize: '22px', fontWeight: '600', marginBottom: '20px' }}>
                    Last Fetched
                </Typography>
                {pageType === 'secondary' ? (
                    // Secondary Table
                    <CustomTable
                        center
                        headers={[
                            { text: 'Secondary Listings' },
                            { text: 'Secondary Tickets' },
                            { text: 'Min Price', isSwitchIcon: true },
                            { text: 'Max Price', isSwitchIcon: true },
                            { text: 'Timestamp (UTC)' },
                            { text: 'Last fetched by' },
                        ]}
                        isCustomChildren={true}
                        layoutGrid={''}
                        dontShowPagination={true}
                        handleSort={handleSort}
                        pageType="secondary"
                        canFilter={false}
                    >
                        <>
                            {historicalData?.data ? (
                                historicalData?.data?.data.length > 0 ? (
                                    historicalData?.data?.data.map((item) => (
                                        <Grid
                                            key={item.section_info_id}
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
                                            <SpanGridItem
                                                spanLabel={item?.totalListings === 0 ? 'N/A' : item?.totalListings}
                                            />
                                            <SpanGridItem spanLabel={item?.tickets === 0 ? 'N/A' : item?.tickets} />
                                            <SpanGridItem
                                                spanLabel={
                                                    item?.min_price !== null ? '$' + item?.min_price?.toString() : '$0'
                                                }
                                            />
                                            <SpanGridItem
                                                spanLabel={
                                                    item?.max_price !== null ? '$' + item?.max_price?.toString() : '$0'
                                                }
                                            />
                                            <SpanGridItem date={true} spanLabel={item?.timestamp_utc?.toString()} />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                }}
                                            >
                                                {item.scraped_by === 'User' ? (
                                                    <Button
                                                        onClick={() => handleFetchModalDatas(item?.section_info_id)}
                                                        sx={{
                                                            borderRadius: '10px',
                                                            border: '1px solid #f1c397',
                                                            fontWeight: '600',
                                                            py: '4px',
                                                            px: '2rem',
                                                            backgroundColor: '#f7ddc5',
                                                            color: '#e39247',
                                                            cursor: 'pointer',
                                                            lineHeight: 'unset',
                                                        }}
                                                    >
                                                        User
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleFetchModalDatas(item?.section_info_id)}
                                                        sx={{
                                                            borderRadius: '10px',
                                                            border: '1px solid #63a88b',
                                                            fontWeight: '600',
                                                            py: '4px',
                                                            px: '1.5rem',
                                                            backgroundColor: '#f0f7f4',
                                                            color: '#0f754a',
                                                            cursor: 'pointer',
                                                            lineHeight: 'unset',
                                                        }}
                                                    >
                                                        System
                                                    </Button>
                                                )}
                                            </Box>
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
                                )
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mx: 'auto', height: '540px' }}>
                                    <LoaderComponent />
                                </Box>
                            )}
                        </>
                    </CustomTable>
                ) : (
                    // Primary Table
                    <CustomTable
                        center
                        headers={[
                            { text: 'Primary Tickets' },
                            { text: 'Primary Resale Tickets' },
                            { text: 'Min Price', isSwitchIcon: true },
                            { text: 'Max Price', isSwitchIcon: true },
                            { text: 'Timestamp (UTC)' },
                            { text: 'Last fetched by' },
                        ]}
                        isCustomChildren={true}
                        layoutGrid={''}
                        dontShowPagination={true}
                        handleSort={handleSort}
                        pageType="primary"
                        canFilter={false}
                    >
                        <>
                            {historicalData?.data ? (
                                historicalData?.data?.data?.length > 0 ? (
                                    historicalData?.data?.data?.map((item) => (
                                        <Grid
                                            key={item.section_info_id}
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
                                            <SpanGridItem spanLabel={item?.tickets === 0 ? 'N/A' : item?.tickets} />
                                            <SpanGridItem
                                                spanLabel={item?.resale_tickets === 0 ? 'N/A' : item?.resale_tickets}
                                            />
                                            <SpanGridItem
                                                spanLabel={
                                                    item?.min_price !== null && !isAXS
                                                        ? '$' + item?.min_price?.toString()
                                                        : 'N/A'
                                                }
                                            />
                                            <SpanGridItem
                                                spanLabel={
                                                    item?.max_price !== null && !isAXS
                                                        ? '$' + item?.max_price?.toString()
                                                        : 'N/A'
                                                }
                                            />
                                            <SpanGridItem date={true} spanLabel={item?.timestamp_utc?.toString()} />
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: '100%',
                                                }}
                                            >
                                                {item.scraped_by === 'User' ? (
                                                    <Button
                                                        onClick={() => handleFetchModalDatas(item?.section_info_id)}
                                                        sx={{
                                                            borderRadius: '10px',
                                                            border: '1px solid #f1c397',
                                                            fontWeight: '600',
                                                            py: '4px',
                                                            px: '2rem',
                                                            backgroundColor: '#f7ddc5',
                                                            color: '#e39247',
                                                            cursor: 'pointer',
                                                            lineHeight: 'unset',
                                                        }}
                                                    >
                                                        User
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleFetchModalDatas(item?.section_info_id)}
                                                        sx={{
                                                            borderRadius: '10px',
                                                            border: '1px solid #63a88b',
                                                            fontWeight: '600',
                                                            py: '4px',
                                                            px: '1.5rem',
                                                            backgroundColor: '#f0f7f4',
                                                            color: '#0f754a',
                                                            cursor: 'pointer',
                                                            lineHeight: 'unset',
                                                        }}
                                                    >
                                                        System
                                                    </Button>
                                                )}
                                            </Box>
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
                                )
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mx: 'auto', height: '540px' }}>
                                    <LoaderComponent />
                                </Box>
                            )}
                        </>
                    </CustomTable>
                )}
                <StyledPaginationAnalytics
                    count={totalPages}
                    setPage={handleChangePage}
                    page={page}
                    perPage={perPage}
                    setPerPage={handleChangePerPage}
                />
            </Card>
            {details && (
                <Backdrop
                    style={{ zIndex: '6' }}
                    onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'LastFetchedModal')}
                    open={isModalOpen('LastFetchedModal')}
                >
                    <LastFetchedModal
                        data={details}
                        setOpen={() => changeModal('LastFetchedModal')}
                        pageType={pageType}
                        isAXS={isAXS}
                    />
                </Backdrop>
            )}
        </>
    )
}
