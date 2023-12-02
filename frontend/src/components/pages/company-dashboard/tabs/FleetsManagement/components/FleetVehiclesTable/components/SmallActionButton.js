// React
import React from "react";

// MUI components
import {
  Button
} from "@mui/material";

function getButtonStyles(type) {

  switch(type) {
    case "warning":
      return {
        backgroundColor: '#dcfe54',
        '& svg': {
          color: "#000"
        },
        '&:hover': {
          borderColor: 'dcfe54'
        }
      };
    case "error":
      return {
        backgroundColor: '#e24432',
        '& svg': {
          color: "#fff"
        },
        '&:hover': {
          borderColor: '#e24432'
        }
      };
    default:
      return {
        backgroundColor: '#fff',
        '& svg': {
          color: "#000"
        },
        '&:hover': {
          borderColor: '#005ced'
        }
      };
  }

}

function SmallActionButton({
  icon,
  type,
  ...rest
}){

  return (
    <Button 
      variant="outlined"
      sx={{
        // TODO: fix this
        minWidth: '25px',
        maxWidth: '25px',
        
        // TODO: fix this
        minHeight: '25px',
        maxHeight: '25px',
        
        borderRadius: '5px',
        border: '1px rgba(224, 224, 224, 1) solid',
        boxShadow: '0px 2.5px 2.5px 0px #b3b2ba50',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 0,

        ...getButtonStyles(type)
      }}
      {...rest}
    >
      {React.cloneElement(icon, {
        fontSize: "1.25em",
      })}
    </Button>
  );

}

export default SmallActionButton;