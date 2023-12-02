import { 
  Select, 
} from '@mui/material';

function CustomSelect({
  children,
  value,
  onChange,
  required,

  // TODO: check what this is for
  labelId,
  id
}){

  return (
    <Select
      value={value}
      onChange={onChange}
      required={required}
      labelId={labelId}
      id={id}
      sx={{
        '& .MuiInputBase-input': {
          padding: '6px 14px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: "2px #e5e4e9 solid"
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: "2px #00ec97 solid"
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: "2px #00ec97 solid",
          boxShadow: "0 0 5px #00ec97"
        }
      }}
    >
      {children}
    </Select>
  )

}

export default CustomSelect;