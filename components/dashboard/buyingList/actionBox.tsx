import { Box } from '@mui/material'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { StyledTableIconButton } from 'src/components/general/StyledTableIconButton'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'

export function BuyingAcionBox({
    handleDelete,
    handleChange,
    handleSave,
}: {
    handleDelete: () => void
    handleChange: () => void
    handleSave: () => void
}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
            }}
        >
            <StyledTableIconButton onClick={handleDelete} size="small" sx={{ borderRadius: '6px', bgcolor: 'white' }}>
                <DeleteSharpIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
            </StyledTableIconButton>
            <StyledTableIconButton onClick={handleChange} size="small" sx={{ borderRadius: '6px', bgcolor: 'white' }}>
                <ModeEditOutlineOutlinedIcon sx={{ fontSize: '16px', color: '#E4933D' }} />
            </StyledTableIconButton>
            <StyledTableIconButton onClick={handleSave} size="small">
                <AddBoxOutlinedIcon sx={{ color: '#E4933D', width: '19px' }} />
            </StyledTableIconButton>
        </Box>
    )
}
