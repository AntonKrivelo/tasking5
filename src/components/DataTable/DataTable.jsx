import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', width: 230 },
  { field: 'Email', headerName: 'Email', width: 230 },
  {
    field: 'Status',
    headerName: 'Status',
    type: 'string',
    width: 90,
  },
  {
    field: 'Last Seen',
    headerName: 'Last Seen',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 260,
    valueGetter: (value, row) => `${row.name || ''} ${row.email || ''}`,
  },
];

const rows = [
  { id: 1, Name: 'Snow', Email: 'ansda23@gmail.com', Status: false },
  { id: 2, Name: 'Lannister', Email: 'sadasd2@gmail.com', Status: false },
  { id: 3, Name: 'Lannister', Email: '123@gmail.com', Status: true },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
