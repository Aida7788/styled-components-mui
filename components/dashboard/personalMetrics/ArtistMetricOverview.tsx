import { Avatar, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Flag from 'react-world-flags'
import DeezerIcon from 'src/icons/DezzerIcon'
import FacebookIcon from 'src/icons/Facebook'
import InstagramIcon from 'src/icons/Instagram'
import OfficialIcon from 'src/icons/OfficialIcon'
import { SongkickIcon } from 'src/icons/SongKick'
import SpotifyIcon from 'src/icons/Spotify'
import TiktokIcon from 'src/icons/Tiktok'
import TwitterIcon from 'src/icons/Twitter'
import YoutubeIcon from 'src/icons/Youtube'
import { artistsDatumInt } from 'src/types/local/upSalesResp'

const ArtistMetricOverview = ({ artist }: { artist: artistsDatumInt }) => {
    return (
        <Box
            sx={{
                backgroundImage:
                    'linear-gradient(0.25turn, rgba(147, 106, 112, 0.44), rgba(161, 96, 105, 0.85), rgba(45, 35, 36, 0.68))',
                height: '410px',
                padding: '3.5rem 3rem 2.5rem 5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                {/* Artist */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1.5rem',
                    }}
                >
                    <Avatar
                        src={artist?.meta?.image}
                        sx={{
                            height: '220px',
                            width: '220px',
                        }}
                        alt={artist ? artist.name : 'artist avatar'}
                    />
                    <Link to={artist?.homepage} style={{ textDecoration: 'none' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'center',
                                textDecoration: 'none',
                                color: '#000000',
                                transition: 'all ease-in-out .3s',
                                '&:hover': { scale: '0.9' },
                                '&:hover:not()': { scale: '1' },
                            }}
                        >
                            <Typography sx={{ fontSize: '40px', fontWeight: '600' }}>{artist?.name}</Typography>
                            <OfficialIcon sx={{ width: '30px', height: '30px' }} />
                        </Box>
                    </Link>
                </Box>
                {/* Data Sources */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginRight: '9.5rem' }}>
                    <Typography sx={{ fontSize: '26px', fontWeight: '600', textAlign: 'center' }}>
                        Data Sources
                    </Typography>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gridTemplateRows: 'repeat(2, 1fr)',
                            gap: '1rem',
                        }}
                    >
                        {(artist?.meta_data?.spotify || artist?.links?.spotify) && <Link target={'_blank'} to={artist?.meta_data?.spotify || artist?.links?.spotify}>
                            <SpotifyIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                        {(artist?.meta_data?.youtube || artist?.links?.youtube) && <Link target={'_blank'} to={artist?.meta_data?.youtube || artist?.links?.youtube}>
                            <YoutubeIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                        {(artist?.meta_data?.instagram || artist?.links?.instagram) && <Link target={'_blank'} to={artist?.meta_data?.instagram || artist?.links?.instagram}>
                            <InstagramIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                        {(artist?.meta_data?.facebook || artist?.links?.facebook) && <Link target={'_blank'} to={artist?.meta_data?.facebook || artist?.links?.facebook}>
                            <FacebookIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                        {(artist?.meta_data?.twitter || artist?.links?.twitter) &&<Link target={'_blank'} to={artist?.meta_data?.twitter || artist?.links?.twitter}>
                            <TwitterIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                        {artist?.links?.tiktok&&<Link target={'_blank'} to={artist?.links?.tiktok}>
                            <TiktokIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                        {artist?.links?.deezer&&<Link target={'_blank'} to={artist?.links?.deezer}>
                            <DeezerIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                        {artist?.links?.songkick&&<Link target={'_blank'} to={artist?.links?.songkick}>
                            <SongkickIcon
                                sx={{
                                    width: '40px',
                                    height: '40px',
                                    transition: 'all ease-in-out .3s',
                                    '&:hover': { scale: '0.9' },
                                    '&:hover:not()': { scale: '1' },
                                }}
                            />
                        </Link>}
                    </Box>
                </Box>
            </Box>
            {/* Artist's Meta */}
            <Box
                sx={{
                    display: 'flex',
                    gap: '3rem',
                }}
            >
                {/* Genre */}
                <Box
                    sx={{
                        width: '267px',
                        height: '79px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: '1rem',
                        borderRadius: '6px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#0A1C3D',
                            textAlign: 'center',
                        }}
                    >
                        Genre
                    </Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: '600', color: '#0A1C3D', textAlign: 'center' }}>
                        {
                        //@ts-ignore
                        artist?.meta?.genre ? typeof(artist?.meta?.genre) === "object" ? artist?.meta?.genre?.map(elem=>elem.root[0].toUpperCase()+elem.root.slice(1)).join(', ') : artist?.meta?.genre : 'N/A'}
                    </Typography>
                </Box>
                {/* Spotify */}
                <Box
                    sx={{
                        width: '267px',
                        height: '79px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: '1rem',
                        borderRadius: '6px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#0A1C3D',
                            textAlign: 'center',
                        }}
                    >
                        Spotify Ranking
                    </Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: '600', color: '#0A1C3D', textAlign: 'center' }}>
                        {artist?.spotifyAPI?.popularity ? artist.spotifyAPI?.popularity : 'N/A'}
                    </Typography>
                </Box>
                {/* Origin */}
                <Box
                    sx={{
                        width: '267px',
                        height: '79px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        px: '1rem',
                        borderRadius: '6px',
                    }}
                >
                    <Typography 
                        sx={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#0A1C3D',
                            textAlign: 'center',
                        }}
                    >
                        Artist Origin
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: '20px', fontWeight: '600', color: '#0A1C3D' }}>
                            {artist?.meta?.origin ? artist?.meta?.origin : 'N/A'}
                        </Typography>
                        <Flag height="14" code={artist?.meta?.origin} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ArtistMetricOverview
