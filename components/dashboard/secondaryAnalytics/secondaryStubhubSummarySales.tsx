import { Box, Card, Grid, Typography } from '@mui/material'
import { Key, useEffect } from 'react'
import StyledPaginationAnalytics from 'src/components/dashboard/analytics/StyledPaginationAnalytics'
import { useCustomPagination } from 'src/hooks/usePagination'
import { PaginateFunction } from 'src/utils/autoPagination'
import { LoaderComponent } from '../loaderComponent/loaderComp'
import CustomTable from '../moversTable/CustomTable'
import { SpanGridItem } from '../moversTable/SpanGridItem'

export default function SecondaryStubhubSummarySales({ stubhubSummarySales }) {
    const { page, perPage, handleChangePage, handleChangePerPage, totalPages, setAllEntries } = useCustomPagination()

    useEffect(() => {
        setAllEntries(stubhubSummarySales?.length || 0)
    }, [setAllEntries, stubhubSummarySales])

    // const flattenedDetails = stubhubSummarySales?.flatMap((item) => item.details)

    const paginatedArray = PaginateFunction(stubhubSummarySales, perPage)

    return (
        <Card sx={{ padding: '28px 14px 6px 14px' }}>
            <Box
                sx={{
                    backgroundColor: 'background.white',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                    minHeight: '50px',
                    paddingY: '20px',
                    paddingX: '30px',
                }}
            >
                <Typography sx={{ fontSize: '22px', fontWeight: '600', textAlign: 'center' }}>
                    Stubhub Summary Sales
                </Typography>
            </Box>
            <CustomTable
                center
                headers={[
                    { text: 'zone' },
                    { text: 'total sales' },
                    { text: 'total quantity' },
                    { text: 'average' },
                    { text: 'low' },
                    { text: 'high' },
                ]}
                layoutGrid={''}
                isCustomChildren={true}
                dontShowPagination={true}
                pageType="secondary"
                canFilter={false}
            >
                {stubhubSummarySales ? (
                    paginatedArray.length > 0 ? (
                        paginatedArray[page - 1]?.map((detail, index: Key) => {
                            // const parentItem = stubhubSummarySales?.data.find((item) => item.details.includes(detail))
                            return (
                                <Grid
                                    key={index}
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
                                        borderBottom: '2px solid #edf0ea',
                                        textAlign: 'center',
                                        alignContent: 'center',
                                        py: '5px',
                                        '&:hover': {
                                            transition: 'all 0.2s ease-in-out',
                                            backgroundColor: '#E6E6E6',
                                        },
                                    }}
                                    columnGap={4}
                                >
                                    <SpanGridItem spanLabel={detail.zone ? detail.zone : 'N/A'} />
                                    <SpanGridItem spanLabel={detail.totalSale ? detail.totalSale.toFixed(0) : 'N/A'} />
                                    <SpanGridItem spanLabel={detail.soldQty === 0 ? 'N/A' : detail.soldQty} />
                                    <SpanGridItem spanLabel={`$${detail?.avgPrice.toFixed(2)}`} />
                                    <SpanGridItem spanLabel={`$${detail?.minPrice.toFixed(2)}`} />
                                    <SpanGridItem spanLabel={`$${detail?.maxPrice.toFixed(2)}`} />
                                    {/* <SpanGridItem spanLabel={`$${parentItem?.avgPrice}`} />
                                <SpanGridItem spanLabel={`$${parentItem?.minPrice}`} />
                                <SpanGridItem spanLabel={`$${parentItem?.maxPrice}`} /> */}
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
                    )
                ) : (
                    <LoaderComponent />
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
