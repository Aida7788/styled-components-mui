import VisibilityIcon from '@mui/icons-material/Visibility'
import {
    Skeleton,
    SxProps,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Tabs,
} from '@mui/material'
import { isUndefined } from 'lodash'
import { FC, useEffect, useState } from 'react'
import { SHORT_DATE_FORMAT } from 'src/common/constants/dateFormat'
import { useCustomPagination } from 'src/hooks/usePagination'
import User from 'src/icons/User'
import { API } from 'src/services/adminApi'
import { formatDate } from 'src/utils/dataFormatters'

type TUsersTableProps = {
    onSelect: (userId: string) => void
}

const UsersTable: FC<TUsersTableProps> = ({ onSelect }) => {
    const { setAllEntries, page, perPage, handleChangePage, handleChangePerPage, allEntries } = useCustomPagination()
    const [isLoading, setIsLoading] = useState(false)

    const [users, setUsers] = useState([])

    const [subType, setSubType]: [
        'all' | 'beginners' | 'pro' | 'premium',
        React.Dispatch<React.SetStateAction<'all' | 'beginners' | 'pro' | 'premium'>>,
    ] = useState('all')

    const getUsers = async () => {
        setIsLoading(true)
        const { data, pagination } = await API.getUsersPaymentPlanInfo({
            page,
            perPage,
            subType,
        })
        setIsLoading(false)

        setAllEntries(pagination.total_events)
        setUsers(data)
    }

    useEffect(() => {
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, perPage, subType])

    const tabSx: SxProps = {
        height: '40px',
        fontSize: '14px',
        backgroundColor: '#FFFFFF',
        color: '#1D2939',
        textTransform: 'none',
        '&.Mui-selected': {
            color: '#1D2939',
            backgroundColor: '#EFF0F1',
        },
    }

    return (
        <>
            <Tabs
                value={subType}
                variant="fullWidth"
                sx={{
                    borderBottom: 1,
                    borderRadius: '12px',
                    borderColor: 'divider',
                    '.MuiTabs-indicator': {
                        backgroundColor: 'transparent',
                    },
                    '.MuiTabs-flexContainer': {
                        justifyContent: 'left',
                    },
                    '.MuiTabs-scroller': {
                        overflow: 'hidden',
                    },
                    marginBottom: '30px',
                }}
            >
                <Tab
                    value="all"
                    label="All subscribers"
                    onClick={() => {
                        setSubType('all')
                    }}
                    sx={tabSx}
                />
                <Tab
                    value="beginners"
                    label="Beginners"
                    onClick={() => {
                        setSubType('beginners')
                    }}
                    sx={tabSx}
                />
                <Tab
                    value="pro"
                    label="Pro"
                    onClick={() => {
                        setSubType('pro')
                    }}
                    sx={tabSx}
                />
                <Tab
                    value="premium"
                    label="Premium"
                    onClick={() => {
                        setSubType('premium')
                    }}
                    sx={tabSx}
                />
            </Tabs>
            <TableContainer sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                        <TableRow>
                            <TableCell>Registered users</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Fetch count</TableCell>
                            <TableCell>Subscription</TableCell>
                            <TableCell>Renewal Date</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: '#FFFFFF' }}>
                        {isLoading ? (
                            <SkeletonTableBody />
                        ) : (
                            users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell align="left">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <User />
                                            <span>{user.username}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.isAdmin ? 'Admin' : 'User'}</TableCell>
                                    <TableCell>{`${!isUndefined(user.fetch_count) ? user.fetch_count : '?'}/${user.payment_plans[0]?.total_allowed_fetch || '?'}`}</TableCell>
                                    <TableCell>{user.payment_plans[0]?.name}</TableCell>
                                    <TableCell>
                                        {user.user_plans[0]?.exp_date &&
                                            formatDate(user.user_plans[0]?.exp_date, SHORT_DATE_FORMAT)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <span
                                            onClick={() => {
                                                onSelect(user._id)
                                            }}
                                        >
                                            <VisibilityIcon sx={{ cursor: 'pointer' }} />
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={allEntries}
                                rowsPerPage={perPage}
                                page={allEntries > 0 ? page - 1 : 0}
                                onPageChange={(_, page) => {
                                    handleChangePage(page + 1)
                                }}
                                onRowsPerPageChange={(e) => {
                                    handleChangePerPage(Number(e.target.value))
                                }}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    )
}

export default UsersTable

const SkeletonTableBody: FC = () => {
    return (
        <>
            {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
