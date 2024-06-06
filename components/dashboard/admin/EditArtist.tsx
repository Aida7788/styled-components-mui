import { Box, Button, FormHelperText, Stack, TextField, TextFieldProps, Typography, styled } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import InstagramIcon from 'src/icons/Instagram'
import SpotifyIcon from 'src/icons/Spotify'
import YoutubeIcon from 'src/icons/Youtube'
import { artistsDatumInt } from 'src/types/local/upSalesResp'
import { FrontEndError } from 'src/utils/error'

const StyledTextField = styled(({ className, ...props }: TextFieldProps) => (
    <TextField classes={{ root: className }} {...props} />
))(({ theme }) => ({
    label: {
        color: 'black',
        fontSize: 18,
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
    '&:not(.Mui-focused) fieldset': {
        borderColor: 'grey',
    },
    '& .MuiInputLabel-root': {
        color: 'black',
    },
    '& .Mui-focused .MuiInputLabel-root': {
        color: 'black',
    },
    '& .MuiInputLabel-shrink': {
        color: 'black',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#000',
    },
}))

export const EditArtist = ({ artist }: { artist: artistsDatumInt }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(true)

    return (
        <Box>
            <Formik
                initialValues={{
                    spotifyFollowersCount: artist?.spotify_audience?.follower_count,
                    spotifyPopularity: artist?.spotifyAPI?.popularity,
                    youtubeSubscribes: artist?.youtube_audience?.follower_count,
                    instagramFollowersCount: artist?.instagram?.follower_count,
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    spotifyFollowersCount: Yup.number().min(0).nullable().optional(),
                    spotifyPopularity: Yup.number().min(0).nullable().optional(),

                    youtubeSubscribes: Yup.number().min(0).nullable().optional(),

                    instagramFollowersCount: Yup.number().min(0).nullable().optional(),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
                    try {
                        setIsLoading(true)
                        // await API.UpdateEvent(eventId, values.capacity, values.rank)
                        setIsLoading(false)
                        // setState(false)
                    } catch (err) {
                        FrontEndError(err)
                        setStatus({ success: false })
                        setErrors({ submit: err.message })
                        setSubmitting(false)
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Stack direction={'column'} sx={{ gap: 1 }}>
                            <Box
                                sx={{ border: '3px solid green', borderRadius: 2, p: 2, backgroundColor: '#00800017' }}
                            >
                                <Stack alignItems={'center'} direction={'row'}>
                                    <SpotifyIcon sx={{ mr: 1 }} />
                                    <Typography>Spotify</Typography>
                                </Stack>
                                <StyledTextField
                                    error={Boolean(touched.spotifyFollowersCount && errors.spotifyFollowersCount)}
                                    fullWidth
                                    helperText={touched.spotifyFollowersCount && errors.spotifyFollowersCount}
                                    label="Followers Count"
                                    placeholder="Followers Count"
                                    margin="normal"
                                    name="spotifyFollowersCount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="number"
                                    value={values.spotifyFollowersCount}
                                    variant="outlined"
                                />
                                <StyledTextField
                                    error={Boolean(touched.spotifyPopularity && errors.spotifyPopularity)}
                                    fullWidth
                                    helperText={touched.spotifyPopularity && errors.spotifyPopularity}
                                    label="Popularity"
                                    placeholder="Popularity"
                                    margin="normal"
                                    name="spotifyPopularity"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="number"
                                    value={values.spotifyPopularity}
                                    variant="outlined"
                                />
                            </Box>

                            <Box sx={{ border: '3px solid red', borderRadius: 2, p: 2, backgroundColor: '#ff000017' }}>
                                <Stack alignItems={'center'} direction={'row'}>
                                    <YoutubeIcon sx={{ mr: 1 }} />
                                    <Typography>Youtube</Typography>
                                </Stack>
                                <StyledTextField
                                    error={Boolean(touched.youtubeSubscribes && errors.youtubeSubscribes)}
                                    fullWidth
                                    helperText={touched.youtubeSubscribes && errors.youtubeSubscribes}
                                    label="Followers Count"
                                    placeholder="Subscribers Count"
                                    margin="normal"
                                    name="youtubeSubscribes"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="number"
                                    value={values.youtubeSubscribes}
                                    variant="outlined"
                                />
                            </Box>

                            <Box
                                sx={{ border: '3px solid orange', borderRadius: 2, p: 2, backgroundColor: '#ff9b0017' }}
                            >
                                <Stack alignItems={'center'} direction={'row'}>
                                    <InstagramIcon sx={{ mr: 1 }} />
                                    <Typography>Instagram</Typography>
                                </Stack>
                                <StyledTextField
                                    error={Boolean(touched.instagramFollowersCount && errors.instagramFollowersCount)}
                                    fullWidth
                                    helperText={touched.instagramFollowersCount && errors.instagramFollowersCount}
                                    label="Followers Count"
                                    placeholder="Subscribers Count"
                                    margin="normal"
                                    name="instagramFollowersCount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="number"
                                    value={values.instagramFollowersCount}
                                    variant="outlined"
                                />
                            </Box>
                        </Stack>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit as any}</FormHelperText>
                            </Box>
                        )}
                        <Box sx={{ mt: 3 }}>
                            <Button
                                fullWidth
                                disabled={isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#0a1b3e',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#2250b9',
                                    },
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    )
}
