import styled from '@emotion/styled'
import { Box, Button, FormHelperText, TextField, TextFieldProps } from '@mui/material'
import { Formik } from 'formik'
import type { FC } from 'react'
import { JSX } from 'react'
import { useNavigate } from 'react-router'
import { authApi } from 'src/services/authApi'
import * as Yup from 'yup'

interface PasswordRecoveryAmplifyProps {
    setPopupText: (text: string) => void
}

const StyledTextField = styled(({ className, ...props }: TextFieldProps) => (
    <TextField classes={{ root: className }} {...props} />
))(() => ({
    label: {
        color: 'black',
        fontSize: 16,
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

const PasswordRecoveryAmplify: FC<PasswordRecoveryAmplifyProps> = ({ setPopupText }) => {
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={{ email: '', submit: null }}
            validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(64).required('Email is required'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
                try {
                    setSubmitting(true)
                    await authApi.forgotPassword({ email: values.email })
                    await setPopupText('Please check your email')
                    await navigate('/authentication/message-sent')
                    setSubmitting(false)
                    setStatus({ success: true })
                } catch (err) {
                    setStatus({ success: false })
                    setErrors({ submit: err.message })
                    setSubmitting(false)
                    setPopupText('No user with the given email found')
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
                <form noValidate onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                        <StyledTextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email"
                            margin="normal"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            variant="outlined"
                            size="small"
                            inputProps={{
                                style: {
                                    WebkitBoxShadow: '0 0 0 1000px white inset',
                                    WebkitTextFillColor: 'black',
                                },
                            }}
                        />
                        {errors.submit && (
                            <Box>
                                <FormHelperText error>No user with the given email found</FormHelperText>
                            </Box>
                        )}
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
                            Send Reset Password Link
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    )
}

export default PasswordRecoveryAmplify
