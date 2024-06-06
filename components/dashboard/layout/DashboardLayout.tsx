// @ts-nocheck
import { SxProps, Theme } from '@mui/material'
import { experimentalStyled } from '@mui/material/styles'
import type { FC, ReactNode } from 'react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNavbar from './DashboardNavbar'
import DashboardSidebar from './DashboardSidebar'
import useCollapsed from 'src/hooks/useCollapsed'

interface DashboardLayoutProps {
    children?: ReactNode
}

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    zIndex: '1600',
    width: '100%',
}))
const DashboardLayoutContent = experimentalStyled('div')<defaultDashboardProp>(({ theme, padding }) => ({
    display: 'flex',
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    position: 'relative',
    WebkitOverflowScrolling: 'touch',

    paddingTop: '64px',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: padding,
        transition: 'padding 0.3s ease',
    },
}))

interface defaultProp {
    theme?: Theme
    as?: React.ElementType
    sx?: SxProps<Theme>
    styleProps?: Record<string, unknown>
}

interface defaultDashboardProp extends defaultProp {
    padding?: string
}

const DashboardLayout: FC<DashboardLayoutProps> = () => {
    const { collapsed, toggleCollapsed } = useCollapsed(true)
    const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false)

    return (
        <DashboardLayoutRoot>
            <DashboardNavbar onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)} />
            <DashboardSidebar
                collapsed={collapsed}
                setCollapsed={toggleCollapsed}
                onMobileClose={(): void => setIsSidebarMobileOpen(false)}
                openMobile={isSidebarMobileOpen}
            />
            <DashboardLayoutContent padding={collapsed ? '70px' : '240px'}>
                <Outlet />
            </DashboardLayoutContent>
        </DashboardLayoutRoot>
    )
}

export default DashboardLayout
