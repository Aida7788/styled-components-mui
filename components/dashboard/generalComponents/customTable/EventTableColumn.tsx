import { EventType } from 'src/types/local/customTableTypes'
import Flag from 'react-world-flags'
import CheckIcon from '@mui/icons-material/Check'
import LinkIcon from '@mui/icons-material/Link'
import { artistsDatumInt, Datum, otherPlatforms } from 'src/types/local/upSalesResp'
import { Avatar, Box, Checkbox, Grid, IconButton, Link, Typography } from '@mui/material'
import React, { SetStateAction } from 'react'
import { primaryFavouriteDataInterface } from 'src/types/local/primaryFavourite'

export interface EventTableProps {
    img?: string | undefined;
    type?: string | undefined;
    name?: string | undefined;
    genre?: string | undefined;
    country?: string | undefined;
}

export const EventTableColumn = ({
                                     item,
                                     id,
                                     isChecked,
                                     setOpenDirect = () => {
                                     },
                                     setOpenAvatar = () => {
                                     },
                                     link,
                                     setSelectedMeta = () => {
                                     },
                                     setSelectedArtist = () => {
                                     },
                                     artist,
                                     meta,
                                 }: {
    item?: EventTableProps;
    isChecked?: boolean;
    meta?: { otherPlatforms: otherPlatforms[] };
    setSelectedArtist?: React.Dispatch<
        SetStateAction<Datum | EventType | artistsDatumInt | primaryFavouriteDataInterface>
    >;
    setOpenDirect?: React.Dispatch<SetStateAction<boolean>>;
    setOpenAvatar?: React.Dispatch<SetStateAction<boolean>>;
    setSelectedMeta?: React.Dispatch<SetStateAction<otherPlatforms[]>>;
    link?: string;
    artist?: Datum | EventType | artistsDatumInt | primaryFavouriteDataInterface;
    id?: string;
}) => {
    const handleClickAvatar = () => {
        setSelectedArtist(artist)
        setOpenAvatar(true)
    }
    const handleOpenDirectLinks = () => {
        setSelectedMeta(meta.otherPlatforms)
        setOpenDirect(true)
    }

    return (
        <Grid
            item
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',

                gap: '4px',
                py: '4px',
            }}>
            {isChecked &&
                <Checkbox sx={{ color: 'grey.400' }} checkedIcon={<CheckIcon sx={{ color: 'grey.400' }} />} />}
            <Avatar onClick={() => handleClickAvatar()} src={item.img}
                    sx={{ width: 56, height: 56, cursor: 'pointer' }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                }}>
                <Typography
                    sx={{
                        fontSize: '10px',
                        color: 'grey.400',
                        fontWeight: '600',
                    }}>
                    {item.type}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Link
                            href={link}
                            rel="noopener noreferrer"
                            target="_blank"
                            sx={{
                                cursor: 'pointer',
                                fontSize: '14px',
                                width: '80%',
                                fontWeight: '600',
                                color: 'blue',
                            }}>
                            {item.name}
                        </Link>
                        <IconButton onClick={() => handleOpenDirectLinks()} sx={{ bgcolor: 'grey.800' }} size="small">
                            <LinkIcon
                                sx={{
                                    color: '#FFF',
                                    fontSize: '14px',
                                    rotate: '-45deg',
                                }}
                            />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Typography
                            sx={{
                                fontSize: '13px',
                                color: 'grey.400',
                                textTransform: 'capitalize',
                            }}>
                            {item.genre}
                        </Typography>
                        <Flag height="14" code={item.country} />
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}
