import { Box, Button, InputBase } from '@mui/material'
import React, { SetStateAction, useEffect, useState } from 'react'
import { ModalHeader } from '../generalComponents/ModalHeader'

export function NoteModal({
    setOpen,
    selectedNote = '',
    eventId,
    onSubmit,
    label = 'Add New Note',
    buttonLabel = 'Add',
    isSecondary,
    setPopupText,
}: {
    selectedNote?: string
    setOpen: React.Dispatch<SetStateAction<boolean>>
    eventId?: string
    isSecondary?: boolean
    onSubmit: ({ eventId, note, isSecondary }: { eventId: string; note: string; isSecondary: boolean }) => void
    label?: string
    buttonLabel?: string
    setPopupText?: (value: string) => void
}) {
    const [textArea, setTextArea] = useState(selectedNote)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextArea(e.target.value)
    }
    const handleAdd = () => {
        if (textArea?.length > 0) {
            onSubmit({ eventId, note: textArea, isSecondary })
            setTextArea('')
            setOpen(false)
            if(setPopupText) setPopupText('New Note Added')
        }
    }

    const handleDelete = () => {
        onSubmit({ eventId, note: '', isSecondary })
        setTextArea('')
        setOpen(false)
    }

    useEffect(() => {
        setTextArea(selectedNote)
    }, [selectedNote])

    const closeNoteModal = (isOpen: boolean) => {
        setOpen(isOpen)
        setTextArea('')
    }

    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',

                flexDirection: 'column',
                width: '550px',
                gap: '20px',
                zIndex: '1500',

                display: 'flex',
            }}
        >
            <ModalHeader label={label} type="all" setOpen={closeNoteModal}></ModalHeader>
            <Box>
                <InputBase
                    multiline
                    rows={6}
                    sx={{
                        width: '100%',
                        minHeight: '100px',
                        paddingInline: '20px',
                        border: 1,
                        borderColor: 'grey.400',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                    }}
                    value={textArea}
                    onChange={handleChangeInput}
                ></InputBase>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    width: '100%',
                    gap: '12px',
                }}
            >
                <Button
                    disabled={textArea.length === 0}
                    onClick={() => handleAdd()}
                    sx={{
                        bgcolor: 'background.black',
                        color: 'text.default',
                        '&:hover': { bgcolor: 'background.black' },
                        '&:disabled':{color:'#aeaeae',backgroundColor: '#e5e5e5'},
                        px: '16px',
                        py: '8px',
                    }}
                >
                    {buttonLabel}
                </Button>
                {textArea?.length > 0 && (
                    <Button
                        sx={{
                            bgcolor: '#E72929',
                            color: 'text.default',
                            '&:hover': { bgcolor: 'red' },
                            px: '16px',
                            py: '8px',
                        }}
                        onClick={() => handleDelete()}
                    >
                        DELETE NOTE
                    </Button>
                )}
            </Box>
        </Box>
    )
}
