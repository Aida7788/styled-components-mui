import { Backdrop } from '@mui/material'
import React, { useEffect } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { NoteModal } from 'src/components/dashboard/eventAnalytics/NoteModal'
import { DirectLinks } from 'src/components/dashboard/eventAnalytics/directLinks'
import FilterMainModal from 'src/components/dashboard/eventAnalytics/eventAnalyticsModals/FilterMainModal'
import { Datum, artistsDatumInt, otherPlatforms } from 'src/types/local/upSalesResp'
import { AddMatchUrlModal } from './eventAnalyticsModals/AddMatchUrlModal'
import { AddPostModal } from './eventAnalyticsModals/AddPostModal'
import AdminModal from './eventAnalyticsModals/AdminModal'
import { AvatarModal } from './eventAnalyticsModals/AvatarModal'
import FilterDropModal from './eventAnalyticsModals/FilterDropModal'
import FilterInventoryModal from './eventAnalyticsModals/FilterInventoryModal'
import FilterPriceModal from './eventAnalyticsModals/FilterPriceModal'
import { SavingModal } from './eventAnalyticsModals/SavingModal'
import { EventType } from 'src/types/local/customTableTypes'
import { InfoModal } from './eventAnalyticsModals/InfoModal'

export function EventModalGroup({
    isModalOpen,
    handleChangeModal,
    changeModal,
    selectedId,
    selectedArtistId,
    eventArtists,
    selectedMeta,
    setPopupText,
    pageType,
    hidePriceDrop,
    selectedEvent,
}: {
    handleChangeModal: (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string, value_2?: string) => void
    changeModal: (value: string) => void
    isModalOpen: (value: string) => boolean
    selectedId: string
    selectedArtistId?: string
    eventArtists: artistsDatumInt[]
    selectedMeta: otherPlatforms[]
    setPopupText?: (value: string) => void
    pageType: string
    hidePriceDrop?: boolean
    selectedEvent?: EventType
}) {
    useEffect(() => {
        const body = document.querySelector('body')
        const anyModalOpen =
            isModalOpen('saveModal') ||
            isModalOpen('dropModal') ||
            isModalOpen('invModal') ||
            isModalOpen('priceModal') ||
            isModalOpen('directModal') ||
            isModalOpen('avatarModal') ||
            isModalOpen('noteModal') ||
            isModalOpen('mainModal') ||
            isModalOpen('adminModal') ||
            isModalOpen('addModal') ||
            isModalOpen('addMatchUrlModal')

        if (body) {
            body.style.overflow = anyModalOpen ? 'hidden' : 'auto'
        }

        return () => {
            if (body) {
                body.style.overflow = 'auto'
            }
        }
    }, [isModalOpen, selectedId, selectedArtistId, eventArtists, selectedMeta, setPopupText, pageType, hidePriceDrop])
    return (
        <>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('saveModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'saveModal')}
            >
                <SavingModal
                    setPopupText={setPopupText}
                    event_id={selectedId}
                    setState={() => changeModal('saveModal')}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'dropModal', 'mainModal')}
                open={isModalOpen('dropModal')}
            >
                <FilterDropModal
                    eventId={selectedId}
                    setPopupText={setPopupText}
                    setFilterModal={() => changeModal('mainModal')}
                    setDropModal={() => changeModal('dropModal')}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'invModal', 'mainModal')}
                open={isModalOpen('invModal')}
            >
                <FilterInventoryModal
                    eventId={selectedId}
                    setFilterModal={() => changeModal('mainModal')}
                    setInvModal={() => changeModal('invModal')}
                    setPopupText={setPopupText}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'priceModal', 'mainModal')}
                open={isModalOpen('priceModal')}
            >
                <FilterPriceModal
                    eventId={selectedId}
                    setFilterModal={() => changeModal('mainModal')}
                    setPriceModal={() => changeModal('priceModal')}
                    setPopupText={setPopupText}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'directModal')}
                open={isModalOpen('directModal')}
            >
                <DirectLinks meta={selectedMeta} setOpen={() => changeModal('directModal')} eventId={selectedId} />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'avatarModal')}
                open={isModalOpen('avatarModal')}
            >
                <AvatarModal
                    eventId={selectedId}
                    artists={eventArtists}
                    setOpen={() => changeModal('avatarModal')}
                    artistId={selectedArtistId}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'noteModal')}
                open={isModalOpen('noteModal')}
            >
                <NoteModal
                    onSubmit={() => {}}
                    eventId={selectedId}
                    setOpen={() => changeModal('noteModal')}
                    setPopupText={setPopupText}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('mainModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'mainModal')}
            >
                <FilterMainModal
                    isShowPriceDrop={!hidePriceDrop}
                    setModalDrop={() => changeModal('dropModal')}
                    setModalInv={() => changeModal('invModal')}
                    setModalPrice={() => changeModal('priceModal')}
                    setState={() => changeModal('mainModal')}
                    setPopupText={setPopupText}
                    pageType={pageType}
                    selectedEvent={selectedEvent}
                />
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
                open={isModalOpen('addModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'addModal')}
            >
                <AddPostModal
                    changeToastText={setPopupText}
                    changeModal={changeModal}
                    isModalOpen={isModalOpen('addModal')}
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
            <Backdrop
                style={{ zIndex: '6' }}
                open={isModalOpen('addMatchUrlModal')}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'addMatchUrlModal')}
            >
                <AddMatchUrlModal changeModal={changeModal} selectedMeta={selectedMeta} />
            </Backdrop>
        </>
    )
}
