import { Box, Button, Checkbox, InputLabel, ListItemText, MenuItem, Slider, Typography } from "@mui/material";
import CustomSelect from "./CustomSelect";
import CheckIcon from "@material-ui/icons/Check";
const AddDropCheckerEvent = ({
  currentType,
  category,
  handleChange,
  price,
  handleChangePrice,
  valuetext,
  marks,
  setIsSubModalOpen,
}: {
  currentType: any;
  category: any;
  handleChange: any;
  price: any;
  handleChangePrice: any;
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
        <CustomSelect
          label="Ticket Types"
          multiple
          value={category}
          handleChange={handleChange}
          width="100%"
          border="1px solid">
          {["Standard Admission", "DiamonPackage", "Hospitality Package", "Gold Package"].map((cat) => (
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
        <CustomSelect
          label="Price Level"
          multiple
          value={price}
          handleChange={handleChangePrice}
          width="100%"
          border="1px solid">
          {["Any Price"].map((cat) => (
            <MenuItem key={cat} value={cat}>
              <Checkbox
                sx={{ color: "#000000" }}
                checked={price.indexOf(cat) > -1}
                checkedIcon={<CheckIcon sx={{ color: "#000000" }} />}
              />
              <ListItemText primary={cat} />
            </MenuItem>
          ))}
        </CustomSelect>
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
      <Box mx={"auto"} width={"100%"} my={4} display={"flex"} gap={1} justifyContent={"flex-end"}>
        <Button
          sx={{
            px: "16px",
            py: "8px",
            borderRadius: "5px",
            bgcolor: "#000",
            ":hover": { color: "#000" },
          }}
          onClick={() => setIsSubModalOpen(false)}>
          Add Event
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
export default AddDropCheckerEvent;
