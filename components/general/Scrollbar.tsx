import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { forwardRef, Ref } from 'react'
import type { ScrollBarProps as PerfectScrollbarProps } from 'react-perfect-scrollbar'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

interface ScrollbarProps extends PerfectScrollbarProps {}

const Scrollbar = forwardRef<Ref<PerfectScrollbar>, ScrollbarProps>((props, ref) => {
    const { children, ...other } = props

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (isMobile) {
        return <Box ref={ref}>{children}</Box>
    }

    return (
        <PerfectScrollbar className="customScrollbar" ref={ref as any} {...other}>
            {children}
        </PerfectScrollbar>
    )
})

Scrollbar.propTypes = {
    children: PropTypes.node,
}

export default Scrollbar
