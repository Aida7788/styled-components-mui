import { Box, Grid, Modal, Typography } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { style } from "src/pages/dashboard/ArtistMetric";
import AddDropCheckerEvent from "./AddDropCheckerEvent";
import LowInventoryEvent from "./LowInventoryEvent";
import PriceDropAlert from "./PriceDropAlert";
interface Props {
  setIsModalOpen: (newVal: boolean) => void;
  isModalOpen: boolean;
}
const actionTypes = ["Add Dropchecker Event", "Low Inventory Event ", "Price Drop Alerts"];
const marks = [
  { value: 0, label: "0" },
  { value: 1000, label: "1000" },
];
const CalendarModal = ({ setIsModalOpen, isModalOpen }: Props) => {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState(actionTypes[2]);
  const [category, setCategory] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<string[]>([]);
  const [price, setPrice] = useState<string[]>([]);
  const [marketPlace, setMarketPlace] = useState<string[]>([]);
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => setCategory(event.target.value as string[]);
  const handleChangePrice = (event: ChangeEvent<{ value: unknown }>) => setPrice(event.target.value as string[]);
  const handleChangeQuantity = (event: ChangeEvent<{ value: unknown }>) => setQuantity(event.target.value as string[]);
  const handleChangeMarketPlace = (event: ChangeEvent<{ value: unknown }>) =>
    setQuantity(event.target.value as string[]);
  function valuetext(value: number) {
    return `${value}°C`;
  }
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid width={"100%"} display={"flex"} justifyContent={"flex-end"}>
            <Typography
              sx={{
                color: "black",
                mr: -2,
                mt: -1,
                height: "30px",
                width: "30px !important",
                textAlign: "center",
                bgcolor: "#c4c4c4",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(false)}>
              x
            </Typography>
          </Grid>
          <Box width={"100%"}>
            {actionTypes.map((text) => (
              <Box
                display={"flex"}
                px={"40px"}
                py={"20px"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"15px"}
                borderRadius={"12px"}
                bgcolor={"#f7f8f9"}
                width={"56%"}
                mx={"auto"}
                my={4}
                key={text}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setCurrentType(text);
                  setIsModalOpen(false);
                  setIsSubModalOpen(true);
                }}>
                <Typography color={"#000"} fontSize={24} fontWeight={600}>
                  {text}
                </Typography>
                <img src="/static/Group.svg" style={{ height: "24px", width: "24px", marginLeft: 8 }} />
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
      <Modal
        open={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid width={"100%"} display={"flex"} justifyContent={"flex-end"}>
            <Typography
              sx={{
                color: "black",
                mr: -2,
                mt: -1,
                height: "30px",
                width: "30px !important",
                textAlign: "center",
                bgcolor: "#c4c4c4",
                cursor: "pointer",
              }}
              onClick={() => setIsSubModalOpen(false)}>
              x
            </Typography>
          </Grid>
          {currentType === actionTypes[0] && (
            <AddDropCheckerEvent
              category={category}
              currentType={currentType}
              handleChange={handleChange}
              handleChangePrice={handleChangePrice}
              marks={marks}
              price={price}
              setIsSubModalOpen={setIsSubModalOpen}
              valuetext={valuetext}
            />
          )}
          {currentType === actionTypes[1] && (
            <LowInventoryEvent
              category={category}
              currentType={currentType}
              handleChange={handleChange}
              marks={marks}
              setIsSubModalOpen={setIsSubModalOpen}
              valuetext={valuetext}
            />
          )}
          {currentType === actionTypes[2] && (
            <PriceDropAlert
              category={category}
              currentType={currentType}
              handleChange={handleChange}
              setIsSubModalOpen={setIsSubModalOpen}
              quantity={quantity}
              handleQuantityChange={handleChangeQuantity}
              handleMarketPlace={handleChangeMarketPlace}
              marketPlace={marketPlace}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};
export default CalendarModal;
