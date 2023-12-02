// React
import React from 'react';

// MUI components
import {
  Box, 
} from '@mui/material';

// React icons
import {
  IoSearchOutline
} from 'react-icons/io5';

function QuickFind({
  icon, 
  children, 
  disabled=false,
  isActive=false,
  ...rest
}){

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        border: '1px #b3b2ba solid',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',
        borderRadius: '5px',
        height: '30px',
        backgroundColor: '#fff',
        paddingInline: '10px',
        '& input': {
          border: 'none',
          lineHeight: '30px',
          backgroundColor: 'transparent',
          '&:focus': {
            outline: 'none'
          }
        }
      }}
    >

      <Box 
        sx={{
          width: '18px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IoSearchOutline
          color="#898890"
          size="18px"
        />
      </Box>  
  
      <input
        placeholder='Quick find'
      />        
      
    </Box>
  )

}

export default QuickFind;