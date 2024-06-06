import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {
    Box,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import toast from 'react-hot-toast'
import { FrontEndError } from 'src/utils/error'

const referDescArr = [
    <Stack direction={'row'} flexWrap={'wrap'}>
        Share your&nbsp;<Typography color={'#29b6f6'}>Unique referral link</Typography>&nbsp;(below) and invite friends
        to Ticketmetric.
    </Stack>,
    <Typography>
        When your friend signs up for a paying plan you get $50 off your plan the next month its that simple!
    </Typography>,
]

const UserActions = () => {
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

    return (
        <Box p={4} my={4}>
            <Typography color={'#13263C'} textAlign={'center'} fontSize={32} fontWeight={600} pb={4}>
                Referral Rewards Program
            </Typography>

            <Typography color={'#000'} fontSize={18} fontWeight={500} mb={'10px'}>
                Sell More, Earn More
            </Typography>
            <Typography color={'#717171'} mb={'20px'}>
                Refer friends to Ticketmetric. As they sell more, you earn more!
            </Typography>

            <Box
                sx={{
                    p: 1,
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    width: {
                        sm: '100%',
                        lg: '65%',
                    },
                }}
            >
                <Typography color={'#000'} fontSize={18} fontWeight={500} mb={'20px'}>
                    Here's how it works
                </Typography>
                <Grid container direction={'column'} paddingInline={2}>
                    <ol style={{ width: 'fit-content' }}>
                        {referDescArr.map((value, index) => (
                            <li key={index}>
                                <Typography component="span" fontWeight={400}>
                                    {value}
                                </Typography>
                            </li>
                        ))}
                    </ol>
                </Grid>
            </Box>
            <Box my={4}>
                <Typography color={'#000'} fontSize={16} fontWeight={500} mb={'20px'}>
                    Unique Referral Link
                </Typography>
                <Stack direction={'row'} alignContent={'center'} sx={{ width: { xs: '100%', sm: '75%', md: '60%' } }}>
                    <Box
                        sx={{
                            height: '45px',
                            borderRadius: '2px',
                            border: '1px solid #ccc',
                            bgcolor: 'white',
                            color: '#000 !important',
                            display: 'flex',
                            alignItems: 'center',
                            pl: 1,
                            width: 'calc(100% - 45px)',
                        }}
                    >
                        {/* FIXME: */}
                        <Typography overflow={'hidden'} sx={{ width: '100%' }}>
                            {'http://ourwebsite.com/refer/OASDlknasd23'}
                        </Typography>
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
                        onClick={() => handleCopyClick('http://ourwebsite.com/refer/OASDlknasd23')}
                    >
                        <ContentCopyIcon />
                    </Box>
                </Stack>
            </Box>

            <Typography color={'#000'} fontSize={16} fontWeight={500} mb={'20px'}>
                Your referrals
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Referral</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Commission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>user@example.com</TableCell>
                            <TableCell>10/12/2023</TableCell>
                            <TableCell>Waiting for payment</TableCell>
                            <TableCell> - </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>user1@example.com</TableCell>
                            <TableCell>01/10/2024</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell>50$</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default UserActions
