import React from "react";

// MUI components
import {
  Box,
  Typography,
  Link,
  Breadcrumbs
} from "@mui/material";

// EditForm component
import EditVehicleForm from "./components/EditVehicleForm";

function EditVehicle () {

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          marginBottom: '25px',
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
          Edit Vehicle
        </Typography>
      </Breadcrumbs>

      <EditVehicleForm 
        // vehicleInformation={vehicleInformation}
      />
    </Box>
  )
};

export default EditVehicle;