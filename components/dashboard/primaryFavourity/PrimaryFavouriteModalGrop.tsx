import { Backdrop } from '@mui/material'
import React from 'react'
import FilterDropModal from '../eventAnalytics/eventAnalyticsModals/FilterDropModal'
import FilterInvModal from '../eventAnalytics/eventAnalyticsModals/FilterInventoryModal'
import { AvatarModal } from '../eventAnalytics/eventAnalyticsModals/AvatarModal'
import { artistsDatumInt, otherPlatforms } from 'src/types/local/upSalesResp'
import { DirectLinks } from '../eventAnalytics/directLinks'
import { NoteModal } from '../eventAnalytics/NoteModal'
import { dropCheckInt, lowInvAlert, priceDrop, pullFrequency } from 'src/types/local/primaryFavourite'
import { LocalAddLowInventoryAlertRequest } from 'src/types/local/localEventAnalyticsTypes'
import { ApiDeleteLowInventoryAlertRequest } from 'src/types/api/apiEventAnalyticsTypes'
import { usePrimaryFavourite } from 'src/hooks/usePrimaryFavourite'
import FilterPriceModal from '../eventAnalytics/eventAnalyticsModals/FilterPriceModal'
import { AddFavoriteModal } from '../eventAnalytics/eventAnalyticsModals/AddPostModal'
import { InfoModal } from '../eventAnalytics/eventAnalyticsModals/InfoModal'

export function PrimaryFavouriteModalGroup({
    changeModal,
    handleChangeModal,
    handleDropAdd,
    isModalOpen,
    addPullFreq,
    deletePullFreq,
    handleDeleteInv = () => {},
    selectedId,
    selectedArtist,
    selectedItem,
    selectedMeta,
    handleAddInv,
    selectedDrop,
    isSecondary,
    handleAddPriceDrop,
    setPopupText,
}: {
    addPullFreq?: (id: string, dropCheck: pullFrequency) => void
    deletePullFreq?: (id: string) => void
    changeModal?: (val: string) => void
    handleDeleteInv?: (params: ApiDeleteLowInventoryAlertRequest) => void
    selectedId?: string
    selectedItem: any
    handleDropAdd?: (id: string, dropCheck: dropCheckInt) => void
    selectedDrop?: dropCheckInt[] | lowInvAlert[] | priceDrop[]
    selectedArtist?: artistsDatumInt[]
    handleAddInv?: (params: LocalAddLowInventoryAlertRequest) => void
    selectedMeta?: otherPlatforms[]
    handleChangeModal: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        modalId: string,
        secondModalId?: string
    ) => void
    handleAddPriceDrop?: () => void
    isModalOpen: (val: string) => boolean
    isSecondary?: boolean
    setPopupText: (str:string) => void
}) {
    const { addNote, deleteDrop } = usePrimaryFavourite()
    return (
        <> 

            <Backdrop
                sx={{ zIndex: '6' }}
                open={isModalOpen('dropModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'dropModal')}
            >
                <FilterDropModal
                    setPopupText={setPopupText}
                    handleDropAdd={handleDropAdd}
                    DeleteDrop={deleteDrop}
                    selectedDrop={selectedDrop as dropCheckInt[]}
                    eventId={selectedId}
                    setDropModal={() => changeModal('dropModal')}
                />
            </Backdrop>
            <Backdrop
                sx={{ zIndex: '6' }}
                open={isModalOpen('invModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'invModal')}
            >
                <FilterInvModal
                    selectedDrop={selectedDrop as lowInvAlert[]}
                    deleteLow={true}
                    selectedItem={selectedItem}
                    handleDelete={handleDeleteInv}
                    eventId={selectedId}
                    setInvModal={() => changeModal('invModal')}
                    setPopupText={setPopupText}
                    onAddInvAlert={handleAddInv}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'priceModal')}
                open={isModalOpen('priceModal')}
            >
                <FilterPriceModal handleAddPriceFilter={handleAddPriceDrop} eventId={selectedId} setPopupText={setPopupText} setPriceModal={() => changeModal('priceModal')} />
            </Backdrop>
            <Backdrop
                sx={{ zIndex: '6' }}
                open={isModalOpen('avatarModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'avatarModal')}
            >
                <AvatarModal
                    artistId={selectedArtist?.at(0)?._id}
                    artists={selectedArtist}
                    setOpen={() => changeModal('avatarModal')}
                />
            </Backdrop>
            <Backdrop
                sx={{ zIndex: '6' }}
                open={isModalOpen('directModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'directModal')}
            >
                <DirectLinks meta={selectedMeta} eventId={selectedId} setOpen={() => changeModal('directModal')} />
            </Backdrop>
            <Backdrop
                sx={{ zIndex: '6' }}
                open={isModalOpen('noteModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'noteModal')}
            >
                <NoteModal
                    isSecondary={isSecondary}
                    selectedNote={selectedItem?.text}
                    eventId={selectedId}
                    onSubmit={({ eventId, note, isSecondary }) => addNote({ eventId, note, isSecondary })}
                    label="Add New Note"
                    buttonLabel="Add new"
                    setOpen={() => changeModal('noteModal')}
                    setPopupText={setPopupText}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('addModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'addModal')}
            >
                <AddFavoriteModal
                    changeModal={() => changeModal('addModal')}
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


