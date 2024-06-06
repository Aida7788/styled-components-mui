import { Formik } from 'formik'
import { Box, Button, FormHelperText, Stack, TextField, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useState } from 'react'
import { StudhubIcon } from 'src/icons/StudhubIcon'
import Loader from 'src/components/general/loader'
import { API } from 'src/services/adminApi'
import { validateUrlRegex } from 'src/utils/string'
import { FrontEndError } from 'src/utils/error'

export const AddMatchUrlModal = ({ changeModal, selectedMeta }) => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Box sx={{ backgroundColor: 'white', p: 3, width: 700, borderRadius: 2 }}>
                    <Formik
                        initialValues={{
                            url: '',
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            url: Yup.string()
                                .matches(validateUrlRegex, 'Should be a valid URL')
                                .required('StudHub URL is required'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
                            try {
                                const primaryEventUrl = selectedMeta[0].url
                                const secondaryEventUrl = values.url

                                if (primaryEventUrl && secondaryEventUrl) {
                                    setIsLoading(true)
                                    await API.mergeEvents({ primaryEventUrl, secondaryEventUrl })
                                    setIsLoading(false)
                                    changeModal('addMatchUrlModal')
                                }
                            } catch (err) {
                                FrontEndError(err)
                                setStatus({ success: false })
                                setErrors({ submit: err.message })
                                setSubmitting(false)
                            }
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values,
                        }): JSX.Element => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Box>
                                    <Stack alignItems={'center'} direction={'row'} sx={{ height: 20, width: 100 }}>
                                        <Box
                                            sx={{
                                                width: '24px',
                                                height: '24px',
                                                bgcolor: '#036cdf',
                                                borderRadius: 99,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mr: '10px',
                                            }}
                                        >
                                            <StudhubIcon />
                                        </Box>
                                        <Typography>StubHub</Typography>
                                    </Stack>
                                    <TextField
                                        autoFocus
                                        error={Boolean(touched.url && errors.url)}
                                        fullWidth
                                        helperText={touched.url && errors.url}
                                        label="StudHub URL"
                                        placeholder="StudHub URL"
                                        margin="normal"
                                        name="url"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="url"
                                        value={values.url}
                                        variant="outlined"
                                    />
                                </Box>

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
                                        Add
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            )}
        </>
    )
}
