import * as Yup from 'yup'
import { omit as _omit } from 'lodash'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Formik } from 'formik'
import { DialogContent, DialogTitle, InputLabel } from '@material-ui/core'
import { Box, Button, Dialog, FormHelperText, Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

import { IUser } from 'src/types/local/user'
import { API as UserApi } from 'src/services/userApi'
import { FrontEndError } from 'src/utils/error'

const PasswordField = ({ handleBlur, handleChange, value, isError, helperText, title, name }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleToggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }

    return (
        <>
            <InputLabel sx={{ color: '#313749', textTransform: 'uppercase', fontSize: 14 }}>{title}</InputLabel>
            <TextField
                autoFocus
                error={isError}
                fullWidth
                helperText={helperText}
                label={false}
                margin="normal"
                name={name}
                onBlur={handleBlur}
                onChange={handleChange}
                type={isShowPassword ? 'text' : 'password'}
                value={value}
                variant="filled"
                size="small"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleToggleShowPassword}
                                edge="end"
                            >
                                {isShowPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    border: '1px solid #F2F2F2',
                    bgcolor: '#fff',
                    mt: 0,
                    borderRadius: 2,
                    '& .MuiInputBase-input': {
                        p: 1,
                    },
                }}
            />
        </>
    )
}

const ChangePasswordDialog = ({ open, onClose, user }: { open; onClose; user: IUser }) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'xl'} fullWidth={isSmallScreen}>
            <DialogTitle sx={{ backgroundColor: '#f7f6f4' }}>Change password</DialogTitle>
            <DialogContent sx={{ backgroundColor: '#f7f6f4' }}>
                <Formik
                    initialValues={{
                        oldPassword: '',

                        password: '',
                        confirmNewPassword: '',

                        submit: null,
                    }}
                    validationSchema={Yup.object().shape({
                        oldPassword: Yup.string().min(5),

                        password: Yup.string().min(5),
                        confirmNewPassword: Yup.string()
                            .min(5)
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm new password is required'),
                    })}
                    onSubmit={async (values): Promise<void> => {
                        try {
                            const result = await UserApi.updateUser(_omit(values, ['submit']))

                            if (result instanceof Error) {
                                toast(result.message)
                                return
                            }

                            toast('Password updated successfully')
                            onClose()
                        } catch (err) {
                            FrontEndError(err)
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
                            <Box
                                sx={{
                                    width: '400px',
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    p: 1,
                                    border: '1px solid orange',
                                }}
                            >
                                <Grid container spacing={1} direction={'column'}>
                                    <Grid item xs={4}>
                                        <PasswordField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.oldPassword && errors.oldPassword}
                                            isError={Boolean(touched.oldPassword && errors.oldPassword)}
                                            value={values.oldPassword}
                                            title={'Old password'}
                                            name="oldPassword"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <PasswordField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.password && errors.password}
                                            isError={Boolean(touched.password && errors.password)}
                                            value={values.password}
                                            title={'New password'}
                                            name="password"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <PasswordField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                                            isError={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                                            value={values.confirmNewPassword}
                                            title={'Confirm new password'}
                                            name="confirmNewPassword"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            {errors.submit && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit as any}</FormHelperText>
                                </Box>
                            )}
                            <Stack direction={'row'} justifyContent={'flex-end'} sx={{ mt: 2 }}>
                                <Button
                                    disabled={isSubmitting}
                                    size="large"
                                    type="reset"
                                    variant="contained"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={isSubmitting}
                                    size="medium"
                                    type="submit"
                                    variant="contained"
                                    color={'info'}
                                    sx={{ color: '#fff' }}
                                >
                                    Change password
                                </Button>
                            </Stack>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default ChangePasswordDialog
