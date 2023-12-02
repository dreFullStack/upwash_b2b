// React 
import React, {forwardRef} from 'react';

// MUI components
import { 
  TextField, 
} from '@mui/material';

function Textarea({
  value, 
  onChange, 
  placeholder, 
  required, 
  rows=6,
  maxRows=4,
  customStyle,
  ...rest
},
ref
){

  return (
    <TextField 
      placeholder={placeholder}
      value={value} 
      onChange={onChange} 
      required={required}
      multiline
      rows={rows}
      maxRows={maxRows}
      sx={{
        '& .MuiInputBase-root': {
          padding: '0px',
          minWidth: '500px',
          width: '100%',
        },
        '& .MuiInputBase-input': {
          padding: '6px 14px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50'
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: "1px #005ced solid"
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: "1px #005ced solid",
          boxShadow: "0 0 0 2px #005ced50"
        },
        ...customStyle
      }}
      {...rest}
      ref={ref}
    />
  );

}

export default forwardRef(Textarea);