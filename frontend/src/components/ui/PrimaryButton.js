import {
  Button,
  Link
} from '@mui/material'

const PrimaryButton = ({href, children, sx, ...rest}) => {

  return (
    <Button
      component={href ? Link : Button}
      href={href}
      variant="outlined"
      sx={{
        color: '#fff',
        fontSize: '12px',
        textTransform: 'none',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#0887F0',
        lineHeight: '1.75',
        paddingBlock: '5px',
        paddingInline: '16px',
        textDecoration: 'none',
        position: 'relative',
        ...sx,
        '&:hover': {
          backgroundColor: '#0887F0',
          boxShadow: '0 0 0px 2.5px #0887F050',
          border: 'none',
          ...sx?.['&:hover']
        },
      }}
      {...rest}
      >
        {children}
      </Button>
  )

}

export default PrimaryButton;