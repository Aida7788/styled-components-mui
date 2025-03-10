import { Editor, EditorProps } from 'react-draft-wysiwyg'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import { experimentalStyled } from '@mui/material/styles'

interface DraftEditorProps extends EditorProps {
    sx: Record<string, any>;
}

const DraftEditorRoot = experimentalStyled('div')(({ theme }) => ({
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    '& .rdw-editor-wrapper': {
        flexGrow: 1,
    },
    '& .rdw-editor-toolbar': {
        backgroundColor: 'transparent',
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
        marginBottom: 0,
    },
    '& .rdw-option-wrapper': {
        backgroundColor: 'transparent',
        border: 'none',
    },
    '& .rdw-option-wrapper:hover': {
        backgroundColor: theme.palette.action.hover,
        boxShadow: 'none',
    },
    '& .rdw-option-active': {
        backgroundColor: theme.palette.action.selected,
        boxShadow: 'none',
    },
    '& .rdw-dropdown-wrapper': {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
    },
    '& .rdw-dropdown-wrapper:hover': {
        backgroundColor: theme.palette.action.hover,
        boxShadow: 'none',
    },
    '& .rdw-dropdown-optionwrapper': {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[10],
        overflowY: 'auto',
        padding: 0,
    },
    '& .rdw-dropdown-optionwrapper:hover': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[10],
    },
    '& .rdw-dropdownoption-active': {
        backgroundColor: 'transparent',
    },
    '& .rdw-dropdownoption-highlighted': {
        backgroundColor: theme.palette.action.hover,
    },
    '& .rdw-colorpicker-modal': {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[10],
        width: 260,
    },
    '& .rdw-colorpicker-modal-options': {
        overflowY: 'auto',
    },
    '& .rdw-link-modal': {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[10],
        overflowY: 'auto',
        width: 260,
    },
    '& .rdw-embedded-modal': {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[10],
        overflowY: 'auto',
        width: 260,
    },
    '& .rdw-embedded-modal-header': {
        display: 'none',
    },
    '& .rdw-emoji-modal': {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[10],
        overflowY: 'auto',
        width: 260,
    },
    '& .rdw-image-modal': {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[10],
        overflowY: 'auto',
        width: 260,
    },
    '& .rdw-image-modal-header': {
        display: 'none',
    },
    '& .rdw-editor-main': {
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
    },
    '& .public-DraftEditorPlaceholder-root': {
        color: theme.palette.text.secondary,
    },
    '& .public-DraftStyleDefault-block': {
        margin: 0,
    },
}))

const DraftEditor: FC<DraftEditorProps> = (props) => {
    const { sx, ...other } = props

    return (
        <DraftEditorRoot sx={sx}>
            <Editor {...other} />
        </DraftEditorRoot>
    )
}

DraftEditor.propTypes = {
    sx: PropTypes.object,
}

export default DraftEditor
