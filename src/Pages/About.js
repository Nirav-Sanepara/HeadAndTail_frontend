import { Typography } from "@mui/material";
import React from "react";
import Page from "../component/Page";

export default function About() {
  return (
    <Page title="About" sx={{mt: 3}}>
      <br />
      <br />
      <h2>About</h2>
      <div className="version" style={{ marginTop: "auto", fontSize: "15px" }}>
        <Typography sx={{ color: "gray", marginY: "10px" }}>
          Version : 1.1.0
        </Typography>
        <Typography sx={{ color: "gray" }}>Date : 10/10/2023</Typography>
      </div>
    </Page>
  );
}
