import { Autocomplete, AutocompleteRenderOptionState, Box, TextField, Typography } from '@mui/material'
import { HTMLAttributes } from 'react'
import Flag from 'react-world-flags'

export function CountryAutocomplete({
    options,
    selectedCountry,
    handleCountryChange,
}: {
    options: any[]
    selectedCountry: string
    handleCountryChange: (value: string) => void
}) {
    return (
        <Autocomplete
            sx={{ width: '300px' }}
            renderInput={(params) => (
                <TextField
                    InputProps={{
                        classes: {
                            input: 'custom-input',
                        },
                    }}
                    sx={{
                        border: '1px solid #d0d5dd',
                        borderRadius: '10px',
                    }}
                    placeholder="All Countries"
                    {...params}
                />
            )}
            renderOption={renderOption}
            options={options}
            onChange={(_event, value) => handleCountryChange(value?.value || 'United States')}
            value={selectedCountry ? { value: selectedCountry } : 'United States'}
            getOptionLabel={(option) => option.value || selectedCountry}
            isOptionEqualToValue={(option, value) => {
                if (!value) {
                    return option.value === 'United States'
                }
                return option.value === value.value
            }}
        />
    )
}

const renderOption = (props: HTMLAttributes<HTMLLIElement>, option: any, state: AutocompleteRenderOptionState) => {
    const optionLabel = option.label?.split('/')
    return (
        <Box
            key={option.value}
            component="li"
            sx={{
                display: 'flex',
                gap: '1rem',
                px: '0.25rem',
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'grey',
                },
            }}
            {...props}
        >
            <Flag height="12" code={optionLabel[1]} />
            <Typography sx={{ fontSize: '16px', fontWeight: '600', textAlign: 'center' }}>{option.value}</Typography>
        </Box>
    )
}
