import { Box, Card, Divider, Typography } from '@mui/material'
import FacebookIcon from 'src/icons/Facebook'
import InstagramIcon from 'src/icons/Instagram'
import SpotifyIcon from 'src/icons/Spotify'
import TiktokIcon from 'src/icons/Tiktok'
import TwitterIcon from 'src/icons/Twitter'
import YoutubeIcon from 'src/icons/Youtube'
import { artistsDatumInt } from 'src/types/local/upSalesResp'
import { formatNumber } from 'src/components/dashboard/generalComponents/customTable/StatsItem'
import DeezerIcon from 'src/icons/DezzerIcon'
import { SongkickIcon } from 'src/icons/SongKick'

export const StatisticsGroup = ({ artist }: { artist: artistsDatumInt }) => {
    return (
        <Card
            sx={{
                width: '96%',
                mx: 'auto',
                py: '3rem',
                px: '10px',
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '3rem',
                backgroundColor: '#FFFFFF',
            }}
        >
            <Typography sx={{ textAlign: 'center', fontSize: '26px', fontWeight: '600', paddingLeft: '1rem' }}>
                Summary Statistics
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    width: '100%',
                    justifyContent: 'center',
                    gridTemplateColumns: 'repeat(auto-fill, 315px)',
                    gap: '2.5rem',
                    mx: 'auto',
                    maxWidth:'1730px',
                }}
            >
                {/* Spotify */}
                {(artist?.spotify_audience?.follower_count ||
                    artist?.spotifyAPI?.popularity ||
                    artist?.spotify_audience_graph?.at(0)) && (
                    <Box
                        sx={{
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                            }}
                        >
                            <SpotifyIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Spotify</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: '#1ED760',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Followers</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.spotify_audience?.follower_count
                                            ? artist?.spotify_audience.follower_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Popularity</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {artist?.spotifyAPI?.popularity ? artist?.spotifyAPI?.popularity + '/100' : 'N/A'}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    Monthly listeners
                                </Typography>{' '}
                                {artist?.spotify_audience_graph && (
                                    <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                        {artist?.spotify_audience_graph?.at(0)?.value
                                            ? formatNumber(artist?.spotify_audience_graph.at(0)?.value)
                                            : 'N/A'}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                )}
                {/* Youtube */}
                {(artist?.youtube_audience?.follower_count ||
                    artist?.youtube_audience?.view_count ||
                    artist?.youtube_audience?.like_count) && (
                    <Box
                        sx={{
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                            }}
                        >
                            <YoutubeIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Youtube</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: '#FF0000',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Subscribers</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.youtube_audience?.follower_count
                                            ? artist?.youtube_audience?.follower_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Channel Likes</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.youtube_audience?.like_count ? artist?.youtube_audience?.like_count : 0
                                    )}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Daily Views</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.youtube_audience?.monthly_views?.value ? artist?.youtube_audience?.monthly_views?.value : 0
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {/* Instagram */}
                {(artist?.instagram_audience?.follower_count || artist?.instagram_audience?.like_count) && (
                    <Box
                        sx={{
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <InstagramIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Instagram</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: 'linear-gradient(0.25turn, #FBD06F, #F16C2E, #C82E96, #4E6AD6)',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Followers</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.instagram_audience?.follower_count
                                            ? artist.instagram_audience?.follower_count
                                            : 0
                                    )}
                                </Typography>{' '}
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Likes</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.instagram_audience?.like_count
                                            ? artist.instagram_audience?.like_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {/* Twitter */}
                {artist?.twitter_audience?.follower_count && (
                    <Box
                        sx={{
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                            }}
                        >
                            <TwitterIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>X</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: '#000000',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Followers</Typography>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.twitter_audience?.follower_count
                                            ? artist.twitter_audience?.follower_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {/* Facebook */}
                {artist?.facebook_audience?.follower_count && (
                    <Box
                        sx={{
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                            }}
                        >
                            <FacebookIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Facebook</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: '#1877F2',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Followers</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.facebook_audience?.follower_count
                                            ? artist.facebook_audience?.follower_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}

                {/* Tik Tok */}
                {(artist?.tiktok_audience?.follower_count) && (
                    <Box
                        sx={{
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                            }}
                        >
                            <TiktokIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Tik Tok</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: 'linear-gradient(0.25turn, #00F2EA, #FF004F)',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Followers</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.tiktok_audience?.follower_count
                                            ? artist.tiktok_audience?.follower_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {/* Deezer */}
                {artist?.deezer_music_audience?.follower_count && (
                    <Box
                        sx={{
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                            }}
                        >
                            <DeezerIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Deezer</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: 'linear-gradient(0.25turn, #000000, #FF004F)',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Fans</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.deezer_music_audience?.follower_count
                                            ? artist.deezer_music_audience?.follower_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
                {/*Songkick */}
                {artist?.songkick_music_audience?.follower_count && (
                    <Box
                        sx={{
                            boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);',
                            borderRadius: '10px',
                            width: '315px',
                            height: '266px',
                            position: 'relative',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: '600',
                                py: '1rem',
                            }}
                        >
                            <SongkickIcon sx={{ width: '40px', height: '40px' }} />
                            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Songkick</Typography>
                        </Box>
                        <Divider variant="middle" />
                        <Box
                            sx={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                width: '98%',
                                height: '2px',
                                background: 'linear-gradient(0.25turn, #00F2EA, #FF004F)',
                                zIndex: 0,
                                marginLeft: '0.2rem',
                                borderBottomLeftRadius: '20px',
                                borderBottomRightRadius: '20px',
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', py: '1rem', px: '2rem' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Fans</Typography>{' '}
                                <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                    {formatNumber(
                                        artist?.songkick_music_audience?.follower_count
                                            ? artist.songkick_music_audience?.follower_count
                                            : 0
                                    )}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </Card>
    )
}
