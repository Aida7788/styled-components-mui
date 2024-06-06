import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import SaveIcon from '@mui/icons-material/Save'
import { Avatar, Box, Button, IconButton, InputBase, Stack, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import React, { SetStateAction, useEffect, useState } from 'react'
import { USER_PERMISSIONS } from 'src/common/constants/adminPermissions'
import { PRESALES_QUERY_KEY } from 'src/common/constants/queryKeys'
import Loader from 'src/components/general/loader'
import useAuth from 'src/hooks/useAuth'
import { PresalesAPI } from 'src/services/presalesAPI'
import { Datum } from 'src/types/local/upSalesResp'
import { applyTimeZone } from 'src/utils/dataFormatters'
import { FrontEndError } from 'src/utils/error'

const PresaleCode = ({
    presaleCode,
    presaleName,
    startDateTime,
    eventId,
    setIsLoading,
}: {
    presaleCode: string | undefined
    presaleName
    startDateTime
    eventId
    setIsLoading
}) => {
    const [code, setCode] = useState(presaleCode || '')
    const [error, setError] = useState<string | null>(null)

    const queryClient = useQueryClient()

    useEffect(() => {
        setCode(presaleCode || '')
    }, [presaleCode])

    const { mutate: updatePresaleMutation } = useMutation({
        mutationFn: () => {
            return PresalesAPI.updatePresale({ eventId, startDateTime, presaleName, code })
        },
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: [PRESALES_QUERY_KEY] })
            setIsLoading(false)
        },
    })

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        try {
            updatePresaleMutation()
        } catch (err) {
            FrontEndError(err)
            setError(err.message)
        }
    }

    return (
        <form noValidate onSubmit={handleSubmit}>
            <Stack direction={'row'} alignItems={'center'}>
                <InputBase
                    sx={{ border: 1, borderColor: '#ccc', borderRadius: '6px' }}
                    autoFocus
                    error={Boolean(error)}
                    fullWidth
                    name="code"
                    onBlur={() => {}}
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    type="text"
                />
                <IconButton type="submit">
                    <SaveIcon sx={{ color: 'grey.600', fontSize: '16px' }} />
                </IconButton>
            </Stack>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    )
}

export function PresaleInformationModal({
    item,
    setOpen,
}: {
    item?: Datum
    setOpen?: React.Dispatch<SetStateAction<boolean>>
}) {
    const {
        user: { permissions },
    } = useAuth()

    const [isLoading, setIsLoading] = useState(false)

    const formatCustomDate = (dateString: string, timezone: string) => {
        if (!dateString || !timezone) {
            return ''
        }

        try {
            const date = new Date(applyTimeZone(dateString, timezone))
            const timezoneAbbreviation =
                new Intl.DateTimeFormat('en-US', { timeZone: timezone, timeZoneName: 'short' })
                    ?.formatToParts(date)
                    ?.find((part) => part.type === 'timeZoneName')?.value || ''
            return dayjs(date).format(`ddd MM/DD/YY h:mm a [${timezoneAbbreviation}]`)
        } catch (err) {
            FrontEndError(err)
            return ''
        }
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Box
                    sx={{
                        bgcolor: 'background.white',
                        p: '25px',
                        borderRadius: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '900px',
                        gap: '20px',
                        zIndex: '2500',
                    }}
                >
                    <Box sx={{ display: 'flex', gap: '20px' }}></Box>
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: '15px',
                                mb: '20px',
                            }}
                        >
                            <Avatar src={item?.images[0]} sx={{ width: 56, height: 56, objectFit: 'cover' }} />
                            <Typography sx={{ fontSize: '24px', fontWeight: '500' }}>{item?.name}</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 1fr',
                                columnGap: '65px',
                            }}
                        >
                            {item?.presales?.length > 0 && (
                                <>
                                    <Typography sx={{ fontSize: '22px' }}>Presale Date</Typography>
                                    <Typography sx={{ fontSize: '22px' }}>Name</Typography>
                                    <Typography sx={{ fontSize: '22px' }}>Presale Code</Typography>
                                </>
                            )}
                        </Box>

                        <Box
                            sx={{
                                display: 'grid',
                                gap: '10px',
                            }}
                        >
                            {item?.presales?.length > 0 &&
                                item?.presales?.map((presales, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'grid',
                                            alignItems: 'center',
                                            gridTemplateColumns: '1fr 1fr 1fr',
                                            gap: '65px',
                                        }}
                                    >
                                        <Typography sx={{ fontSize: '16px', color: 'grey.600' }}>
                                            {formatCustomDate(presales.startDateTime, item.timezone)}
                                        </Typography>
                                        <Typography sx={{ fontSize: '16px', color: 'grey.600' }}>
                                            {presales?.name}
                                        </Typography>
                                        <Stack direction="row" alignItems="center">
                                            {permissions?.includes(USER_PERMISSIONS.MANAGE_PRESALE_CODES) ? (
                                                <PresaleCode
                                                    eventId={item._id}
                                                    startDateTime={presales.startDateTime}
                                                    presaleCode={presales.code}
                                                    presaleName={presales.name}
                                                    setIsLoading={setIsLoading}
                                                />
                                            ) : (
                                                <Typography sx={{ fontSize: '16px', color: 'grey.600', width: '100%' }}>
                                                    {presales?.code}
                                                </Typography>
                                            )}
                                            <IconButton
                                                onClick={() => {
                                                    if (presales?.code && presales?.code.length) {
                                                        navigator.clipboard.writeText(presales?.code).catch((err) => {
                                                            FrontEndError(err)
                                                        })
                                                    }
                                                }}
                                            >
                                                <ContentCopyIcon sx={{ color: 'grey.600', fontSize: '16px' }} />
                                            </IconButton>
                                        </Stack>
                                    </Box>
                                ))}
                            <Box
                                sx={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    gridTemplateColumns: '1fr 1fr 1fr',
                                    gap: '65px',
                                    mt: '10px',
                                }}
                            >
                                <Typography sx={{ fontSize: '22px' }}>Public Sale Date</Typography>
                                <Typography sx={{ fontSize: '16px', color: 'black' }}>
                                    {formatCustomDate(item?.saleStartDate, item?.timezone)}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button
                        onClick={() => setOpen(false)}
                        sx={{
                            bgcolor: 'action.active',
                            color: 'text.default',
                            borderRadius: '5px',
                            alignSelf: 'end',
                            ':hover': {
                                bgcolor: 'action.active',
                                color: 'text.default',
                            },
                        }}
                    >
                        CLOSE
                    </Button>
                </Box>
            )}
        </>
    )
}
