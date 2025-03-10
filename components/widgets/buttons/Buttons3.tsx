import { useState, useRef } from 'react'
import type { FC } from 'react'
import {
    Box,
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@mui/material'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge']

const Buttons3: FC = () => {
    const anchorRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(1)

    const handleMenuItemClick = (index: number) => {
        setSelectedIndex(index)
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return
        }

        setOpen(false)
    }

    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                p: 3,
            }}>
            <ButtonGroup ref={anchorRef} variant="contained">
                <Button>{options[selectedIndex]}</Button>
                <Button onClick={handleToggle} size="small" sx={{ backgroundColor: 'primary.dark' }}>
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper anchorEl={anchorRef.current} open={open} transition>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            disabled={index === 2}
                                            key={option}
                                            onClick={() => handleMenuItemClick(index)}
                                            selected={index === selectedIndex}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Box>
    )
}

export default Buttons3
