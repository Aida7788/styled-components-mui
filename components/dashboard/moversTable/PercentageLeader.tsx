import { Box, Grid, MenuItem, Pagination, Select, Typography } from '@mui/material'
import { ElementType, ReactNode, useEffect, useState } from 'react'
import { TableDataItem } from 'src/types/local/customTableTypes'
import EventTableColumn from './EventTableColumn'
import { SpanGridItem } from './SpanGridItem'
import PenIcon from 'src/icons/Pen'
import BookMarkIcon from 'src/icons/Bookmark'
import Refresh from 'src/icons/Refresh'
import FilterIcon from 'src/icons/Filter'
import CalendarIcon from 'src/icons/CalendaerRounded'
import CalendarModal from './CalendarModal'

export const TableData: TableDataItem[] = [
    {
        event: {
            img: 'example.jgp',
            type: 'TM',
            name: 'Travis Scot',
            genre: 'Hip-Hop & Rap',
            country: 'US',
        },
        ranking: '98',
        date: '81.26m',
        venue: '5m',
        city: '81.26m',
        state: '81.26m',
        capacity: '81.26m',
        presale_code: '81.26m',
        public_sale_date: '81.26m',
        quick_stats: { spotify: '98', youtube: '14k', instagram: '12k' },
        limit: '8',
        range: '43$ - 175$',
    },
]

export interface TableProps extends TableDataItem {
    hasInfoIcon?: boolean
}

interface CustomTableProps {
    headers: {
        text: string
        icon?: ElementType
        isSwitchIcon?: boolean
        hasFilterIcon?: boolean
        isBlack?: boolean
    }[]
    tableData: any
    actions?: ReactNode
    openModal?: (newVal: boolean) => void
    setModalData?: any
    dontShowPagination?: boolean
}

export default function PercentageLeaderTable({
    headers,
    tableData,
    openModal,
    setModalData,
    dontShowPagination,
}: CustomTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const startIndex = (currentPage - 1) * itemsPerPage + 1
    const endIndex = Math.min(startIndex + itemsPerPage - 1, tableData?.length)
    useEffect(() => {
        setCurrentPage(1)
    }, [itemsPerPage])
    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.white',
                    borderRadius: '6px',
                    mx: '10px',
                    mb: '20px',
                    zIndex: -1,
                }}
            >
                <Grid sx={{ display: 'grid', px: '10px' }}>
                    <Grid
                        sx={{
                            bgcolor: 'background.white',
                            gap: '10px',
                            mx: 'auto',
                            display: 'grid',
                            py: '5px',
                            zIndex: 1,
                        }}
                        container
                    >
                        <Grid
                            sx={{
                                bgcolor: 'grey.700',
                                borderRadius: '6px',
                                marginTop: '15px',
                                mx: 'auto',
                                display: 'grid',
                                gridTemplateColumns: `repeat(${headers?.length}, 1fr)`,
                                py: '5px',
                            }}
                            container
                            gridTemplateRows={'1fr'}
                            columnGap={4}
                            alignItems={'center'}
                            zIndex={1}
                        >
                            {headers.map((item, index) => (
                                <Grid
                                    sx={{
                                        color: item?.isBlack ? 'black' : 'grey.600',
                                        pl: index === 0 ? '12px' : index === 1 ? '48px' : '0px',
                                        pr: index === 0 ? '1px' : '0px',
                                        display: 'flex',
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        textTransform: 'uppercase',
                                        mt: item.icon && 1,
                                        zIndex: 1,
                                    }}
                                    key={index}
                                    item
                                >
                                    {item.icon && <item.icon />}
                                    {item.text}
                                    {item.isSwitchIcon && <img src="/static/Swap 2.svg" style={{ marginLeft: 8 }} />}
                                    {item.hasFilterIcon && <FilterIcon sx={{ mt: 0.4, mr: 1 }} />}
                                </Grid>
                            ))}
                        </Grid>
                        {tableData?.map((item, index) => (
                            <Grid
                                key={index}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(${headers?.length}, 1fr)`,
                                    py: '16px',
                                    borderBottom: index === tableData.length - 1 ? 0 : 1,
                                    borderColor: 'grey.100',
                                }}
                                columnGap={4}
                                alignItems={'center'}
                                onClick={
                                    openModal && setModalData
                                        ? () => {
                                              openModal(true)
                                              setModalData(item)
                                          }
                                        : null
                                }
                            >
                                <EventTableColumn
                                    name={item?.name || 'Travis Scott - Wish You Were Here Tour'}
                                    type={item?.event?.genre || TableData?.[index]?.event?.genre}
                                    image={item?.images?.[0]?.url}
                                    hasNoMargin
                                />
                                <SpanGridItem spanLabel={'98'} />
                                <SpanGridItem
                                    hasMargin
                                    spanLabel={
                                        new Date(item?.event_details?.dateTime)?.toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        }) || 'Saturday Oct 4, 2023 (7:00 PM)'
                                    }
                                />
                                <SpanGridItem hasMargin spanLabel={item?.venue?.name || 'Barclays Center'} />
                                <SpanGridItem hasMargin spanLabel={item?.venue?.cityName || 'Brooklyn'} />
                                <SpanGridItem spanLabel={item?.venue?.stateCode || 'NY'} />
                                <SpanGridItem spanLabel={'18,000'} />
                                <SpanGridItem
                                    spanLabel={'0'}
                                    hasInfoIcon
                                    path="https://s3-alpha-sig.figma.com/img/fa88/d195/d551c13746deb4d27470ccb2ff42f878?Expires=1701648000&Signature=IQaS99PG6rd0wYoDlDqm1gIHaNUbNSy1oHFe8NzjG7j~NbtJ1zk36tyEkznfoy6E1q2VQmY-AJqod16B~TQYcf~w4Cj7HaWlQOxv2sLp~tV198g-aNQYzFKdQf9VTAajpH0RZVmkPYwpXxY9PW0kFXjKxf4rd9xljRnqy6TJ8J1CbiRRldBTpF79Hx1-EOeu6-Ee2a4g6Y1EYjLqaa3hHTdfuwXjG1tiQO0jgNpACA22nkIPqxiwKyQLAqQvcz2iqk3072Ir9PeprCRgIUslqFYsx7WJ6SOwlxwnxfkyJrZpI-EAOBpAeMazyIbBnyXQVZzIqNdwffLohI-3pgor5g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                />
                                <SpanGridItem
                                    hasInfoIcon
                                    spanLabel={'2765'}
                                    path="https://s3-alpha-sig.figma.com/img/db00/070c/5c2717ffb64d8d363dcb054bcaf07caa?Expires=1701648000&Signature=AeOuHpR-zlExPM5eKjiHKbq3pz1RrUFAxSzFZqbXy~XwlhoHxIBu6NwCUjU1JD2hQhYxjnMwsUphbob705A8ENsbtmtX12xbhK4SqFw6fKD8JPtsaGJUKTOy4QyG4t1Qr64yLlRrAR2LU8RxXmeYcOQptqG7yxAJNINd7dJykAIP0qVp4UcKmHqGvhHGoUKCziRUwPOQ04-zNmkJsyCqdblp2OxUmAGBlgZ2KScZswmHAUGa16Atj2X-~31rH-mcU3asPZpYFePk8KnkCxVkTVmScBHqdE5YA8FcuGER5P3PPGu4ssvRzHmzC9ty4nXweANaTTNeOZwx7-DhE9ZBMg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                                />
                                <SpanGridItem spanLabel={'5%'} />
                                <Grid container gap={0.4}>
                                    <Grid item xs={5.6} mx="auto">
                                        <Box
                                            height={'32px'}
                                            width={'32px'}
                                            borderRadius={'6px'}
                                            bgcolor={'#F3F6F9'}
                                            m={'auto'}
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            <CalendarIcon sx={{ mt: 1, ml: 0.8, cursor: 'pointer' }} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={5.6} mx="auto">
                                        <Box
                                            height={'32px'}
                                            width={'32px'}
                                            borderRadius={'6px'}
                                            bgcolor={'#F3F6F9'}
                                            m={'auto'}
                                        >
                                            <PenIcon sx={{ mt: 1, ml: 0.8, cursor: 'pointer' }} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={5.6} mx="auto">
                                        <Box
                                            height={'32px'}
                                            width={'32px'}
                                            borderRadius={'6px'}
                                            bgcolor={'#F3F6F9'}
                                            m={'auto'}
                                        >
                                            <BookMarkIcon sx={{ mt: 1, ml: 0.8, cursor: 'pointer' }} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={5.6} mx="auto">
                                        <Box
                                            height={'32px'}
                                            width={'32px'}
                                            borderRadius={'6px'}
                                            bgcolor={'#F3F6F9'}
                                            m={'auto'}
                                        >
                                            <Refresh
                                                sx={{
                                                    mt: 0.4,
                                                    ml: 0.4,
                                                    opacity: '64%',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Box>
            {!dontShowPagination && (
                <Box
                    sx={{
                        alignSelf: 'flex-end',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '20px',
                        }}
                    >
                        <Select
                            value={itemsPerPage}
                            sx={{
                                bgcolor: 'background.white',
                                width: '70px',
                                height: '40px',
                            }}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                        </Select>
                        <Typography
                            sx={{
                                fontWeight: '500',
                                fontSize: '14px',
                                color: 'text.contrast',
                            }}
                        >
                            {`Showing ${startIndex} to ${endIndex} of ${tableData?.length} entries`}{' '}
                        </Typography>
                    </Box>
                    <Box>
                        <Pagination
                            count={Math.ceil(TableData?.length / itemsPerPage)}
                            page={currentPage}
                            onChange={(event, page) => setCurrentPage(page)}
                            sx={{
                                '& .Mui-selected': {
                                    color: '#fff',
                                    bgcolor: '#000000 !important',
                                    borderRadius: '4px',
                                },
                            }}
                        />
                    </Box>
                </Box>
            )}
            <CalendarModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}
