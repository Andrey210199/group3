import Button from '@mui/material/Button';

export const FormButton = ({ children, ...props }) => {
  return (
    <Button color="primary" {...props}>
      {children}
    </Button>
  ); // variant = 'contained' or 'outlined'
};
