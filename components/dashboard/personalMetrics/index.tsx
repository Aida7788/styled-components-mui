import { Backdrop, Box, Card, Grid, SelectChangeEvent, Typography } from '@mui/material'
import { useState } from 'react'
import MetricCountry from 'src/common/metric-country'
import MetricListener from 'src/common/metric-listener'
import { ListTable } from 'src/components/dashboard/personalMetrics/UpcomingPersonalTable'
import MonthlyListener from 'src/components/general/MonthlyListener'
import InstagramIcon from 'src/icons/Instagram'
import SpotifyIcon from 'src/icons/Spotify'
import YoutubeIcon from 'src/icons/Youtube'
import { MetricDataINT } from 'src/types/local/artistMetricResponce'
import { EventType } from 'src/types/local/customTableTypes'
import { artistsDatumInt } from 'src/types/local/upSalesResp'
import { DirectLinks } from '../eventAnalytics/directLinks'
import { StatisticsGroup } from '../generalComponents/StatisticsGroup'
import PaginationBottomComponent from '../generalComponents/StyledPagination'
import { LoaderComponent } from '../loaderComponent/loaderComp'
import ArtistMetricOverview from './ArtistMetricOverview'

const MetricStatistic = ({
    artist,
    eventTableData,
    page,
    perPage,
    isLoading,
    handleChangePage,
    handleChangePerPage,
    totalPages,
}: {
    artist: artistsDatumInt
    eventTableData: MetricDataINT[]
    page: number
    perPage: number
    isLoading: boolean
    handleChangePage: (number: number) => void
    handleChangePerPage: (number: number) => void
    totalPages: number
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedElem, setSelectedElem] = useState<null | EventType>(null)
    const [selectedOption, setSelectedOption] = useState('Cities')
    const [selectedCountry, setSelectedCountry] = useState('United States')

    const handleOptionChange = (event: SelectChangeEvent<typeof selectedOption>) => {
        setSelectedOption(event.target.value)
    }

    const handleCountryChange = (value: any) => {
        setSelectedCountry(value)
    }

    // Filtered data for Spotify audience
    const filteredSpotifyData =
        selectedCountry !== '' && selectedCountry !== 'All'
            ? artist?.spotify_audience?.x
                ? artist?.spotify_audience?.x.cityPlots?.filter((city) => city.countryName === selectedCountry)
                : artist?.spotify_audience?.cityPlots?.filter((city) => city.countryName === selectedCountry)
            : artist?.spotify_audience?.x
              ? artist?.spotify_audience?.x.cityPlots
              : artist?.spotify_audience?.cityPlots

    // Filtered data for Youtube audience
    const filteredYoutubeData =
        selectedCountry !== '' && selectedCountry !== 'All'
            ? artist?.youtube_audience?.monthly_views
                ? artist?.youtube_audience?.monthly_views.cityPlots?.filter(
                      (city) => city.countryName === selectedCountry
                  )
                : artist?.youtube_audience?.cityPlots?.filter((city) => city.countryName === selectedCountry)
            : artist?.youtube_audience?.monthly_views
              ? artist?.youtube_audience?.monthly_views.cityPlots
              : artist?.youtube_audience?.cityPlots

    // Filtered data for Instagram audience
    const filteredInstagramData = artist?.instagram_audience_by_location
        ? selectedCountry !== '' && selectedCountry !== 'All'
            ? artist?.instagram_audience_by_location?.byCity?.audienceFollower?.filter(
                  (city) => city.countryName === selectedCountry
              )
            : artist?.instagram_audience_by_location?.byCity?.audienceFollower
        : []
    console.log(artist?.links || artist?.sound_charts_uuid || (typeof(artist?.meta_data) !== 'undefined' && Object.keys(artist?.meta_data).length > 0), artist)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mx: 'auto', overflow: 'hidden', width: '100%' }}>
            {/* Artist */}
            <ArtistMetricOverview artist={artist} />
            { (artist?.links || artist?.sound_charts_uuid || (typeof(artist?.meta_data) !== 'undefined' && Object.keys(artist?.meta_data).length > 0)) ? 
                <>
                    <StatisticsGroup artist={artist} />
                    <Card sx={{ backgroundColor: '#FFFFFF', p: '30px', my: '2rem', width: '96%', mx: 'auto' }}>
                        <MetricCountry
                            handleCountryChange={handleCountryChange}
                            handleOptionChange={handleOptionChange}
                            selectedOption={selectedOption}
                            selectedCountry={selectedCountry}
                        />
                        {/* Monthly Listeners */}
                        <Grid container>
                            <Grid item xs={4} mx={'auto'}>
                                <MonthlyListener
                                    icon={SpotifyIcon}
                                    heading={`Monthly Listeners`}
                                    tableData={
                                        selectedOption === 'Cities'
                                            ? filteredSpotifyData
                                            : artist?.spotify_audience?.x
                                              ? artist?.spotify_audience?.x.countryPlots
                                              : artist?.spotify_audience?.countryPlots
                                    }
                                />
                            </Grid>
                            <Grid item xs={4} mx={'auto'}>
                                <MonthlyListener
                                    icon={YoutubeIcon}
                                    heading="Monthly Views"
                                    tableData={
                                        selectedOption === 'Cities'
                                            ? filteredYoutubeData
                                            : artist?.youtube_audience?.monthly_views
                                              ? artist?.youtube_audience?.monthly_views.countryPlots
                                              : artist?.youtube_audience?.countryPlots
                                    }
                                />
                            </Grid>
                            <Grid item xs={4} mx={'auto'}>
                                <MonthlyListener
                                    icon={InstagramIcon}
                                    heading="Followers"
                                    tableData={
                                        selectedOption === 'Cities'
                                            ? filteredInstagramData
                                            : artist?.instagram_audience_by_location
                                              ? artist?.instagram_audience_by_location?.byCountry?.audienceFollower
                                              : []
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Card>

                    <Card sx={{ backgroundColor: '#FFFFFF', p: '30px', width: '96%', mx: 'auto' }}>
                        <MetricListener artist={artist} />
                    </Card>
                </>
                :
                <Card sx={{ backgroundColor: '#FFFFFF', p: '30px', width: '96%', mx: 'auto', mt:'20px', display:'flex', justifyContent:'center' }}>
                    <Typography sx={{fontSize:'24px', fontWeight:'500'}}>Unfortunately, we have no data for this artist</Typography>
                </Card>
            }

            <Typography textAlign={'center'} fontSize={26} fontWeight={600} my={4}>
                List of artist's upcoming shows
            </Typography>

            <Box sx={{ px: '30px' }}>
                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <LoaderComponent />
                    </Box>
                ) : eventTableData?.length > 0 ? (
                    <>
                        <ListTable
                            setSelectedElem={setSelectedElem}
                            tableEventData={eventTableData}
                            setIsModalOpen={setIsModalOpen}
                        />
                        <PaginationBottomComponent
                            page={page}
                            perPage={perPage}
                            setPage={handleChangePage}
                            setPerPage={handleChangePerPage}
                            count={totalPages}
                        />
                    </>
                ) : (
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            width: '100%',
                            py: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography sx={{ fontSize: '24px' }}>No records found</Typography>
                    </Box>
                )}
            </Box>
            <Backdrop style={{ zIndex: '6' }} onClick={() => setIsModalOpen(false)} open={isModalOpen}>
                <DirectLinks
                    meta={selectedElem?.meta?.otherPlatforms}
                    setOpen={setIsModalOpen}
                    eventId={selectedElem?._id}
                />
            </Backdrop>
        </Box>
    )
}

export default MetricStatistic
