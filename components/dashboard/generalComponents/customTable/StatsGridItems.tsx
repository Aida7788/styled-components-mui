import { Box, Grid } from '@mui/material'
import { artistsDatumInt } from 'src/types/local/upSalesResp'
import { StatsItem } from './StatsItem'
import { useEffect, useState } from 'react'

export const StatsGridItem = ({ countRankDate }: { countRankDate: artistsDatumInt[] }) => {
    const [artistData, setArtistData] = useState<artistsDatumInt>()
    useEffect(() => {
        const dataArray = countRankDate?.sort((a, b) => {
            if (a?.spotifyAPI?.popularity && b?.spotifyAPI?.popularity) {
                if (a?.spotifyAPI?.popularity < b?.spotifyAPI?.popularity) {
                    return 1
                } 
                if (a?.spotifyAPI?.popularity > b?.spotifyAPI?.popularity) return -1
                return 0
            }
            if(a?.spotifyAPI?.popularity && !b?.spotifyAPI?.popularity) return -1
            if(b?.spotifyAPI?.popularity && !a?.spotifyAPI?.popularity) return 1
            return 0
        }) 
        setArtistData(dataArray[0])
    }, [])
    return (
        <Box>
            <Grid
                item
                sx={{
                    gap: '2px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                }}
            >
                <StatsItem name={'spotify'} number={artistData?.spotify_audience_graph?.at(0)?.value} />
                <StatsItem name={'instagram'} number={artistData?.instagram_audience?.follower_count} />
                <StatsItem name={'youtube'} number={artistData?.youtube_audience?.follower_count} />
            </Grid>
        </Box>
    )
}
