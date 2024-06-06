import AddIcon from '@mui/icons-material/Add'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Box, Link } from '@mui/material'
import { useState } from 'react'
import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'
import useAuth from 'src/hooks/useAuth'

export function StyledActionBox({
    eventId,
    handleAddToBuying,
    handleClick,
    handleAddToWatchlist,
}: {
    eventId: string
    handleAddToBuying
    handleClick
    handleAddToWatchlist
}) {
    const {
        user: { permissions },
    } = useAuth()
    const [hoveredAddToMyBuyingListId, setHoveredAddToMyBuyingListId] = useState<any>()
    const [hoveredAddNotesId, setHoveredAddNotesId] = useState<any>()
    const [hoveredViewEventAnalyticsId, setHoveredViewEventAnalyticsId] = useState<any>()
    const [hoveredAddToWatchListId, setHoveredAddToWatchListId] = useState<any>()

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
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <StyledTableIconButton
                        onClick={handleAddToBuying}
                        size="small"
                        sx={{ borderRadius: '6px', bgcolor: 'white' }}
                        onMouseEnter={() => setHoveredAddToMyBuyingListId(eventId)}
                        onMouseLeave={() => setHoveredAddToMyBuyingListId(null)}
                    >
                        <AddIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                    </StyledTableIconButton>
                    <Box
                        sx={{
                            display: hoveredAddToMyBuyingListId === eventId ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            width: '150px',
                            zIndex: '1600',
                            p: '10px',
                            right: '20px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '500',
                        }}
                    >
                        Add to "my buying list"
                    </Box>
                </Box>
                <Box sx={{ position: 'relative' }}>
                    <StyledTableIconButton
                        size="small"
                        sx={{ borderRadius: '6px', bgcolor: 'white' }}
                        onClick={handleClick}
                        onMouseEnter={() => setHoveredAddNotesId(eventId)}
                        onMouseLeave={() => setHoveredAddNotesId(null)}
                    >
                        <ModeEditOutlineOutlinedIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                    </StyledTableIconButton>
                    <Box
                        sx={{
                            display: hoveredAddNotesId === eventId ? 'block' : 'none',
                            position: 'absolute',
                            bgcolor: 'rgba(30,30,30,.8)',
                            width: '80px',
                            zIndex: '1600',
                            p: '10px',
                            right: '20px',
                            borderRadius: '4px',
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '500',
                        }}
                    >
                        Add notes
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    position: 'relative',
                }}
            >
                <Link target={'_blank'} href={`/dashboard/primary-analytics/${eventId}`}>
                    <StyledTableIconButton
                        size="small"
                        sx={{
                            borderRadius: '6px',
                            bgcolor: 'white',
                            ...(permissions?.includes(USER_PERMISSIONS.MANAGE_WATCHLIST) ? {} : { width: '61px' }),
                        }}
                        onMouseEnter={() => setHoveredViewEventAnalyticsId(eventId)}
                        onMouseLeave={() => setHoveredViewEventAnalyticsId(null)}
                    >
                        <OpenInNewIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                    </StyledTableIconButton>
                </Link>
                {permissions?.includes(USER_PERMISSIONS.MANAGE_WATCHLIST) && (
                    <StyledTableIconButton
                        size="small"
                        sx={{ borderRadius: '6px', bgcolor: 'white' }}
                        onClick={handleAddToWatchlist}
                        onMouseEnter={() => setHoveredAddToWatchListId(eventId)}
                        onMouseLeave={() => setHoveredAddToWatchListId(null)}
                    >
                        <StarBorderIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
                    </StyledTableIconButton>
                )}
                <Box
                    sx={{
                        display: hoveredAddToWatchListId === eventId ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'rgba(30,30,30,.8)',
                        width: '140px',
                        zIndex: '1600',
                        p: '10px',
                        top: '30px',
                        right: '20px',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                    }}
                >
                    Add To Watch List
                </Box>
                <Box
                    sx={{
                        display: hoveredViewEventAnalyticsId === eventId ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'rgba(30,30,30,.8)',
                        width: '140px',
                        zIndex: '1600',
                        p: '10px',
                        top: '-40px',
                        right: '20px',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                    }}
                >
                    View Event Analytics
                </Box>
            </Box>
        </Box>
    )
}
