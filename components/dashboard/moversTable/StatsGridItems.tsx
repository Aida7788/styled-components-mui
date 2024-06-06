import { TableDataItem } from 'src/types/local/customTableTypes'
import { Grid, Typography } from '@mui/material'

export const StatsGridItem = ({ item }: { item: TableDataItem }) => {
    return (
        <Grid
            item
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Typography sx={{ fontSize: '12px', fontWeight: '600', color: 'text.contrast' }}>
                {item.quick_stats.spotify}
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: '600', color: 'text.contrast' }}>
                {item.quick_stats.instagram}
            </Typography>
            <Typography sx={{ fontSize: '12px', fontWeight: '600', color: 'text.contrast' }}>
                {item.quick_stats.youtube}
            </Typography>
        </Grid>
    )
}
