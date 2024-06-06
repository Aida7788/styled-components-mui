import { Box, Button, FormControl, TextField, TextFieldProps, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'

const StyledTextField = styled(({ className, ...props }: TextFieldProps) => (
    <TextField classes={{ root: className }} {...props} />
))(({ theme }) => ({
    label: {
        color: 'black',
        fontSize: 18,
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: 'skyblue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'skyblue',
        },
    },
    '&:not(.Mui-focused) fieldset': {
        borderColor: 'cornflowerblue',
    },
    '& .MuiInputLabel-root': {
        color: 'black',
    },
    '& .Mui-focused .MuiInputLabel-root': {
        color: 'black',
    },
    '& .MuiInputLabel-shrink': {
        color: 'black',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#000',
    },
}))

const isValidUrl = (urlString) => {
    var urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ) // validate fragment locator
    return !!urlPattern.test(urlString)
}

export const AddPostModal = ({ changeModal, changeToastText, isModalOpen }) => {
    const [urlVal, setUrlVal] = useState('')
    const [isValid, setIsValid] = useState(true)
    useEffect(() => {
        setUrlVal('')
    }, [isModalOpen])
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                width: '550px',
                gap: '20px',
                zIndex: '2500',
            }}
        >
            <Box>
                <Typography sx={{ mx: 'auto', fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>
                    Add Missing Events
                </Typography>
                <Box sx={{ boxShadow: '0px 2px 11px -2px rgba(0,0,0,0.1);', p:'10px', mt:'6px', bgcolor:'#ECF0F1', borderRadius: '10px' }}>
                    <Typography sx={{ mx: 'auto', fontSize: '14px', textAlign: 'start' }}>
                        If you notice an event missing, simply copy and paste the full URL from Ticketmaster, AXS, or
                        StubHub into our system. We'll ensure it's updated within a few minutes.
                    </Typography>
                </Box>
            </Box>

            <StyledTextField
                value={urlVal}
                onChange={(e) => {
                    setUrlVal(e.target.value)
                    setIsValid(isValidUrl(e.target.value))
                }}
                error={!isValid}
                type="url"
                fullWidth
                variant="outlined"
            />
            <Button
                type="submit"
                onClick={() => {
                    if (isValid) {
                        changeModal('addModal')
                        changeToastText('Submitted successfully!')
                    }
                }}
                sx={{ bgcolor: 'black', ':hover': { bgcolor: 'black' } }}
            >
                Submit
            </Button>
        </Box>
    )
}

export const AddFavoriteModal = ({ changeModal }) => {
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                width: '550px',
                gap: '20px',
                zIndex: '2500',
            }}
        >
            <Typography sx={{ mx: 'auto', fontSize: '18px', fontWeight: '500', textAlign: 'center' }}>
                Add an event to favorites easily! Simply copy and paste the full URL from Ticketmaster, AXS, or StubHub,
                and we'll add it to your favorites
            </Typography>
            <StyledTextField fullWidth label="Paste URLs from Ticketmaster, AXS, or StubHub" variant="outlined" />
            <Button
                onClick={() => {
                    changeModal('addModal')
                }}
                sx={{ bgcolor: 'black', ':hover': { bgcolor: 'black' } }}
            >
                Submit
            </Button>
        </Box>
    )
}
