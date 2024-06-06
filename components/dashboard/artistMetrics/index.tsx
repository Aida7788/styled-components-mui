import {
    Avatar,
    Backdrop,
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import React, { SetStateAction, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import DebouncedInput from 'src/components/general/DebouncedInput'
import DeezerIcon from 'src/icons/DezzerIcon'
import InstagramIcon from 'src/icons/Instagram'
import SearchIcon from 'src/icons/SearchIcon'
import { SongkickIcon } from 'src/icons/SongKick'
import SpotifyIcon from 'src/icons/Spotify'
import TiktokIcon from 'src/icons/Tiktok'
import TwitterIcon from 'src/icons/Twitter'
import YoutubeIcon from 'src/icons/Youtube'
import { artistsDatumInt } from 'src/types/local/upSalesResp'
import { AvatarModal } from '../eventAnalytics/eventAnalyticsModals/AvatarModal'
import PaginationBottomComponent from '../generalComponents/StyledPagination'
import { StyledTableCell } from '../generalComponents/TableCoponents'
import { formatNumber } from '../generalComponents/customTable/StatsItem'
import { LoaderComponent } from '../loaderComponent/loaderComp'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import { InfoModal } from '../eventAnalytics/eventAnalyticsModals/InfoModal'

const AnalyticsMain = ({
    setSearch,
    isLoading,
    search,
    artistData,
    currentPage,
    itemsPerPage,
    totalPages,
    allEntries,
    setCurrentPage,
    setItemsPerPage,
    changeModal,
    isModalOpen,
    handleChangeModal,
}: {
    isLoading: boolean
    artistData: artistsDatumInt[]
    search: string
    currentPage: number
    totalPages: number
    allEntries: number
    itemsPerPage: number
    changeModal: (value: string) => void
    isModalOpen: (value: string) => boolean
    handleChangeModal: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        modalId: string,
        secondModalId?: string
    ) => void

    setSearch: React.Dispatch<SetStateAction<string>>
    setCurrentPage: (numb: number) => void
    setItemsPerPage: (numb: number) => void
}) => {
    const [selectedArtist, setSelectedArtist] = useState<artistsDatumInt>()
    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    width: '100%',
                    py: '29px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        px: '12px',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Paper
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            py: '57px',
                            px: '51px',
                            width: '100%',
                            boxShadow: 0,
                            borderRadius: 0,
                            mb: '9px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography sx={{ textWrap: 'nowrap', mr: '32px' }} variant="h5">
                            Artist Metric
                        </Typography>
                        <Box
                            sx={{
                                borderRadius: '8px',
                                padding: '4px 12px',
                                border: 'solid',
                                borderWidth: '1px',
                                borderColor: '#E9D7FE',
                                mr: '8px',
                            }}
                        >
                            <Typography
                                sx={{ color: '#AE763F', minWidth: '100px', textAlign: 'center', width: '100%' }}
                                noWrap={true}
                            >
                                {allEntries} artists
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{ width: '26px', height: '26px', mr: '4px' }}
                            onClick={() => changeModal('infoModal')}
                        >
                            <HelpOutlineOutlinedIcon sx={{ width: '20px', height: '20px', color: '#667085' }} />
                        </IconButton>
                        <Paper
                            component="form"
                            sx={{
                                border: '1px solid',
                                borderColor: '#D0D5DD',
                                borderRadius: '8px',
                                p: '3px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                boxShadow: 0,
                                mr: '18px',
                            }}
                        >
                            <SearchIcon fontSize="small" sx={{ color: '#667085', fontSize: '20px', mr: '8px' }} />
                            <DebouncedInput
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                    }
                                }}
                                value={search}
                                onSearch={(e) => {
                                    setSearch(e)
                                }}
                                debounceTime={300}
                                sx={{ fontSize: '16px', lineHeight: '24px', p: '0', width: '100%' }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                        </Paper>
                    </Paper>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        px: '12px',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    {isLoading ? (
                        <LoaderComponent />
                    ) : (
                        <>
                            <ArtistMetricsTable
                                artistData={artistData}
                                headers={[
                                    'Artist',
                                    'POPULARITY',
                                    'LISTENERS',
                                    'FOLLOWERS',
                                    'SUBSCRIBERS',
                                    'FOLLOWERS',
                                    'FOLLOWERS',
                                    'FOLLOWERS',
                                    'FANS',
                                    'FANS',
                                ]}
                                icons={[
                                    null,
                                    <SpotifyIcon key={1} viewBox="0 0 25 22" />,
                                    <SpotifyIcon key={2} viewBox="0 0 25 22" />,
                                    <SpotifyIcon key={3} viewBox="0 0 25 22" />,
                                    <YoutubeIcon key={4} viewBox="0 0 25 22" />,
                                    <InstagramIcon key={5} viewBox="0 0 25 22" />,
                                    <TiktokIcon key={6} viewBox="0 0 25 22" />,
                                    <TwitterIcon key={7} viewBox="0 0 25 22" />,
                                    <DeezerIcon key={8} />,
                                    <SongkickIcon key={9} />,
                                ]}
                                changeModal={changeModal}
                                setSelectedArtist={setSelectedArtist}
                            />
                            <PaginationBottomComponent
                                page={currentPage}
                                perPage={itemsPerPage}
                                count={totalPages}
                                setPage={setCurrentPage}
                                setPerPage={setItemsPerPage}
                            />
                        </>
                    )}
                </Box>
            </Box>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('avatarModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'avatarModal')}
            >
                <AvatarModal
                    artistId={selectedArtist?._id?.$oid}
                    artists={[selectedArtist]}
                    setOpen={() => changeModal('avatarModal')}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('infoModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'infoModal')}
            >
                <InfoModal
                    changeModal={changeModal}
                />
            </Backdrop>
        </>
    )
}

const ArtistMetricsTable = ({
    artistData,
    headers,
    icons,
    changeModal,
    setSelectedArtist,
}: {
    artistData: artistsDatumInt[]
    headers: string[]
    icons: any[]
    changeModal: (value: string) => void
    setSelectedArtist
}) => {
    return (
        <TableContainer sx={{ backgroundColor: 'white' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#0B1B3F' }}>
                    <TableRow>
                        <StyledTableCell sx={{ minWidth: '5px', p: 0 }} />
                        <StyledTableCell>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '10px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        maxWidth: '83px',
                                        textAlign: 'start',
                                        color: 'white',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                    }}
                                >
                                    {headers[0].toLocaleUpperCase()}
                                </Typography>
                            </Box>
                        </StyledTableCell>
                        {headers.slice(1).map((elem, index) => {
                            return (
                                <StyledTableCell key={index}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}
                                    >
                                        {icons[index + 1]}
                                        <Typography
                                            sx={{
                                                maxWidth: '83px',
                                                textAlign: 'start',
                                                color: 'white',
                                                fontSize: '14px',
                                                fontWeight: '400',
                                            }}
                                        >
                                            {elem.toLocaleUpperCase()}
                                        </Typography>
                                    </Box>
                                </StyledTableCell>
                            )
                        })}
                        <StyledTableCell sx={{ width: '5px', p: 0 }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {artistData?.map((elem, index) => {
                        return (
                            <TableRow
                                sx={{ ':hover': { bgcolor: 'lightgray' }, cursor: 'pointer' }}
                                onClick={() => {
                                    window
                                        .open(
                                            `/dashboard/metric/${
                                                elem?._id?.$oid === undefined ? elem?._id : elem?._id.$oid
                                            }`,
                                            '_blank'
                                        )
                                        .focus()
                                }}
                                key={index}
                            >
                                <TableCell sx={{ p: '0' }} />
                                <TableCell
                                    sx={{
                                        verticalAlign: 'top',
                                        paddingTop: '20px',
                                        width: '350px',
                                        maxWidth: '300px',
                                        pv: '0',
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <Avatar
                                            sx={{
                                                width: '56px',
                                                height: '56px',
                                                mr: '12px',
                                            }}
                                            //@ts-ignore
                                            src={elem?.meta?.image}
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                            <Box
                                                sx={{
                                                    mb: '6px',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: 'black',
                                                        textDecoration: 'none',
                                                        fontSize: '15px',
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {elem.name}
                                                </Typography>
                                                <ReactCountryFlag
                                                    svg
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        fontSize: '20px',
                                                        marginRight: '1px',
                                                    }}
                                                    countryCode={elem?.meta?.origin}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <CellValue value={elem?.spotifyAPI?.popularity} />
                                <CellValue value={elem?.spotify_audience_graph?.at(0)?.value} />
                                <CellValue value={elem?.spotify_audience?.follower_count} />
                                <CellValue value={elem?.youtube_audience?.follower_count} />
                                <CellValue value={elem?.instagram_audience?.follower_count} />
                                <CellValue value={elem?.tiktok_audience?.follower_count} />
                                <CellValue value={elem?.twitter_audience?.follower_count} />
                                <CellValue value={elem?.deezer_music_audience?.follower_count} />
                                <CellValue value={elem?.songkick_music_audience?.follower_count} />
                                <TableCell sx={{ p: 0 }} />
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AnalyticsMain

const CellValue = ({ value }) => {
    return (
        <TableCell sx={{ paddingTop: '30px', verticalAlign: 'top' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100%' }}>
                <Typography sx={{ fontSize: '15px', fontWeight: '500' }}>
                    {value ? formatNumber(value) : 'N/A'}
                </Typography>
            </Box>
        </TableCell>
    )
}
