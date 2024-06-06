import { omit as _omit } from 'lodash'
import * as Yup from 'yup'

import { DialogContent, DialogTitle, InputLabel } from '@material-ui/core'
import { Box, Button, Dialog, FormHelperText, Grid, Stack, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'

import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import useAuth from 'src/hooks/useAuth'
import { API as UserApi } from 'src/services/userApi'
import { IUser } from 'src/types/local/user'
import { FrontEndError } from 'src/utils/error'

const ContactField = ({ handleBlur, handleChange, value, isError, helperText, title, name }) => {
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
                type="text"
                value={value}
                variant="filled"
                size="small"
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

const ChangeContactInfoDialog = ({ open, onClose, user }: { open; onClose; user: IUser }) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    const { refetchMe } = useAuth()

    return (
        <Dialog open={open} onClose={onClose} maxWidth={'xl'} fullWidth={isSmallScreen}>
            <DialogTitle sx={{ backgroundColor: '#f7f6f4' }}>Contact Information</DialogTitle>
            <DialogContent sx={{ backgroundColor: '#f7f6f4' }}>
                <Formik
                    initialValues={{
                        firstname: user.firstname || '',
                        lastname: user.lastname || '',
                        company: user.company || '',
                        country: user.country || '',
                        city: user.city || '',
                        street_address: user.street_address || '',
                        unit: user.unit || '',
                        zipcode: user.zipcode || '',
                        phoneNumber: user.phoneNumber || '',
                        email: user.email || '',
                        submit: null,
                    }}
                    validationSchema={Yup.object().shape({
                        firstname: Yup.string().max(64),
                        lastname: Yup.string().max(64),
                        company: Yup.string().max(64),
                        country: Yup.string().max(64),
                        city: Yup.string().max(64),
                        street_address: Yup.string().max(64),
                        unit: Yup.string().max(64),
                        zipcode: Yup.number(),
                        phoneNumber: Yup.string().max(64),
                        email: Yup.string().max(64),
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
                        try {
                            await UserApi.updateUser(_omit(values, ['submit']))
                            await refetchMe()
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
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    borderRadius: 2,
                                    p: 1,
                                    border: '1px solid orange',
                                }}
                            >
                                <Typography color={'#000'} fontSize={16} fontWeight={500} mb={'10px'}>
                                    Name
                                </Typography>
                                <Grid container spacing={1} direction={isSmallScreen ? 'column' : 'row'}>
                                    <Grid item xs={4}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.firstname && errors.firstname}
                                            isError={Boolean(touched.firstname && errors.firstname)}
                                            value={values.firstname}
                                            title={'First name'}
                                            name="firstname"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.lastname && errors.lastname}
                                            isError={Boolean(touched.lastname && errors.lastname)}
                                            value={values.lastname}
                                            title={'Last name'}
                                            name="lastname"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.company && errors.company}
                                            isError={Boolean(touched.company && errors.company)}
                                            value={values.company}
                                            title={'Company'}
                                            name="company"
                                        />
                                    </Grid>
                                </Grid>
                                <Typography color={'#000'} fontSize={16} fontWeight={500} mt={'20px'} mb={'10px'}>
                                    Address
                                </Typography>
                                <Grid container spacing={1} direction={isSmallScreen ? 'column' : 'row'}>
                                    <Grid item xs={8}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.street_address && errors.street_address}
                                            isError={Boolean(touched.street_address && errors.street_address)}
                                            value={values.street_address}
                                            title={'Street Address'}
                                            name="street_address"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.unit && errors.unit}
                                            isError={Boolean(touched.unit && errors.unit)}
                                            value={values.unit}
                                            title={'Box / Unit'}
                                            name="unit"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} direction={isSmallScreen ? 'column' : 'row'}>
                                    <Grid item xs={4}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.country && errors.country}
                                            isError={Boolean(touched.country && errors.country)}
                                            value={values.country}
                                            title={'Country'}
                                            name="country"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.city && errors.city}
                                            isError={Boolean(touched.city && errors.city)}
                                            value={values.city}
                                            title={'City'}
                                            name="city"
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.zipcode && errors.zipcode}
                                            isError={Boolean(touched.zipcode && errors.zipcode)}
                                            value={values.zipcode}
                                            title={'Zip Code'}
                                            name="zipcode"
                                        />
                                    </Grid>
                                </Grid>
                                <Typography color={'#000'} fontSize={16} fontWeight={500} mt={'20px'} mb={'10px'}>
                                    Contact
                                </Typography>
                                <Grid container spacing={1} direction={isSmallScreen ? 'column' : 'row'}>
                                    <Grid item xs={6}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                            isError={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                            value={values.phoneNumber}
                                            title={'Phone Number'}
                                            name="phoneNumber"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <ContactField
                                            handleBlur={handleBlur}
                                            handleChange={handleChange}
                                            helperText={touched.email && errors.email}
                                            isError={Boolean(touched.email && errors.email)}
                                            value={values.email}
                                            title={'Email'}
                                            name="email"
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
                                    Update Information
                                </Button>
                            </Stack>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}

export default ChangeContactInfoDialog
