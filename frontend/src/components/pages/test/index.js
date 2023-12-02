// React
import React from "react";

// MUI components
import {
  Box,
  Typography,
  Button
} from "@mui/material";

// axios
import axios from 'axios';

const fetchProfileInfo = async () => {

  const accessToken = localStorage.getItem('accessToken');

  const res = await axios.get('http://localhost:5000/api/v1/users/profile', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  console.log(res);

};

function Test(){

  return (
    <Box
      sx={{
        padding: '50px',
      }}
    >

      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography>
          Fetch profile info
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            width: 'fit-content',
          }}
          onClick={fetchProfileInfo}
        >
          Fetch
        </Button>
      </Box>

    </Box>
  );

}

export default Test;