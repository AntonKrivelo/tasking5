import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import './DataTable.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'Name', headerName: 'Name', width: 230 },
  { field: 'Email', headerName: 'Email', width: 230 },
  { field: 'Status', headerName: 'Status', width: 150 },
  { field: 'LastSeen', headerName: 'LastSeen', width: 150 },
];

const initialTempData = [
  {
    id: '1',
    Name: 'Snow',
    Email: 'ansda23@gmail.com',
    Status: false,
    LastSeen: '1min ago',
  },
  {
    id: '2',
    Name: 'Lannister',
    Email: 'sadasd2@gmail.com',
    Status: false,
    LastSeen: '3min ago',
  },
  {
    id: '3',
    Name: 'Lannister',
    Email: '123@gmail.com',
    Status: true,
    LastSeen: '5min ago',
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState(initialTempData);
  const [selectDeleteUser, setSelectDeleteUser] = useState([]);

  const handleDeleteUser = () => {
    setRows((prevRows) => prevRows.filter((row) => !selectDeleteUser.includes(row.id)));
    setSelectDeleteUser([]);
  };

  return (
    <div>
      <Paper sx={{ width: '100%', p: 1 }}>
        <div className="table-btns">
          <Button variant="outlined" startIcon={<LockIcon />}>
            Block
          </Button>
          <Button variant="outlined" startIcon={<LockOpenIcon />}>
            Unblock
          </Button>
          <Button
            onClick={handleDeleteUser}
            sx={{ borderColor: '#FF9C9C' }}
            color="error"
            variant="outlined"
            disabled={selectDeleteUser.length === 0}
            startIcon={<DeleteForeverOutlinedIcon />}
          >
            Delete
          </Button>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={({ ids, type }) => {
            if (type === 'include') {
              setSelectDeleteUser([...ids]);
            }
            if (type === 'exclude') {
              const excludedIds = [...ids];
              const deletRows = rows
                .filter((r) => {
                  return !excludedIds.includes(r.id);
                })
                .map(({ id }) => id);
              setSelectDeleteUser([...deletRows]);
            }
          }}
          sx={{
            border: 0,
            height: 400,
            width: '100%',
          }}
        />
      </Paper>
    </div>
  );
}
