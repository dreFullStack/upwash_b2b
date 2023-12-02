import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function EnhancedTableToolbar({ 
    selected,
    setSelected,
    label,
    onDelete,
  }) {
  
    return (
      <Toolbar
        sx={{
          backgroundColor: "#fff",
          minHeight: "44px !important",
          paddingInline: "16px !important"
        }}
      >
        {selected.length > 0 ? (
          <Typography
            sx={{ 
                flex: "1 1 100%",
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selected.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ 
              flex: "1 1 100%",
              fontFamily: 'FKGrotesk-Bold',
              fontSize: "16px",
            }}
            variant="subtitle1"
            id="tableTitle"
            component="div"
          >
            {label}
          </Typography>
        )}
        {
          selected.length > 0 && (
            <Tooltip title="Delete">
                <IconButton
                    onClick={() => {
                      onDelete && onDelete(selected);    
                      setSelected([]);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
          ) 
        }
      </Toolbar>
    );
  }

export default EnhancedTableToolbar;