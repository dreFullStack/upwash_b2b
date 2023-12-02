import React from 'react';

import {
  Box,
} from '@mui/material';

// TODO: don't forget about FormGroup
function Form({children, ...rest}){

  return (
    <Box 
      component="form"
      sx={{
        borderRadius: "10px",
        padding: "50px",
        border: "1px rgba(0, 0, 0, 0.1) solid",
        width: "100%"
        // backgroundColor: "#efefee75"
      }}
    >
      {children}
    </Box>
  );

}

export default Form;