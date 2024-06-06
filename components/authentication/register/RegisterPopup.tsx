import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import { styled } from '@mui/system'

const StyledDialogTitle = styled(DialogTitle)({
    backgroundColor: '#3f51b5',
    color: '#fff',
    textAlign: 'center',
    padding: '16px',
})

const StyledDialogContent = styled(DialogContent)({
    padding: '24px',
})

const StyledDialogContentText = styled(DialogContentText)({
    marginTop: '16px',
    marginBottom: '16px',
    fontSize: '1rem',
    color: '#333',
    textAlign: 'justify',
})

const StyledButton = styled(Button)({
    margin: '8px',
    backgroundColor: '#3f51b5',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#303f9f',
    },
})

const StyledLink = styled('a')({
    color: '#3f51b5',
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
})

export const RegistrationPopup = ({ open, handleClose }) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="registration-dialog-title">
            <StyledDialogTitle id="registration-dialog-title">Thank you for signing up with us!</StyledDialogTitle>
            <StyledDialogContent>
                <StyledDialogContentText>
                    We are thrilled to have you join our community. To complete the registration process, please check
                    your email and click on the verification link we have sent to you. This will confirm your account
                    and give you full access to all the features on our platform.
                </StyledDialogContentText>
                <StyledDialogContentText>
                    If you don't see the email in your inbox, please check your spam or junk folder. If you still don't
                    see it, please reach out to our customer support team for assistance via email{' '}
                    <StyledLink href="mailto:info@dataimpulse.com">support@ticketmetric.io</StyledLink>.
                </StyledDialogContentText>
                <StyledDialogContentText>
                    Thank you for choosing to be a part of our community. We look forward to seeing you around!
                </StyledDialogContentText>
            </StyledDialogContent>
            <DialogActions>
                <StyledButton onClick={handleClose}>Close</StyledButton>
            </DialogActions>
        </Dialog>
    )
}
