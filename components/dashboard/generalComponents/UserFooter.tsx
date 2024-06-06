import type { FC } from 'react'
import PropTypes from 'prop-types'
import { Box, Toolbar, Typography } from '@mui/material'
import type { AppBarProps } from '@mui/material'
import PhoneIcon from 'src/icons/PhoneIcon'
import EmailIcon from 'src/icons/Email'
import FacebookIcon from 'src/icons/Facebook'
import YoutubeIcon from 'src/icons/Youtube'
import TwitterIcon from 'src/icons/Twitter'
import GooglePlusIcon from 'src/icons/GooglePlus'
import { Button, TextField } from '@mui/material'
import LogoutIcon from 'src/icons/Logout'
import SendIcon from 'src/icons/Send'

interface DashboardNavbarProps extends AppBarProps {
    onSidebarMobileOpen?: () => void
}

const UserFooter: FC<DashboardNavbarProps> = (props) => {
    const { onSidebarMobileOpen, ...other } = props

    return (
        <Toolbar
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                paddingInline: '0px',
                bgcolor: '#000',
                py: 4,
                px: 2,
            }}
        >
            <Box
                sx={{
                    color: 'primary',
                    paddingRight: '24px',
                    display: { lg: 'flex' },
                    gap: 8,
                    width: '100%',
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '20px',
                            fontWeight: '600',
                            mb: 4,
                        }}
                    >
                        Customer Support
                    </Typography>

                    <Box display={'flex'} alignItems={'center'} mb={4}>
                        <PhoneIcon />
                        <Typography
                            sx={{
                                mx: 'auto',
                                color: 'primary.main',
                                fontSize: '18px',
                                fontWeight: '500',
                                ml: 1,
                            }}
                        >
                            123-456-7890
                        </Typography>
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={1}>
                        <EmailIcon />
                        <Typography
                            sx={{
                                mx: { lg: 'auto' },
                                color: 'primary.main',
                                fontSize: '18px',
                                fontWeight: '500',
                            }}
                        >
                            ticketmaster@gmail.com
                        </Typography>
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={1} color={'#fff'} my={4}>
                        <Box
                            height={'50px'}
                            width={'50px'}
                            borderRadius={'50%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            border={'1px solid #fff'}
                            sx={{
                                cursor: 'pointer',
                                ':hover': {
                                    bgcolor: '#fff',
                                },
                            }}
                        >
                            <FacebookIcon
                                sx={{
                                    height: '48px',
                                    width: '48px',
                                    m: 'auto',
                                    mt: 0.4,
                                    ml: 0.8,
                                }}
                            />
                        </Box>
                        <Box
                            height={'50px'}
                            width={'50px'}
                            borderRadius={'50%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            border={'1px solid #fff'}
                            sx={{
                                cursor: 'pointer',
                                ':hover': {
                                    bgcolor: '#fff',
                                },
                            }}
                        >
                            <YoutubeIcon
                                sx={{
                                    height: '56px',
                                    width: '56px',
                                    m: 'auto',
                                    mt: 0.6,
                                    ml: 2.2,
                                }}
                            />
                        </Box>
                        <Box
                            height={'50px'}
                            width={'50px'}
                            borderRadius={'50%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            border={'1px solid #fff'}
                            sx={{
                                cursor: 'pointer',
                                ':hover': {
                                    bgcolor: '#fff',
                                },
                            }}
                        >
                            <TwitterIcon
                                sx={{
                                    height: '56px',
                                    width: '56px',
                                    m: 'auto',
                                    mt: 0.6,
                                    ml: 2.2,
                                }}
                            />
                        </Box>{' '}
                        <Box
                            height={'50px'}
                            width={'50px'}
                            borderRadius={'50%'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            border={'1px solid #fff'}
                            sx={{
                                cursor: 'pointer',
                                ':hover': {
                                    bgcolor: '#fff',
                                },
                            }}
                        >
                            <GooglePlusIcon
                                sx={{
                                    height: '40px',
                                    width: '40px',
                                    m: 'auto',
                                    mt: 0.4,
                                    ml: 0.6,
                                }}
                            />
                        </Box>
                    </Box>

                    <Button
                        sx={{
                            display: 'flex',
                            px: '15px',
                            py: '10px',
                            borderRadius: '7px',
                            bgcolor: '#FFE2E5',
                            color: '#F64E60',
                            fontSize: '16px',
                            fontWeight: 600,
                            my: 1,
                        }}
                        variant="contained"
                        startIcon={<LogoutIcon sx={{ height: '24px', width: '24px', mr: 1 }} />}
                    >
                        Log Out
                    </Button>
                </Box>

                <Box>
                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '20px',
                            fontWeight: '600',
                            mb: 4,
                        }}
                    >
                        Links
                    </Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                            mb: '35px',
                        }}
                    >
                        FAQ
                    </Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            mb: '35px',
                        }}
                    >
                        How To Guide
                    </Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                            mb: '35px',
                        }}
                    >
                        Contact Us
                    </Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                        }}
                    >
                        Chat Bot
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '20px',
                            fontWeight: '600',
                            mb: 4,
                            height: '32px',
                        }}
                    ></Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                            mb: '35px',
                        }}
                    >
                        Refer A riend
                    </Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                            whiteSpace: 'nowrap',
                            mb: '35px',
                        }}
                    >
                        Affiliate Marketers Channel{' '}
                    </Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                            mb: '35px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Website And Extension Guide{' '}
                    </Typography>

                    <Typography
                        sx={{
                            mx: 'auto',
                            color: 'primary.main',
                            fontSize: '18px',
                            fontWeight: '500',
                        }}
                    >
                        Slack Channel Link{' '}
                    </Typography>
                </Box>

                <Box width={'100%'} display={'flex'} sx={{ justifyContent: { lg: 'flex-end' } }}>
                    <Box sx={{ ml: { lg: 'auto' } }} mr={8}>
                        <Typography
                            sx={{
                                mx: 'auto',
                                color: 'primary.main',
                                fontSize: '20px',
                                fontWeight: '600',
                                mb: 4,
                            }}
                        >
                            Give us Feedback and Advice!{' '}
                        </Typography>

                        <TextField
                            placeholder="Type Here ..."
                            sx={{ bgcolor: '#fff', borderRadius: '5px' }}
                            fullWidth
                            multiline
                            minRows={8}
                            InputProps={{
                                endAdornment: (
                                    <Box
                                        sx={{
                                            width: '44px',
                                            height: '44px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            bgcolor: '#000',
                                            borderRadius: '5px',
                                            mt: 16,
                                        }}
                                    >
                                        <SendIcon />
                                    </Box>
                                ),
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Toolbar>
    )
}
UserFooter.propTypes = { onSidebarMobileOpen: PropTypes.func }
export default UserFooter
