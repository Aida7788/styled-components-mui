import CloseIcon from '@mui/icons-material/Close'
import {
    Box,
    Button,
    FormHelperText,
    IconButton,
    TextField,
    TextFieldProps,
    Chip,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Select,
    SelectProps,
    MenuItem,
    FormControl,
} from '@mui/material'
import { Formik, FieldArray } from 'formik'
import React, { SetStateAction, useEffect, useState } from 'react'
import Loader from 'src/components/general/loader'
import { API as adminAPI } from 'src/services/adminApi'
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

const StyledSelect = styled(({ className, ...props }: SelectProps) => (
    <Select classes={{ root: className }} {...props} />
))(({ theme }) => ({
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
    '& .MuiInputLabel-root .MuiFormLabel-roo': {
        color: 'black',
    },
    '& .Mui-focused .MuiInputLabel-root .MuiFormLabel-roo': {
        color: 'black',
    },
    '& .MuiInputLabel-shrink .MuiFormLabel-roo': {
        color: 'black',
    },
    '& .MuiInputLabel-root.Mui-focused .MuiFormLabel-roo': {
        color: '#000',
    },
}))

export default function AddEventModal({ setState }: { setState: React.Dispatch<SetStateAction<boolean>> }) {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        const result = await adminAPI.getParserList()
        setTasks(result)
    }

    useEffect(() => {
        getTasks()
    }, [])

    const [isLoading, setIsLoading] = useState(false)

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
                        width: '900px',
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
                            keywords: [],
                            newKeyword: '',
                            source: '',
                            submit: null,
                        }}
                        validationSchema={Yup.object().shape({
                            keywords: Yup.array().min(1, 'Must contain at least 1 word'),
                            newKeyword: Yup.string().min(1, 'Must be at least 1 character'),
                            source: Yup.string().required('Source is required'),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
                            try {
                                setIsLoading(true)
                                await adminAPI.addToParser(values.keywords, values.source)
                                setIsLoading(false)
                                getTasks()
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
                            setFieldValue,
                        }): JSX.Element => (
                            <form noValidate onSubmit={handleSubmit}>
                                <FormControl fullWidth margin="normal">
                                    <StyledSelect
                                        labelId="source-label"
                                        id="source"
                                        name="source"
                                        value={values.source}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.source && Boolean(errors.source)}
                                        variant="outlined"
                                    >
                                        <MenuItem value="ticketmaster">Ticketmaster</MenuItem>
                                        <MenuItem value="axs">AXS</MenuItem>
                                    </StyledSelect>
                                    {touched.source && errors.source && (
                                        <FormHelperText error>{errors.source}</FormHelperText>
                                    )}
                                </FormControl>
                                <FieldArray
                                    name="keywords"
                                    render={(arrayHelpers) => (
                                        <>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <StyledTextField
                                                    autoFocus
                                                    error={Boolean(touched.newKeyword && errors.newKeyword)}
                                                    fullWidth
                                                    label="Add keyword"
                                                    placeholder="Enter keyword"
                                                    margin="normal"
                                                    name="newKeyword"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="text"
                                                    value={values.newKeyword}
                                                    variant="outlined"
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === 'Enter' &&
                                                            values.newKeyword &&
                                                            !errors.newKeyword
                                                        ) {
                                                            e.preventDefault()
                                                            arrayHelpers.push(values.newKeyword)
                                                            setFieldValue('newKeyword', '')
                                                        }
                                                    }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => {
                                                        if (values.newKeyword && !errors.newKeyword) {
                                                            arrayHelpers.push(values.newKeyword)
                                                            setFieldValue('newKeyword', '')
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </Box>
                                            {errors.newKeyword && (
                                                <FormHelperText error>{errors.newKeyword}</FormHelperText>
                                            )}
                                            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {values.keywords &&
                                                    values.keywords.map((keyword, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={keyword}
                                                            onDelete={() => arrayHelpers.remove(index)}
                                                            color="primary"
                                                        />
                                                    ))}
                                            </Box>
                                        </>
                                    )}
                                />
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
                                        Add Event
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                    <Button
                        onClick={() => {
                            getTasks()
                        }}
                        color="info"
                    >
                        Refresh
                    </Button>
                    <Box sx={{ mt: 4 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Current Date Time</TableCell>
                                    <TableCell>Keywords</TableCell>
                                    <TableCell>Source</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.map((task) => (
                                    <TableRow key={task._id}>
                                        <TableCell>{task.current_date_time}</TableCell>
                                        <TableCell>{task.keywords}</TableCell>
                                        <TableCell>{task.source}</TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={async () => {
                                                    setIsLoading(true)
                                                    await adminAPI.removeFromParserList(task._id)
                                                    getTasks()
                                                    setIsLoading(false)
                                                }}
                                                color="warning"
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            )}
        </>
    )
}
