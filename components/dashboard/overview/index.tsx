import { headers, layoutGrid } from '../../../common/constants/overview'

import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { Box, Button, Grid, IconButton } from '@mui/material'
import React, { SetStateAction } from 'react'
import { Datum, otherPlatforms } from 'src/types/local/upSalesResp'
import { FormatDate, checkingDate, findMaxByStartDateTime } from 'src/utils/dataFormatters'
import { extractNameFromUrl } from 'src/utils/extractNameFromUrl'
import CustomTable from '../generalComponents/customTable/CustomTable'
import { EventTableColumn } from '../generalComponents/customTable/EventTableColumn'
import { SpanGridItem } from '../generalComponents/customTable/SpanGridItem'
import { StatsGridItem } from '../generalComponents/customTable/StatsGridItems'

export function CustomTableMain({
    valueDate,
    setSelectedMeta,
    setOpenDirectLinks,
    setOpenPresale,
    setSelectedItem,
    tableSalesData,
    handleAddToBuying,
    setAvatarModal,
}: {
    handleAddToBuying: (eventId: string, note?: string) => void
    setNoteModal: React.Dispatch<SetStateAction<boolean>>
    valueDate: Date
    tableSalesData: any
    valueInput: string
    page: number
    perPage: number
    filtringState: { categories: string[] }
    setSelectedMeta: React.Dispatch<SetStateAction<otherPlatforms[]>>
    setOpenDirectLinks: React.Dispatch<SetStateAction<boolean>>
    setOpenPresale: React.Dispatch<SetStateAction<boolean>>
    setAvatarModal: React.Dispatch<SetStateAction<boolean>>
    setSelectedItem: React.Dispatch<SetStateAction<Datum>>
}) {
    const handleClick = (item) => {
        setSelectedItem(item)
        setAvatarModal(true)
    }

    return (
        tableSalesData && (
            <CustomTable layoutGrid={layoutGrid} headers={headers}>
                {tableSalesData?.data.data?.map((item, index) => (
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
                                img: item.images[0] as string,
                                type: extractNameFromUrl(
                                    item?.meta?.otherPlatforms?.find((platform) => platform.platform === 'ticketmaster')
                                        ?.url
                                ),
                                name: item.name,
                                genre: item?.subCategory,
                                country: item?.artistsStat[0]?.meta?.origin,
                            }}
                            setSelectedArtist={setSelectedItem}
                            setOpenAvatar={setAvatarModal}
                            meta={item.meta}
                            artist={item}
                            setSelectedMeta={setSelectedMeta}
                            link={
                                item?.meta?.otherPlatforms?.find((platform) => platform.platform === 'ticketmaster')
                                    ?.url
                            }
                            id={item._id}
                            setOpenDirect={setOpenDirectLinks}
                        />
                        <SpanGridItem spanLabel={item?.popularity?.toString()}></SpanGridItem>
                        <SpanGridItem
                            date={true}
                            inputTimeZone={item?.timezone}
                            spanLabel={item?.dateTime}
                        ></SpanGridItem>
                        <SpanGridItem spanLabel={item?.venueName}></SpanGridItem>
                        <SpanGridItem spanLabel={item?.city}></SpanGridItem>
                        <SpanGridItem spanLabel={item.venueStateCode}></SpanGridItem>
                        <SpanGridItem spanLabel={item.meta.otherPlatforms[0]?.totalPlaces?.toString()}></SpanGridItem>
                        {item?.presales ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '11px',
                                }}
                            >
                                <Button
                                    sx={{
                                        fontSize: '8px',
                                        fontWeight: '600',
                                        color: 'text.contrast',
                                        backgroundColor: 'background.default',
                                    }}
                                    endIcon={<KeyboardArrowDownIcon />}
                                    onClick={() => {
                                        setOpenPresale(true)
                                        setSelectedItem(item)
                                    }}
                                >
                                    {FormatDate(findMaxByStartDateTime(item), item?.timezone)}
                                </Button>
                                {checkingDate(findMaxByStartDateTime(item), item?.saleStartDate, valueDate) && (
                                    <Box
                                        sx={{
                                            bgcolor: 'action.active',
                                            color: 'text.default',
                                            width: '50%',
                                            textAlign: 'center',
                                            borderRadius: '10px',
                                            padding: '4px 4px',
                                            fontSize: '14px',
                                        }}
                                    >
                                        First
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <Box>None</Box>
                        )}

                        <SpanGridItem date={true} spanLabel={item.saleStartDate}></SpanGridItem>
                        <StatsGridItem countRankDate={item.artistsStat} />
                        <SpanGridItem
                            center
                            spanLabel={item.ticketLimit.toString()}
                            secondSpanLabel={`$${item?.priceRange[0]?.min} - $${item.priceRange[0]?.max}`}
                        ></SpanGridItem>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '5px',
                            }}
                        >
                            <IconButton
                                onClick={() => handleAddToBuying(item._id)}
                                size="small"
                                sx={{ borderRadius: '6px', bgcolor: 'grey.700' }}
                            >
                                <AddIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                            <IconButton
                                size="small"
                                sx={{ borderRadius: '6px', bgcolor: 'grey.700' }}
                                onClick={() => handleClick(item)}
                            >
                                <ModeEditOutlineOutlinedIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                        </Box>
                    </Grid>
                ))}
            </CustomTable>
        )
    )
}
