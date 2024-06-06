import {
  Box,
  Button,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import CustomSelect from "./CustomSelect";
import CheckIcon from "@material-ui/icons/Check";
const LowInventoryEvent = ({
  currentType,
  category,
  handleChange,
  valuetext,
  marks,
  setIsSubModalOpen,
}: {
  currentType: any;
  category: any;
  handleChange: any;
  valuetext: any;
  marks: any;
  setIsSubModalOpen: any;
}) => {
  return (
    <Box width={"100%"}>
      <Box
        display={"flex"}
        px={"40px"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"15px"}
        borderRadius={"12px"}
        width={"56%"}
        mx={"auto"}>
        <Typography color={"#000"} fontSize={24} fontWeight={600}>
          {currentType}
        </Typography>
      </Box>
      <Box mx={"auto"} width={"100%"} my={4}>
        <InputLabel sx={{ color: "#3D3A45", fontSize: 12, fontWeight: 600 }}>
          Sections to track (Maximum : 10)
        </InputLabel>
        <CustomSelect
          label="Sections to track (Maximum : 10)"
          multiple
          value={category}
          handleChange={handleChange}
          width="100%"
          border="1px solid">
          {["Any", "101", "102", "103", "104"].map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Checkbox
                sx={{ color: "#000000" }}
                checked={category.indexOf(cat) > -1}
                checkedIcon={<CheckIcon sx={{ color: "#000000" }} />}
              />
              <ListItemText primary={cat} />
            </MenuItem>
          ))}
        </CustomSelect>
      </Box>
      <Box mx={"auto"} width={"100%"} my={4}>
        <InputLabel sx={{ color: "#3D3A45", fontSize: 12, fontWeight: 600 }}>Notification Count :</InputLabel>
        <TextField variant="outlined" placeholder="Notification Count" sx={{ border: "1px solid", borderRadius: "8px", backgroundColor:'white' }} fullWidth />
      </Box>
      <Box mx={"auto"} width={"100%"} my={4}>
        <InputLabel sx={{ color: "#000" }}>Price Level</InputLabel>
        <Slider
          aria-label="Price Range"
          defaultValue={1000}
          getAriaValueText={valuetext}
          step={10}
          valueLabelDisplay="auto"
          marks={marks}
          sx={{ width: "96%", mx: "auto", color: "#000 !important" }}
          max={1200}
        />
      </Box>
      <Box mx={"auto"} width={"100%"} my={4} display={"flex"} gap={1} justifyContent={"center"}>
        <Button
          sx={{
            px: "16px",
            py: "8px",
            borderRadius: "5px",
            bgcolor: "#000",
            ":hover": {
              color: "#000",
            },
          }}
          onClick={() => setIsSubModalOpen(false)}>
          Save Settings
        </Button>
        <Button
          sx={{
            px: "16px",
            py: "8px",
            borderRadius: "5px",
            color: "#000",
            bgcolor: "#F8F8F8",
          }}
          onClick={() => setIsSubModalOpen(false)}>
          Close
        </Button>
      </Box>
    </Box>
  );
};
export default LowInventoryEvent;
