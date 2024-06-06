import type { ListProps } from '@mui/material'
import { List, ListSubheader } from '@mui/material'
import PropTypes from 'prop-types'
import type { FC, ReactNode } from 'react'
import { JSX } from 'react'
import NavItem from './NavItem'

interface Item {
    path?: string
    icon?: ReactNode
    hover?: string
    info?: ReactNode
    children?: Item[]
    title: string
    tooltip?: string
}

interface NavSectionProps extends ListProps {
    items: Item[]
    collapsed: boolean
    pathname: string
    title: string
    setCollapsed: any
}

const renderNavItems = ({
    depth = 0,
    items,
    pathname,
    collapsed,
    setCollapsed,
}: {
    depth?: number
    items: Item[]
    pathname: string
    collapsed: boolean
    setCollapsed: any
}): JSX.Element => (
    <List>
        {items.reduce(
            // eslint-disable-next-line @typescript-eslint/no-use-before-define, no-use-before-define
            (acc, item) =>
                reduceChildRoutes({
                    acc,
                    item,
                    pathname,
                    depth,
                    collapsed,
                    setCollapsed,
                }),
            []
        )}
    </List>
)

const reduceChildRoutes = ({
    acc,
    pathname,
    item,
    depth,
    collapsed,
    setCollapsed,
}: {
    acc: JSX.Element[]
    pathname: string
    item: Item
    depth: number
    collapsed: boolean
    setCollapsed: any
}): Array<JSX.Element> => {
    const key = `${item.title}-${depth}`
    const exactMatch = item.path === pathname ? true : false

    if (item.children) {
        acc.push(
            <NavItem
                active={exactMatch}
                hover={item.hover}
                tooltip={item.tooltip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                open={exactMatch}
                path={item.path}
                title={item.title}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            >
                {renderNavItems({
                    depth: depth + 1,
                    items: item.children,
                    pathname,
                    collapsed: collapsed,
                    setCollapsed,
                })}
            </NavItem>
        )
    } else {
        acc.push(
            <NavItem
                active={exactMatch}
                hover={item.hover}
                tooltip={item.tooltip}
                depth={depth}
                icon={item.icon}
                info={item.info}
                key={key}
                path={item.path}
                title={item.title}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
        )
    }

    return acc
}

const NavSection: FC<NavSectionProps> = (props) => {
    const { items, pathname, title, collapsed, setCollapsed, ...other } = props

    return (
        <List
            subheader={
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        color: 'text.primary',
                        fontSize: '0.75rem',
                        lineHeight: 2.5,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                    }}
                >
                    {title}
                </ListSubheader>
            }
            {...other}
        >
            {renderNavItems({
                items,
                pathname,
                collapsed,
                setCollapsed,
            })}
        </List>
    )
}

NavSection.propTypes = {
    items: PropTypes.array,
    collapsed: PropTypes.bool,
    pathname: PropTypes.string,
    title: PropTypes.string,
}

export default NavSection
