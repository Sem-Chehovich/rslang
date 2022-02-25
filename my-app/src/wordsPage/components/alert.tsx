import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts() {
  return (
    <Stack sx={{ width: '20%' }} spacing={2}>
      <Alert severity="success">You learned all words on the page!</Alert>
    </Stack>
  );
}
