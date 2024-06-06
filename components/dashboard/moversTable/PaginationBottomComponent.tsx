import { Select, Box, MenuItem, Typography, Pagination } from '@mui/material'

export default function PaginationBottomComponent() {
    return (
        <Box
            sx={{
                alignSelf: 'flex-end',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                <Select
                    defaultValue={10}
                    sx={{
                        bgcolor: 'background.white',
                        width: '70px',
                        height: '40px',
                    }}>
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
                    }}>
                    Showing 1 to 10 of 50 entries
                </Typography>
            </Box>
            <Box>
                <Pagination shape="rounded" />
            </Box>
        </Box>
    )
}
