import React from "react";

import {
  Box,
  Breadcrumbs,
  Typography,
  Link
} from "@mui/material";

import NewFleetForm from "./components/NewFleetForm";

function NewFleet() {
  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumbs"
        sx={{
          marginBottom: "25px"
        }}
      >
        <Typography
          color="text.primary"
        >
          Company Dashboard
        </Typography>
        <Link 
          underline="hover"
          color="inherit" href="/company-dashboard/fleets-management"
        >
          Fleets Management
        </Link>
        <Typography
          color="text.primary"
        >
          Create Fleet
        </Typography>
      </Breadcrumbs>

      <NewFleetForm />
    </Box>
  )
};

export default NewFleet;