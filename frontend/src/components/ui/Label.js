import { 
  Typography, 
} from '@mui/material';

function Label({children}){

  return (
    <Typography
      sx={{
        fontFamily: 'FKGrotesk-Bold',
        fontSize: '14px',
        lineHeight: '14px',
        marginBottom: '10px',
        color: '#000',
      }}
    >
      {children}
    </Typography>
  );

}

export default Label;