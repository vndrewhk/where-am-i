import { Typography } from "@mui/material";
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function Header() {
  return (
    <div>
      <Typography variant="h4" component="h1">
        Where Am I?
      </Typography>
    </div>
  );
}
