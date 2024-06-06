import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Divider,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Typography,
} from '@mui/material'
import type { FC } from 'react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import CogIcon from '../../../icons/Cog'
import UserIcon from '../../../icons/User'
import { FrontEndError } from 'src/utils/error'

const AccountPopover: FC = () => {
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)

    const handleOpen = (): void => {
        setOpen(true)
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    const handleLogout = async (): Promise<void> => {
        try {
            handleClose()
            await logout()
            navigate('/')
        } catch (err) {
            FrontEndError(err)
        }
    }

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpen}
                ref={anchorRef}
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                <Avatar
                    src={user?.avatar}
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                />
            </Box>
            <Popover
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom',
                }}
                keepMounted
                onClose={handleClose}
                open={open}
                PaperProps={{
                    sx: { width: 240 },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <Typography color="black" variant="subtitle2">
                        {user?.username}
                    </Typography>
                </Box>
                <Divider />
                <Box sx={{ mt: 2 }}>
                    <MenuItem component={RouterLink} to="/dashboard/user">
                        <ListItemIcon>
                            <UserIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography color="textPrimary" variant="subtitle2">
                                    Profile
                                </Typography>
                            }
                        />
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/dashboard/account">
                        <ListItemIcon>
                            <CogIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography color="textPrimary" variant="subtitle2">
                                    Settings
                                </Typography>
                            }
                        />
                    </MenuItem>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button color="inherit" fullWidth onClick={handleLogout} variant="outlined">
                        Logout
                    </Button>
                </Box>
            </Popover>
        </>
    )
}

export default AccountPopover
