// React
import React from 'react';

// MUI components
import {
  Typography
} from '@mui/material';

function Label({...rest}){

  return (
    <Typography
      sx={{
        fontSize: '12px',
        color: '#7a7981',
        textTransform: 'uppercase',
        marginTop: '15px',
      }}
      {...rest}
    >

    </Typography>
  );

}

export default Label;