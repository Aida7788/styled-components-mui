import { FormControl, InputLabel, OutlinedInput, Select } from '@mui/material'

import { ReactNode } from 'react'

export default function CustomSelect({
                                         children,
                                         label,
                                         multiple = false,
                                         value,
                                         handleChange = () => {
                                         },
                                         width,
                                         border,
                                     }: {
    handleChange?: (
        event: any,
        child: ReactNode,
    ) => void;
    children: ReactNode;
    label: string;
    multiple?: boolean;
    value?: string[];
    width?: string;
    border?: string;
}) {
    return (
        <FormControl
            sx={{
                zIndex: '0',
                width: width && width,
            }}>
            <InputLabel
                sx={{
                    color: 'text.primary',
                }}
                id="demo-multiple-checkbox-label">
                {label}
            </InputLabel>

            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                input={<OutlinedInput label={label} />}
                value={value}
                multiple={multiple}
                onChange={handleChange}
                renderValue={multiple ? (selected) => Array.isArray(selected) && selected.join(', ') : undefined}
                sx={{
                    bgcolor: 'background.white',
                    width: width || '170px',
                    borderRadius: '10px',
                    border: border && border,
                }}>
                {children}
            </Select>
        </FormControl>
    )
}
