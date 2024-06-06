import { Select, styled } from "@mui/material";

export const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        padding:'9.5px 14px',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '500',
        width: '100%',
    },
    '&.MuiSelect-select .MuiInputBase-input .MuiOutlinedInput-input:focus': {
        borderRadius: '8px',
    },
    '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        border: 0,
        borderRadius: '8px',
    },
    '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 0,
        borderRadius: '8px',
    },
}))

export const StyledSelectWithBorder = styled(StyledSelect)(({ theme }) => ({
    '& .MuiSelect-select': {
        fontWeight: '400',
    },
    border: '1px solid #D0D5DD',
    borderRadius: '8px',
}))