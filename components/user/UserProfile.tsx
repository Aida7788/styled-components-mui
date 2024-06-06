import PhoneIcon from '@mui/icons-material/Phone'
import { Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { IUser } from 'src/types/local/user'
import ChangeInfoDialog from './ChangeInfoDialog'
import ChangePasswordDialog from './ChangePasswordDialog'

const UserProfile = ({ user }: { user: IUser }) => {
    const [isChangeInfoDialogOpened, setIsChangeInfoDialogOpened] = useState(false)
    const [isChangePasswordDialogOpened, setIsChangePasswordDialogOpened] = useState(false)

    return (
        <Grid p={4} container my={4}>
            <ChangeInfoDialog
                open={isChangeInfoDialogOpened}
                onClose={() => setIsChangeInfoDialogOpened(false)}
                user={user}
            />
            <ChangePasswordDialog
                open={isChangePasswordDialogOpened}
                onClose={() => setIsChangePasswordDialogOpened(false)}
                user={user}
            />
            <Grid item xs={12} sm={6}>
                <Typography variant="h5" color={'#1849a9'}>
                    User's info
                </Typography>
                <Divider variant="fullWidth" sx={{ my: 2 }} />
                <Typography marginBottom={1}>{user.username}</Typography>
                <Typography marginBottom={1}>
                    {user.firstname} {user.lastname}, {user.company}
                </Typography>
                <Typography marginBottom={1}>
                    {user.street_address}, {user.unit} - {user.zipcode}
                </Typography>
                <Typography marginBottom={1}>
                    {user.country}, {user.city}
                </Typography>
                <Stack direction={'row'} alignItems={'flex-start'} marginBottom={1}>
                    <PhoneIcon />
                    <Typography>{user.phoneNumber}</Typography>
                </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Typography variant="h5" color={'#1849a9'}>
                    Payment info
                </Typography>
                <Divider variant="fullWidth" sx={{ my: 2 }} />
                {/* <Typography marginBottom={1}>visa **** **** *** 9765</Typography> */}
                <Typography marginBottom={1} fontWeight={600}>
                    Billing Address
                </Typography>
                {/* <Typography marginBottom={1}>4517 Washington Ave. Manchester, Kentucky 39495</Typography> */}
                <Typography marginBottom={1} fontWeight={600}>
                    Next Billing Period
                </Typography>
                {/* <Typography marginBottom={1}>8/2/2023</Typography> */}
            </Grid>

            <Grid item xs={12} sm={12} mt={20}>
                <Stack direction={'row'} justifyContent={'flex-start'}>
                    <Button
                        sx={{
                            backgroundColor: '#1849a9',
                            ':hover': {
                                backgroundColor: 'black',
                            },
                        }}
                        onClick={() => setIsChangeInfoDialogOpened(true)}
                    >
                        Change info
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: '#1849a9',
                            ':hover': {
                                backgroundColor: 'black',
                            },
                            mx: 1,
                        }}
                    >
                        Change Payment Method
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: '#1849a9',
                            ':hover': {
                                backgroundColor: 'black',
                            },
                        }}
                        onClick={() => setIsChangePasswordDialogOpened(true)}
                    >
                        Change Password
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default UserProfile
