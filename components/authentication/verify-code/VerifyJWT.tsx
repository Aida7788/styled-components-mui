import { Box, Button, CircularProgress, FormHelperText, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import useAuth from 'src/hooks/useAuth'
import CheckIcon from '@mui/icons-material/Check'
import SyncIcon from '@mui/icons-material/Sync'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { authApi } from 'src/services/authApi'

export const VerifyJWT = () => {
    const { verifyCode } = useAuth()

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [resendLoading, setResendLoading] = useState(false)
    const [resendMessage, setResendMessage] = useState<string | null>(null)
    const hasVerified = useRef(false)

    useEffect(() => {
        if (!hasVerified.current) {
            hasVerified.current = true
            verify()
        }
    }, [])

    const verify = async () => {
        setIsLoading(true)
        try {
            const success = await verifyCode()
            if (!success) {
                setError('Wrong token')
            }
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Stack alignItems={'center'} justifyContent={'center'}>
            {error ? (
                <Box>
                    {!resendMessage && (
                        <Typography variant="body1" color={'red'} align="center" marginBottom={5}>
                            {'Wrong token'}
                        </Typography>
                    )}
                    <Formik
                        initialValues={{
                            email: '',
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required('Email is required'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                setErrors({})
                                setSubmitting(true)
                                setResendLoading(true)
                                setResendMessage(null)
                                await authApi.resendVerifyEmail(values.email)
                                setSubmitting(false)
                                setResendLoading(false)
                                setResendMessage('Verification email sent successfully.')
                            } catch (err) {
                                setSubmitting(false)
                                setResendLoading(false)
                                setStatus({ success: false })
                                setErrors({ submit: err.message })
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
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <TextField
                                        autoFocus
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Email"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.email}
                                        variant="outlined"
                                        size="small"
                                        disabled={Boolean(resendMessage)}
                                        inputProps={{
                                            style: {
                                                WebkitBoxShadow: '0 0 0 1000px white inset',
                                                WebkitTextFillColor: 'black',
                                            },
                                        }}
                                        InputLabelProps={{ style: { color: 'black' } }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                    }}
                                >
                                    <Box>
                                        <FormHelperText error>{(errors.submit as any) || ''}</FormHelperText>
                                    </Box>
                                    <Box>
                                        {!resendMessage && (
                                            <Button
                                                disabled={isSubmitting}
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="outlined"
                                                sx={{
                                                    bgcolor: '#0A1B3C',
                                                    borderRadius: '5px',
                                                    color: '#FFFFFF',
                                                    '&:disabled': { backgroundColor: '#0a1b3c73' },
                                                    '&:hover': { backgroundColor: '#0a1b3c80' },
                                                }}
                                            >
                                                Resend verification email
                                                {resendLoading && <CircularProgress size={20} sx={{ marginLeft: 1 }} />}
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                                {resendMessage && (
                                    <Typography variant="body2" color="green" align="center">
                                        {resendMessage}
                                    </Typography>
                                )}
                            </form>
                        )}
                    </Formik>
                </Box>
            ) : isLoading ? (
                <>
                    <Typography variant="h6" color={'#232859'} align="center">
                        {'Your code is being validated, please wait a moment...'}
                    </Typography>
                    <CircularProgress />
                    <Typography variant="body1" color={'#232859'} align="center">
                        You'll be redirected soon...
                    </Typography>
                </>
            ) : (
                <>
                    <Stack direction={'row'}>
                        <Typography variant="h6" color={'green'}>
                            Success
                        </Typography>
                        <CheckIcon color="success" />
                    </Stack>
                    <Typography variant="body1" color={'#232859'}>
                        You'll be redirected soon...
                    </Typography>
                    <CircularProgress />
                </>
            )}
        </Stack>
    )
}
