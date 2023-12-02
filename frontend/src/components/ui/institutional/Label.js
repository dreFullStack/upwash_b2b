import { 
  Typography, 
} from '@mui/material';

function Label({children, ...rest}){

  return (
    <Typography
      {...rest}
      sx={{
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        fontSize: '14px',
        lineHeight: '14px',
        marginBottom: '10px',
        color: '#000',
        ...rest.sx
      }}
    >
      {children}
    </Typography>
  );

}

export default Label;