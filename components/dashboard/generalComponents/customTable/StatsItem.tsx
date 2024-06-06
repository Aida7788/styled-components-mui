import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import DeezerIcon from 'src/icons/DezzerIcon'
import FacebookIcon from 'src/icons/Facebook'
import InstagramIcon from 'src/icons/Instagram'
import SpotifyIcon from 'src/icons/Spotify'
import TiktokIcon from 'src/icons/Tiktok'
import YoutubeIcon from 'src/icons/Youtube'

export function formatNumber(number: number): string {
    if (number === null) {
        return ''
    } else {
        const suffixes = ['', 'k', 'm', 'b', 't']
        const suffixNum = Math.floor((('' + number).length - 1) / 3)
        let shortNumber = parseFloat((suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(3))
        if (shortNumber % 1 !== 0) {
            shortNumber = parseFloat(shortNumber.toFixed(1))
        }
        return shortNumber + suffixes[suffixNum]
    }
}

const CheckText = (name: string) => {
    switch (name) {
        case 'youtube':
            return 'Youtube Subscribers'
        case 'instagram':
            return 'Instagram Followers'
        case 'spotify':
            return 'Spotify Listeners'
        default:
            return null
    }
}

const CheckIcon = (name: string) => {
    switch (name) {
        case 'facebook':
            return <FacebookIcon fontSize={'small'} sx={{ mr: '4px' }} />
        case 'ticktok':
            return <TiktokIcon fontSize={'small'} />
        case 'line':
            return <SpotifyIcon fontSize={'small'} />
        case 'youtube':
            return <YoutubeIcon fontSize={'small'} />
        case 'instagram':
            return <InstagramIcon fontSize={'small'} />
        case 'deezer':
            return <DeezerIcon sx={{ mr: '7px', fontSize: '16px' }} />
        case 'spotify':
            return <SpotifyIcon fontSize={'small'} />

        default:
            return null
    }
}

export function StatsItem({ name, number }: { name: string; number: number }) {
    const [isHover, setIsHover] = useState(false)
    const [modalText, setModalText] = useState('')

    useEffect(() => {
        setModalText(CheckText(name))
    }, [])

    return (
        <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}
            onMouseLeave={() => {
                setIsHover(false)
            }}
            onMouseOver={() => {
                setIsHover(true)
            }}
        >
            {CheckIcon(name)}
            <Typography sx={{ ml: '5px', fontSize: '13px' }}>{formatNumber(number ? number : 0)}</Typography>
            <Box
                sx={{
                    display: isHover ? 'block' : 'none',
                    position: 'absolute',
                    bgcolor: 'rgba(30,30,30,.8)',
                    width: '140px',
                    textAlign: 'center',
                    zIndex: '100',
                    p: '10px',
                    right: '110px',
                    top: '20px',
                    borderRadius: '4px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                }}
            >
                {modalText}
            </Box>
        </Box>
    )
}
