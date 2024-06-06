import { Avatar, Box, Button, Card, Grid, Typography } from '@mui/material'
import type { FC } from 'react'
import Flag from 'react-world-flags'
import useModal from 'src/hooks/useModal'
import CalendarIcon from 'src/icons/CalendarFilled'
import HeartIcon from 'src/icons/HeartIcon'
import LinkIcon from 'src/icons/LinkFilled'
import EditIcon from 'src/icons/PencilFilled'
import { API } from 'src/services/eventApi'
import { EventType } from 'src/types/local/customTableTypes'
import Artist from './Artist'
import { ProfileModalGroup } from './modals/ProfileModalGroup'

const IconStyles = {
    borderRadius: '50%',
    border: '1.033px solid #2A3042',
    background: 'rgba(42, 48, 66, 0.10)',
    padding: '8px',
    display: 'flex',
    minWidth: 'unset',
}

const cardStyles = {
    borderRadius: '10.3px',
    border: '1px solid #CCC',
    background: '#ffffff',
    boxShadow: 'none',
    p: '30px',
}

interface AnalyticsProfileProps {
    eventId?: string
    primaryAnalyticsItem?: EventType
}

const AnalyticsProfileOverview: FC<AnalyticsProfileProps> = ({ eventId, primaryAnalyticsItem }) => {
    const { changeModal, handleChangeModal, isModalOpen } = useModal()

    const handleSaveNotes = async () => {
        const data = {
            event_id: eventId,
            text: '',
            type: 'my_primary',
        }
        await API.saveNotes(data).then(() => changeModal('addModal'))
    }

    return (
        <>
            <Card sx={cardStyles}>
                <Grid container height="163px">
                    <Grid
                        item
                        md={2}
                        lg={1.5}
                        borderRight="1px solid #e0e0e0"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height="163px"
                    >
                        <Avatar
                            sx={{ width: '10vh', height: '10vh' }}
                            src={
                                primaryAnalyticsItem?.artistsStat
                                    ? primaryAnalyticsItem?.artistsStat[0]?.meta?.image
                                    : ''
                            }
                        />
                        <Box display="flex" gap="6px" alignItems="center" mt={2}>
                            <Typography color="textPrimary" variant="h6">
                                {primaryAnalyticsItem?.artistsStat ? primaryAnalyticsItem?.artistsStat[0]?.name : ''}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={7} display="flex" alignItems="center" gap="31px" paddingLeft="50px">
                        <Artist
                            heading="Artist Origin"
                            subHeading={
                                primaryAnalyticsItem?.artistsStat
                                    ? primaryAnalyticsItem?.artistsStat[0]?.meta?.origin
                                    : ''
                            }
                            flag={
                                primaryAnalyticsItem?.artistsStat[0]?.meta?.origin !== null ? (
                                    <Flag height="14" code={primaryAnalyticsItem?.artistsStat[0]?.meta?.origin} />
                                ) : (
                                    <Typography sx={{ color: '#8F8F8F', fontSize: '14px', fontWeight: '700' }}>
                                        N/A
                                    </Typography>
                                )
                            }
                        ></Artist>
                        <Artist
                            heading="Genre"
                            subHeading={
                                //@ts-ignore
                                primaryAnalyticsItem?.artistsStat[0]?.meta?.genre? typeof primaryAnalyticsItem?.artistsStat[0]?.meta?.genre === 'object'? primaryAnalyticsItem?.artistsStat[0]?.meta?.genre?.map(
                                                  (elem) => elem.root[0].toUpperCase() + elem.root.slice(1)
                                              )
                                              .join(', ')
                                        : primaryAnalyticsItem?.artistsStat[0]?.meta?.genre
                                    : 'N/A'}
                        ></Artist>
                        <Artist
                            heading="Spotify Rank"
                            subHeading={
                                primaryAnalyticsItem?.artistsStat
                                    ? primaryAnalyticsItem?.artistsStat[0]?.spotifyAPI?.popularity?.toString()
                                    : 'N/A'
                            }
                        ></Artist>
                    </Grid>
                    <Grid
                        item
                        md={3}
                        lg={3.5}
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="flex-end"
                        gap="20px"
                    >
                        <Button
                            sx={IconStyles}
                            onClick={() => {
                                changeModal('mainModal')
                            }}
                        >
                            <CalendarIcon fontSize="small" />
                        </Button>
                        <Button sx={IconStyles} onClick={() => changeModal('noteModal')}>
                            <EditIcon fontSize="small" />
                        </Button>
                        <Button sx={IconStyles} onClick={handleSaveNotes}>
                            <HeartIcon />
                        </Button>
                        <Button sx={IconStyles} onClick={() => changeModal('directModal')}>
                            <LinkIcon fontSize="small" />
                        </Button>
                    </Grid>
                </Grid>
            </Card>
            {/* <ProfileModalGroup
                handleChangeModal={handleChangeModal}
                isModalOpen={isModalOpen}
                changeModal={changeModal}
                eventId={eventId}
                analyticsItem={primaryAnalyticsItem}
            /> */}
        </>
    )
}

export default AnalyticsProfileOverview
