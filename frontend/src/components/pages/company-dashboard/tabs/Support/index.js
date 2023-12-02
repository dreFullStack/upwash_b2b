import React from 'react';

import {
  Box,
  Breadcrumbs,
  Typography
} from "@mui/material";

import SupportForm   from "./components/SupportForm";

function Support() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >

      {/* Breadcrumbs */}
      <Breadcrumbs
        aria-label="breadcrumbs"
        sx={{
          marginBottom: '25px',
        }}
      >
        <Typography
          color="text.primary"
        >
          Support
        </Typography>
        <Typography
          color="text.primary"
        >
          Contact
        </Typography>
      </Breadcrumbs>
      
      {/* ./components/SupportForm */}
      <SupportForm />
    </Box>
  );
}

export default Support;