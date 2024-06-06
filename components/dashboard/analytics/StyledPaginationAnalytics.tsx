import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'
import { Box, MenuItem, Pagination, PaginationItem, Select, styled } from '@mui/material'
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
                width: '95%',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: !onlyPagination ? 'space-between' : 'center',
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
                            width: '70px',
                            height: '40px',
                            zIndex: '2',
                        }}
                        IconComponent={KeyboardArrowDownIcon}
                    >
                        <MenuItem
                            sx={{
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                            }}
                            value={5}
                        >
                            5
                        </MenuItem>
                        <MenuItem
                            sx={{
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                            }}
                            value={10}
                        >
                            10
                        </MenuItem>
                        <MenuItem
                            sx={{
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                            }}
                            value={15}
                        >
                            15
                        </MenuItem>
                        <MenuItem
                            sx={{
                                transition: 'all 0.2s ease-in-out',
                                '&:hover': { backgroundColor: '#e6e6e6 !important' },
                            }}
                            value={20}
                        >
                            20
                        </MenuItem>
                    </Select>
                </Box>
            )}
            <Box>
                <Pagination
                    count={count}
                    onChange={handleChange}
                    page={page}
                    showFirstButton={false}
                    showLastButton={false}
                    renderItem={(item) => {
                        return (
                            <PaginationItem
                                slots={{
                                    first: StyledFirstButton,
                                    last: StyledLastButton,
                                    previous: StyledBackButton,
                                    next: StyledForwardButton,
                                }}
                                {...item}
                            />
                        )
                    }}
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
            <Box></Box>
        </Box>
    )
}

const StyledPaginationAnalyticsButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    color: 'black',
    fontWeight: '400',
    borderRadius: '8px',
    padding: '8px 14px',
    fontSize: '16pxs',
    maxHeight: '36px',
}))

const StyledForwardButton = () => {
    return (
        <StyledPaginationAnalyticsButton>
            <ArrowForwardIcon sx={{ height: '20px', width: '20px' }} />
        </StyledPaginationAnalyticsButton>
    )
}

const StyledBackButton = () => {
    return (
        <StyledPaginationAnalyticsButton>
            <ArrowBackIcon sx={{ height: '20px', width: '20px' }} />
        </StyledPaginationAnalyticsButton>
    )
}

const StyledFirstButton = () => {
    return (
        <StyledPaginationAnalyticsButton>
            <KeyboardDoubleArrowLeftOutlinedIcon sx={{ height: '20px', width: '20px' }} />
        </StyledPaginationAnalyticsButton>
    )
}

const StyledLastButton = () => {
    return (
        <StyledPaginationAnalyticsButton>
            <KeyboardDoubleArrowRightOutlinedIcon sx={{ height: '20px', width: '20px' }} />
        </StyledPaginationAnalyticsButton>
    )
}
