import { Container } from '@mui/system';

export const MainContainer = ({ children, ...props }) => {
  return (
    <Container container="main" maxWidth="xs" {...props}>
      {children}
    </Container>
  );
};
