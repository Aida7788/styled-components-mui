import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, FormHelperText, IconButton, TextField, TextFieldProps, styled } from '@mui/material'
import { Formik } from 'formik'
import React, { SetStateAction, useEffect, useState } from 'react'
import Loader from 'src/components/general/loader'
import { API } from 'src/services/adminApi'
import { API as eventAPI } from 'src/services/eventApi'
import { FrontEndError } from 'src/utils/error'
import * as Yup from 'yup'

const StyledTextField = styled(({ className, ...props }: TextFieldProps) => (
    <TextField classes={{ root: className }} {...props} />
))(({ theme }) => ({
    label: {
        color: 'black',
        fontSize: 18,
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'skyblue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'skyblue',
        },
    },
    '&:not(.Mui-focused) fieldset': {
        borderColor: 'cornflowerblue',
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

export default function AdminModal({
    eventId,
    setState,
}: {
    eventId: string
    setState: React.Dispatch<SetStateAction<boolean>>
}) {
    const [isLoading, setIsLoading] = useState(true)
    const [event, setEvent] = useState<any>({})

    useEffect(() => {
        if (eventId) {
            getEvent()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventId])

    const getEvent = async () => {
        setIsLoading(true)
        const event = await eventAPI.getEventDetails({ eventId })
        setEvent(event)
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Box
                    sx={{
                        bgcolor: 'background.white',
                        p: '25px',
                        borderRadius: '12px',

                        flexDirection: 'column',
                        width: '550px',
                        gap: '20px',
                        zIndex: '1500',

                        display: 'flex',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'end',
                        }}
                    >
                        <IconButton
                            sx={{
                                width: '35px',
                                height: '35px',
                                bgcolor: 'grey.600',
                                borderRadius: '14px',
                            }}
                            onClick={() => setState(false)}
                        >
                            <CloseIcon sx={{ fontSize: '25px' }} />
                        </IconButton>
                    </Box>
                    <Formik
                        initialValues={{
                            capacity: Number(event?.meta?.otherPlatforms[0].totalPlaces),
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            capacity: Yup.number().min(0).required('Capacity is required'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
                            try {
                                setIsLoading(true)
                                await API.UpdateEvent({
                                    eventId,
                                    capacity: values.capacity,
                                })
                                setIsLoading(false)
                                setState(false)
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
                                    <StyledTextField
                                        autoFocus
                                        error={Boolean(touched.capacity && errors.capacity)}
                                        fullWidth
                                        helperText={touched.capacity && errors.capacity}
                                        label="Capacity"
                                        placeholder="Capacity"
                                        margin="normal"
                                        name="capacity"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="number"
                                        value={values.capacity}
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
                                        Save
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
