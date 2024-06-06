import styled from '@emotion/styled'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    IconButton,
    InputAdornment,
    Link,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material'
import { Formik } from 'formik'
import type { FC } from 'react'
import { JSX, useState } from 'react'
import { Link as BrowserRouter, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import useAuth from '../../../hooks/useAuth'

interface LoginJWTProps {
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

const LoginJWT: FC<LoginJWTProps> = ({ setPopupText }, props) => {
    const navigate = useNavigate()
    const { login } = useAuth() as any
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                submit: null,
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().max(64).required('Email is required'),
                password: Yup.string()
                    .required('Password is required'),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    setSubmitting(true)
                    await login(values.email, values.password, remember)
                    setSubmitting(false)
                    await setPopupText('Logged in successfully')
                    await navigate('/dashboard/upcoming')
                    setStatus({ success: true })
                } catch (err) {
                    setSubmitting(false)
                    setStatus({ success: false })
                    setErrors({ submit: err.message })
                    setPopupText(err.message)
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }): JSX.Element => (
                <form noValidate onSubmit={handleSubmit} {...props}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <StyledTextField
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
                            inputProps={{
                                style: {
                                    WebkitBoxShadow: '0 0 0 1000px white inset',
                                    WebkitTextFillColor: 'black',
                                },
                            }}
                        />
                        <StyledTextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Password"
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
                        <Box sx={{ alignItems: 'center', display: 'flex' }}>
                            <Checkbox
                                name="remember"
                                checked={remember}
                                onChange={(event) => setRemember(event.target.checked)}
                                sx={{
                                    color: '#000000',
                                    '&.Mui-checked': {
                                        color: '#0A1B3C',
                                    },
                                }}
                            />
                            <Typography color="#0A1B3C" fontSize={14} fontWeight={400}>
                                Remember me
                            </Typography>
                            <Link
                                to="/authentication/password-recovery"
                                component={BrowserRouter}
                                fontSize={14}
                                fontWeight={400}
                                ml={'auto'}
                                sx={{ textDecoration: 'none', p: '2px', px: '5px', color: '#5957d5' }}
                            >
                                Forgot your password?
                            </Link>
                        </Box>
                        {errors.submit && (
                            <Box>
                                <FormHelperText error>{errors.submit as any}</FormHelperText>
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
                                Log In
                            </Button>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    )
}
export default LoginJWT
