import { Box, MenuItem, Pagination, PaginationItem, Select, Typography } from '@mui/material'

import { ChangeEvent, Dispatch, SetStateAction } from 'react'

const ShowingPerPage = (page: number, perPage: number, allEntries) => {
    let tempNowShowing
    if (allEntries <= perPage) {
        tempNowShowing = allEntries
    } else if (allEntries > page * perPage) {
        tempNowShowing = Math.ceil(page * perPage)
    } else {
        tempNowShowing = allEntries
    }

    let tempPerPage = allEntries === 0 ? 0 : Math.ceil(page * perPage - perPage + 1)
    let showingString: string = `Showing ${tempPerPage} to ${tempNowShowing} of  ${allEntries} entries`

    return showingString
}

export default function PaginationBottomComponent({
    setPerPage,
    perPage,
    allEntries,
    page,
    onlyPagination = false,
    setPage,
    count,
}: {
    setPerPage?: Dispatch<SetStateAction<number>>
    perPage?: number
    allEntries?: number
    onlyPagination?: boolean
    page?: number
    count?: number
    setPage?: Dispatch<SetStateAction<number>>
}) {
    const handleSelectChange = (event: any) => {
        const selectedOptions = event.target.value as number
        setPerPage(selectedOptions)
    }
    const handleChange = (event: ChangeEvent<unknown>, value: number) => setPage(value)

    return (
        <Box
            sx={{
                alignSelf: 'flex-end',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
        >
            {!onlyPagination && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '20px',
                    }}
                >
                    <Select
                        value={perPage}
                        onChange={handleSelectChange}
                        sx={{
                            bgcolor: 'background.white',
                            width: '70px',
                            height: '40px',
                            zIndex: '2',
                        }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                    </Select>
                    <Typography
                        sx={{
                            fontWeight: '500',
                            fontSize: '14px',
                            color: 'text.contrast',
                        }}
                    >
                        {ShowingPerPage(page, perPage, allEntries)}
                    </Typography>
                </Box>
            )}
            <Box>
                <Pagination
                    count={count}
                    onChange={handleChange}
                    page={page}
                    shape="rounded"
                    sx={{
                        '& .Mui-selected': {
                            backgroundColor: '#000000 !important',
                            color: 'text.default',
                            '&:hover': { backgroundColor: '#000000' },
                        },
                        '& .css-c3h5l4-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#000000',
                            '&:hover': { backgroundColor: '#000000' },
                        },
                    }}
                    renderItem={(item) => <PaginationItem {...item} />}
                />
            </Box>
        </Box>
    )
}
