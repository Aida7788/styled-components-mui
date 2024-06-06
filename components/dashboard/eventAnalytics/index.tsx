import { Box, Grid } from '@mui/material'
import React, { SetStateAction, useEffect, useState } from 'react'
import { headers, layoutGrid } from 'src/common/constants/eventAnalytics'
import InformationCircle from 'src/icons/InformationCircle'
import { SubHubIcon } from 'src/icons/Subhub'
import { TicketMasterIcon } from 'src/icons/Ticketmaster'
import { EventType } from 'src/types/local/customTableTypes'
import { otherPlatforms } from 'src/types/local/upSalesResp'
import CustomTable from '../generalComponents/customTable/CustomTable'
import { EventTableColumn } from '../generalComponents/customTable/EventTableColumn'
import { SpanAvailableItem } from '../generalComponents/customTable/SpanAvailableItem'
import { SpanGridItem } from '../generalComponents/customTable/SpanGridItem'
import { LoaderComponent } from '../loaderComponent/loaderComp'
import { ActionsBox } from './actionBox'

export function EventAnalyticsTable({
    filterState,
    tableEventData,
    setFilterState,
    setSelectedFiltration,
    setSelectedArtist,
    setAvatarModal,
    setOpenNoteModal,
    setOpenSaveModal,
    setSelectedMeta,
    setOpenDirectLinksModal,
    setOpenFilterModal,
    setSelectedId,
}: {
    filterState: boolean
    tableEventData: EventType[]
    setFilterState: React.Dispatch<SetStateAction<boolean>>
    setAvatarModal: React.Dispatch<SetStateAction<boolean>>
    setSelectedFiltration: React.Dispatch<SetStateAction<string>>
    setSelectedArtist: React.Dispatch<SetStateAction<EventType>>
    setOpenNoteModal: React.Dispatch<SetStateAction<boolean>>
    setOpenSaveModal: React.Dispatch<SetStateAction<boolean>>
    setSelectedId: React.Dispatch<SetStateAction<string>>
    setSelectedMeta: React.Dispatch<SetStateAction<otherPlatforms[]>>
    setOpenDirectLinksModal: React.Dispatch<SetStateAction<boolean>>
    setOpenFilterModal: React.Dispatch<SetStateAction<boolean>>
}) {
    const [isLoading, setLoading] = useState({ loading: false, id: '' })

    useEffect(() => {
        setLoading({ loading: false, id: null })
    }, [tableEventData])

    return (
        <CustomTable
            filter={true}
            layoutGrid={layoutGrid}
            headers={headers}
            filterState={filterState}
            setOpenFilter={setFilterState}
            filterIndex={[1, 7, 8]}
            setSelectedFiltration={setSelectedFiltration}
        >
            {tableEventData.map((item, index) => (
                <Grid
                    key={item._id}
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: layoutGrid,
                        py: '10px',
                        borderColor: 'grey.100',
                    }}
                    columnGap={4}
                    alignItems={'center'}
                >
                    <EventTableColumn
                        item={{
                            img: item?.images[0] as string,
                            type: item?.meta?.otherPlatforms[0]?.platform,
                            name: item?.name,
                            genre: item?.subCategory,
                            country: item?.artistsStat[0]?.meta?.origin,
                        }}
                        setSelectedArtist={setSelectedArtist}
                        id={''}
                        artist={item}
                        meta={item?.meta}
                        link={item?.meta?.otherPlatforms[0]?.url}
                        setOpenAvatar={setAvatarModal}
                        setOpenDirect={setOpenDirectLinksModal}
                        setSelectedMeta={setSelectedMeta}
                    />
                    <SpanGridItem spanLabel={item?.popularity?.toString()}></SpanGridItem>
                    <SpanGridItem date={true} inputTimeZone={item.timezone} spanLabel={item.dateTime}></SpanGridItem>
                    <SpanGridItem spanLabel={item.venueName}></SpanGridItem>
                    <SpanGridItem spanLabel={item.city}></SpanGridItem>
                    <SpanGridItem spanLabel={item.venueStateCode}></SpanGridItem>
                    <SpanGridItem spanLabel={item.meta.otherPlatforms[0]?.totalPlaces?.toString()}></SpanGridItem>
                    {isLoading.loading && isLoading.id === item._id ? (
                        <Box>
                            <LoaderComponent />
                        </Box>
                    ) : (
                        <SpanAvailableItem
                            lastFetched={item?.last_fetched_details?.current_date_time}
                            id={item._id}
                            link="/dashboard/primary-analytics"
                            leftIcon={<TicketMasterIcon />}
                            spanLabel={item.last_fetched_details?.primary_tickets_count?.toString()}
                            rightIcon={<InformationCircle />}
                        ></SpanAvailableItem>
                    )}
                    {isLoading.loading && isLoading.id === item._id ? (
                        <Box>
                            <LoaderComponent />
                        </Box>
                    ) : (
                        <SpanAvailableItem
                            lastFetched={item?.last_fetched_details?.current_date_time}
                            id={item._id}
                            link="/dashboard/secondary-analytics"
                            leftIcon={<SubHubIcon />}
                            spanLabel={item.last_fetched_details?.secondary_tickets_count?.toString()}
                            rightIcon={<InformationCircle />}
                        ></SpanAvailableItem>
                    )}
                    <SpanGridItem spanLabel={'/'}></SpanGridItem>

                    <ActionsBox
                        setLoading={setLoading}
                        setSelectedEvent={setSelectedId}
                        event_id={item?._id}
                        setOpenNoteModal={setOpenNoteModal}
                        setOpenSaveModal={setOpenSaveModal}
                        setOpenFilterModal={setOpenFilterModal}
                    />
                </Grid>
            ))}
        </CustomTable>
    )
}
