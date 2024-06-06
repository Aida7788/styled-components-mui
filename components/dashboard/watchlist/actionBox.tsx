import { Box, Link } from '@mui/material'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'
import useAuth from 'src/hooks/useAuth'
import AddIcon from '@mui/icons-material/Add'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'

export function WatchlistActionBox({
    handleDelete,
    eventId,
    handleChange,
    handleAddToBuying,
}: {
    handleAddToBuying: () => void
    handleChange: (item: any) => void
    handleDelete: () => void
    eventId
}) {
    const {
        user: { permissions },
    } = useAuth()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                }}
            >
                <StyledTableIconButton
                    onClick={handleAddToBuying}
                    size="small"
                    sx={{ borderRadius: '6px', bgcolor: 'white' }}
                >
                    <AddIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                </StyledTableIconButton>
                <StyledTableIconButton
                    size="small"
                    sx={{ borderRadius: '6px', bgcolor: 'white' }}
                    onClick={() => handleChange(eventId)}
                >
                    <ModeEditOutlineOutlinedIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                </StyledTableIconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                }}
            >
                <Link href={`/dashboard/primary-analytics/${eventId}`}>
                    <StyledTableIconButton
                        size="small"
                        sx={{
                            borderRadius: '6px',
                            bgcolor: 'white',
                            ...(permissions?.includes(USER_PERMISSIONS.MANAGE_WATCHLIST) ? {} : { width: '61px' }),
                        }}
                    >
                        <OpenInNewIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                    </StyledTableIconButton>
                </Link>
                {permissions?.includes(USER_PERMISSIONS.MANAGE_WATCHLIST) && (
                    <StyledTableIconButton
                        size="small"
                        sx={{ borderRadius: '6px', bgcolor: 'white' }}
                        onClick={handleDelete}
                    >
                        <DeleteSharpIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                    </StyledTableIconButton>
                )}
            </Box>
        </Box>
    )
}
