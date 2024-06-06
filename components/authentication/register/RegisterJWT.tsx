import styled from '@emotion/styled'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
    Box,
    Button,
    Checkbox,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material'
import { Formik } from 'formik'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import useAuth from '../../../hooks/useAuth'
import { RegistrationPopup } from './RegisterPopup'

interface RegisterJWTProps {
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

const RegisterJWT: FC<RegisterJWTProps> = ({ setPopupText }) => {
    const { register } = useAuth() as any
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)

    const handlePopupClose = () => {
        setPopupOpen(false)
        navigate('/authentication/login')
    }

    return (
        <>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    passwordConfirm: '',
                    city: '',
                    DOB: '',
                    country: '',
                    policy: false,
                    submit: null,
                }}
                validationSchema={Yup.object().shape({
                    fullName: Yup.string()
                        .matches(
                            /^\s*[a-zA-Z]+\s+[a-zA-Z]+\s*$/,
                            'Name and Surname should contain only letters separated by a single space'
                        )
                        .max(64)
                        .required('Name and Surname is required'),
                    email: Yup.string().max(64).email('Must be a valid Email').required('Email is required'),
                    city: Yup.string()
                        .matches(/^[a-zA-Z\s]*$/, 'City should contain only letters')
                        .max(64)
                        .required('City is required'),
                    country: Yup.string()
                        .matches(/^[a-zA-Z\s]*$/, 'Country should contain only letters')
                        .max(64)
                        .required('Country is required'),
                    password: Yup.string()
                        .max(64)
                        .matches(/^\S{6,}$/, 'Password must contain at least 6 characters')
                        .required('Password is required'),
                    passwordConfirm: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Required'),
                    policy: Yup.boolean().oneOf([true], 'This field must be checked'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        await register(values.email, values.password, values.city, values.country)
                        setPopupOpen(true)
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
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        {/* Fields */}
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                '@media (max-width: 480px)': {
                                    gridTemplateColumns: 'unset',
                                },
                                columnGap: '1rem',
                            }}
                        >
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>Name and Surname</InputLabel>
                                <StyledTextField
                                    error={Boolean(touched.fullName && errors.fullName)}
                                    fullWidth
                                    helperText={touched.fullName && errors.fullName}
                                    label="Name and Surname"
                                    margin="normal"
                                    name="fullName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.fullName}
                                    variant="outlined"
                                    size="small"
                                    inputProps={{
                                        style: {
                                            WebkitBoxShadow: '0 0 0 1000px white inset',
                                            WebkitTextFillColor: 'black',
                                        },
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>Email</InputLabel>
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
                            </Box>
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>City</InputLabel>
                                <StyledTextField
                                    error={Boolean(touched.city && errors.city)}
                                    fullWidth
                                    helperText={touched.city && errors.city}
                                    label="City"
                                    margin="normal"
                                    name="city"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.city}
                                    variant="outlined"
                                    size="small"
                                    inputProps={{
                                        style: {
                                            WebkitBoxShadow: '0 0 0 1000px white inset',
                                            WebkitTextFillColor: 'black',
                                        },
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>Country</InputLabel>
                                <StyledTextField
                                    error={Boolean(touched.country && errors.country)}
                                    fullWidth
                                    helperText={touched.country && errors.country}
                                    label="Country"
                                    margin="normal"
                                    name="country"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    value={values.country}
                                    variant="outlined"
                                    size="small"
                                    inputProps={{
                                        style: {
                                            WebkitBoxShadow: '0 0 0 1000px white inset',
                                            WebkitTextFillColor: 'black',
                                        },
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>Password</InputLabel>
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
                            </Box>
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>Confirm Password</InputLabel>
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
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>How Did You Hear About Us</InputLabel>
                                <StyledTextField
                                    fullWidth
                                    label="How did you hear about us"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{
                                        style: {
                                            WebkitBoxShadow: '0 0 0 1000px white inset',
                                            WebkitTextFillColor: 'black',
                                        },
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel sx={{ color: '#000000' }}>Promo Code</InputLabel>
                                <StyledTextField
                                    fullWidth
                                    label="Enter Promo code"
                                    margin="normal"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{
                                        style: {
                                            WebkitBoxShadow: '0 0 0 1000px white inset',
                                            WebkitTextFillColor: 'black',
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                        {/* Agreement */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <Checkbox
                                checked={values.policy}
                                name="policy"
                                onChange={handleChange}
                                sx={{
                                    color: '#000000',
                                    '&.Mui-checked': {
                                        color: '#0A1B3C',
                                    },
                                }}
                            />
                            <Typography color="#000" fontSize={14} fontWeight={400}>
                                By signing up, you agree to our&nbsp;
                                <span style={{ color: '#5957d5', cursor: 'pointer' }}>Terms</span>
                                &nbsp;and&nbsp;
                                <span style={{ color: '#5957d5', cursor: 'pointer' }}>Privacy Policy</span>.
                            </Typography>
                        </Box>
                        {Boolean(touched.policy && errors.policy) && (
                            <FormHelperText error>{errors.policy}</FormHelperText>
                        )}
                        {errors.submit && (
                            <Box>
                                <FormHelperText error>{errors.submit as any}</FormHelperText>
                            </Box>
                        )}
                        <Box>
                            <Button
                                disabled={isSubmitting || !values.policy}
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
                                Sign up
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
            <RegistrationPopup open={popupOpen} handleClose={handlePopupClose} />
        </>
    )
}

export default RegisterJWT
