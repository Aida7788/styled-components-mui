import { Box, Card, Grid, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material'
import { TooltipProps } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import InfoSm from 'src/icons/InfoSm'
import { EventType } from 'src/types/local/customTableTypes'
import { convertDate, findMaxByStartDateTime, findMinStartDateTime } from 'src/utils/dataFormatters'
import { FormatDate } from '../../../utils/dataFormatters'

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className, tooltip: 'tooltip' }} />
))(({ theme }) => ({
    '& .tooltip': {
        borderRadius: '4px',
        background: '#2A3042',
        marginTop: '6px !important',
        padding: '10px 12px',
        width: '200px',
    },
    '& .MuiTooltip-arrow': {
        color: '#2A3042',
    },
    '& h6': {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: 'normal',
    },
    '& p': {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: '12px',
        fontWeight: 400,
        lineHeight: 'normal',
        marginTop: '5px',
    },
}))

interface dataType {
    key: string
    value: string | number
    break?: string
}

function daysBetweenDates(date1: Date, date2: Date): number {
    const utcDate1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate())
    const utcDate2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate())

    const millisecondsPerDay = 24 * 60 * 60 * 1000
    const timeDifference = utcDate1 - utcDate2

    const daysDifference = Math.floor(timeDifference / millisecondsPerDay)

    return daysDifference
}

export function AnalyticsGeneralOverview({ primaryAnalyticsItem }: { primaryAnalyticsItem: EventType }) {
    const dataAdress: dataType[] = [
        {
            key: 'Adress:',
            value: `${primaryAnalyticsItem?.venueName} | ${primaryAnalyticsItem?.city}`,
            break: `${primaryAnalyticsItem?.venueStateCode}`,
        },
        {
            key: 'Date:',
            value: FormatDate(primaryAnalyticsItem?.date, primaryAnalyticsItem?.timezone),
        },
        {
            key: 'Days to the event:',
            value: `${
                daysBetweenDates(new Date(primaryAnalyticsItem?.date), new Date()) > 0
                    ? daysBetweenDates(new Date(primaryAnalyticsItem?.date), new Date())
                    : 0
            }`,
        },
    ]

    const dataCapacity: dataType[] = [
        {
            key: 'Capacity:',
            value:
                primaryAnalyticsItem?.meta?.otherPlatforms[0]?.totalPlaces !== undefined ||
                primaryAnalyticsItem?.meta?.otherPlatforms[0]?.totalPlaces !== null
                    ? primaryAnalyticsItem?.meta?.otherPlatforms[0]?.totalPlaces
                    : 'N/A',
        },
        {
            key: 'Ticketmaster Availability:',
            value:
                primaryAnalyticsItem?.last_fetched_details?.primary_tickets_count !== undefined ||
                primaryAnalyticsItem?.last_fetched_details?.primary_tickets_count !== null
                    ? primaryAnalyticsItem?.last_fetched_details?.primary_tickets_count
                    : 'N/A',
        },
        {
            key: 'StubHub Availability:',
            value:
                primaryAnalyticsItem?.last_fetched_details?.secondary_tickets_count !== undefined ||
                primaryAnalyticsItem?.last_fetched_details?.secondary_tickets_count !== null
                    ? primaryAnalyticsItem?.last_fetched_details?.secondary_tickets_count
                    : 'N/A',
        },
        {
            key: 'TM Price Range:',
            value:
                primaryAnalyticsItem?.priceRange.length > 0
                    ? `$${primaryAnalyticsItem?.priceRange[0]?.min} - $${primaryAnalyticsItem?.priceRange[0]?.max}`
                    : 'N/A',
        },
    ]

    const dataSale: dataType[] = [
        {
            key: 'Presale:',
            value: `${
                primaryAnalyticsItem?.presales &&
                `${FormatDate(findMaxByStartDateTime(primaryAnalyticsItem), primaryAnalyticsItem?.timezone)} - ${FormatDate(
                    findMinStartDateTime(primaryAnalyticsItem),
                    primaryAnalyticsItem?.timezone
                )}`
            }`,
        },
        {
            key: 'Public Sale:',
            value: `${FormatDate(primaryAnalyticsItem?.saleStartDate, primaryAnalyticsItem?.timezone)}`,
        },
    ]

    return (
        <Card
            sx={{
                borderRadius: '10.3px',
                border: '1px solid #CCC',
                background: '#ffffff',
                boxShadow: 'none',
                p: '30px',
            }}
        >
            <Grid container spacing={4}>
                <Grid item md={4}>
                    <DataWrapper data={dataAdress} isIcon={false} />
                </Grid>
                <Grid item md={4}>
                    {primaryAnalyticsItem && (
                        <DataWrapper
                            lastFetched={primaryAnalyticsItem?.current_date_time}
                            data={dataCapacity}
                            isIcon={true}
                        />
                    )}
                </Grid>
                <Grid item md={4}>
                    <DataWrapper data={dataSale} isIcon={false} />
                </Grid>
            </Grid>
        </Card>
    )
}

const DataWrapper = ({ isIcon, data, lastFetched }: { isIcon: boolean; data: dataType[]; lastFetched?: string }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <List>
                {data.map((notification, i) => {
                    return (
                        <ListItem divider={i < data.length - 1} key={notification.key}>
                            <ListItemText
                                sx={{
                                    '& .MuiTypography-root': {
                                        display: 'flex',
                                        gap: '10px',
                                    },
                                }}
                            >
                                <Typography
                                    color="textPrimary"
                                    variant="subtitle2"
                                    sx={{ fontSize: '22px', fontWeight: '700', color: '#3F4253' }}
                                >
                                    {`${notification.key}`}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography
                                        color="textPrimary"
                                        variant="subtitle2"
                                        sx={{ fontSize: '22px', fontWeight: '700', color: '#3F4253' }}
                                    >
                                        {`${notification.value}`} {notification.break && `${notification.break}`}
                                    </Typography>
                                </Box>
                                {isIcon && [1, 2].includes(i) && (
                                    <StyledTooltip
                                        arrow
                                        placement="bottom"
                                        title={
                                            <Box>
                                                <Typography variant="h6">Last Fetched</Typography>
                                                <Typography>{convertDate(lastFetched)} </Typography>
                                            </Box>
                                        }
                                    >
                                        <InfoSm style={{ cursor: 'pointer', marginBottom: '-3px', width: '16px' }} />
                                    </StyledTooltip>
                                )}
                            </ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )
}
