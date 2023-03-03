import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Progress() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <CircularProgress sx={{ color: "secondary.main" }} size="50px" />
    </Box>
  );
}
