import { useState } from 'react'
import type { FC } from 'react'
import numeral from 'numeral'
import {
    Box,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
} from '@mui/material'
import InformationCircleIcon from '../../../icons/InformationCircle'

interface Country {
    flag: string;
    name: string;
    seo: number;
    visits: number;
}

const sortCountries = (countries: Country[], order: 'asc' | 'desc'): Country[] =>
    countries.sort((a, b) => {
        if (order === 'asc') {
            return a.visits < b.visits ? -1 : 1
        }

        return a.visits > b.visits ? -1 : 1
    })

const countries: Country[] = [
    {
        flag: '/static/icons/us_flag.svg',
        name: 'United States',
        seo: 40,
        visits: 31200,
    },
    {
        flag: '/static/icons/uk_flag.svg',
        name: 'United Kingdom',
        seo: 47,
        visits: 12700,
    },
    {
        flag: '/static/icons/ru_flag.svg',
        name: 'Russia',
        seo: 65,
        visits: 10360,
    },
    {
        flag: '/static/icons/ca_flag.svg',
        name: 'Canada',
        seo: 23,
        visits: 5749,
    },
    {
        flag: '/static/icons/de_flag.svg',
        name: 'Germany',
        seo: 45,
        visits: 2932,
    },
]

const AnalyticsVisitsByCountry: FC = (props) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('desc')

    const handleSort = (): void => {
        setOrder((prevOrder) => {
            if (prevOrder === 'asc') {
                return 'desc'
            }

            return 'asc'
        })
    }

    const sortedCountries = sortCountries(countries, order)

    return (
        <Card {...props}>
            <CardHeader
                disableTypography
                title={
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                        <Typography color="textPrimary" variant="h6">
                            Keywords by country
                        </Typography>
                        <Tooltip title="Refresh rate is 24h">
                            <InformationCircleIcon fontSize="small" />
                        </Tooltip>
                    </Box>
                }
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell sortDirection={order}>
                            <TableSortLabel active direction={order} onClick={handleSort}>
                                Visits
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>SEO</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedCountries.map((country) => (
                        <TableRow
                            key={country.name}
                            sx={{
                                '&:last-child td': {
                                    border: 0,
                                },
                            }}>
                            <TableCell>
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                    }}>
                                    <Box
                                        sx={{
                                            height: 36,
                                            width: 36,
                                            '& img': {
                                                height: 36,
                                                width: 36,
                                            },
                                        }}>
                                        <img alt={country.name} src={country.flag} />
                                    </Box>
                                    <Typography color="textPrimary" sx={{ ml: 2 }} variant="subtitle2">
                                        {country.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{numeral(country.visits).format('0,0')}</TableCell>
                            <TableCell>{country.seo}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}

export default AnalyticsVisitsByCountry
