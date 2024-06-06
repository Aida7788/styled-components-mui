import { Autocomplete, AutocompleteChangeReason, Box, Grid, TextField, Typography } from '@mui/material'
import React, { Key, SetStateAction, useEffect, useState } from 'react'
import { ModalHeader } from '../../generalComponents/ModalHeader'
import { SpanGridItem } from '../../generalComponents/customTable/SpanGridItem'
import { LoaderComponent } from '../../loaderComponent/loaderComp'
import CustomTable from '../../moversTable/CustomTable'

export function LastFetchedModal({
    setOpen,
    data,
    isAXS,
    pageType,
}: {
    setOpen: React.Dispatch<SetStateAction<boolean>>
    data: any
    isAXS?: boolean
    pageType: string
}) {
    const [details, setDetails] = useState<any>(data?.data)
    const [loading, setLoading] = useState<boolean>(true)
    const [sections, setSections] = useState<string[]>([])
    const [searchValue, setSearchValue] = useState<string[]>([])
    const [placeholder, setPlaceholder] = useState('Filter by Section (ex: 101, 102, 103)')

    const handleFocus = () => {
        if (searchValue?.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }

    const handleBlur = () => {
        if (searchValue?.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }

    const handleChangeAutoComplete = (
        event: React.SyntheticEvent<Element, Event>,
        value: string[],
        reason: AutocompleteChangeReason
    ) => {
        if (value !== null) {
            setSearchValue(value)
        } else {
            setSearchValue(null)
        }
    }

    useEffect(() => {
        if (data && data.data) {
            setDetails(data.data)
            setSections(data.data.map((item) => item.section))
            setLoading(false)
        }
    }, [data, details, setDetails])

    useEffect(() => {
        if (searchValue?.length === 0) {
            setPlaceholder('Filter by Section (ex: 101, 102, 103)')
        } else {
            setPlaceholder('')
        }
    }, [placeholder, searchValue?.length])

    const totalTicketsAvailable =
        details.length > 0 && details?.map((item) => item?.available_tickets)?.reduce((a, b) => a + b)

    const totalDetailsLengthSum = details
        ?.map((item) => item?.details?.length)
        ?.reduce((total, length) => total + length, 0)

    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                paddingBlock: '20px',
                borderRadius: '15px',
                maxHeight: '80vh',
                marginTop: '60px',
                flexDirection: 'column',
                width: '45vw',
                gap: '15px',
                zIndex: '1500',
                display: 'flex',
            }}
        >
            <ModalHeader type="all" setOpen={setOpen} label="Last Fetched" />
            <Box sx={{ overflowY: 'auto' }}>
                {pageType === 'primary' ? (
                    // Primary table
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    marginLeft: '3rem',
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    minWidth: '321px',
                                    height: '42px',
                                    cursor: 'text',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    paddingLeft: '10px',
                                    '::placeholder': {
                                        color: '#9f9f9f9',
                                    },
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
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Typography
                                    sx={{
                                        color: '#333333',
                                        display: 'flex',
                                        fontWeight: '600',
                                    }}
                                >
                                    Total Tickets Available: {totalTicketsAvailable}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#333333',
                                        display: 'flex',
                                        fontWeight: '600',
                                    }}
                                >
                                    Total Listings: {details?.length}
                                </Typography>
                            </Box>
                        </Box>
                        <CustomTable
                            center
                            headers={[
                                { text: 'Section' },
                                { text: 'Quantity' },
                                { text: 'Type' },
                                { text: 'MIN(USD)' },
                                { text: 'MAX(USD)' },
                            ]}
                            isCustomChildren={true}
                            layoutGrid={'1fr 1fr 1fr 1fr 1fr'}
                            dontShowPagination={true}
                            pageType={pageType}
                            canFilter={false}
                        >
                            {loading ? (
                                <LoaderComponent />
                            ) : !loading && details?.length > 0 ? (
                                details
                                    ?.filter((item: any) => {
                                        const searchString = Array.isArray(searchValue)
                                            ? searchValue.join(' ')
                                            : searchValue
                                        return item.section.toLowerCase().includes(searchString.toLowerCase())
                                    })
                                    ?.map((item: any, index: Key) => {
                                        return (
                                            <Grid
                                                key={index}
                                                sx={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                                    borderBottom: '2px solid #edf0ea',
                                                    transition: 'all 0.2s ease-in-out',
                                                    '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                }}
                                                columnGap={4}
                                                alignItems={'center'}
                                            >
                                                <SpanGridItem isModal={true} center spanLabel={item?.section} />
                                                <SpanGridItem
                                                    isModal={true}
                                                    center
                                                    spanLabel={`${item?.available_tickets}`}
                                                />
                                                <SpanGridItem
                                                    isModal={true}
                                                    center
                                                    spanLabel={`${item?.inventoryType}`}
                                                />
                                                <SpanGridItem
                                                    isModal={true}
                                                    center
                                                    spanLabel={!isAXS ? `$${item?.minPrice}` : 'N/A'}
                                                />
                                                <SpanGridItem
                                                    isModal={true}
                                                    center
                                                    spanLabel={!isAXS ? `$${item?.maxPrice}` : 'N/A'}
                                                />
                                            </Grid>
                                        )
                                    })
                            ) : (
                                <h3 style={{ textAlign: 'center' }}>No data found</h3>
                            )}
                        </CustomTable>
                    </Box>
                ) : (
                    // Secondary table
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                width: '100%',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    marginLeft: '3rem',
                                }}
                            ></Box>
                            <Box
                                sx={{
                                    minWidth: '321px',
                                    height: '42px',
                                    cursor: 'text',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    paddingLeft: '10px',
                                    '::placeholder': {
                                        color: '#9f9f9f9',
                                    },
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
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <Typography
                                    sx={{
                                        color: '#333333',
                                        display: 'flex',
                                        fontWeight: '600',
                                    }}
                                >
                                    Total Tickets Available: {totalTicketsAvailable}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: '#333333',
                                        display: 'flex',
                                        fontWeight: '600',
                                    }}
                                >
                                    Total Listings: {totalDetailsLengthSum}
                                </Typography>
                            </Box>
                        </Box>
                        <CustomTable
                            center
                            headers={[
                                { text: 'Zone' },
                                { text: 'Section' },
                                { text: 'Row' },
                                { text: 'Quantity' },
                                { text: 'Price' },
                            ]}
                            isCustomChildren={true}
                            layoutGrid={'1fr 1fr 1fr 1fr 1fr'}
                            dontShowPagination={true}
                            pageType={pageType}
                            canFilter={false}
                        >
                            {loading ? (
                                <LoaderComponent />
                            ) : !loading && details?.length > 0 ? (
                                details
                                    ?.filter((item: any) => {
                                        const searchString = Array.isArray(searchValue)
                                            ? searchValue.join(' ')
                                            : searchValue
                                        return item.section.toLowerCase().includes(searchString.toLowerCase())
                                    })
                                    ?.map((item: any, index: Key) =>
                                        item.details.map((detail: any, detailIndex: Key) => (
                                            <Box key={`${index}-${detailIndex}`}>
                                                <Grid
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                                                        borderBottom: '2px solid #edf0ea',
                                                        transition: 'all 0.2s ease-in-out',
                                                        '&:hover': { backgroundColor: '#e6e6e6 !important' },
                                                    }}
                                                    columnGap={4}
                                                    alignItems={'center'}
                                                >
                                                    <SpanGridItem
                                                        center
                                                        spanLabel={
                                                            detail?.ticketClassName ? detail?.ticketClassName : 'N/A'
                                                        }
                                                    />
                                                    <SpanGridItem isModal={true} center spanLabel={item?.section} />
                                                    <SpanGridItem isModal={true} center spanLabel={detail.row} />
                                                    <SpanGridItem
                                                        isModal={true}
                                                        center
                                                        spanLabel={detail.availableTickets}
                                                    />
                                                    <SpanGridItem
                                                        isModal={true}
                                                        center
                                                        spanLabel={`$${detail.rawPrice}`}
                                                    />
                                                </Grid>
                                            </Box>
                                        ))
                                    )
                            ) : (
                                <h3 style={{ textAlign: 'center' }}>No data found</h3>
                            )}
                        </CustomTable>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
