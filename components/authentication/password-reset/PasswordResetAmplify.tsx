import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormHelperText, IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { Formik } from 'formik'
import type { FC } from 'react'
import { JSX, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { authApi } from 'src/services/authApi'
import styled from '@emotion/styled'

interface PasswordResetAmplifyProps {
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
const PasswordResetAmplify: FC<PasswordResetAmplifyProps> = ({ setPopupText }) => {
    const navigate = useNavigate()
    const itemsRef = useRef([])
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, 6)
    }, [])

    return (
        <Formik
            initialValues={{ password: '', passwordConfirm: '', submit: null }}
            validationSchema={Yup.object().shape({
                password: Yup.string()
                    .max(64)
                    .matches(
                        /^\S{6,}$/,
                        'Password must contain at least 6 characters'
                    )
                    .required('Password is required'),
                passwordConfirm: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Required'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
                try {
                    setSubmitting(true)
                    await authApi.resetPassword({
                        new_password: values.password,
                        new_password_confirmation: values.passwordConfirm,
                    })
                    await setPopupText('Password reset successful')
                    await navigate('/authentication/login')
                    setSubmitting(false)
                    setStatus({ success: true })
                } catch (err) {
                    setStatus({ success: false })
                    setErrors({ submit: err.message })
                    setSubmitting(false)
                    setPopupText(err.message)
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
                <form noValidate onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <StyledTextField
                                error={Boolean(touched.password && errors.password)}
                                fullWidth
                                helperText={touched.password && errors.password}
                                label="Enter a strong password"
                                margin="normal"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {values.password && (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(false)}
                                                    onMouseDown={() => setShowPassword(true)}
                                                    edge="end"
                                                    sx={{ mt: 0.1, mr: 0.5, cursor: 'pointer' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: '0 0 0 1000px white inset',
                                        WebkitTextFillColor: 'black',
                                    },
                                }}
                            />
                            <StyledTextField
                                error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
                                fullWidth
                                helperText={touched.passwordConfirm && errors.passwordConfirm}
                                label="Confirm your password"
                                margin="normal"
                                name="passwordConfirm"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={values.passwordConfirm}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {values.password && (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowConfirmPassword(false)}
                                                    onMouseDown={() => setShowConfirmPassword(true)}
                                                    edge="end"
                                                    sx={{ mt: 0.1, mr: 0.5, cursor: 'pointer' }}
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                                inputProps={{
                                    style: {
                                        WebkitBoxShadow: '0 0 0 1000px white inset',
                                        WebkitTextFillColor: 'black',
                                    },
                                }}
                            />
                        </Box>
                        {errors.submit && (
                            <Box>
                                <FormHelperText error>{errors.submit as string}</FormHelperText>
                            </Box>
                        )}
                        <Box>
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
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default PasswordResetAmplify
