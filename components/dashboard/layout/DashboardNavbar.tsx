import type { AppBarProps } from '@mui/material'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import Button from '@mui/material/Button'
import { experimentalStyled } from '@mui/material/styles'
import PropTypes from 'prop-types'
import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

import useAuth from 'src/hooks/useAuth'

import MenuIcon from '../../../icons/Menu'
import logo from '../../../icons/logo-dark.svg'

import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'

interface DashboardNavbarProps extends AppBarProps {
    onSidebarMobileOpen?: () => void
}

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
    ...(theme.palette.mode === 'light' && {
        backgroundColor: theme.palette.primary.main,
        boxShadow: 'none',
        color: theme.palette.primary.contrastText,
        paddingRight: 'unset !important',
    }),
    ...(theme.palette.mode === 'dark' && {
        backgroundColor: theme.palette.background.paper,
        boxShadow: 'none',
        paddingRight: 'unset !important',
    }),
    zIndex: theme.zIndex.drawer + 1000,
}))

const activeButton = (path: string, include: string[]) => {
    if (
        include.filter((elem) => {
            return path.includes(elem)
        }).length > 0
    ) {
        return { borderBottom: '2px solid #E4933D', backgroundImage: 'linear-gradient(to bottom, #091E50, #132E69)' }
    } else return { bgcolor: 'transparent', color: 'primary' }
}

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
    const location = useLocation()
    // const navigate = useNavigate()

    const buttonNavBarStyle = {
        py: '1.21rem',
        width: { lg: '240px' },
        '&:hover': { backgroundImage: 'linear-gradient(to bottom, #091E50, #132E69)' },
    }

    const { onSidebarMobileOpen, ...other } = props
    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    // const open = Boolean(anchorEl)

    // const [anchorElAnalytics, setAnchorElAnalytics] = useState<null | HTMLElement>(null)

    // const openAnalytics = Boolean(anchorElAnalytics)

    // const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)

    // const handleClickAnalytics = (event: MouseEvent<HTMLButtonElement>) => setAnchorElAnalytics(event.currentTarget)

    // const handleClose = (path: string) => {
    //     if (path.length > 0) navigate(path)
    //     setAnchorEl(null)
    //     if (anchorElAnalytics) setAnchorElAnalytics(null)
    // }

    const {
        user: { permissions },
    } = useAuth()

    return (
        <DashboardNavbarRoot {...other}>
            <Toolbar
                sx={{
                    height: 64,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    backgroundImage: 'linear-gradient(to bottom, #0A1453, #000000)',
                }}
            >
                <IconButton onClick={onSidebarMobileOpen} sx={{ display: { lg: 'none' }, color: '#FFFFFF' }}>
                    <MenuIcon fontSize="small" />
                </IconButton>
                <Box
                    sx={{
                        color: 'primary',
                        // paddingRight: '24px',
                        // width: '16%',
                        // display: 'flex',
                        alignItems: 'center',
                        // gap: '20px',
                    }}
                >
                    {/* <img src={logo} alt="" /> */}
                    {/* <Typography
                        component={'span'}
                        sx={{
                            color: 'primary.main',
                            fontSize: '19px',
                            fontWeight: '500',
                        }}
                    >
                        Ticket Metric
                    </Typography> */}
                    <img
                        style={{
                            width: '10rem',
                            height: '2rem',
                            alignItems: 'center',
                            objectFit: 'cover',
                            marginLeft: '-8px',
                            marginRight: '8px',
                            imageRendering: 'crisp-edges',
                        }}
                        src={logo}
                        alt=""
                    />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap:'20px',
                        width: '100%',
                    }}
                >
                    <Link to="/dashboard/upcoming">
                        <Button
                            sx={{
                                ...buttonNavBarStyle,
                                ...activeButton(location.pathname, ['/dashboard/upcoming']),
                            }}
                        >
                            Upcoming Sales
                        </Button>
                    </Link>
                    <Link to="/dashboard/event_analytics">
                        <Button
                            sx={{
                                ...buttonNavBarStyle,
                                ...activeButton(location.pathname, ['/event_analytics', '/secondary-favorites', '/primary-favorites']),
                            }}
                        >
                            Event Analytics
                        </Button>
                    </Link>
                    <Link to="/dashboard/metric">
                        <Button
                            sx={{
                                ...buttonNavBarStyle,
                                ...activeButton(location.pathname, ['/metric']),
                            }}
                        >
                            Artist Metric
                        </Button>
                    </Link>
                    {/* <Link to="/dashboard/training">
                        <Button
                            sx={{
                                ...buttonNavBarStyle,
                                ...activeButton(location.pathname, '/dashboard/training'),
                            }}
                        >
                            Training
                        </Button>
                    </Link> */}
                    {permissions?.includes(USER_PERMISSIONS.MANAGE_ADMIN_DASHBOARD) && (
                        <Link to="/dashboard/admin">
                            <Button
                                sx={{
                                    ...buttonNavBarStyle,
                                    ...activeButton(location.pathname,['/dashboard/admin']),
                                }}
                            >
                                Admin
                            </Button>
                        </Link>
                    )}

                    {/* <Menu
                        id="basic-menu"
                        anchorEl={anchorElAnalytics}
                        open={openAnalytics}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem onClick={() => handleClose('/dashboard/primary-analytics/6553497d7071d1029bbba816')}>
                            Primary Analytics
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleClose('/dashboard/secondary-analytics/6553497d7071d1029bbba816')}>
                            Secondary Analytics
                        </MenuItem>
                    </Menu> */}
                    {/* <Button
                        sx={{
                            ...buttonNavBarStyle,
                            ...activeButton(location.pathname, '/dashboard/primary-sellout'),
                        }}
                        onClick={handleClick}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}>
                        Sellout
                    </Button> */}
                    {/* <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem onClick={() => handleClose('/dashboard/primary-sellout')}>Primary SellOut</MenuItem>
                        <MenuItem onClick={() => handleClose('/dashboard/primary-sellout-weekly')}>Primary Sellout
                            Weekly</MenuItem>
                        <MenuItem onClick={() => handleClose('/dashboard/primary-top-movers')}>Primary Top
                            Movers</MenuItem>
                        <MenuItem onClick={() => handleClose('/dashboard/secondary-top-movers')}>Secondary Top
                            Movers</MenuItem>
                        <MenuItem onClick={() => handleClose('/dashboard/percentage-leader')}>Percentage
                            Leader</MenuItem>
                        <MenuItem onClick={() => handleClose('/dashboard/top-price-surge')}>Top Price Surge</MenuItem>
                        <MenuItem onClick={() => handleClose('/dashboard/secondary-favorites')}>Primary
                            Favourites</MenuItem>
                        <MenuItem onClick={() => handleClose('/dashboard/secondary-favorites')}>Secondary
                            Favourites</MenuItem>
                    </Menu> */}
                    {/* <Link to="/dashboard/user">
                        <Button
                            sx={{
                                ...buttonNavBarStyle,
                                ...activeButton(location.pathname, '/user'),
                            }}>
                            User
                        </Button>
                    </Link> */}
                </Box>
            </Toolbar>
        </DashboardNavbarRoot>
    )
}
DashboardNavbar.propTypes = { onSidebarMobileOpen: PropTypes.func }
export default DashboardNavbar
