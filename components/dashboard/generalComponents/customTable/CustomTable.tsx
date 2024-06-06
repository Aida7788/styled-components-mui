import CheckIcon from '@mui/icons-material/Check'
import { Box, Checkbox, Grid, IconButton } from '@mui/material'
import FilterDesc from 'src/icons/FilterDesc'
import FilterIcon from 'src/icons/FilterIcon'
import { CustomTableProps } from 'src/types/local/customTableTypes'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

export default function CustomTable({
    headers,
    layoutGrid,
    isChecked = false,
    bordered = false,
    children,
    filter = false,
    filterState = false,
    setOpenFilter,
    filterIndex = [],
    center = false,
    CustomHeaders,
    searchFilters,
    setSearchFilters,
    setSelectedFiltration = () => {},
}: CustomTableProps) {
    return (
        <Box
            sx={{
                backgroundColor: 'background.white',
                borderRadius: '6px',
                mx: '10px',
            }}
        >
            <Grid sx={{ display: 'grid', px: '10px' }}>
                <Grid
                    sx={{
                        backgroundColor: 'background.white',
                        border: bordered ? 1 : 0,
                        borderColor: 'grey.100',
                        borderRadius: bordered ? '6px' : '0px',
                        px: bordered ? '0px' : '2px',
                        mx: 'auto',
                        display: 'grid',
                        gap: '10px',
                    }}
                    container
                >
                    <Grid
                        sx={{
                            backgroundColor: '#E6E6E6',
                            borderRadius: '6px',
                            mx: 'auto',
                            py: '15px',
                            alignItems: 'center',
                            display: 'grid',
                            gridTemplateColumns: `repeat(${headers?.length}, 1fr)`,
                            position: 'relative',
                        }}
                        container
                        gridTemplateRows={'1fr'}
                        columnGap={4}
                        alignItems={'center'}
                        zIndex={1}
                    >
                        {headers
                            ? headers.map((item, index) => (
                                  <Grid
                                      sx={{
                                          color: '#333333',
                                          textAlign: 'center',
                                          fontWeight: '600',
                                          fontSize: '12px',
                                          textTransform: 'uppercase',
                                      }}
                                      key={index}
                                      item
                                  >
                                      {(typeof item === 'string' ? item : item.name) && isChecked ? (
                                          <Checkbox
                                              sx={{ color: 'grey.400' }}
                                              checkedIcon={<CheckIcon sx={{ color: 'grey.400' }} />}
                                          />
                                      ) : null}

                                      {filterIndex.includes(index) ? (
                                          <Box
                                              sx={{
                                                  display: 'flex',
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  justifyContent: 'space-between',
                                              }}
                                          >
                                              {typeof item === 'string' ? item : item.name}
                                              <IconButton
                                                  onClick={() => setSelectedFiltration(item.key || item)}
                                                  sx={{
                                                      padding: '0px',
                                                      border: 1,
                                                      borderRadius: '6px',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      justifyContent: 'center',
                                                  }}
                                              >
                                                  <FilterDesc />
                                              </IconButton>
                                          </Box>
                                      ) : typeof item === 'string' ? (
                                          item
                                      ) : (
                                          item.name
                                      )}
                                      {filter && index === headers.length - 1 && (
                                          <IconButton
                                              sx={{ padding: '0px' }}
                                              onClick={() => setOpenFilter(!filterState)}
                                          >
                                              <FilterIcon />
                                          </IconButton>
                                      )}
                                  </Grid>
                              ))
                            : CustomHeaders}
                        {searchFilters !== null && (
                            <Box
                                sx={{ position: 'absolute', alignSelf: 'center', right: '2%' }}
                                onClick={() => setSearchFilters(!searchFilters)}
                            >
                                <FilterAltOutlinedIcon sx={{ cursor: 'pointer' }} />
                            </Box>
                        )}
                    </Grid>
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
}
