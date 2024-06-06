import React, { useCallback, useState } from 'react'
import { Box, InputBase, InputBaseProps, Typography } from '@mui/material'
import { debounce } from 'lodash'

const DebouncedInput = ({
    onSearch,
    value,
    debounceTime = 300,
    ...rest
}: InputBaseProps & {
    value: string
    onSearch: (value: string) => void
    debounceTime?: number
}) => {
    // Local state to store the current input value
    const [localValue, setLocalValue] = useState(value)

    // Debounce the search callback
    const debouncedSearch = useCallback(
        debounce((searchValue) => {
            onSearch(searchValue)
        }, debounceTime),
        [] // Dependency array left empty so that the debounced function is not recreated on each render
    )

    // Handle input change
    const handleChange = (event) => {
        const { value } = event.target
        setLocalValue(value) // Update local state
        debouncedSearch(value) // Call debounced search function
    }

    return (
        <Box sx={{position:'relative', display:'flex', width:'100%', alignItems:'center'}}>
            <InputBase
                value={localValue}
                onChange={handleChange}
                sx={{ ml: 1, flex: 1 }}
                inputProps={{ 'aria-label': 'search' }}
                {...rest}
            />
            <Typography
                sx={{
                    position: 'absolute',
                    right: '0px',
                    cursor: 'pointer',
                    color: '#667085',
                    display: localValue?.length > 0 ? 'block' : 'none',
                }}
                onClick={() => {
                    handleChange({ target: { value: '' } })
                }}
            >
                X
            </Typography>
        </Box>
    )
}

export default DebouncedInput
