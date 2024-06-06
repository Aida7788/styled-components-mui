import { Box, IconButton } from '@mui/material'
import React, { SetStateAction } from 'react'
import DropcheckIcon from 'src/icons/DropckeckerIcon'
import {
    dropCheckInt,
    lowInvAlert,
    priceDrop,
    primaryFavouriteDataInterface,
    pullFrequency,
} from 'src/types/local/primaryFavourite'
import LowInventoryIcon from 'src/icons/LowInventory'
import Radar from 'src/icons/Radar'
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'


export const ActionBoxPrimaryFavourite = ({
    changeModal,
    setSelectedDrop,
    setSelectedId,
    item,
    isSecondary
}: {
    changeModal: (val: string) => void
    setSelectedDrop: React.Dispatch<SetStateAction<dropCheckInt[] | lowInvAlert[] | priceDrop[]>>
    isSecondary:boolean
    setSelectedId: React.Dispatch<SetStateAction<string>>
    item: primaryFavouriteDataInterface
}) => {
    return (
        <Box sx={{gap:'10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            {(item?.drop_checker_alert?.[0]?._id && !isSecondary) && (
                <StyledTableIconButton
                    onClick={() => {
                        changeModal('dropModal')
                        setSelectedDrop(item.drop_checker_alert)
                        setSelectedId(item?.eventId)
                    }}
                >
                    <NotificationAddOutlinedIcon sx={{ fontSize: '20px', color: '#E4933D' }} />
                </StyledTableIconButton>
            )}
            {(item?.low_inventory_alert?.length > 0 && !isSecondary) && (
                <StyledTableIconButton
                    onClick={() => {
                        changeModal('invModal')
                        setSelectedDrop(item.low_inventory_alert)
                        setSelectedId(item?.eventId)
                    }}
                >
                    <ReportOutlinedIcon sx={{ fontSize: '20px', color: '#E4933D' }} />
                </StyledTableIconButton>
            )}
            {item?.price_drop_alert?.[0]?._id && isSecondary && (
                <StyledTableIconButton
                    onClick={() => {
                        changeModal('priceModal')
                        setSelectedId(item?.eventId)
                    }}
                >
                    <AddTaskOutlinedIcon sx={{ fontSize: '20px', color: '#E4933D' }} />
                </StyledTableIconButton>
            )}
        </Box>
    )
}
