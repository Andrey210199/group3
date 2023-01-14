import { forwardRef } from 'react';
import TextField from '@mui/material/TextField';

export const FormInput = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});
