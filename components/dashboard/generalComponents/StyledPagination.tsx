import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, MenuItem, Pagination, PaginationItem, Select, Typography, styled } from '@mui/material'

import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export default function PaginationBottomComponent({
    setPerPage,
    perPage,
    page,
    onlyPagination = false,
    setPage,
    count,
}: {
    setPerPage?: Dispatch<SetStateAction<number>>
    perPage?: number
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
                backgroundColor: 'white',
                alignSelf: 'flex-end',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '8px',
                paddingBottom: '12px',
            }}
        >
            {!onlyPagination && (
                <Box
                    sx={{
                        ml: '24px',
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
                            maxHeight: '36px',
                            border: '1px solid #D0D5DD',
                            borderRadius: '8px',
                            bgcolor: 'background.white',
                            width: '80px',
                            height: '40px',
                            zIndex: '2',
                        }}
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <StyledMenuItem value={10}>10</StyledMenuItem>
                        <StyledMenuItem value={25}>25</StyledMenuItem>
                        <StyledMenuItem value={50}>50</StyledMenuItem>
                        <StyledMenuItem value={100}>100</StyledMenuItem>
                        <StyledMenuItem value={150}>150</StyledMenuItem>
                        <StyledMenuItem value={200}>200</StyledMenuItem>
                    </Select>
                </Box>
            )}
            <Box>
                <Pagination
                    count={count}
                    onChange={handleChange}
                    page={page}
                    renderItem={(item) => (
                        <PaginationItem slots={{ previous: StyledBackButton, next: StyledForwardButton }} {...item} />
                    )}
                    shape="rounded"
                    sx={{
                        '& .Mui-selected': {
                            backgroundColor: '#F9FAFB !important',
                            color: 'black',
                            '&:hover': { backgroundColor: '#F9FAFB' },
                        },
                    }}
                />
            </Box>
            <Box sx={{ width: '70px', mr: '24px' }} />
        </Box>
    )
}

const StyledPaginationButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    color: 'black',
    fontWeight: '400',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '16pxs',
    maxHeight: '36px',
    border:'solid 1px #D0D5DD'
}))

const StyledForwardButton = () => {
    return (
        <StyledPaginationButton>
            <Typography>Next</Typography>
            <ArrowForwardIcon sx={{ height: '20px', width: '20px', ml: '8px' }} />
        </StyledPaginationButton>
    )
}

const StyledBackButton = () => {
    return (
        <StyledPaginationButton>
            <ArrowBackIcon sx={{ height: '20px', width: '20px', mr: '8px' }} />
            <Typography>Previous</Typography>
        </StyledPaginationButton>
    )
}

const StyledMenuItem = styled(MenuItem)(({theme})=>({
    ':hover': {
        backgroundColor:'#D0D5DD'
    },
    '&.Mui-selected':{
        backgroundColor:'#D0D5DD',
        ":hover":{
            backgroundColor:'#D0D5DD',
        }
    }
}))
