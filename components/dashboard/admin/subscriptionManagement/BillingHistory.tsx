import { type FC } from 'react'
import { Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { formatDate } from 'src/utils/dataFormatters'
import { CapitalizeFirstLetter } from 'src/utils/string'

import { TBillingHistoryItem } from 'src/types/api/apiSubscriptionManagement'
import { SHORT_DATE_FORMAT } from 'src/common/constants/dateFormat'

export type TBillingHistory = {
    open: boolean
    onClose: () => void
    userId: string
}

const BillingHistory: FC<TBillingHistory> = ({ open, onClose, userId }) => {
    // FIXME:
    const historyList = [
        {
            paymentInvoice: 65474,
            amount: 50,
            status: 'processing',
            date: new Date(),
        },
        {
            paymentInvoice: 65475,
            amount: 500,
            status: 'processing',
            date: new Date(),
        },
        {
            paymentInvoice: 65476,
            amount: 5014,
            status: 'processing',
            date: new Date(),
        },
        {
            paymentInvoice: 65477,
            amount: 3450,
            status: 'processing',
            date: new Date(),
        },
        {
            paymentInvoice: 65478,
            amount: 150,
            status: 'processing',
            date: new Date(),
        },
        {
            paymentInvoice: 65479,
            amount: 10,
            status: 'processing',
            date: new Date(),
        },
    ]

    const HistoryItem: FC<{ item: TBillingHistoryItem }> = ({ item }) => (
        <Grid item>
            <Grid
                container
                alignContent={'center'}
                justifyContent={'space-between'}
                // spacing={2}
                sx={{ backgroundColor: '#FFFFFF', borderRadius: 4, width: 550, height: 80, mb: 2, padding: 2 }}
            >
                <Grid item xs={3} marginLeft={0}>
                    <Grid container justifyContent={'flex-start'}>
                        <Grid item>
                            <Typography variant="subtitle2">Payment invoice</Typography>
                            <Typography>#{item.paymentInvoice}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Grid container justifyContent={'center'}>
                        <Grid item>
                            <Typography variant="subtitle2">Amount</Typography>
                            <Typography>${item.amount}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <Grid container justifyContent={'center'}>
                        <Grid item>
                            <Typography variant="subtitle2">Status</Typography>
                            <Typography>{CapitalizeFirstLetter(item.status)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2} alignItems={'end'}>
                    <Grid container justifyContent={'center'}>
                        <Grid item>
                            <Typography variant="subtitle2">Date</Typography>
                            <Typography>{formatDate(item.date, SHORT_DATE_FORMAT)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: '#f7f6f4' }}>
                Billing history
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: '#f7f6f4' }}>
                <Grid container flexDirection={'row'} justifyContent={'center'}>
                    {historyList.map((event) => (
                        <HistoryItem
                            //FIXME:
                            key={`${event.paymentInvoice}${event.amount}`}
                            item={event}
                        />
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default BillingHistory
