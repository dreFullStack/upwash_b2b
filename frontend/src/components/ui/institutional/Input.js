import React from 'react';

import {
  TextField,
} from '@mui/material';

function Input({value, onChange, placeholder, required, ...rest}, ref){

  return (
    <TextField 
      ref={ref}
      value={value} 
      onChange={onChange} 
      required={required}
      {...rest}
      sx={{
        '& .MuiOutlinedInput-root': { 
          borderRadius: '3px',
          height: '30px',
          backgroundColor: '#FFF',
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
        },
        '& .MuiInputBase-input': {
          padding: '6px 14px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: "1px #b3b2ba solid"
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: "1px #005ced solid"
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: "1px #005ced solid",
          boxShadow: "0 0 0 2px #005ced50",
        },
        '& .MuiOutlinedInput-root.Mui-focused': {
          backgroundColor: '#FFF',
        },
        ...rest.sx
      }}
    />
  );

}

export default React.forwardRef(Input);