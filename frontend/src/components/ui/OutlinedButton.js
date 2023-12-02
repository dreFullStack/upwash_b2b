import {
  Button,
  Link
} from '@mui/material'

const OutlinedButton = ({href, children, sx, ...rest}) => {

  return (
    <Button
      component={href ? Link : Button}
      href={href}
      variant="outlined"
      sx={{
        color: '#000',
        fontSize: '12px',
        textTransform: 'none',
        borderRadius: '5px',
        backgroundColor: '#FFF',
        lineHeight: '1.75',
        paddingBlock: '5px',
        paddingInline: '16px',
        textDecoration: 'none',
        border: '2px #0887F0 solid',
        ...sx,
        '&:hover': {
          backgroundColor: '#FFF',
          border: '2px #0887F0 solid',
          boxShadow: '0 0 0px 2.5px #0887F050',
          ...sx?.['&:hover']
        },
      }}
      {...rest}
      >
        {children}
      </Button>
  )

}

export default OutlinedButton;