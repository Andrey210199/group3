import { Skeleton, Stack } from '@mui/material';

export const Skelet = () => {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" width={244} height={195} />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rounded" width={244} height={70} />
    </Stack>
  );
};
