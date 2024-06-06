import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import ScrollBar from 'react-perfect-scrollbar'
import { Link } from 'react-router-dom'
import Flag from 'react-world-flags'
import StatisticsBox from 'src/components/general/Statistic'
import DeezerIcon from 'src/icons/DezzerIcon'
import FacebookIcon from 'src/icons/Facebook'
import InstagramIcon from 'src/icons/Instagram'
import { SongkickIcon } from 'src/icons/SongKick'
import SpotifyIcon from 'src/icons/Spotify'
import TiktokIcon from 'src/icons/Tiktok'
import TwitterIcon from 'src/icons/Twitter'
import YoutubeIcon from 'src/icons/Youtube'
import { artistsDatumInt } from 'src/types/local/upSalesResp'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EditArtist } from '../../admin/EditArtist'
import { ModalHeader } from '../../generalComponents/ModalHeader'
import { formatNumber } from '../../generalComponents/customTable/StatsItem'

SwiperCore.use([Navigation])

export function AvatarModal({
    setOpen,
    eventId,
    artistId,
    artists,
}: {
    setOpen: React.Dispatch<SetStateAction<boolean>>
    openEditEventModal?: React.Dispatch<SetStateAction<boolean>>
    eventId?: string
    artistId: string | { $oid: string }
    artists: artistsDatumInt[]
}) {
    const sliderRef = useRef(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [selectedArtist, setSelectedArtist] = useState<number>(0)

    const handleSlideChange = (artistIndex: number) => {
        setSelectedArtist(artistIndex)
    }

    useEffect(() => {
        setSelectedArtist(
            artists?.findIndex((artist) =>
                typeof artist?._id?.$oid === 'undefined' ? artist?._id === artistId : artist?._id?.$oid === artistId
            )
        )
    }, [artistId, artists])

    useEffect(() => {
        if (artists?.length > 0 && selectedArtist > 0) {
            sliderRef.current?.swiper?.slideTo(selectedArtist)
        }
    }, [selectedArtist, artists])

    if (!artists || artists.length === 0) {
        return (
            <Box
                sx={{
                    bgcolor: 'background.white',
                    paddingBlock: '20px',
                    borderRadius: '15px',
                    maxHeight: '90vh',
                    marginTop: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    gap: '15px',
                    zIndex: '1500',
                    width: '40vw',
                }}
            >
                <ModalHeader type="all" setOpen={setOpen} label="Event LineUp" />
                <Typography>No info</Typography>
            </Box>
        )
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                borderRadius: '15px',
                maxHeight: '90vh',
                marginTop: '4rem',
                display: 'flex',
                flexDirection: 'column',
                zIndex: '1500',
                width: '40vw',
            }}
        >
            <ModalHeader type="all" setOpen={setOpen} label="Event LineUp" isEventLineup={true} />
            <Dialog
                open={isEditDialogOpen}
                onClose={() => {
                    setIsEditDialogOpen(false)
                }}
            >
                <DialogTitle>
                    Edit Artist
                    <IconButton
                        aria-label="close"
                        onClick={() => {
                            setIsEditDialogOpen(false)
                        }}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <EditArtist artist={artists?.at(selectedArtist)} />
                </DialogContent>
            </Dialog>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            ></Box>
            {/* Artist */}
            <ScrollBar className="customScrollbarActiveListings">
                {artists.length > 1 ? (
                    <Swiper
                        spaceBetween={30}
                        ref={sliderRef}
                        slidesPerView={1}
                        onSlideChange={() => handleSlideChange(sliderRef.current.swiper.activeIndex)}
                        navigation={{
                            prevEl: '.custom-prev-button',
                            nextEl: '.custom-next-button',
                        }}
                    >
                        {artists.map((artist, index) => (
                            <SwiperSlide virtualIndex={selectedArtist} key={index}>
                                <Box
                                    sx={{
                                        backgroundImage:
                                            'linear-gradient(0.25turn, rgba(147, 106, 112, 0.44), rgba(161, 96, 105, 0.85), rgba(45, 35, 36, 0.68))',
                                        padding: '1rem',
                                        paddingInline: '3rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '100%',
                                            gap: '1rem',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '1rem',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Avatar
                                                src={artist?.meta?.image}
                                                sx={{
                                                    height: '120px',
                                                    width: '120px',
                                                }}
                                                alt={artist?.name}
                                            />
                                            {/* Profile button */}
                                            <Link
                                                to={`/dashboard/metric/${
                                                    artists?.at(selectedArtist)?._id?.$oid === undefined
                                                        ? artists?.at(selectedArtist)?._id
                                                        : artists?.at(selectedArtist)?._id?.$oid
                                                }`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Button
                                                    sx={{
                                                        px: '25px',
                                                        py: '6px',
                                                        bgcolor: '#0A1C3D',
                                                        color: '#FFFFFF',
                                                        borderRadius: '6px',
                                                        lineHeight: 'unset !important',
                                                    }}
                                                    variant="contained"
                                                >
                                                    Profile
                                                </Button>
                                            </Link>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                // width: '100%',
                                                transition: 'all ease-in-out .3s',
                                                alignItems: 'baseline',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '20px',
                                                    fontWeight: '700',
                                                    wordBreak: 'break-word',
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {artist?.name}
                                            </Typography>
                                            {/* Origin and flag under the name */}
                                            <Box
                                                sx={{
                                                    maxWidth: '140px',
                                                    // height: '40px',
                                                    display: 'flex',
                                                    // flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    borderRadius: '6px',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                }}
                                            >
                                                <Flag height="16" code={artist?.meta?.origin} />
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        color: '#0A1C3D',
                                                    }}
                                                >
                                                    {artist?.meta?.origin}
                                                </Typography>
                                            </Box>
                                            {/* Genre */}
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    color: '#0A1C3D',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {
                                                    //@ts-ignore
                                                    typeof artist?.meta?.genre === 'object'
                                                        ? artist.meta?.genre
                                                              ?.map(
                                                                  (elem) =>
                                                                      elem?.root?.at(0).toUpperCase() +
                                                                      elem.root.slice(1)
                                                              )
                                                              .join(', ')
                                                        : artist.meta?.genre
                                                }
                                            </Typography>
                                            <Box sx={{ height: '3rem' }}></Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <KeyboardArrowLeftOutlinedIcon
                                    sx={{
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '50%',
                                        '&:hover': { backgroundColor: '#6D6666' },
                                        display: selectedArtist === 0 ? 'none' : 'block',
                                    }}
                                    className="custom-prev-button"
                                />
                                <KeyboardArrowRightOutlinedIcon
                                    sx={{
                                        width: '2rem',
                                        height: '2rem',
                                        borderRadius: '50%',
                                        '&:hover': { backgroundColor: '#6D6666' },
                                        display: selectedArtist === artists.length - 1 ? 'none' : 'block',
                                    }}
                                    className="custom-next-button"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <>
                        {artists.map((artist, index) => (
                            <Box
                                key={index}
                                sx={{
                                    backgroundImage:
                                        'linear-gradient(0.25turn, rgba(147, 106, 112, 0.44), rgba(161, 96, 105, 0.85), rgba(45, 35, 36, 0.68))',
                                    padding: '1rem',
                                    paddingInline: '3rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        gap: '1rem',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1rem',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            src={artist?.meta?.image}
                                            sx={{
                                                height: '120px',
                                                width: '120px',
                                            }}
                                            alt={artist?.name}
                                        />
                                        {/* Profile button */}
                                        <Link
                                            to={`/dashboard/metric/${
                                                artists?.at(selectedArtist)?._id?.$oid === undefined
                                                    ? artists?.at(selectedArtist)?._id
                                                    : artists?.at(selectedArtist)?._id?.$oid
                                            }`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button
                                                sx={{
                                                    px: '25px',
                                                    py: '6px',
                                                    bgcolor: '#0A1C3D',
                                                    color: '#FFFFFF',
                                                    borderRadius: '6px',
                                                    lineHeight: 'unset !important',
                                                }}
                                                variant="contained"
                                            >
                                                Profile
                                            </Button>
                                        </Link>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            // width: '100%',
                                            transition: 'all ease-in-out .3s',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '20px',
                                                fontWeight: '700',
                                                wordBreak: 'break-word',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {artist?.name}
                                        </Typography>
                                        {/* Origin and flag under the name */}
                                        <Box
                                            sx={{
                                                maxWidth: '140px',
                                                // height: '40px',
                                                display: 'flex',
                                                // flexDirection: 'column',
                                                justifyContent: 'center',
                                                borderRadius: '6px',
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                gap: '1rem',
                                            }}
                                        >
                                            <Flag height="16" code={artist?.meta?.origin} />
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    color: '#0A1C3D',
                                                }}
                                            >
                                                {artist?.meta?.origin}
                                            </Typography>
                                        </Box>
                                        {/* Genre */}
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                color: '#0A1C3D',
                                                textAlign: 'center',
                                            }}
                                        >
                                            {
                                                //@ts-ignore
                                                typeof artist?.meta?.genre === 'object'
                                                    ? artist?.meta?.genre
                                                          ?.map(
                                                              (elem) =>
                                                                  elem?.root?.at(0).toUpperCase() + elem.root.slice(1)
                                                          )
                                                          .join(', ')
                                                    : artist?.meta?.genre
                                            }
                                        </Typography>
                                        <Box sx={{ height: '3rem' }}></Box>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </>
                )}
                {/* Artist's Social Media */}
                <Box sx={{ height: '100%', paddingBottom: '2rem' }}>
                    <Grid
                        container
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { lg: '1fr 1fr 1fr', xl: 'repeat(1fr,6)' },
                            gap: '10px',
                            px: '1rem',
                            paddingTop: '1rem',
                        }}
                    >
                        {/* Spotify */}
                        {(artists?.at(selectedArtist)?.spotify_audience?.follower_count ||
                            artists?.at(selectedArtist)?.spotifyAPI?.popularity ||
                            artists?.at(selectedArtist)?.spotify_audience_graph?.at(0)) && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="Spotify"
                                    icon={SpotifyIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.spotify_audience?.follower_count
                                                    ? artists?.at(selectedArtist)?.spotify_audience?.follower_count
                                                    : 0
                                            ),
                                            text: 'Followers',
                                        },
                                        {
                                            count: artists?.at(selectedArtist)?.spotify_audience_graph?.at(0).value
                                                ? formatNumber(
                                                      artists?.at(selectedArtist)?.spotify_audience_graph.at(0).value
                                                  )
                                                : 'N/A',
                                            text: 'Monthly Listeners',
                                        },
                                        {
                                            count:
                                                formatNumber(
                                                    artists?.at(selectedArtist)?.spotifyAPI?.popularity
                                                        ? artists?.at(selectedArtist)?.spotifyAPI?.popularity
                                                        : 0
                                                ) + '/100',
                                            text: 'Popularity',
                                        },
                                    ]}
                                    customBackgroundLine="#1ED760"
                                />
                            </Grid>
                        )}
                        {/* Youtube */}
                        {(artists?.at(selectedArtist)?.youtube_audience?.follower_count ||
                            artists?.at(selectedArtist)?.youtube_audience?.like_count ||
                            artists?.at(selectedArtist)?.youtube_audience?.view_count ||
                            artists?.at(selectedArtist)?.youtube_audience?.monthly_views?.value) && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="YouTube"
                                    icon={YoutubeIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.youtube_audience?.follower_count
                                                    ? artists?.at(selectedArtist)?.youtube_audience?.follower_count
                                                    : 0
                                            ),
                                            text: 'Subscribers',
                                        },
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.youtube_audience?.like_count
                                                    ? artists?.at(selectedArtist)?.youtube_audience?.like_count
                                                    : 0
                                            ),
                                            text: 'Channel Likes',
                                        },
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.youtube_audience?.monthly_views?.value
                                                    ? artists?.at(selectedArtist)?.youtube_audience?.monthly_views
                                                          ?.value
                                                    : 0
                                            ),
                                            text: 'Daily Views',
                                        },
                                    ]}
                                    customBackgroundLine="#FF0000"
                                />
                            </Grid>
                        )}
                        {/* Instagram */}
                        {(artists?.at(selectedArtist)?.instagram_audience?.follower_count ||
                            artists?.at(selectedArtist)?.instagram_audience?.like_count) && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="Instagram"
                                    icon={InstagramIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.instagram_audience?.follower_count
                                                    ? artists?.at(selectedArtist)?.instagram_audience?.follower_count
                                                    : 0
                                            ),
                                            text: 'Followers',
                                        },
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.instagram_audience?.like_count
                                                    ? artists?.at(selectedArtist)?.instagram_audience?.like_count
                                                    : 0
                                            ),
                                            text: 'Likes',
                                        },
                                    ]}
                                    customBackgroundLine="linear-gradient(0.25turn, #FBD06F, #F16C2E, #C82E96, #4E6AD6)"
                                />
                            </Grid>
                        )}
                        {/* Twitter */}
                        {artists?.at(selectedArtist)?.twitter_audience?.follower_count && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="X"
                                    icon={TwitterIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.twitter_audience?.follower_count
                                                    ? artists?.at(selectedArtist)?.twitter_audience?.follower_count
                                                    : 0
                                            ),
                                            text: 'Followers',
                                        },
                                    ]}
                                    customBackgroundLine="#000000"
                                />
                            </Grid>
                        )}
                        {/* Facebook */}
                        {artists?.at(selectedArtist)?.facebook_audience?.follower_count && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="Facebook"
                                    icon={FacebookIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.facebook_audience?.follower_count
                                                    ? artists?.at(selectedArtist)?.facebook_audience?.follower_count
                                                    : 0
                                            ),
                                            text: 'Followers',
                                        },
                                    ]}
                                    customBackgroundLine="#1877F2"
                                />
                            </Grid>
                        )}
                        {/* Tik Tok */}
                        {artists?.at(selectedArtist)?.tiktok_audience?.follower_count && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="Tik Tok"
                                    icon={TiktokIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.tiktok_audience?.follower_count
                                                    ? artists?.at(selectedArtist)?.tiktok_audience?.follower_count
                                                    : 0
                                            ),
                                            text: 'Followers',
                                        },
                                    ]}
                                    customBackgroundLine="linear-gradient(0.25turn, #00F2EA, #FF004F)"
                                />
                            </Grid>
                        )}
                        {/* Songkick */}
                        {artists?.at(selectedArtist)?.songkick_music_audience?.follower_count && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="Songkick"
                                    icon={SongkickIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.songkick_music_audience?.follower_count
                                            ),
                                            text: 'Fans',
                                        },
                                    ]}
                                    customBackgroundLine="linear-gradient(0.25turn, #00F2EA, #FF004F)"
                                />
                            </Grid>
                        )}
                        {/* Deezer */}
                        {artists?.at(selectedArtist)?.deezer_music_audience?.follower_count && (
                            <Grid item>
                                <StatisticsBox
                                    socialName="Deezer"
                                    icon={DeezerIcon}
                                    counts={[
                                        {
                                            count: formatNumber(
                                                artists?.at(selectedArtist)?.deezer_music_audience?.follower_count
                                            ),
                                            text: 'Fans',
                                        },
                                    ]}
                                    customBackgroundLine="linear-gradient(0.25turn, #00F2EA, #FF004F)"
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </ScrollBar>
        </Box>
    )
}
