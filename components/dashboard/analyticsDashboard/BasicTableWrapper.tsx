import type { FC, ReactNode } from 'react'

import {
    Box,
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Pagination,
} from '@mui/material'

import Scrollbar from '../../general/Scrollbar'
import FilterIcon from 'src/icons/FilterIcon'

interface Props {
    children: ReactNode;
    headings: string[];
    title?: string;
    count?: number;
    currentPage?: number;
    isFilterIcon?: boolean;
    setCurrentPage?: (page: number) => void;
    onClickIcon?: () => void;
}

const BasicTableWrapper: FC<Props> = ({
                                          count,
                                          currentPage,
                                          setCurrentPage,
                                          headings,
                                          children,
                                          title,
                                          isFilterIcon,
                                          onClickIcon,
                                      }) => (
    <Box
        sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
        }}>
        <Card
            sx={{
                p: 3,
            }}>
            <CardHeader
                title={title}
                sx={{
                    textAlign: 'center',
                }}
            />

            <Divider />

            <Scrollbar>
                <Box
                    sx={{
                        minWidth: 700,
                    }}>
                    <Table>
                        <TableHead
                            sx={{
                                backgroundColor: '#e6e6e6',
                            }}>
                            <TableRow>
                                {headings.map((heading) => (
                                    <TableCell key={heading}>{heading}</TableCell>
                                ))}
                                {isFilterIcon && (
                                    <TableCell onClick={onClickIcon} sx={{ cursor: 'pointer' }}>
                                        <FilterIcon />
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>{children}</TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <Box>
                <Pagination
                    onChange={(event, page) => setCurrentPage(page)}
                    count={count}
                    page={currentPage}
                    sx={{
                        paddingTop: '22px',
                        '& ul': {
                            justifyContent: 'flex-end',
                        },
                        '& .Mui-selected': {
                            color: '#fff',
                            bgcolor: '#000000 !important',
                            borderRadius: '4px',
                        },
                    }}
                />
            </Box>
        </Card>
    </Box>
)

export default BasicTableWrapper
