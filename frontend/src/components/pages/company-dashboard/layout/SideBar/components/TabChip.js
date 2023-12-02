// React
import React from 'react';

// MUI components
import Box from '@mui/material/Box';

function TabChip({
  children
}){

  return (
    <Box
      component="span"
      sx={{
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        borderRadius: '5px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: '5px',
        backgroundColor: '#e2f6e9',
        color: 'rgb(78, 161, 148) !important',
        padding: '2.5px 5px',
        fontSize: '10px',
      }}
      
    >
      {children}
    </Box>

  )

}

export default TabChip;