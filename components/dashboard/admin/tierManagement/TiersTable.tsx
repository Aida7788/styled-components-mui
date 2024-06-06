import { isUndefined as _isUndefined, omit as _omit } from 'lodash'
import { FC, useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { TTier } from 'src/types/api/apiTierManagement'
import { API as adminApi } from 'src/services/adminApi'

const TiersTable: FC = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [tiers, setTiers] = useState<TTier[]>([])
    const [newTier, setNewTier] = useState({
        name: 'NEW TIER NAME',
        price: 0,
        total_allowed_fetch: 0,

        primaryFavorites: 0,
        TMDropchecker: 0,
        AXSDropchecker: 0,
        TMLowInventoryAlert: 0,
        AXSLowInventoryAlert: 0,
        SecondaryFavorites: 0,
        PriceDropAlert: 0,
    })

    const [tierIdForDelete, setTierIdForDelete] = useState<string>(null)

    const getTiers = async () => {
        setIsLoading(true)

        const { data } = await adminApi.getTiers()

        setTiers(data)
        setIsLoading(false)
    }

    useEffect(() => {
        getTiers()
    }, [])

    const handleChange = (index, key, value) => {
        setTiers((tiers) => {
            return tiers.map((tier, i) => {
                if (i !== index) {
                    return tier
                }
                return { ...tier, [key]: value }
            })
        })
    }

    const handleUpdateTier = async (index) => {
        const targetTier = tiers[index]

        await adminApi.updateTier({
            tierId: targetTier._id,
            ..._omit(targetTier, ['_id']),
        })

        getTiers()
    }

    const handleAddTier = async () => {
        await adminApi.createTier(newTier)
        getTiers()
    }
    const handleClickDelete = (tierId) => {
        setTierIdForDelete(tierId)
    }

    const handleCloseDialog = () => {
        setTierIdForDelete(null)
    }

    const handleConfirmDelete = async () => {
        await adminApi.removeTier(tierIdForDelete)
        getTiers()
        handleCloseDialog()
    }

    return (
        <>
            <Dialog open={Boolean(tierIdForDelete)} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this tier?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="warning">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#F0F0F0' }}>
                        <TableRow>
                            <TableCell align="center">Tier</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Total Allowed Fetch</TableCell>
                            <TableCell align="center">My Primary Favorites</TableCell>
                            <TableCell align="center">TM Dropchecker</TableCell>
                            <TableCell align="center">AXS Dropchecker</TableCell>
                            <TableCell align="center">TM Low Inventory Alert</TableCell>
                            <TableCell align="center">AXS low inventory Alert</TableCell>
                            <TableCell align="center">My Secondary Favorites</TableCell>
                            <TableCell align="center">Price drop Alert</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: '#FFFFFF' }}>
                        {isLoading ? (
                            <SkeletonTableBody />
                        ) : (
                            <>
                                {tiers.map((tier, tierIndex) => (
                                    <TableRow key={tier._id}>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={tier.name || ''}
                                                type={'text'}
                                                onChange={(e) => handleChange(tierIndex, 'name', e.target.value)}
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={!_isUndefined(tier.price) ? tier.price : 0}
                                                type={'number'}
                                                onChange={(e) => handleChange(tierIndex, 'price', e.target.value)}
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={
                                                    !_isUndefined(tier.total_allowed_fetch)
                                                        ? tier.total_allowed_fetch
                                                        : 0
                                                }
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'total_allowed_fetch', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={!_isUndefined(tier.primaryFavorites) ? tier.primaryFavorites : 0}
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'primaryFavorites', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={!_isUndefined(tier.TMDropchecker) ? tier.TMDropchecker : 0}
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'TMDropchecker', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={!_isUndefined(tier.AXSDropchecker) ? tier.AXSDropchecker : 0}
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'AXSDropchecker', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={
                                                    !_isUndefined(tier.TMLowInventoryAlert)
                                                        ? tier.TMLowInventoryAlert
                                                        : 0
                                                }
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'TMLowInventoryAlert', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={
                                                    !_isUndefined(tier.AXSLowInventoryAlert)
                                                        ? tier.AXSLowInventoryAlert
                                                        : 0
                                                }
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'AXSLowInventoryAlert', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={
                                                    !_isUndefined(tier.SecondaryFavorites) ? tier.SecondaryFavorites : 0
                                                }
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'SecondaryFavorites', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center" sx={{ p: 1 }}>
                                            <TextField
                                                value={!_isUndefined(tier.PriceDropAlert) ? tier.PriceDropAlert : 0}
                                                type={'number'}
                                                onChange={(e) =>
                                                    handleChange(tierIndex, 'PriceDropAlert', e.target.value)
                                                }
                                                inputProps={{
                                                    style: { textAlign: 'center' },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => {
                                                    handleUpdateTier(tierIndex)
                                                }}
                                            >
                                                <SaveIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                onClick={() => {
                                                    handleClickDelete(tier._id)
                                                }}
                                            >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow sx={{ borderTop: '3px solid #1849a9' }}>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.name}
                                            type={'text'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    name: e.target.value,
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.price}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    price: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.total_allowed_fetch}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    total_allowed_fetch: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.primaryFavorites}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    primaryFavorites: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.TMDropchecker}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    TMDropchecker: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.AXSDropchecker}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    AXSDropchecker: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.TMLowInventoryAlert}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    TMLowInventoryAlert: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.AXSLowInventoryAlert}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    AXSLowInventoryAlert: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.SecondaryFavorites}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    SecondaryFavorites: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center" sx={{ p: 1 }}>
                                        <TextField
                                            value={newTier.PriceDropAlert}
                                            type={'number'}
                                            onChange={(e) => {
                                                setNewTier((tier) => ({
                                                    ...tier,
                                                    PriceDropAlert: Number(e.target.value),
                                                }))
                                            }}
                                            inputProps={{
                                                style: { textAlign: 'center' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={handleAddTier}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TiersTable

const SkeletonTableBody: FC = () => {
    return (
        <>
            {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
