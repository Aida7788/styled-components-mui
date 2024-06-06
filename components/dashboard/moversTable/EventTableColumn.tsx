import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import Flag from "react-world-flags";

interface EventTableColumnProps {
  name: string;
  type: string;
  image?: string;
  hasNoMargin?: boolean;
}

const EventTableColumn = ({ name, type, image, hasNoMargin }: EventTableColumnProps) => {
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        py: "4px",
        width: "160px",
        ml: hasNoMargin ? 0 : -4,
      }}>
      {image ? (
        <img src={image} style={{ height: "56px", width: "56px", borderRadius: "50%" }} />
      ) : (
        <Avatar sx={{ width: 56, height: 56 }} />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                color: "text.contrast",
              }}>
              {name}
            </Typography>

            <IconButton sx={{ bgcolor: "grey.800" }} size="small">
              <LinkIcon
                sx={{
                  color: "#FFF",
                  fontSize: "14px",
                  rotate: "-45deg",
                }}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Typography sx={{ fontSize: "13px", color: "grey.400", whiteSpace: "nowrap" }}>{type}</Typography>

            <Flag code={"US"} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default EventTableColumn;
