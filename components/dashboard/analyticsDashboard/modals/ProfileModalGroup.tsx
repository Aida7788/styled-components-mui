import { Backdrop } from '@mui/material'
import React from 'react'
import { EventType } from 'src/types/local/customTableTypes'
import { AddModal } from '../../buyingList/addModal'
import { NoteModal } from '../../eventAnalytics/NoteModal'
import { DirectLinks } from '../../eventAnalytics/directLinks'
import FilterDropModal from '../../eventAnalytics/eventAnalyticsModals/FilterDropModal'
import FilterInvModal from '../../eventAnalytics/eventAnalyticsModals/FilterInventoryModal'
import FilterMainModal from '../../eventAnalytics/eventAnalyticsModals/FilterMainModal'
import FilterPriceModal from '../../eventAnalytics/eventAnalyticsModals/FilterPriceModal'

export function ProfileModalGroup({
    handleChangeModal,
    isModalOpen,
    changeModal,
    eventId,
    analyticsItem,
    pageType,
}: {
    handleChangeModal: (
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        modalId: string,
        secondModalId?: string
    ) => void
    isModalOpen: (modalId: string) => boolean
    changeModal: (modalId: string) => void
    eventId: string
    analyticsItem: EventType
    pageType: string
}) {
    return (
        <>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event) => handleChangeModal(event, 'mainModal')}
                open={isModalOpen('mainModal')}
            >
                <FilterMainModal
                    setState={() => changeModal('mainModal')}
                    isShowPriceDrop={false}
                    setModalInv={() => changeModal('invModal')}
                    setModalDrop={() => changeModal('dropModal')}
                    setModalPrice={() => changeModal('priceModal')}
                    pageType={pageType}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event) => handleChangeModal(event, 'dropModal', 'mainModal')}
                open={isModalOpen('dropModal')}
            >
                <FilterDropModal
                    eventId={eventId}
                    setFilterModal={() => changeModal('mainModal')}
                    setDropModal={() => changeModal('dropModal')}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event) => handleChangeModal(event, 'invModal', 'mainModal')}
                open={isModalOpen('invModal')}
            >
                <FilterInvModal
                    eventId={eventId}
                    setFilterModal={() => changeModal('mainModal')}
                    setInvModal={() => changeModal('invModal')}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event: React.MouseEvent<HTMLElement>) => handleChangeModal(event, 'priceModal', 'mainModal')}
                open={isModalOpen('priceModal')}
            >
                <FilterPriceModal
                    eventId={eventId}
                    setFilterModal={() => changeModal('mainModal')}
                    setPriceModal={() => changeModal('priceModal')}
                />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event) => handleChangeModal(event, 'noteModal')}
                open={isModalOpen('noteModal')}
            >
                <NoteModal onSubmit={() => {}} eventId={eventId} setOpen={() => changeModal('noteModal')} />
            </Backdrop>
            <Backdrop
                style={{ zIndex: '6' }}
                onClick={(event) => handleChangeModal(event, 'directModal')}
                open={isModalOpen('directModal')}
            >
                <DirectLinks setOpen={() => changeModal('directModal')} meta={analyticsItem?.meta?.otherPlatforms} />
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
                    text="Saved"
                />
            </Backdrop>
        </>
    )
}
