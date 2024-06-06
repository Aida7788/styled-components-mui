import CheckIcon from '@material-ui/icons/Check'
import { Box, Button, Checkbox, InputLabel, ListItemText, MenuItem, TextField, Typography } from '@mui/material'
import CustomSelect from './CustomSelect'
const PriceDropAlert = ({
    currentType,
    category,
    handleChange,
    setIsSubModalOpen,
    quantity,
    handleQuantityChange,
    marketPlace,
    handleMarketPlace,
}: {
    currentType: any
    category: any
    handleChange: any
    setIsSubModalOpen: any
    quantity: any
    handleQuantityChange: any
    marketPlace: any
    handleMarketPlace: any
}) => {
    return (
        <Box width={'100%'}>
            <Box
                display={'flex'}
                px={'40px'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'15px'}
                borderRadius={'12px'}
                width={'56%'}
                mx={'auto'}
            >
                <Typography color={'#000'} fontSize={24} fontWeight={600}>
                    {currentType}
                </Typography>
            </Box>
            <Box mx={'auto'} width={'100%'} my={4}>
                <InputLabel sx={{ color: '#3D3A45', fontSize: 12, fontWeight: 600 }}>Sections</InputLabel>
                <CustomSelect
                    label="Sections"
                    multiple
                    value={category}
                    handleChange={handleChange}
                    width="100%"
                    border="1px solid"
                >
                    {['Any'].map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            <Checkbox
                                sx={{ color: '#000000' }}
                                checked={category.indexOf(cat) > -1}
                                checkedIcon={<CheckIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={cat} />
                        </MenuItem>
                    ))}
                </CustomSelect>
            </Box>
            <Box mx={'auto'} width={'100%'} my={4}>
                <InputLabel sx={{ color: '#3D3A45', fontSize: 12, fontWeight: 600 }}>Minimum Quantity</InputLabel>
                <CustomSelect
                    label="Minimum Quantity"
                    multiple
                    value={quantity}
                    handleChange={handleQuantityChange}
                    width="100%"
                    border="1px solid"
                >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            <Checkbox
                                sx={{ color: '#000000' }}
                                checked={quantity.indexOf(cat) > -1}
                                checkedIcon={<CheckIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={cat} />
                        </MenuItem>
                    ))}
                </CustomSelect>
            </Box>
            <Box mx={'auto'} width={'100%'} my={4}>
                <InputLabel sx={{ color: '#3D3A45', fontSize: 12, fontWeight: 600 }}>Price Below</InputLabel>
                <TextField
                    placeholder="$ 0"
                    sx={{ border: '1px solid', borderRadius: '8px' }}
                    fullWidth
                    InputProps={{
                        endAdornment: <img src="/static/Group.svg" alt="" />,
                    }}
                />
            </Box>
            <Box mx={'auto'} width={'100%'} my={4}>
                <InputLabel sx={{ color: '#3D3A45', fontSize: 12, fontWeight: 600 }}>Price Above</InputLabel>
                <TextField
                    placeholder="$ 250"
                    sx={{ border: '1px solid', borderRadius: '8px' }}
                    fullWidth
                    InputProps={{
                        endAdornment: <img src="/static/Group.svg" alt="" />,
                    }}
                />
            </Box>
            <Box mx={'auto'} width={'100%'} my={4}>
                <InputLabel sx={{ color: '#3D3A45', fontSize: 12, fontWeight: 600 }}>Minimum Quantity</InputLabel>
                <CustomSelect
                    label="Marketplace"
                    multiple
                    value={marketPlace}
                    handleChange={handleMarketPlace}
                    width="100%"
                    border="1px solid"
                >
                    {['Stubhub', 'Ticket Metric', 'vividseats', 'Tickpick', 'Seatgeek'].map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            <Checkbox
                                sx={{ color: '#000000' }}
                                checked={marketPlace.indexOf(cat) > -1}
                                checkedIcon={<CheckIcon sx={{ color: '#000000' }} />}
                            />
                            <ListItemText primary={cat} />
                        </MenuItem>
                    ))}
                </CustomSelect>
            </Box>
            <Box mx={'auto'} width={'100%'} my={4} display={'flex'} gap={1} justifyContent={'flex-end'}>
                <Button
                    sx={{
                        px: '16px',
                        py: '8px',
                        borderRadius: '5px',
                        bgcolor: '#000',
                        ':hover': {
                            color: '#000',
                        },
                    }}
                    onClick={() => setIsSubModalOpen(false)}
                >
                    Save Settings
                </Button>
                <Button
                    sx={{
                        px: '16px',
                        py: '8px',
                        borderRadius: '5px',
                        color: '#000',
                        bgcolor: '#F8F8F8',
                    }}
                    onClick={() => setIsSubModalOpen(false)}
                >
                    Close
                </Button>
            </Box>
        </Box>
    )
}
export default PriceDropAlert
