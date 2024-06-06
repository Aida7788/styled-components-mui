import { useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { experimentalStyled } from '@mui/material/styles'
import DashboardNavbar from '../layout/DashboardNavbar'
import UserFooter from './UserFooter'

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayoutRoot = experimentalStyled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    width: '100%',
}))

const UserLayout: FC<DashboardLayoutProps> = () => {
    const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false)

    return (
        <>
            <DashboardNavbar onSidebarMobileOpen={(): void => setIsSidebarMobileOpen(true)} />
            <Outlet />
            <UserFooter />
        </>
    )
}

export default UserLayout
