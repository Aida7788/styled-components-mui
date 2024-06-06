import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { useState, type FC } from 'react'
import { API } from 'src/services/adminApi'

type TEditUserDetailsProps = {
    open: boolean
    onClose: () => void
    user: any
}

const textFieldsSx = {
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
}

const EditUserDetails: FC<TEditUserDetailsProps> = ({ open, onClose, user }) => {
    const [form, setForm] = useState({ username: user.username, phoneNumber: user.phoneNumber })

    const updateUser = async () => {
        await API.updateUser({ userId: user._id, ...form })
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#f7f6f4' }}>Edit user details</DialogTitle>
            <DialogContent sx={{ backgroundColor: '#f7f6f4' }}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ backgroundColor: 'white', borderRadius: 2, p: 2 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="Username"
                                type="text"
                                value={form.username}
                                onChange={(e) => {
                                    setForm((prev) => ({ ...prev, username: e.target.value }))
                                }}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldsSx}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                type="email"
                                value={user.email}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldsSx}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="location"
                                label="Location"
                                type="text"
                                value={`${user.country}, ${user.city}`}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldsSx}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="phone"
                                label="Phone number"
                                type="tel"
                                value={user.phoneNumber}
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                sx={textFieldsSx}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                        <Button
                            onClick={updateUser}
                            variant="contained"
                            sx={{
                                backgroundColor: '#0a1b3e',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#2250b9',
                                },
                            }}
                        >
                            Save changes
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserDetails
