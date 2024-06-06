import { ReactNode } from 'react'
import { IUser } from 'src/types/local/user'
import ExtensionTab from './ExtensionTab'
import Notifications from './NotificationsTab'
import Subscrition from './Subscription'
import UserActions from './UserActions'
import UserProfile from './UserProfile'

interface TabPanelProps {
    children?: ReactNode
    index: number
    value: number
    user: IUser
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, user, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {index === 0 && <UserProfile user={user} />}

            {index === 1 && <Subscrition />}

            {index === 2 && <Notifications user={user} />}

            {/* {index === 3 && <UserActions />} */}

            {index === 3 && <ExtensionTab />}
        </div>
    )
}
