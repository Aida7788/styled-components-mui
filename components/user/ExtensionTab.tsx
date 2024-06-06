import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import KeyIcon from '@mui/icons-material/Key'
import { Box, Button, ButtonGroup, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axiosClient from 'src/utils/axios'
import { FrontEndError } from 'src/utils/error'

const ExtensionTab = () => {
    const handleCopyClick = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast(`Text copied to clipboard: ${text}`)
            })
            .catch((err) => {
                FrontEndError(err)
            })
    }
    const [key, setKey] = useState('')
    const getKey = async () => {
        const keyReq = await axiosClient().get('/api/rotate/license')
        setKey(keyReq.data.key)
    }
    useEffect(() => {
        const getKeyFromServer = async () => {
            let user = await axiosClient().get('api/user')
            user.data.license_key && setKey(user.data.license_key)
        }
        getKeyFromServer()
    }, [])

    return (
        <Box p={4} my={4}>
            <Typography color={'#000'} fontSize={16} fontWeight={500} mb={'20px'}>
                License Key
            </Typography>

            <Stack direction={'row'} alignContent={'center'}>
                <Box
                    color={'#394056'}
                    height={'45px'}
                    width={'45px'}
                    borderRadius={'2px'}
                    bgcolor={'#ccc'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <KeyIcon />
                </Box>
                <Box
                    sx={{
                        height: '45px',
                        width: {
                            xs: '240px',
                            lg: '400px',
                        },
                        borderRadius: '2px',
                        border: '1px solid #ccc',
                        bgcolor: 'white',
                        color: '#000 !important',
                        display: 'flex',
                        alignItems: 'center',
                        pl: 1,
                    }}
                >
                    {/* FIXME: */}
                    <Typography>{key}</Typography>
                </Box>
                <Box
                    height={'45px'}
                    width={'45px'}
                    borderRadius={'2px'}
                    border={'1px solid cornflowerblue'}
                    bgcolor={'white'}
                    color={'cornflowerblue'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{ cursor: 'pointer' }}
                    // FIXME:
                    onClick={() => handleCopyClick(key)}
                >
                    <ContentCopyIcon />
                </Box>
            </Stack>

            <ButtonGroup sx={{ mt: 5 }}>
                <Button variant="contained" color="warning">
                    Install extension
                </Button>
                <Button onClick={getKey} variant="contained" sx={{ backgroundColor: '#0a1b3e', color: 'white' }}>
                    Get new API key
                </Button>
            </ButtonGroup>
        </Box>
    )
}

export default ExtensionTab
