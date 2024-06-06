import CustomTable from 'src/components/dashboard/generalComponents/customTable/CustomTable'
import { EventTableColumn } from 'src/components/dashboard/generalComponents/customTable/EventTableColumn'
import { Box, Grid } from '@mui/material'
import { SpanGridItem } from 'src/components/dashboard/generalComponents/customTable/SpanGridItem'
import { SpanAvailableItem } from 'src/components/dashboard/generalComponents/customTable/SpanAvailableItem'
import { TicketMasterIcon } from 'src/icons/Ticketmaster'
import InformationCircle from 'src/icons/InformationCircle'
import { SubHubIcon } from 'src/icons/Subhub'

import { ActionsBox } from 'src/components/dashboard/eventAnalytics/actionBox'

import { LoaderComponent } from 'src/components/dashboard/loaderComponent/loaderComp'
import { EventType } from 'src/types/local/customTableTypes'
import React, { SetStateAction } from 'react'
import { otherPlatforms } from 'src/types/local/upSalesResp'
import { formatDate } from 'src/hooks/useAnalytics'

export function PrimarySellouts({
    headers,
    layoutGrid,
    tableEventData,
    sliderAvailable,
    sliderValue,
    setSliderAvailable,
    setSliderValue,
    changeModal,
    setSelectedArtist,
    fetchPrimary,
    fetchSecondary,
    setSelectedMeta,
    isLoadingLocal,
    setLoadinLocal,
    setSelectedId,
}: {
    headers: string[]
    layoutGrid: string
    tableEventData: EventType[]
    sliderValue: [number, number]
    setSliderValue: React.Dispatch<SetStateAction<[number, number]>>
    sliderAvailable: boolean
    setSliderAvailable: React.Dispatch<SetStateAction<boolean>>
    changeModal: (val: string) => void
    setSelectedArtist: React.Dispatch<SetStateAction<EventType>>
    fetchPrimary: (eventId: string) => Promise<void>
    fetchSecondary: (eventId: string) => void
    setSelectedMeta: React.Dispatch<SetStateAction<otherPlatforms[]>>
    isLoadingLocal: any
    setLoadinLocal: React.Dispatch<SetStateAction<{ loading: boolean; id: string }>>
    setSelectedId: React.Dispatch<SetStateAction<string>>
}) {
    return (
        <CustomTable layoutGrid={layoutGrid} headers={headers} filterIndex={[8, 9]}>
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
                    <SpanGridItem
                        center
                        spanLabel={formatDate(item.last_fetched_at).slice(0, -13).split('-').reverse().join('/')}
                    />
                    <EventTableColumn
                        item={{
                            img: item?.images[0] as string,
                            type: item?.meta?.otherPlatforms[0]?.platform,
                            name: item?.name,
                            genre: item?.subCategory,
                            country: item?.artistsStat[0]?.meta?.origin,
                        }}
                        setSelectedArtist={setSelectedArtist}
                        artist={item}
                        meta={item?.meta}
                        link={item?.meta?.otherPlatforms[0]?.url}
                        setOpenAvatar={() => {
                            setSelectedId(item._id)
                            changeModal('avatarModal')
                        }}
                        setOpenDirect={() => changeModal('directModal')}
                        setSelectedMeta={setSelectedMeta}
                    />
                    <SpanGridItem spanLabel={item?.popularity?.toString()}></SpanGridItem>
                    <SpanGridItem date={true} inputTimeZone={item.timezone} spanLabel={item.dateTime}></SpanGridItem>
                    <SpanGridItem spanLabel={item.venueName}></SpanGridItem>
                    <SpanGridItem spanLabel={item.city}></SpanGridItem>
                    <SpanGridItem spanLabel={item.venueStateCode}></SpanGridItem>
                    <SpanGridItem spanLabel={item.meta.otherPlatforms[0]?.totalPlaces?.toString()}></SpanGridItem>
                    {isLoadingLocal.loading && isLoadingLocal.id === item._id ? (
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
                    {isLoadingLocal.loading && isLoadingLocal.id === item._id ? (
                        <Box>
                            <LoaderComponent />
                        </Box>
                    ) : (
                        <SpanAvailableItem
                            lastFetched={item?.last_fetched_details?.current_date_time}
                            id={item._id}
                            link="/dashboard/secondary-analytics"
                            leftIcon={<SubHubIcon />}
                            spanLabel={'0'}
                            rightIcon={<InformationCircle />}
                        ></SpanAvailableItem>
                    )}
                    <SpanGridItem spanLabel={'/'}></SpanGridItem>

                    <ActionsBox
                        setLoading={setLoadinLocal}
                        setSelectedEvent={setSelectedId}
                        event_id={item?._id}
                        setOpenNoteModal={() => changeModal('noteModal')}
                        setOpenSaveModal={() => changeModal('saveModal')}
                        setOpenFilterModal={() => changeModal('mainModal')}
                    />
                    <Box></Box>
                </Grid>
            ))}
        </CustomTable>
    )
}
