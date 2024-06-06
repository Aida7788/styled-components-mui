import AddIcon from '@mui/icons-material/Add'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {
    Avatar,
    Box,
    Checkbox,
    Grid,
    IconButton,
    ListItemText,
    MenuItem,
    Select,
    Switch,
    SxProps,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState, type FC } from 'react'
import Loader from 'src/components/general/loader'
import { API as AdminApi } from 'src/services/adminApi'
import { IUser } from 'src/types/local/user'
import { hideCardNumber } from 'src/utils/string'
import BillingHistory from './BillingHistory'
import EditUserDetails from './EditUserDetails'
import EventsTable from './EventsTable'
import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'
import { TUserAdminPermissions } from 'src/types/local/adminPermissions'

type TUserDetailsProps = {
    userId: string
    onReturn: () => void
}

export type TEditUserDetailsProps = {
    open: boolean
    onClose: () => void
    user: any
}

const UserDetails: FC<TUserDetailsProps> = (props: TUserDetailsProps) => {
    const { userId, onReturn } = props

    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<IUser | null>(null)

    const [tiers, setTiers] = useState([])

    const [isEditUserDetailsOpened, setIsEditUserDetailsOpened] = useState(false)
    const [isBillingHistoryOpened, setIsBillingHistoryOpened] = useState(false)

    useEffect(() => {
        const fetchPaymentPlans = async () => {
            const paymentPlans = await AdminApi.getPaymentPlans()
            setTiers(paymentPlans.data)
        }

        fetchPaymentPlans()
    }, [])

    const handleChangeUserType = async (type: string) => {
        setIsLoading(true)
        await AdminApi.updateUser({ userId, isAdmin: type === 'admin' ? true : false })
        setIsLoading(false)
        getUser()
    }

    const handleChangeAdminPermissions = async (permissions: TUserAdminPermissions[]) => {
        setIsLoading(true)
        await AdminApi.updateUser({ userId, permissions })
        setIsLoading(false)
        getUser()
    }

    const handleChangeUserPaymentPlan = async (planId: string) => {
        setIsLoading(true)
        await AdminApi.updateUserPaymentPlan({ userId, planId })
        setIsLoading(false)
        getUser()
    }

    const handleChangeUserActivatedStatus = async (isActivated: boolean) => {
        setIsLoading(true)
        await AdminApi.updateUser({ userId, activated: isActivated })
        setIsLoading(false)
        getUser()
    }

    useEffect(() => {
        if (userId) {
            getUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    const getUser = async () => {
        setIsLoading(true)
        const user = await AdminApi.getUser(userId)
        setIsLoading(false)
        setUser({
            ...user,
            // FIXME:
            email: 'exapmle@test.com',
            fullName: 'Cedar Ronald',
            cardNumber: 4567890123456789,
        })
    }

    const labelSx: SxProps = {
        color: '#475467',
        fontSize: 14,
    }
    const valueSx: SxProps = {
        color: '#404040',
        fontSize: 16,
        cursor: 'default',
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        py: '10px',
                        width: '96%',
                        mx: 'auto',
                    }}
                >
                    <EditUserDetails
                        open={isEditUserDetailsOpened}
                        onClose={() => {
                            setIsEditUserDetailsOpened(false)
                        }}
                        user={user}
                    />
                    <BillingHistory
                        open={isBillingHistoryOpened}
                        onClose={() => {
                            setIsBillingHistoryOpened(false)
                        }}
                        userId={userId}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingBlock: '10px',
                            px: '10px',
                            cursor: 'pointer',
                        }}
                        onClick={onReturn}
                    >
                        <ArrowBackIosIcon sx={{ mr: 1 }} />
                        <Typography variant="h5">User Details</Typography>
                    </Box>
                    <Grid container flexDirection={'column'} width={1048} alignSelf={'center'}>
                        <Grid container padding={0} direction={'row'} justifyContent={'space-between'}>
                            <Grid item>
                                <Grid container spacing={0} alignItems={'center'}>
                                    <Grid item>
                                        <Avatar sx={{ width: 80, height: 80 }} />
                                    </Grid>
                                    <Grid item sx={{ height: '20px', ml: 2 }}>
                                        <Typography variant="h6">{user.username}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid
                                    container
                                    spacing={0}
                                    alignItems="center"
                                    justifyContent="center"
                                    direction="row"
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '12px',
                                        height: 80,
                                        paddingX: 2,
                                        width: 230,
                                    }}
                                >
                                    <Grid item>
                                        <Typography variant="h6" color={user.activated ? '#1849a9' : '#dd2626'}>
                                            {user.activated ? 'Activated' : 'Not activated'}
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{ ml: 2 }}>
                                        <Switch
                                            checked={user.activated}
                                            onChange={(e) => handleChangeUserActivatedStatus(e.target.checked)}
                                            sx={{
                                                '& .MuiSwitch-switchBase': {
                                                    '&.Mui-checked': {
                                                        color: '#1849a9',
                                                        '& + .MuiSwitch-track': {
                                                            backgroundColor: '#1849a9',
                                                        },
                                                    },
                                                },
                                                '& .MuiSwitch-track': {
                                                    backgroundColor: '#ef0000',
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 2, mt: 1 }}>
                            <Grid
                                container
                                spacing={0}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: 1048, height: 90 }}
                            >
                                <Grid item xs={2}>
                                    <Box marginLeft={2}>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Email
                                        </Typography>
                                        <Typography sx={valueSx}>{user.username}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box sx={{ overflow: 'hidden' }}>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Password
                                        </Typography>
                                        <Typography
                                            sx={{
                                                ...valueSx,
                                                filter: 'blur(5px) opacity(0.3)',
                                                '&:hover': {
                                                    filter: 'none',
                                                },
                                                transition: 'filter 0.3s',
                                            }}
                                        >
                                            {user.password}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Location
                                        </Typography>
                                        <Typography sx={valueSx}>{`${user.country}, ${user.city}`}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Phone number
                                        </Typography>
                                        <Typography sx={valueSx}>{user.phoneNumber}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1} alignSelf={'center'}>
                                    <IconButton
                                        onClick={() => {
                                            setIsEditUserDetailsOpened(true)
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 2 }}>
                            <Grid
                                container
                                spacing={0}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: 1048, height: 90 }}
                            >
                                <Grid item xs={2}>
                                    <Box marginLeft={2}>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            User Payment Plan
                                        </Typography>
                                        <Select
                                            defaultValue={user.payment_plans[0]?._id || undefined}
                                            displayEmpty
                                            inputProps={
                                                {}
                                                // { 'aria-label': 'Without label' }
                                            }
                                            sx={{
                                                '.MuiSelect-select': { paddingY: '0.5px', paddingX: '12px' },
                                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            }}
                                            onChange={(e) => {
                                                handleChangeUserPaymentPlan(e.target.value as string)
                                            }}
                                        >
                                            {tiers.map((tier) => (
                                                <MenuItem key={tier._id} value={tier._id}>
                                                    {tier.name}
                                                </MenuItem>
                                            ))}
                                            <MenuItem value={undefined}>Undefined</MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Typography sx={{ ...labelSx, mb: '10px' }}>User Type</Typography>
                                        <Select
                                            defaultValue={user.isAdmin ? 'admin' : 'user'}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            sx={{
                                                '.MuiSelect-select': { paddingY: '0.5px', paddingX: '12px' },
                                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            }}
                                            onChange={(e) => {
                                                handleChangeUserType(e.target.value)
                                            }}
                                        >
                                            <MenuItem key={'admin'} value={'admin'} title={'admin'}>
                                                Admin
                                            </MenuItem>
                                            <MenuItem key={'user'} value={'user'} title={'user'}>
                                                User
                                            </MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            height: '100%',
                                        }}
                                    >
                                        <Typography sx={{ ...labelSx, mb: '10px' }}>Permissions</Typography>
                                        <Select
                                            multiple
                                            value={user.permissions || []}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            renderValue={(selected) =>
                                                selected.length === Object.keys(USER_PERMISSIONS).length
                                                    ? 'All'
                                                    : `${selected.length} / ${Object.keys(USER_PERMISSIONS).length}`
                                            }
                                            sx={{
                                                '.MuiSelect-select': { paddingY: '0.5px', paddingX: '12px' },
                                                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            }}
                                            onChange={(e) => {
                                                handleChangeAdminPermissions(e.target.value as TUserAdminPermissions[])
                                            }}
                                        >
                                            {Object.keys(USER_PERMISSIONS).map((permission) => (
                                                <MenuItem key={permission} value={permission}>
                                                    <Checkbox
                                                        color="error"
                                                        checked={
                                                            (user.permissions || []).indexOf(
                                                                permission as keyof typeof USER_PERMISSIONS
                                                            ) > -1
                                                        }
                                                    />
                                                    <ListItemText
                                                        primary={permission
                                                            .toLowerCase()
                                                            .replace(/_/g, ' ')
                                                            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        height={21}
                                        onClick={() => {
                                            setIsBillingHistoryOpened(true)
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Next billing date
                                        </Typography>
                                        <VisibilityIcon sx={{ ml: 0.5, mb: 1.5 }} />
                                    </Box>
                                    <Typography sx={valueSx}>20/09/23</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        height={21}
                                        onClick={() => {
                                            setIsBillingHistoryOpened(true)
                                        }}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Allowed extra fetches
                                        </Typography>
                                    </Box>
                                    <TextField
                                        sx={{
                                            '.MuiInputBase-input': {
                                                p: 0,
                                                ml: 0.3,
                                            },
                                        }}
                                        value={user.allowed_extra_fetches || 0}
                                        type="number"
                                    >
                                        {user.allowed_extra_fetches || 0}
                                    </TextField>
                                </Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>
                        </Grid>
                        <Grid item sx={{ mb: 2 }}>
                            <Grid
                                container
                                spacing={0}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: 1048, height: 90 }}
                            >
                                <Grid item>
                                    <Box marginLeft={2}>
                                        <Typography display="block" sx={labelSx}>
                                            The XML or JSON notification document for this purchase.The XML or JSON
                                            notification document used in web key generator
                                        </Typography>
                                        <Typography sx={valueSx}>Pro</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item alignSelf={'start'}>
                            <Typography variant="h6">Credit card details</Typography>
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                spacing={0}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: 1048, height: 90 }}
                            >
                                <Grid item xs={3} marginLeft={2}>
                                    <Grid container flexWrap={'nowrap'} alignItems={'center'}>
                                        <Grid item sx={{ mr: 2 }}>
                                            <img src="/static/icons/mastercard.svg" alt="" style={{ width: 34 }} />
                                        </Grid>
                                        <Grid item>
                                            <Box>
                                                <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                                    Card number
                                                </Typography>
                                                <Typography sx={valueSx}>{hideCardNumber(user.cardNumber)}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Name on card
                                        </Typography>
                                        <Typography sx={valueSx}>Ronald Cedar</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Expiry date
                                        </Typography>
                                        <Typography sx={valueSx}>20/09/23</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={1} alignSelf={'center'}>
                                    <AddIcon />
                                    <DeleteOutlineIcon color="error" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item alignSelf={'start'}>
                            <Typography variant="h6">Billing address</Typography>
                        </Grid>
                        <Grid item>
                            <Grid
                                container
                                spacing={0}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                                sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', width: 1048, height: 90 }}
                            >
                                <Grid item xs={12}>
                                    <Box marginLeft={2}>
                                        <Typography display="block" marginBottom={'10px'} sx={labelSx}>
                                            Billing address
                                        </Typography>
                                        <Typography sx={valueSx}>
                                            Avenue 57253 House no #7216582 Cleveland, OH, USA
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item alignSelf={'start'}>
                            <Typography variant="h6">Data request</Typography>
                        </Grid>
                        <Grid item>
                            <EventsTable user={user} />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    )
}

export default UserDetails
