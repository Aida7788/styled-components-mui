import { Box, Link } from '@mui/material'
import React, { SetStateAction, useState } from 'react'
import { otherPlatforms } from 'src/types/local/upSalesResp'
import { ModalHeader } from '../generalComponents/ModalHeader'
import { CapitalizeFirstLetter } from 'src/utils/string'

export function DirectLinks({
    setOpen,
    eventId,
    meta,
}: {
    setOpen: React.Dispatch<SetStateAction<boolean>>
    eventId?: string
    meta: otherPlatforms[]
}) {
    const [showFirstLinkPopup, setShowFirstLinkPopup] = useState<number | null>(null)
    const handleImageCheck = (namePlatform: string) => {
        return (
            <img
                style={{ width: 30, height: 30, borderRadius: '50%' }}
                src={`/static/icons/platforms/${namePlatform}.png`}
                alt=""
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null
                    currentTarget.src = '/static/logo.jpg'
                }}
            />
        )
    }

    // const imgStyles = {
    //     height: '150px',
    //     width: '150px',
    //     cursor: 'pointer',
    // }
    return (
        <Box
            sx={{
                bgcolor: 'background.white',
                p: '25px',
                borderRadius: '12px',
                flexDirection: 'column',
                width: '300px',
                zIndex: '1500',
                display: 'flex',
            }}
        >
            <ModalHeader label="Direct Links" setOpen={setOpen} type="all" />
            {meta && (
                <Box
                    sx={{
                        display: 'flex',
                        gap: '20px',
                        marginTop: '30px',
                        justifyContent: 'center',
                    }}
                >
                    {(() => {
                        const links: otherPlatforms[] = []

                        let primary = meta.find((v) => v.type === 'Primary')
                        if (!primary) {
                            primary = meta.find((v) => v.type === 'Primary Others')
                        }
                        if (primary) links.push(primary)

                        const secondary = meta.find(
                            (v) => v.type === 'Secondary' || (Array.isArray(v.type) && v.type[0] === 'Secondary')
                        )
                        if (secondary) links.push(secondary)

                        return links.map((item, index) => {
                            return (
                                <Box
                                    key={item.id}
                                    sx={{ position: 'relative' }}
                                    onMouseLeave={() => setShowFirstLinkPopup(null)}
                                    onMouseEnter={() => setShowFirstLinkPopup(index)}
                                >
                                    <Link
                                        sx={{ textDecoration: 'none' }}
                                        href={item.url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Box
                                            sx={{
                                                // width: '44px',
                                                // height: '44px',
                                                // bgcolor: '#036cdf',
                                                borderRadius: 99,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mr: '10px',
                                            }}
                                        >
                                            {handleImageCheck(item.marketPlace)}
                                        </Box>
                                    </Link>
                                    <Box
                                        sx={{
                                            display: index === showFirstLinkPopup ? 'block' : 'none',
                                            position: 'absolute',
                                            bgcolor: 'rgba(30,30,30,.8)',
                                            height: '40px',
                                            width: 'max-content',
                                            zIndex: '100',
                                            p: '10px',
                                            left: '-35px',
                                            top: '50px',
                                            borderRadius: '4px',
                                            color: 'white',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {CapitalizeFirstLetter(item.marketPlace)}
                                    </Box>
                                </Box>
                            )
                        })
                    })()}
                </Box>
            )}
        </Box>
    )
}
