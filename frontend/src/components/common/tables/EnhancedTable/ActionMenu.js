import React, {useState, useRef} from 'react'

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function ActionMenu({ items, row }) {

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClick}
        ref={anchorRef}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorRef.current}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '& .MuiMenu-list': {
              paddingTop: 0.5,
              paddingBottom: 0.5,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {

          items.map((item, index) => {

            return (
              <MenuItem
                onClick={() => {
                  item?.onClick(row);
                  handleClose();
                }}
                key={item.id + "_" + index}
                sx={{
                  opacity: item.disabled ? 0.5 : 1,
                  cursor: item.disabled ? "not-allowed" : "pointer",
                  ':hover': {
                    backgroundColor: item.disabled ? "transparent" : "",
                  }
                }}
              >
                {
                  item.icon && (
                    <ListItemIcon
                      sx={{
                        minWidth: "24px !important",
                      }}
                    >
                      {React.cloneElement(item.icon, {
                        fontSize: "1.25em"
                      })}
                    </ListItemIcon>
                  )
                }
                <ListItemText
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: "12px"
                    }
                  }}
                >
                  {item.label}
                </ListItemText>
              </MenuItem>
            )

          })

        }

      </Menu>
    </div>
  )
}

export default ActionMenu