import { Typography } from "@mui/material";

const Text = ({ color, fontWeight, fontSize, text }: { color; fontWeight; fontSize; text }) => {
  return (
    <Typography color={color} fontWeight={fontWeight} fontSize={fontSize}>
      {text}
    </Typography>
  );
};

export default Text;
