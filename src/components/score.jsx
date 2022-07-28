import { Typography } from "@mui/material";
import React from "react";

function Score({ scoreInfo }) {
  console.log(scoreInfo);
  //scoreInfo.name
  //scoreInfo.time
  return (
    <div className="flex  justify-between  px-32">
      <Typography variant="h6" container="h6">
        {scoreInfo.name}
      </Typography>
      <Typography variant="h6" container="h6">
        {scoreInfo.time.toString()}
      </Typography>
    </div>
  );
}

export default Score;
