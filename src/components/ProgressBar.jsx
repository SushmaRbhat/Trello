import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";

const ProgressBar = (props) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
        <Box sx={{ width: "100%", ml: 1 }}>
          <LinearProgress
            variant="determinate"
            {...props}
            color={props.value === 100 ? "success" : "primary"}
          />
        </Box>
      </Box>
    </>
  );
};

export default ProgressBar;
