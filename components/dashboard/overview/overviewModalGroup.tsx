import { Backdrop } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Datum, artistsDatumInt, otherPlatforms } from 'src/types/local/upSalesResp'
import { AddModal } from '../buyingList/addModal'
import { NoteModal } from '../eventAnalytics/NoteModal'
import { DirectLinks } from '../eventAnalytics/directLinks'
import AdminModal from '../eventAnalytics/eventAnalyticsModals/AdminModal'
import { AvatarModal } from '../eventAnalytics/eventAnalyticsModals/AvatarModal'
import { PresaleInformationModal } from './PresaleInformationModal'
import { InfoModal } from '../eventAnalytics/eventAnalyticsModals/InfoModal'
import AddEventModal from './addEventModal'

function OverViewModalGroup({
    selectedId,
    isModalOpen,
    handleChangeModal,
    changeModal,
    selectedItem,
    selectedMeta,
    handleAddToBuying,
}: {
    selectedId: string
    isModalOpen: (value: string) => boolean
    handleChangeModal: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        modalId: string,
        secondModalId?: string
    ) => void
    changeModal: (value: string) => void
    selectedItem: Datum
    selectedMeta: otherPlatforms[]
    handleAddToBuying: (id: string, note: string) => void
}) {
    const [artistData, setArtistData] = useState<artistsDatumInt[]>()
    useEffect(() => {
        const dataArray = selectedItem?.artistsStat?.sort((a, b) => {
            if (a?.spotifyAPI?.popularity && b?.spotifyAPI?.popularity) {
                if (a?.spotifyAPI?.popularity < b?.spotifyAPI?.popularity) {
                    return 1
                }
                if (a?.spotifyAPI?.popularity > b?.spotifyAPI?.popularity) return -1
                return 0
            }
            if (a?.spotifyAPI?.popularity && !b?.spotifyAPI?.popularity) return -1
            if (b?.spotifyAPI?.popularity && !a?.spotifyAPI?.popularity) return 1
            return 0
        })
        setArtistData(dataArray)
    }, [selectedItem])
    return (
        <>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('presaleInformationModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'presaleInformationModal')}
            >
                <PresaleInformationModal item={selectedItem} setOpen={() => changeModal('presaleInformationModal')} />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('directModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'directModal')}
            >
                <DirectLinks meta={selectedMeta} eventId={selectedId} setOpen={() => changeModal('directModal')} />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('noteModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'noteModal')}
            >
                <NoteModal
                    eventId={selectedItem ? selectedItem._id : ''}
                    onSubmit={({ eventId, note }) => handleAddToBuying(eventId, note)}
                    setOpen={() => changeModal('noteModal')}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('addModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'addModal')}
            >
                <AddModal
                    open={isModalOpen('addModal')}
                    setOpen={() => changeModal('addModal')}
                    label="Success"
                    text="Added to Buying List"
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'avatarModal')}
                open={isModalOpen('avatarModal')}
            >
                <AvatarModal
                    artists={artistData}
                    setOpen={() => changeModal('avatarModal')}
                    eventId={selectedId}
                    artistId={artistData?.at(0)?._id.$oid || artistData?.at(0)?._id}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('infoModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'infoModal')}
            >
                <InfoModal changeModal={changeModal} />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('adminModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'adminModal')}
            >
                <AdminModal eventId={selectedId} setState={() => changeModal('adminModal')} />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('addEventModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'addEventModal')}
            >
                <AddEventModal setState={() => changeModal('addEventModal')} />
            </Backdrop>
        </>
    )
}

export default OverViewModalGroup
