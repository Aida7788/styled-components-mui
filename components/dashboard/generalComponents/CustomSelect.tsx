import { FormControl, InputLabel, OutlinedInput, Select } from '@mui/material'
import React from 'react'
import { EventSelectArray } from 'src/common/constants/overview'

export const handleCloseNew = () => {
    setTimeout(() => (document.activeElement as HTMLElement).blur(), 1)
}

interface UniShowProp {
    name: string
    tag: string
}

const Covertor = (selected: string[]) => {
    let ConvertedSelected: string[] = []

    selected.map((name) => {
        const matchingObject = EventSelectArray.find((obj) => obj.name === name)
        return ConvertedSelected.push(matchingObject.tag)
    })

    return ConvertedSelected.join(', ')
}

export default function CustomSelect({
    children,
    label,
    multiple = false,
    value,
    uniShow,
    handleChange = () => {},
}: {
    handleChange?: (event: any, child: React.ReactNode) => void
    children: React.ReactNode
    uniShow?: UniShowProp[]
    label: string
    multiple?: boolean
    value?: any
}) {
    return (
        <FormControl
            sx={{
                zIndex: '0',
                color: '#000',
                borderColor: '#000',
            }}
        >
            <InputLabel
                sx={{
                    color: '#000000',
                    '&.Mui-focused': {
                        color: '#000000',
                    },
                }}
                id="demo-multiple-checkbox-label"
            >
                {label}
            </InputLabel>

            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                onClose={() => handleCloseNew()}
                input={<OutlinedInput sx={{ color: '#000' }} label={label} />}
                value={value}
                multiple={multiple}
                onChange={handleChange}
                renderValue={
                    multiple
                        ? (selected) =>
                              uniShow
                                  ? Covertor(selected as any as string[])
                                  : Array.isArray(selected) && selected.join(', ')
                        : undefined
                }
                sx={{
                    bgcolor: 'background.white',
                    width: '170px',
                    borderRadius: '10px',
                    color: '#000',
                    borderColor: '#000',
                }}
            >
                {children}
            </Select>
        </FormControl>
    )
}
