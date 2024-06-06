import AddIcon from '@mui/icons-material/Add'
import {
    Avatar,
    Box,
    Button,
    Divider,
    InputBase,
    MenuItem,
    Paper,
    Select,
    Slider,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useEffect, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import axios from 'axios'
import axiosClient from 'src/utils/axios'
import { FrontEndError } from 'src/utils/error'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { CustomSwitch } from '../general/CustomSwitch'
import gmailImage from '../../icons/Gmail_icon_(2020).png'
import discordLogo from '../../icons/Discord logo.png'

const Notifications = ({ user }) => {
    const [activeSelect, setActiveSelect] = useState('')
    const [enabled, setEnabled] = useState({})
    const [switched, setSwitched] = useState({})
    useEffect(() => {
        if (user.discordWebhook) {
            setEnabled((val) => {
                return { ...val, discord: true }
            })
        }
    }, [])
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography
                fontFamily={'Inter'}
                color={'#000'}
                ml={'28px'}
                fontSize={22}
                mt={'46px'}
                fontWeight={700}
                mb={'36px'}
            >
                Send notifications by:
            </Typography>
            <Divider variant="fullWidth" sx={{ width: '100%', mb: 5 }} />
            <Box sx={{ display: 'flex', gap: '74px', mb: 5, ml: '80px' }}>
                <ClickableSelectorBox
                    enabled={enabled['discord']}
                    switched={switched['discord']}
                    name="Discord"
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    avatarUrl={discordLogo}
                />
                <ClickableSelectorBox
                    enabled={switched['email']}
                    switched={switched['email']}
                    name="Email"
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    avatarUrl={gmailImage}
                />
            </Box>
            <Box sx={{ display: 'flex', gap: '74px', mb: 5, ml: '80px' }}>
                <DiscordForm setSwitched={setSwitched} user={user} enabled={enabled} setEnabled={setEnabled} />
                <EmailForm setSwitched={setSwitched} user={user} enabled={enabled} setEnabled={setEnabled} />
            </Box>
        </Box>
    )
}

const EmailForm = ({ enabled, setEnabled, user, setSwitched }) => {
    const [email, setEmail] = useState('')
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '200px',
                alignItems: 'center',
                mb: 10,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '8px',
                }}
            >
                <Typography fontFamily={'Inter'} color={'#000'} fontSize={12} fontWeight={500}>
                    {'Use Current Email Address'}
                </Typography>

                <CustomSwitch
                    onChange={(e) => {
                        setSwitched((val) => {
                            return { ...val, email: e.target.checked }
                        })
                    }}
                />
                {/*<Typography color={'#000'} fontSize={16} mb={'10px'}>
                    {user.email}
                </Typography>
                <Typography color={'#000'} fontSize={12} fontWeight={500} mb={'10px'}>
                    {'Use alternate email (optional)'}
                </Typography>
                <Paper
                    sx={{
                        boxShadow: '-3px -1px 20px 0px #00000017',
                        borderColor: '#D0D5DD',
                        borderRadius: '8px',
                        p: '3px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <InputBase
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        sx={{ flex: 1, fontSize: '12px', lineHeight: '24px', p: '0', width: '100%' }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    </Paper>*/}
            </Box>
            <Paper
                sx={{
                    boxShadow: '-3px -1px 20px 0px #00000017',
                    borderColor: '#D0D5DD',
                    borderRadius: '8px',
                    p: '3px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '200px',
                }}
            >
                <Typography fontFamily={'Inter'} color={'#000'} fontSize={12} sx={{ wordBreak: 'break-all' }}>
                    {user?.username}
                </Typography>
            </Paper>
            {/*<Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                    sx={{
                        backgroundColor: '#0D2459',
                        color: 'white',
                        ':hover': {
                            backgroundColor: '#0D2459',
                            color: 'white',
                        },
                    }}
                    disabled={enabled.email}
                    onClick={() => {
                        setEnabled((val) => {
                            return { ...val, email: true }
                        })
                    }}
                    variant="contained"
                >
                    Apply
                </Button>
                <Button
                    disabled={!enabled.email}
                    onClick={() => {
                        setEnabled((val) => {
                            return { ...val, email: false }
                        })
                    }}
                    variant="contained"
                >
                    Disable
                </Button>
                </Box>*/}
        </Box>
    )
}

const DiscordForm = ({ setSwitched, enabled, setEnabled, user }) => {
    const [hook, setHook] = useState('')
    const [code, setCode] = useState('')
    const [isHookErrornous, setIsHookErrornous] = useState(false)
    const [isCodeErrornous, setIsCodeErrornous] = useState(false)
    const [approved, setApproved] = useState(false)

    useEffect(() => {
        setIsHookErrornous(!/^.*(discord|discordapp).com\/api\/webhooks\/([\d]+)\/([a-zA-Z0-9_.-]*)$/.test(hook.trim()))
    }, [hook])

    const checkWebhook = async () => {
        if (hook.length > 0) {
            try {
                const response = await axiosClient().post('/api/user/connection/test', { webhook_url: hook.trim() })
                setApproved(true)
            } catch (err) {
                setApproved(false)
            }
        }
    }

    const sendOTP = async () => {
        if (code.length > 0) {
            try {
                await axiosClient().post('/api/user/connection/verify', {
                    webhook_url: hook,
                    otp: Number(code),
                })
                setEnabled((val) => {
                    return { ...val, discord: true }
                })
            } catch (err) {
                setIsCodeErrornous(true)
                FrontEndError(err)
            }
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '200px',
                alignItems: 'center',
                mb: 10,
            }}
        >
            {enabled.discord ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box display="flex" flexDirection="row">
                        <Typography fontFamily={'Inter'} color={'#000'} fontSize={12} fontWeight={500}>
                            {'Currently used discord hook:'}
                        </Typography>
                        <CustomSwitch
                            onChange={(e) => {
                                setSwitched((val) => {
                                    return { ...val, discord: e.target.checked }
                                })
                            }}
                        />
                    </Box>
                    <Paper
                        sx={{
                            boxShadow: '-3px -1px 20px 0px #00000017',
                            borderColor: '#D0D5DD',
                            borderRadius: '8px',
                            p: '3px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '200px',
                        }}
                    >
                        <Typography fontFamily={'Inter'} color={'#000'} fontSize={12} sx={{ wordBreak: 'break-all' }}>
                            {user?.discordWebhook || hook}
                        </Typography>
                    </Paper>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography color={'#000'} fontSize={12} fontWeight={500} mb={'10px'}>
                        {'Input the discord hook'}
                    </Typography>
                    <Paper
                        sx={{
                            boxShadow: '-3px -1px 20px 0px #00000017',
                            borderColor: isHookErrornous && hook.length > 0 ? 'red' : '#D0D5DD',
                            borderRadius: '8px',
                            p: '3px 14px',
                            display: 'flex',
                            alignItems: 'flex-start',
                            width: '200px',
                            minHeight: '48px',
                        }}
                    >
                        <InputBase
                            multiline
                            value={hook}
                            onChange={(e) => {
                                setHook(e.target.value)
                                setApproved(false)
                            }}
                            sx={{
                                flex: 1,
                                fontSize: '12px',
                                fontFamily: 'Inter',
                                lineHeight: '24px',
                                p: '0',
                                width: '100%',
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Paper>
                </Box>
            )}
            <Box sx={{ display: 'flex', gap: '10px' }}>
                {!isHookErrornous && !enabled.discord && (
                    <Box
                        sx={{
                            backgroundColor: '#FFE2E5',
                            p: '2px 8px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            checkWebhook()
                        }}
                    >
                        Send the verification code
                    </Box>
                )}
            </Box>
            {approved && !enabled.discord && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography color={'#000'} fontSize={12} fontWeight={500} mb={'10px'} mt={'16px'}>
                            {'Paste the OTP code:'}
                        </Typography>
                        <Paper
                            sx={{
                                boxShadow: '-3px -1px 20px 0px #00000017',
                                borderColor: '#D0D5DD',
                                borderRadius: '8px',
                                p: '3px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                width: '200px',
                            }}
                        >
                            <InputBase
                                error={isCodeErrornous}
                                value={code}
                                onChange={(e) => {
                                    let str = e.target.value.replace(/\D/, '')
                                    if (str.length > 6) str = str.slice(0, 6)
                                    setCode(str)
                                    setIsCodeErrornous(false)
                                }}
                                sx={{
                                    flex: 1,
                                    fontSize: '12px',
                                    fontFamily: 'Inter',
                                    lineHeight: '24px',
                                    p: '0',
                                    width: '100%',
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Paper>
                    </Box>
                    {!(enabled.discord && code.length < 6) && (
                        <Box
                            fontFamily={'Inter'}
                            sx={{
                                backgroundColor: '#FFE2E5',
                                p: '2px 8px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                sendOTP()
                            }}
                        >
                            Submit
                        </Box>
                    )}
                </>
            )}
            {enabled.discord && (
                <Box
                    fontFamily={'Inter'}
                    sx={{
                        backgroundColor: '#FFE2E5',
                        p: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setEnabled((val) => {
                            return { ...val, discord: false }
                        })
                    }}
                >
                    Delete
                </Box>
            )}
        </Box>
    )
}

const ClickableSelectorBox = ({
    enabled,
    avatarUrl,
    icon,
    switched,
    name,
    setActiveSelect,
    activeSelect,
}: {
    enabled: boolean
    avatarUrl?: string
    icon?
    switched: boolean,
    name: string
    setActiveSelect: (value: string) => void
    activeSelect: string
}) => {
    return (
        <Box
            sx={{
                boxShadow: '-3px -1px 20px 0px #00000017',
                borderRadius: '10px',
                width: '200px',
                height: '141px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: activeSelect === name ? '#0D2459' : 'white',
                color: activeSelect === name ? 'white' : 'black',
                transition:
                    'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            }}
        >
            {avatarUrl ? (
                <Box component="img" sx={{ width: 94 }} src={avatarUrl} />
            ) : (
                <Avatar sx={{ width: 94, height: 94 }}>{icon}</Avatar>
            )}
            <Typography fontFamily={'Inter'} sx={{ fontSize: '22px', fontWeight: 400 }}>
                {name}
            </Typography>
            {(enabled && switched) && (
                <CheckBoxIcon
                    sx={{ width: '26px', height: '26px', position: 'absolute', right: '10px', top: '10px' }}
                />
            )}
        </Box>
    )
}

export default Notifications
