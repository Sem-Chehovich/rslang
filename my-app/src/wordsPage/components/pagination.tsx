import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({page, handleChangePag}: any) {
  return (
    <Stack spacing={1}>
      <Pagination page={page} count={30} color='primary' size="large"  onChange={handleChangePag}  />
    </Stack>
  );
}
