import type { FC, ReactNode } from 'react'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    fontSize: '1rem',
                    background: '#000000',
                },
            },
        },
    },
})

interface ButtonProps {
    title?: string;
    startIcon?: ReactNode;
    children?: ReactNode;
}

const Button4: FC<ButtonProps> = ({ children, ...props }) => (
    <ThemeProvider theme={theme}>
        <Button variant="contained" {...props}>
            {children}
        </Button>
    </ThemeProvider>
)

export default Button4
