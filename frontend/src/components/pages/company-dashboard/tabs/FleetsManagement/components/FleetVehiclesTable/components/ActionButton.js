// React
import React from "react";

// MUI components
import {
  Button
} from "@mui/material";

function ActionButton({
  children,
  ...rest
}){

  return (
    <Button 
      variant="outlined"
      sx={{
        fontSize: '12px',
        textTransform: 'none',
        borderRadius: '5px',
        lineHeight: '16px',
        paddingBlock: '2.5px',
        paddingInline: '10px',
        textDecoration: 'none',
        backgroundColor: '#fff',
        border: '1px #005ced solid',
        color: '#000',
        
        '&:hover': {
          border: '1px #005ced solid',
        },
      }}
      {...rest}
    >
      {children}
    </Button>
  );

}

export default ActionButton;