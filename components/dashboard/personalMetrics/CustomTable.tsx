import { Box, Grid } from '@mui/material'

import { TicketMasterIcon } from 'src/icons/Ticketmaster'
import InformationCircle from 'src/icons/InformationCircle'
import { SubHubIcon } from 'src/icons/Subhub'
import { SpanAvailableItem } from '../generalComponents/customTable/SpanAvailableItem'
import { EventTableColumn } from '../generalComponents/customTable/EventTableColumn'
import { SpanGridItem } from '../generalComponents/customTable/SpanGridItem'
import CustomTable from '../generalComponents/customTable/CustomTable'
import { MetricDataINT } from 'src/types/local/artistMetricResponce'
import { PFheaders, PFlayoutGrid } from 'src/common/constants/primaryFavouritesConst'

export function ListTable({ tableEventData }: { tableEventData?: MetricDataINT[] }) {
    return (
        <>
            {tableEventData && (
                <CustomTable layoutGrid={PFlayoutGrid} headers={PFheaders} filterIndex={[6, 7]}>
                    {tableEventData?.map((item, index) => (
                        <Grid
                            key={item._id}
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: PFlayoutGrid,
                                py: '10px',
                                borderColor: 'grey.100',
                            }}
                            columnGap={4}
                            alignItems={'center'}>
                            <EventTableColumn
                                item={{
                                    img: item?.eventDetails?.images[0] as string,
                                    type: item?.eventDetails?.meta?.otherPlatforms[0]?.platform,
                                    name: item?.eventDetails?.name,
                                    genre: item?.eventDetails?.subCategory,
                                    country: '',
                                }}
                                id={''}
                                artist={item?.eventDetails}
                                meta={item?.eventDetails?.meta}
                                link={item?.eventDetails?.meta?.otherPlatforms[0]?.url}
                            />

                            <SpanGridItem
                                date={true}
                                inputTimeZone={item?.eventDetails?.timezone}
                                spanLabel={item?.eventDetails?.dateTime}></SpanGridItem>
                            <SpanGridItem spanLabel={item?.eventDetails?.venueName}></SpanGridItem>
                            <SpanGridItem spanLabel={item?.eventDetails?.city}></SpanGridItem>
                            <SpanGridItem spanLabel={item?.eventDetails?.venueStateCode}></SpanGridItem>
                            <SpanGridItem
                                spanLabel={item?.eventDetails?.meta.otherPlatforms[0]?.totalPlaces?.toString()}></SpanGridItem>

                            <SpanAvailableItem
                                id={item?.eventDetails?._id}
                                link="/dashboard/primary-analytics"
                                leftIcon={<TicketMasterIcon />}
                                spanLabel={'0'}
                                rightIcon={<InformationCircle />}></SpanAvailableItem>

                            <SpanAvailableItem
                                id={item?.eventDetails?._id}
                                link="/dashboard/secondary-analytics"
                                leftIcon={<SubHubIcon />}
                                spanLabel={'0'}
                                rightIcon={<InformationCircle />}></SpanAvailableItem>

                            <SpanGridItem spanLabel={'/'}></SpanGridItem>

                            <Box>123</Box>
                        </Grid>
                    ))}
                </CustomTable>
            )}
        </>
    )
}
