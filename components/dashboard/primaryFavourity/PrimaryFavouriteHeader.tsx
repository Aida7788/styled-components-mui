import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Box, Button, IconButton, ListItemText, Paper, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import DebouncedInput from 'src/components/general/DebouncedInput'
import { StyledSelectWithBorder } from 'src/components/general/StyledSelect'
import SearchIcon from 'src/icons/SearchIcon'
import { StyledCheckBox, StyledMenuItem } from '../generalComponents/TableCoponents'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

export const PrimaryFavouriteHeader = ({
    handleEventChange,
    eventState,
    label = 'My Primary Favorites',
    allEntries,
    handleInputEnter,
    valueInput,
    handleChangeInput,
    changeModal,
    isSecondary = false,
}: {
    handleEventChange: (event: any, child?: ReactNode) => void
    label?: string
    eventState: string[]
    allEntries: number
    handleInputEnter
    valueInput
    handleChangeInput
    changeModal
    isSecondary?: boolean
}) => {
    const [hoveredAddButton, setHoveredAddButton] = useState<boolean>()
    return (
        <Paper
            sx={{
                display: 'flex',
                gap: '10px',
                py: '57px',
                px: '51px',
                height: '100%',
                width: '100%',
                boxShadow: 0,
                borderRadius: 0,
                mb: '9px',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <Typography sx={{ textWrap: 'nowrap', mr: '32px' }} variant="h5">
                {label}
            </Typography>
            <Box
                sx={{
                    borderRadius: '8px',
                    padding: '4px 12px',
                    border: 'solid',
                    borderWidth: '1px',
                    borderColor: '#E9D7FE',
                    mr: '8px',
                }}
            >
                <Typography sx={{ color: '#AE763F' }} noWrap={true}>
                    {allEntries} events
                </Typography>
            </Box>
            <IconButton sx={{ width: '26px', height: '26px', mr: '4px' }} onClick={() => changeModal('infoModal')}>
                <HelpOutlineOutlinedIcon sx={{ width: '20px', height: '20px', color: '#667085' }} />
            </IconButton>
            <Paper
                component="form"
                sx={{
                    border: '1px solid',
                    borderColor: '#D0D5DD',
                    borderRadius: '8px',
                    p: '3px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    boxShadow: 0,
                    mr: '18px',
                }}
            >
                <SearchIcon fontSize="small" sx={{ color: '#667085', fontSize: '20px', mr: '8px' }} />
                <DebouncedInput
                    onKeyDown={handleInputEnter}
                    value={valueInput}
                    onSearch={handleChangeInput}
                    sx={{ fontSize: '16px', lineHeight: '24px', p: '0', width: '100%' }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
            </Paper>
            {!isSecondary && (
                <StyledSelectWithBorder
                    renderValue={(selected) =>
                        Array.isArray(selected) &&
                        selected
                            .map((elem) => elem[0].toUpperCase() + elem.slice(1))
                            .join(', ')
                            .replace('_', ' ')
                    }
                    onChange={handleEventChange}
                    value={eventState}
                    multiple
                    sx={{ maxWidth: '150px', minWidth: '150px', height: '40px' }}
                    label="select"
                >
                    {eventState.length > 2 ? (
                        <StyledMenuItem value={'deselect_all'}>
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={eventState.length > 2}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'Deselect'} />
                        </StyledMenuItem>
                    ) : (
                        <StyledMenuItem value={'all'}>
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={!eventState.length}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'All'} />
                        </StyledMenuItem>
                    )}
                    <StyledMenuItem value={'drop_checker_alert'}>
                        <StyledCheckBox
                            sx={{ color: '#000000' }}
                            checked={eventState.indexOf('drop_checker_alert') > -1}
                            checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                        />
                        <ListItemText primary={'Dropchecker'} />
                    </StyledMenuItem>
                    {isSecondary ? (
                        <StyledMenuItem value={'price_drop_alert'}>
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={eventState.indexOf('price_drop_alert') > -1}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'Price Drop'} />
                        </StyledMenuItem>
                    ) : (
                        <StyledMenuItem value={'low_inventory_alert'}>
                            <StyledCheckBox
                                sx={{ color: '#000000' }}
                                checked={eventState.indexOf('low_inventory_alert') > -1}
                                checkedIcon={<CheckBoxIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={'Low inventory'} />
                        </StyledMenuItem>
                    )}
                </StyledSelectWithBorder>
            )}
            <Button
                sx={{
                    border: '1px solid',
                    borderColor: '#D0D5DD',
                    borderRadius: '8px',
                    width: '43px',
                    height: '40px',
                    minWidth: '43px',
                    position: 'relative',
                }}
                onClick={() => changeModal('addModal')}
                onMouseEnter={() => setHoveredAddButton(true)}
                onMouseLeave={() => setHoveredAddButton(false)}
            >
                <Typography sx={{ fontSize: '24px', fontWeight: '600', color: '#E4933D' }}>+</Typography>
                <Box
                    sx={{
                        display: hoveredAddButton ? 'block' : 'none',
                        position: 'absolute',
                        bgcolor: 'rgba(30,30,30,.8)',
                        zIndex: '1600',
                        width: '140px',
                        top: '40px',
                        p: '10px',
                        right: '20px',
                        borderRadius: '4px',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '500',
                    }}
                >
                    Add a Missing Event
                </Box>
            </Button>
        </Paper>
    )
}
