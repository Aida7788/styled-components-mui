import { Box, Typography } from "@mui/material";
import { ComponentType } from "react";

interface Props {
  heading?: string;
  subHeading?: string;
  flag?: ComponentType<any>;
  isDashedBorder?: boolean;
}

const ArtistBox = ({ heading, subHeading, flag, isDashedBorder }: Props) => {
  return (
    <Box bgcolor={"#fff"} p={2} width={"88%"} mb={2} border={isDashedBorder && "1px dashed #B2B4BD"}>
      <Typography color={"#3F4254"} fontSize={18} fontWeight={600} mb={2}>
        {heading}
      </Typography>

      <Box display={"flex"} gap={2} alignContent={"center"} alignItems={"center"}>
        <Typography color={"#8F8F8F"} fontSize={14} fontWeight={600}>
          {subHeading}
        </Typography>

        {flag && <img src="/static/usa 1.svg" />}
      </Box>
    </Box>
  );
};

export default ArtistBox;
