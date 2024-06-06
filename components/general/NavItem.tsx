import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import type { ListItemProps } from '@mui/material'
import { Box, Button, Collapse, IconButton, ListItem, ListItemIcon, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import type { FC, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import ChevronDownIcon from '../../icons/ChevronDown'
import ChevronUpIcon from '../../icons/ChevronUp'

interface NavItemProps extends ListItemProps {
    active?: boolean
    children?: ReactNode
    depth: number
    icon?: any
    info?: ReactNode
    open?: boolean
    path?: string
    title: string
    hover?: string
    tooltip?: string
    collapsed?: boolean
    setCollapsed: any
}

const NavItem: FC<NavItemProps> = (props) => {
    const {
        active,
        children,
        depth,
        icon,
        info,
        open: openProp,
        path,
        title,
        hover,
        collapsed,
        setCollapsed,
        tooltip,
        ...other
    } = props
    const [open, setOpen] = useState<boolean>(openProp)
    const [showPopUp, setShowPopUp] = useState(false)
    const handleToggle = (): void => setOpen((prevOpen) => !prevOpen)
    const [showTooltipKey, setShowTooltipKey] = useState<any>()

    useEffect(() => {
        if (collapsed) {
            setOpen(false)
        }
    }, [collapsed])
    // Branch
    if (children) {
        return (
            <Box sx={{ position: 'relative' }}>
                <ListItem
                    onClick={() => {
                        collapsed && setOpen(true)
                        setCollapsed(collapsed && false)
                    }}
                    disableGutters
                    sx={{ display: 'block', py: 0 }}
                    {...other}
                    onMouseEnter={() => setShowTooltipKey(title)}
                    onMouseLeave={() => setShowTooltipKey(null)}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            endIcon={
                                !collapsed &&
                                (!open ? (
                                    <ChevronUpIcon sx={{ marginRight: '18px' }} />
                                ) : (
                                    <ChevronDownIcon sx={{ borderRight: '2px solid #E4933D', marginRight: '18px' }} />
                                ))
                            }
                            onClick={handleToggle}
                            sx={{
                                display: 'flex',
                                gap: '5px',
                                fontWeight: 'fontWeightMedium',
                                justifyContent: 'center',
                                fontSize: '13px',
                                textAlign: 'left',
                                textTransform: 'none',
                                width: '100%',
                                alignItems: 'normal',
                                ...(open && { color: '#E4933D' }),
                                ...(collapsed && {
                                    width: 'fit-content',
                                    margin: 'auto',
                                    backgroundColor: 'transparent',
                                }),
                            }}
                            variant="text"
                            // disabled={collapsed}
                        >
                            <Box>
                                {icon && (
                                    <ListItemIcon
                                        sx={{
                                            color: !open ? 'white' : '#E4933D',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            ...(collapsed && open && { borderRight: '2px solid #E4933D' }),
                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                )}
                            </Box>
                            {!collapsed && <Box sx={{ flexGrow: 1 }}>{title}</Box>}
                            {info}
                        </Button>
                    </Box>
                    {!collapsed && <Collapse in={open}>{children}</Collapse>}
                </ListItem>
                {tooltip && (
                    <Box
                        sx={{
                            display: showTooltipKey === title ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            zIndex: '1600',
                            p: '10px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: '500',
                        }}
                    >
                        {tooltip}
                    </Box>
                )}
            </Box>
        )
    } else {
        return (
            <Box sx={{ position: 'relative' }}>
                <ListItem
                    // onClick={() => setCollapsed(collapsed && false)}
                    disableGutters
                    sx={{ display: 'block', py: 0 }}
                    {...other}
                    onMouseEnter={() => setShowTooltipKey(title)}
                    onMouseLeave={() => setShowTooltipKey(null)}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            component={path && RouterLink}
                            sx={{
                                display: 'flex',
                                gap: '5px',
                                fontWeight: 'fontWeightMedium',
                                justifyContent: 'center',
                                fontSize: '13px',
                                textAlign: 'left',
                                textTransform: 'none',
                                width: '100%',
                                alignItems: 'normal',
                                ...(path === window.location.pathname && { color: '#E4933D' }),
                                ...(collapsed && {
                                    width: 'fit-content',
                                    margin: 'auto',
                                    backgroundColor: 'transparent',
                                }),
                            }}
                            variant="text"
                            to={path}
                        >
                            <Box>
                                {icon && (
                                    <ListItemIcon
                                        sx={{
                                            color: path !== window.location.pathname ? 'white' : '#E4933D',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            ...(collapsed && open && { borderRight: '2px solid #E4933D' }),
                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                )}
                            </Box>
                            {!collapsed && (
                                <>
                                    <Box sx={{ flexGrow: 1 }}>{title}</Box>
                                    <Box
                                        sx={{ marginRight: '10px' }}
                                        onMouseLeave={() => setShowPopUp(false)}
                                        onMouseEnter={() => setShowPopUp(true)}
                                    >
                                        <IconButton size="small">
                                            <InfoOutlinedIcon
                                                sx={{ color: '#FFFFFF', width: '18px', height: '18px' }}
                                            />
                                        </IconButton>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: showPopUp ? 'block' : 'none',
                                            position: 'absolute',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            height: 'auto',
                                            width: '220px',
                                            zIndex: '1600',
                                            p: '10px',
                                            top: '35px',
                                            borderRadius: '4px',
                                            border: 1,
                                            borderColor: 'text-default',
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '12px', fontWeight: '500' }}>{hover}</Typography>
                                    </Box>
                                </>
                            )}
                            {info}
                        </Button>
                    </Box>
                </ListItem>
                {tooltip && (
                    <Box
                        sx={{
                            display: (!showPopUp) && showTooltipKey  === title ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            zIndex: '1600',
                            p: '10px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: '500',
                        }}
                    >
                        {tooltip}
                    </Box>
                )}
            </Box>
        )
    }
}
NavItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    depth: PropTypes.number.isRequired,
    icon: PropTypes.node,
    info: PropTypes.node,
    open: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string.isRequired,
}
NavItem.defaultProps = { active: false, open: false }
export default NavItem
